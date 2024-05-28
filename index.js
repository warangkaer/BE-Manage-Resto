const http = require('http')
const express = require('express')
const app = express()
const fileUpload = require('express-fileupload')

const bodyParser = require('body-parser')
const cors = require('cors')

require('dotenv').config()

// cors
app.use(cors())
// body parser middleware
app.use(bodyParser.json())
// static files directory
app.use(express.static('public'))
// file upload
app.use(
  fileUpload({
    createParentPath: true,
  })
)

// define all routes
const authRoutes = require('./src_v1/routes/auth.routes')
app.use('/v1', authRoutes);

app.get('/', (req, res) => {
  res.set('Content-Type', 'text/html');
  res.send(
    Buffer.from('<center><h1>REST API For Restaurant Management</center>')
  );
});

// create server
port = process.env.APP_PORT || 3000
const httpServer = http.createServer(app)
httpServer.listen(port, () => console.log(`server berjalan pada port ${port}`))
httpServer.timeout = 10000



