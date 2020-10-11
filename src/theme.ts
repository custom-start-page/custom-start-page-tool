import fs from 'fs'
import MarkdownRenderer from './MarkdownRenderer'

export interface InterfaceMetaAuthor {
    name: string
    link: string
}

export interface InterfaceMeta {
    version: string
    name: string
    author: InterfaceMetaAuthor
    features: string[]
}

export default class Theme {
    private _path: string = '.'
    private _markdownRenderer = new MarkdownRenderer()
    constructor() {
    }
    private _aboutPaths: string[] = [
        this._path + '/manifest/about.md',
        this._path + '/manifest/readme.md',
    ]
    aboutExists(): boolean {
        return this._anyPathExists(...this._aboutPaths)
    }
    getAbout(): string {
        let md = this._readFromFiles(...this._aboutPaths)

        if (md == null)
            return 'No about. 😢'

        return this._markdownRenderer.render(md)
    }
    private _metaPath = this._path + '/manifest/meta.json'
    metaExists(): boolean {
        return this._anyPathExists(this._metaPath)
    }
    getMeta(): InterfaceMeta {
        return this._readJsonFromFile<InterfaceMeta>(this._metaPath)
    }
    private _schemaPath = this._path + '/manifest/schema.json'
    schemaExists(): boolean {
        return this._anyPathExists(this._schemaPath)
    }
    getSchema(): object {
        return this._readJsonFromFile<object>(this._schemaPath)
    }
    getDefaultData(): object {
        let data = this._readJsonFromFile<object>(this._path + '/manifest/defaultData.json')

        if (data != null)
            return data

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
    _anyPathExists(...paths: string[]): boolean {
        for (const path of paths) {
            let exists = fs.existsSync(path)

            if (exists)
                return true
        }

        return false
    }
    _readFromFiles(...paths: string[]): string {
        for (const path of paths) {
            try
            {
                return fs.readFileSync(path, { encoding: 'utf8', flag: 'r' })
            }
            catch
            {
            }
        }

        return null
    }
    _readJsonFromFile<T>(path: string): T {
        const str = this._readFromFiles(path)

        if (str == null)
            return null

        const json: T = JSON.parse(str)

        return json
    }
}
