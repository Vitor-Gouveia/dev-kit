import fs from "node:fs/promises"

import logger from "../../logger.js"

export const pullRequestTemplate = async () => {
  const file_path = ".github/pull_request_template.md"

  try {
    await fs.readFile(`${process.cwd()}/${file_path}`, "utf8")
  } catch(error) {
    await fs.writeFile(`${process.cwd()}/${file_path}`, templateMessage, "utf8")
    logger.info(`Pull Request template criado.`)
  }
}

const templateMessage = `
## Título do Pull Request
  
### Tarefa
  
[PDP-XXX - [Processamento de Pedidos] Título da tarefa com o link](https://minutrade.atlassian.net/browse/PDP-XXX)
  
### Descrição
  
Aqui entra a descrição da tarefa e outras informações relevantes sobre a implementação.
  
### Critérios de Aceite
  
### ✔️ Critérios de aceite realizados

Aqui entram os critérios implementados na task

### ❌ Critério de aceite não realizado

Comentário do porquê não foi possível realizar esse critério de aceite.

### 📁 Evidências

Imagens da implementação em funcionamento
`.trim()