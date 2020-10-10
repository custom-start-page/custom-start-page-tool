import express from 'express'
import ejs from 'ejs'
import cookieParser from 'cookie-parser'
import cheerio from 'cheerio'

import Theme from './Theme'

interface ServerParameters {
    port: number,
}

export default class Server {
    private _theme: Theme = new Theme()
    private _app = express()
    constructor(obj: ServerParameters) {
        this._app.use(cookieParser())

        this._hostIndexWrapper()
        this._hostAbout()
        this._hostUserStartPage()
        this._hostSettings()
        this._hostApi()

        this._app.listen(obj.port, () => {
            console.log(`Example app listening at http://localhost:${obj.port}`)
        })
    }
    /**
     * Wrap the users index page using an iframe so things can be added outside of the page.
     */
    private _hostIndexWrapper() {
        this._app.get('/', (req, res) => {
            res.sendFile(__dirname + '/csp/wrapper.html')
        })
    }
    private _hostAbout() {
        this._app.get('/about', (req, res) => {
            res.send(this._theme.getAbout())
        })
    }
    /**
     * Host the users custom start page.
     */
    private _hostUserStartPage() {
        this._app.use(express.static('.', {
            index: false,
        }))

        this._app.get('/index', (req, res) => {
            const dataCookie = req.cookies['customstart-data']
            let data: object

            if (dataCookie != null) {
                data = JSON.parse(dataCookie)
            } else {
                data = this._theme.getDefaultData()
            }

            let html = this._getUserStartPageHtml(data)

            html = this._insertStartPageMeta(html)

            res.send(html)
        })
    }
    private _insertStartPageMeta(html: string): string {
        const meta = this._theme.getMeta()
        const $ = cheerio.load(html)

        // Remove existing meta.
        $('head title').replaceWith('<!-- Removed custom title -->')
        $('head meta[name="description"]').replaceWith('<!-- Removed custom meta description. -->')


        // Add my meta.
        $('head').append('<!-- Meta injected by Custom Start Page')
        $('head').append('<base target="_top">\r\n') // Ensure the page always targets the top (if loaded in an iframe).
        $('head').append(`<title>${meta.name} | Custom Start Page</title>\r\n`)
        // $('head').append(`<meta name="description" content="${meta.name} is a free, open source and customisable start page for your browser, hosted by Custom Start Page.">\r\n`)

        return $.html()
    }
    private _getUserStartPageHtml(data: object): string {
        if (this._theme.isIndexTemplate()) {
            const template = this._theme.getIndexTemplate()

            return ejs.render(template, { data: data })
        } else {
            this._app.get('/', (req, res) => {
                return this._theme.getIndexHtml()
            })
        }
    }
    /**
     * Host the settings page.
     */
    private _hostSettings() {
        // Files for the settings page to work.
        this._app.use('/csp', express.static(__dirname + '/csp'))

        // Actual settings page that lets the user customisable the page with.
        this._app.get('/settings', (req, res) => {
            res.sendFile(__dirname + '/csp/settings.html')
        })
    }
    private _hostApi() {
        this._app.get('/api/data', (req, res) => {
            res.json(this._theme.getDefaultData())
        })
    }
}
