const express = require('express')
const fs = require('fs')
const ejs = require('ejs');

const app = express()
const port = 3000

const routing = () => {
    const hostUserStartPage = () => {
        app.use(express.static('.', {
            index: false,
        }))

        if (fs.existsSync('index.ejs')) {
            app.get('/', (req, res) => {
                const data = {
                    "links": [
                        {
                            "name": "Youtube",
                            "url": "https://www.youtube.com"
                        },
                        {
                            "name": "Netflix",
                            "url": "https://www.netflix.com"
                        },
                        {
                            "name": "Spotify",
                            "url": "https://www.spotify.com"
                        },
                        {
                            "name": "Prime",
                            "url": "https://www.amazon.de/amazonprime?_encoding=UTF8&%2AVersion%2A=1&%2Aentries%2A=0"
                        }
                    ]
                }

                const template = fs.readFileSync('index.ejs', { encoding: 'utf8', flag: 'r' })
                const html = ejs.render(template, { data: data })

                res.send(html)
            });
        } else {
            app.get('/', (req, res) => {
                res.sendFile(process.cwd() + '/index.html')
            })
        }
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
