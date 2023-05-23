const connectToMongo = require('./db')
const express = require('express')
var cors = require('cors')
connectToMongo()

// express.js
const app = express()
const port = 5000
// cors to addNote successfully from browser 
app.use(cors())

app.use(express.json())

// Available routes
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`iNotebook listining at http://localhost:${port}`)
})
