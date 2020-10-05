const fs = require('fs')

export default class Theme {
    private _path: string = './'
    constructor() {
    }
    getReadme(): string {
        const readmeFilePath = this._path + '/readme.md'

        if (fs.existsSync(readmeFilePath)) {
            const readmeMd = fs.readFileSync(readmeFilePath, { encoding: 'utf8', flag: 'r' })

            return readmeMd;
            // return markdownRenderer(readmeMd)
        }

        return 'No about. 😢'
    }
    getMeta(): object {
        const meta = JSON.parse(fs.readFileSync(this._path + '/manifest/meta.json', { encoding: 'utf8', flag: 'r' }))

        return meta
    }
    getSchema(): object {
        const schema = JSON.parse(fs.readFileSync(this._path + '/manifest/schema.json', { encoding: 'utf8', flag: 'r' }))

        return schema
    }
    getDefaultdata(): object {
        const data = JSON.parse(fs.readFileSync(this._path + '/manifest/defaultData.json', { encoding: 'utf8', flag: 'r' }))

        return data
    }
    isIndexTemplate(): boolean {
        return fs.existsSync(this._path + '/index.ejs')
    }
    getIndexHtml(): string {
        const html = fs.readFileSync('index.html', { encoding: 'utf8', flag: 'r' })

        return html
    }
    getIndexTemplate(): string {
        const template = fs.readFileSync('index.ejs', { encoding: 'utf8', flag: 'r' })

        return template
    }
}
