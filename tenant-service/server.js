const express = require('express')
const path = require('path')
const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(express.static(path.join(__dirname, './build/web')))

// app.get('/brand1', (req, res) => {
//   res.send('Hello World!')
// })

// app.get('/brand2', (req, res) => {
//     res.send('Hello World!')
//   })

app.listen(port, () => {
  console.log(`Running tenant theme server at http://localhost:${port}`)
})