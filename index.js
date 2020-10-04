const express = require('express')
const app = express()
const port = 3000

app.use(express.static('.'))

app.get('/', (req, res) => {
    res.sendFile(process.cwd() + '/index.html')
})

console.log(__dirname);

app.use('/csp', express.static(__dirname + '/csp'))

app.get('/settings', (req, res) => {
    res.sendFile(__dirname + '/csp/edit.html')
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})
