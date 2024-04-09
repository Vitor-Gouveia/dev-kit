# Dev Kit

Ferramenta para auxiliar na manutenção dos microsserviços Minu.

- [Documentação](#documentação)
- [Novidades](#Novidades)
- [Principais Funcionalidades](#principais-funcionalidades)
  - [Feedback](#feedback)
  - [Update](#update)
- [Stack](#stack)
- [Setup](#setup)
  - [Instalação](#instalação)

## Documentação

Acesse a [Documentação do Dev Kit no Notion]() para ter acesso a guias de uso, funcionamento e exemplos!

## Novidades

[Clique aqui para acessar o CHANGELOG](CHANGELOG.md)

## Principais Funcionalidades

### Feedback

Tem como proposta de valor os seguintes pontos:

- Alertar sobre versão do Node.js desatualizada
- Alertar sobre dependências desatualizadas e/ou com vulnerabilidades
- Executar processo de linting

### Update

O script update é responsável por atualizar o serviço em alguns critérios:

- Adição do `pull_request_template.md`
- Atualização da versão do sonarqube
- Atualização do Node.js
- Padronização do arquivo data-dog

### Danger

O script danger é responsável por adicionar o danger e as dependências no serviço no ambiente do Github Actions.

Pode ser executado com o seguinte comando:

`npx @vitorgouveia/dev-kit danger`

Esse script pode ser adicionado da seguinte forma no workflow `danger-js.yml` dos serviços.

```yml
- name: Running Danger on CI
  env:
    DANGER_GITHUB_API_TOKEN:  ${{ secrets.GH_PIPELINE_TOKEN }}
  run: |
    npx @vitorgouveia/dev-kit danger
```

## Stack

As principais tecnologias utilizadas são:

- [Node.js](https://nodejs.org/pt-br)

## Setup

### Instalação

work in progress