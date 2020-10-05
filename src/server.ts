import express from 'express'
import ejs from 'ejs'
import cookieParser from 'cookie-parser'

import Theme from './theme'

interface ServerParameters {
    port: number,
}

export default class Server {
    private _theme: Theme = new Theme()
    private _app = express()
    constructor(obj: ServerParameters) {
        this._app.use(cookieParser())

        this.routing()

        this._app.listen(obj.port, () => {
            console.log(`Example app listening at http://localhost:${obj.port}`)
        })
    }
    routing() {
        const hostUserStartPage = () => {
            this._app.use(express.static('.', {
                index: false,
            }))

            this._app.get('/', (req, res) => {
                if (this._theme.isIndexTemplate()) {
                    const dataCookie = req.cookies['customstart-data']
                    let data;

                    if (dataCookie != null) {
                        data = JSON.parse(dataCookie)
                    } else {
                        data = this._theme.getDefaultdata()
                    }

                    const template = this._theme.getIndexTemplate()
                    const html = ejs.render(template, { data: data })

                    res.send(html)
                } else {
                    this._app.get('/', (req, res) => {
                        const html = this._theme.getIndexHtml()

                        res.send(html)
                    })

                }
            })
        }

        const hostSettings = () => {
            // Files for the settings page to work.
            this._app.use('/csp', express.static(__dirname + '/csp'))

            // Actual settings page that lets the user customisable the page with.
            this._app.get('/settings', (req, res) => {
                res.sendFile(__dirname + '/csp/settings.html')
            })
        }

        hostUserStartPage()
        hostSettings()
    }
}
