const path = require('path');
const { promises: fs } = require('fs');
const JavaScriptObfuscator = require('javascript-obfuscator');

const directoryPath = {
    js: {
        dir: path.join(__dirname, '../files/js'),
        obfuscated: path.join(__dirname, '../files/js/obfuscated'),
        babel: path.join(__dirname, '../files/js/babel'),
        default: path.join(__dirname, '../files/js/default')
    }
};

class filesManager{
    async filesDir(dir){
        return await fs.readdir(dir);
    }
}

class obfuscatorManager{
    constructor(toolbox){
        const {print, parameters} = toolbox;

        this.print = print;
        this.parameters = parameters
    }

    async saveFile(file, data){
        await fs.writeFile(file, data);

        return this.print.success(`Arquivo obfuscado com sucesso, salvo em ${file.replace("/", "\\")}`)
    }

    async obfuscatorFile(data){
        return await JavaScriptObfuscator.obfuscate(data, {
            simplify: true,
            stringArrayEncoding: ['base64']
        }).getObfuscatedCode();
    }

    async obfuscateByDir(directory){
        let files = await fs.readdir(directory);
    
        const { dir } = this.parameters.options;

        for(let file of files){
            let fl = await fs.readFile(`${directoryPath.js.dir}/${dir}/${file}`, 'utf8');

            if(!fl){
                return this.print.error("Arquivo não encontrado");
            }

            let data = await this.obfuscatorFile(fl);
            await this.saveFile(`${directoryPath.js.dir}/${dir}/${file}`, data)
        }
    }

    async obfuscateDefault(dir){
        try{
            let files = await fs.readdir(dir);

            for(let file of files){
                let fl = await fs.readFile(`${directoryPath.js.default}/${file}`, 'utf8');
                if(!fl){
                    return this.print.error("Arquivo não encontrado");
                }

                let data = await this.obfuscatorFile(fl);
                await this.saveFile(`${directoryPath.js.obfuscated}/${file}`, data)
            }
        }catch(e){
            this.print.error(e.message)
        }
    }
}

module.exports = {
    name: 'obfuscate',
    description: 'Criptografa arquivos em um determinado diretório',
    run: async toolbox => {
        const manager = new obfuscatorManager(toolbox);
        const fManager = new filesManager();
        const {print, parameters} = toolbox;

        const { dir } = parameters.options;

        if(dir) return manager.obfuscateByDir(`${directoryPath.js.dir}/${dir}`);
        if(!dir) return manager.obfuscateDefault(`${directoryPath.js.default}`);
    },
}