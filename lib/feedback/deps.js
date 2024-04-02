import child_process from 'node:child_process';

import logger from '../logger.js';
import { getRuntimeVersion } from './node.js';

const outdatedDeps = () => {
  const output = child_process.execSync('npm outdated --json || true');
  const json = JSON.parse(output.toString());
  const entries = Object.entries(json);

  const packagesToUpdate = entries.map((entry) => {
    const [name, { current, latest }] = entry;

    return ` ↳ ${name.padEnd(15, " ")} - ${current.padEnd(6, " ")} -> ${latest}`;
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

const getPackagesWithVulnerabilities = (json, node_version) => {
  const formatName = (string) => ` ↳ ${string}`
  
  switch(node_version.major) {
    case 14: {
      return json.actions
        .filter((entry) => !entry.depth || entry.depth === 1)
        .map((entry) => formatName(entry.module))
    }
    case 16:
    case 18:
    case 20: {
      return Object.values(json.vulnerabilities)
        .filter((entry) => entry.isDirect)
        .map((entry) => formatName(entry.name))
    }
  }
}

const vulnerabilityDeps = () => {
  const node_version = getRuntimeVersion()
  
  try {
    const output = child_process.execSync('npm audit --json || true');
    const json = JSON.parse(output.toString());

    const packages = getPackagesWithVulnerabilities(json, node_version)

    if (!packages.length) {
      logger.success('');
      logger.success('0 dependências com vulnerabilidades.');
      logger.success('');

      return;
    }

    logger.info('');
    logger.alert(`${packages.length} dependências com vulnerabilidades.`);
    logger.alert(`${packages.join('\n')}`);
    logger.info('');
  } catch (error) {
    logger.alert('Ocorreu um erro ao buscar dependências com vulnerabilidade');
    console.log(error);
  }
};

export const depsScript = () => {
  // make prompt asking to update
  outdatedDeps();
  vulnerabilityDeps();
};
