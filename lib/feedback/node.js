import packageJSON from "../../package.json" assert {
  type: "json"
}

import cli from "../cli.js"

const getSemanticVersion = (version) => {
  const [major, minor, patch] = version.split(".")

  return {
    major: Number(major),
    minor: Number(minor),
    patch: Number(patch),
    complete: version
  }
}

const getNodeVersion = () => {
  return getSemanticVersion(packageJSON.engines.node)
}

const DEPRECATED_NODEJS_VERSIONS = [14]
const OUTDATED_NODEJS_VERSIONS = [16, 18]
const LATEST_NODEJS_VERSION = "20.12.0"

function main() {
  const node_version = getNodeVersion()
  
  if(getSemanticVersion(LATEST_NODEJS_VERSION).major > node_version.major) {
    cli.info(`A new update for Node.js is available: v${LATEST_NODEJS_VERSION}.`)
  }
  
  if(DEPRECATED_NODEJS_VERSIONS.includes(node_version.major)) {
    return cli.alert(`The Node.js version: v${node_version.complete} is deprecated.`)
  }
  
  if(OUTDATED_NODEJS_VERSIONS.includes(node_version.major)) {
    return cli.warning(`The Node.js version: v${node_version.complete} is outdated.`)
  }
}

main()