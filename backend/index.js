const  connectToMongo  = require('./db')
const express = require('express')            
connectToMongo()

// express.js
const app = express()
const port = 3000

// Available routes
app.use('/api/auth',require('./routes/auth'))
app.use('/api/notes',require('./routes/notes'))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
app.listen(port, () => {
  console.log(`http://localhost:${port}`)
})