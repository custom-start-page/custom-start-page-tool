const express = require('express')
const fs = require('fs')
const ejs = require('ejs')
const cookieParser = require('cookie-parser')

const Theme = require('./theme.js')

const app = express()
const port = 3000

app.use(cookieParser())

const theme = new Theme()

const routing = () => {
    const hostUserStartPage = () => {
        app.use(express.static('.', {
            index: false,
        }))

        app.get('/', (req, res) => {
            if (theme.isIndexTemplate()) {
                const dataCookie = req.cookies['customstart-data']
                let data;

                if (dataCookie != null) {
                    data = JSON.parse(dataCookie)
                } else {
                    data = theme.getDefaultdata()
                }

                const template = theme.getIndexTemplate()
                const html = ejs.render(template, { data: data })

                res.send(html)
            } else {
                app.get('/', (req, res) => {
                    const html = theme.getIndexHtml()

                    res.send(html)
                })

            }
        })
    }

    const hostSettings = () => {
        // Files for the settings page to work.
        app.use('/csp', express.static(__dirname + '/csp'))

        // Actual settings page that lets the user customisable the page with.
        app.get('/settings', (req, res) => {
            res.sendFile(__dirname + '/csp/edit.html')
        })
    }

    hostUserStartPage()
    hostSettings()
}

routing()

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
