import { createRequire } from 'node:module';

import logger from '../logger.js';

const require = createRequire(import.meta.url);
const packageJSON = require('../../package.json');

const getSemanticVersion = (version) => {
  const [major, minor, patch] = version.split('.');

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
    complete: version
  };
};

const DEPRECATED_NODEJS_VERSIONS = [14];
const OUTDATED_NODEJS_VERSIONS = [16, 18];
const LATEST_NODEJS_VERSION = '20.12.0';

export const nodeScript = () => {
  const node_version = getSemanticVersion(packageJSON.engines.node);

  const deprecated = DEPRECATED_NODEJS_VERSIONS.includes(node_version.major);
  const outdated = OUTDATED_NODEJS_VERSIONS.includes(node_version.major);

  if (deprecated) {
    logger.alert('');
    logger.alert(`A versão atual do Node.js: v${node_version.complete} está desatualizada.`);
    logger.alert('Atualize com o comando \'npx @minutrade/dev-kit update --node\'');
    logger.alert('');
  }

  if (outdated) {
    logger.info('');
    logger.info(`Uma nova versão do Node.js está disponível: v${LATEST_NODEJS_VERSION}.`);
    logger.info('');
  }

  if (getSemanticVersion(LATEST_NODEJS_VERSION).major === node_version.major) {
    logger.success('');
    logger.success('Node.js está atualizado.');
    logger.success('');
  }

  // make prompt asking to update
};