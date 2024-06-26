import child_process from "node:child_process"

import logger from "../logger.js"
import { path, writeFile } from "../commons/file.js"

export const execute = async () => {
  // step 1 - add the dangerfile
  logger.info('');
  logger.info('Danger CI');

  try {
    const file_path = path("dangerfile.js")
    await writeFile(file_path, dangerfile)
    logger.success(" ↳ Dangerfile created successfully")
  } catch(error) {
    logger.alert(' ↳ Failed to create dangerfile')
    console.log("Error: %s", error.message)
  }

  // step 2 - add the 'danger' package
  try {
    child_process.execSync('npm i danger', {
      stdio: "inherit"
    });
    logger.success(" ↳ 'danger' dependency installed")
  } catch(error) {
    logger.alert(" ↳ Failed to install 'danger' dependency")
    console.log("Error: %s", error.message)
  }

  // step 3 - install dependencies
  try {
    child_process.execSync('npm i', {
      stdio: "inherit"
    });
    logger.success(" ↳ dependencies installed")
  } catch(error) {
    logger.alert(" ↳ Failed to install dependencies")
    console.log("Error: %s", error.message)
  }

  // step 4 - execute danger ci --fainOnErrors
  try {
    child_process.execSync('npx danger ci --failOnErrors', {
      stdio: "inherit",
    });
    logger.success(" ↳ 'danger ci' executed sucessfully")
  } catch(error) {
    logger.alert(" ↳ Failed to execute 'danger ci'")
    console.log("Error: %s", error)
  }
  logger.info("")
}

export const dangerfile = `
const {
  message, danger, warn, fail
} = require('danger');
const { execSync } = require('node:child_process');
const { name: serviceName } = require('./package.json');

const modifiedFiles = danger.git.modified_files;
const createdFiles = danger.git.created_files;

const findModifiedFile = (fileName) => modifiedFiles.find((modifiedFile) => modifiedFile.includes(fileName));

const findModifiedTestFiles = () => modifiedFiles.filter((file) => file.includes('test.js'));

const findCreatedTestFiles = () => createdFiles.filter((file) => file.includes('test.js'));

const findModifiedSourceFiles = () => modifiedFiles.filter((file) => file.includes('lib/'));

const findCreatedSourceFiles = () => createdFiles.filter((file) => file.includes('lib/'));

const testFiles = [...findModifiedTestFiles(), ...findCreatedTestFiles()];

const sourceFiles = [...findModifiedSourceFiles(), ...findCreatedSourceFiles()];

const verifyTestChanges = async () => {
  if (!testFiles.length && sourceFiles.length) {
    return warn('Nenhum teste foi criado ou atualizado para a nova implementação');
  }
  // eslint-disable-next-line no-restricted-syntax
  for (const testFile of testFiles) {
    const { diff } = await danger.git.diffForFile(testFile);
    if (!diff.includes('assert')) {
      warn(\`Nenhum expect/assert foi adicionado no teste \${testFile}\`);
    }
  }
};

const verifyDescriptionChanges = () => {
  if (!danger.github.pr.body) {
    warn('Escreva uma breve descrição do PR.');
  }
};

const verifyDocs = async () => {
  const packageDiff = await danger.git.JSONDiffForFile('package.json');
  if (packageDiff.version) {
    if (packageDiff.version.after.includes('-rc')) {
      fail('Versão com RC');
    }
    if (!findModifiedFile('CHANGELOG.md')) {
      warn('<strong>CHANGELOG.md</strong> deve ser atualizado com as features implementadas na versão');
    }
  }
};

const findDiffDependencies = (diffDependencies) => {
  const newDevDependencies = [];
  const updatedDevDependencies = [];
  Object.keys(diffDependencies.after).forEach((devDependency) => {
    const versionBefore = diffDependencies.before[devDependency];
    const versionAfter = diffDependencies.after[devDependency];
    if (versionAfter && !versionBefore) {
      newDevDependencies.push(\`\${devDependency} - \${versionAfter.replace('^', '')}\`);
    }
    if (versionBefore && versionAfter !== versionBefore) {
      updatedDevDependencies.push(
        \`\${devDependency} - De \${versionBefore.replace('^', '')} para \${versionAfter.replace('^', '')}\`
      );
    }
  });
  if (newDevDependencies.length) {
    message(
      'Novas dependências de desenvolvimento instaladas neste PR: <br/>'
      + \` \${newDevDependencies.join('<br/>')} \`
    );
  }
  if (updatedDevDependencies.length) {
    message(
      'Dependências de desenvolvimento foram atualizadas neste PR: <br/> '
      + \` \${updatedDevDependencies.join('<br/>')} \`
    );
  }
};

const verifyDevdependencies = async () => {
  const packageDiff = await danger.git.JSONDiffForFile('package.json');
  if (packageDiff.devDependencies) {
    findDiffDependencies(packageDiff.devDependencies);
  }
  if (packageDiff.dependencies) {
    findDiffDependencies(packageDiff.dependencies);
  }
};

const verifyImportantFiles = () => {
  const importantFiles = [
    'config.yml',
    'Dockerfile',
    'entrypoint.sh',
    '.eslintrc',
    'sonar-project.properties',
    '.mocharc.json',
    '.nycrc.json'
  ];
  importantFiles.forEach((file) => {
    if (findModifiedFile(file)) {
      message(\`Atenção: O arquivo <strong>\${file}</strong> foi atualizado.\`);
    }
  });
};

const buildScriptMessage = async () => {
  const scriptMessage = [];
  if (findModifiedFile('package.json')) {
    const packageDiff = await danger.git.JSONDiffForFile('package.json');
    const stringPackageContent = await danger.github.utils.fileContents(findModifiedFile('package.json'));
    const objectPackageContent = JSON.parse(stringPackageContent);
    if (packageDiff.version && !packageDiff.version.after.includes('-rc')) {
      const versionMessage = \`\n <strong>Microsserviço</strong>: \${serviceName} \`
        + \`\n <strong>Versão</strong>: \${objectPackageContent.version}\`;
      scriptMessage.push(versionMessage);
    }
  }
  if (scriptMessage.length) {
    const headerMessage = ' =================== Roteiro de Implantação =================== \\n\\n';
    const fullMessage = headerMessage + scriptMessage;
    message(fullMessage);
  } else {
    message('Nenhuma alteração na versão');
  }
};

const verifyOutdatedPackages = async () => {
  try {
    const output = execSync('npm outdated --json || true');
    const json = JSON.parse(output.toString());
    const entries = Object.entries(json);

    const packagesToUpdate = entries
      .map((obj) => {
        const [packageName, { current, latest }] = obj;

        return \`\${packageName} - Atual \${current} - Última \${latest}\`;
      });


    if (packagesToUpdate.length) {
      message(
        'Dependências com novas versões disponíveis: <br/>'
        + \` \${packagesToUpdate.join('<br/>')} \`
      );
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log("Failed to execute 'npm outdated'", error);
  }
};

const execValidation = async () => {
  verifyDescriptionChanges();
  await verifyTestChanges();
  await buildScriptMessage();
  if (findModifiedFile('package.json')) {
    verifyImportantFiles();
    await verifyDocs();
    await verifyDevdependencies();
  }
  await verifyOutdatedPackages();
};

execValidation();
`.trim()