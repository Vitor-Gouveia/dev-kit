import { nodeScript } from './node.js';
import { depsScript } from './deps.js';

export const execute = () => {
  nodeScript();
  depsScript();
}