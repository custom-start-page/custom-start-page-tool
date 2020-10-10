import fs from 'fs'
import MarkdownRenderer from './MarkdownRenderer'

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
    private _markdownRenderer = new MarkdownRenderer()
    constructor() {
    }
    getAbout(): string {
        let md = this._readFromFile(this._path + '/manifest/readme.md')
            || this._readFromFile(this._path + '/manifest/about.md')

        if (md == null)
            return 'No about. 😢'

        return this._markdownRenderer.render(md)
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
    _readFromFile(path: string): string {
        try
        {
            return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
        }
        catch
        {
            return null
        }
    }
    _readJsonFromFile(path: string): object {
        const str = this._readFromFile(path)

        if (str == null)
            return null

        return JSON.parse(str)
    }
}
