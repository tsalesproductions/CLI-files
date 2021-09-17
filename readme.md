# Sobre

CLI para gerenciar arquivos de projetos


## Funções

- ObfuscatorJs: Criptografa arquivos js
- BabelJs: Converte arquivos js para o formato Babel (versões anteriores de JavaScript) *(Breve)*
- Sass: Converte todo código escrito em Sass para CSS *(Breve)*

## Como usar o Obfuscator

- Atualmente, o projeto só criptografa arquivos que estão dentro do diretório `src/files/js`

##### Entendendo diretórios `src/files/js`
- `babel`: É a raíz onde será criado todos os arquivos que forem convertidos para o formato babel
- `default`: É a raíz onde devem ser colocados os códigos descriptografados e não convertidos(js padrão)
- `obfuscated`: É a raíz onde será criado os arquivos que forem criptografados

##### Comandos disponíveis

```shell
$ files obfuscator
$ files obfuscator --dir=teste
```

##### `$ files obfuscator`:
- Quando esse comando é utilizado, ele obfuscará todos as arquivos que estão na raíz `/default` e converterá para o diretório de sáida `/obfuscated`

##### `$ files obfuscator --dir=teste`:
- Esse comando é utilizado para espeficiar um diretório que você quer criptografar. *OBS: ESSE COMANDO NÃO SALVA NA RAÍZ `/default`*
- Ao usar esse comando, ele criptografará todos os arquivos js que estiverem naquela raíz do `--dir`
- O diretório informado em --dir=`teste` deve estar dentro da raíz `src/files/js`

# License

MIT - see LICENSE

