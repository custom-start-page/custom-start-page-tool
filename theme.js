const fs = require('fs')

class Theme {
    constructor() {
        this.path = './'
    }
    getReadme() {
        const readmeFilePath = this.path + '/readme.md'

        if (fs.existsSync(readmeFilePath)) {
            const readmeMd = fs.readFileSync(readmeFilePath, 'utf8')

            return markdownRenderer(readmeMd)
        }

        return 'No about. 😢'
    }
    getMeta() {
        const meta = JSON.parse(fs.readFileSync(this.path + '/manifest/meta.json', 'utf8'))

        return meta
    }
    getSchema() {
        const schema = JSON.parse(fs.readFileSync(this.path + '/manifest/schema.json', 'utf8'))

        return schema
    }
    getDefaultdata() {
        const data = JSON.parse(fs.readFileSync(this.path + '/manifest/defaultData.json', 'utf8'))

        return data
    }
    isIndexTemplate() {
        return fs.existsSync(this.path + '/index.ejs')
    }
    getIndexHtml() {
        const html = fs.readFileSync('index.html', { encoding: 'utf8', flag: 'r' })

        return html
    }
    getIndexTemplate() {
        const template = fs.readFileSync('index.ejs', { encoding: 'utf8', flag: 'r' })

        return template
    }
}

module.exports = Theme
// exports = Theme
// export const Theme = Theme
