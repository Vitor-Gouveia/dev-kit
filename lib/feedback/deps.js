import child_process from 'node:child_process';

import logger from '../logger.js';

const outdatedDeps = () => {
  const output = child_process.execSync('npm outdated --json || true');
  const json = JSON.parse(output.toString());
  const entries = Object.entries(json);

  const packagesToUpdate = entries.map((entry) => {
    const [name, { current, latest }] = entry;

    return ` ↳ ${name} - ${current} -> ${latest}`;
  });

  if (!packagesToUpdate.length) {
    logger.success('');
    logger.success('Todas as dependências estão atualizadas.');
    logger.success('');

    return;
  }

  logger.warning('');
  logger.warning(`${packagesToUpdate.length} dependências com versões disponíveis.`);
  logger.warning(`${packagesToUpdate.join('\n')}`);
  logger.warning('');
};

const vulnerabilityDeps = () => {
  try {
    const output = child_process.execSync('npm audit --json || true');
    const json = JSON.parse(output.toString());

    const entries = Object.entries(json.vulnerabilities);
    const packagesWithVulnerabilities = entries.map((entry) => {
      const [name] = entry;

      return ` ↳ ${name}`;
    });

    if (!packagesWithVulnerabilities.length) {
      logger.success('');
      logger.success('0 dependências com vulnerabilidades.');
      logger.success('');

      return;
    }

    logger.info('');
    logger.alert(`${packagesWithVulnerabilities.length} dependências com vulnerabilidades.`);
    logger.alert(`${packagesWithVulnerabilities.join('\n')}`);
    logger.info('');
  } catch (error) {
    logger.alert('Ocorreu um erro ao buscar dependências com vulnerabilidade %s');
    logger.alert(error);
  }
};

export const depsScript = () => {
  // make prompt asking to update
  outdatedDeps();
  vulnerabilityDeps();
};
