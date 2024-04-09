import { path, writeFile } from "../../commons/file.js"
import { LATEST_NODEJS_VERSION } from "../../feedback/node.js"

export const dangerCI = async () => {
  const file_path = path(".github/workflows/danger-js.yml")
  await writeFile(file_path, workflowFile)
}

const workflowFile = `
name: "Danger JS"
on: [pull_request]
jobs:
  danger:
    runs-on: ubuntu-20.04
    steps:
      - uses: actions/checkout@v3

      - uses: actions/setup-node@v3
        with:
          node-version: ${LATEST_NODEJS_VERSION}

      - name: Setup GitHub Packages Token
        run: |
          echo '@minutrade:registry=https://npm.pkg.github.com/' >> .npmrc
          echo '//npm.pkg.github.com/:_authToken=\${{ secrets.GH_PIPELINE_TOKEN }}' >> .npmrc

      - name: Running Danger on CI
        env:
          DANGER_GITHUB_API_TOKEN:  \${{ secrets.GH_PIPELINE_TOKEN }}
        run: |
          npx @vitorgouveia/dev-kit danger
`.trim()