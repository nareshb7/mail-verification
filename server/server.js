const express = require('express')
const app = express()
const http = require('http')
const cors = require('cors')
const { mailVerification } = require('./auth/mailVerfication')

const corsOptions = {
    origin: '*',
  };
app.use(cors(corsOptions))
app.set('trust proxy', true);
app.use(express.json({ limit: '3mb' }));
app.use(express.urlencoded({ limit: '3mb', extended: false }))
const server = http.createServer(app)
const PORT = process.env.PORT || 4040

// app.use('/', (req,res) => {
//     res.send(`mail-verification is running on ${PORT}`)
// })
app.post('/mailverify',mailVerification)
server.listen(PORT , ()=> {
    console.log('server is running on ', PORT)
})
