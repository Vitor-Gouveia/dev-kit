import { pullRequestTemplate } from "./services/pull-request-template.js"
import { githubActionsOptimization } from "./services/github-actions-optimization.js"
import { updateNodejs } from "./services/nodejs-update.js"
import { dependenciesUpdate } from "./services/dependencies-update.js"
import { datadog } from "./services/datadog.js"
import { dangerCI } from "./services/danger-ci.js"

export const execute = async () => {
  await pullRequestTemplate()
  await githubActionsOptimization()
  await updateNodejs()
  await dependenciesUpdate()
  await datadog()
  await dangerCI()
}