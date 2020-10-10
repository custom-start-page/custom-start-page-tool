import fs from 'fs'

export interface InterfaceMetaAuthor {
    name: string;
    link: string;
}

export interface InterfaceMeta {
    version: string;
    name: string;
    slug: string;
    author: InterfaceMetaAuthor;
    preview: string;
    features: string[];
}

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
    getMeta(): InterfaceMeta {
        const meta = JSON.parse(fs.readFileSync(this._path + '/manifest/meta.json', { encoding: 'utf8', flag: 'r' }))

        return meta
    }
    getSchema(): object {
        const schema = JSON.parse(fs.readFileSync(this._path + '/manifest/schema.json', { encoding: 'utf8', flag: 'r' }))

        return schema
    }
    getDefaultData(): object {
        let data = this._readJsonFromFile(this._path + '/manifest/defaultData.json')

        if (data != null)
            return data;

        data = this._readJsonFromFile(this._path + '/manifest/default-data.json')

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
    _readJsonFromFile(path: string): object {
        let file

        try
        {
            file = fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
        }
        catch
        {
            return null
        }

        const schema = JSON.parse(file)

        return schema
    }
}
