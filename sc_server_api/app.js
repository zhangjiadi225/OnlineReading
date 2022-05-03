var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var child_process = require('child_process')
var indexRouter = require('./routes/index')
var usersRouter = require('./routes/users')

var app = express()
// 改写, 从bin目录下剪切代码过来 , 然后就可以删除bin目录了
var http = require('http')
var server = http.createServer(app)
var cors = require('cors')
app.use(cors())

var bodyParser = require('body-parser')
const { log } = require('console')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/', indexRouter)
app.use('/users', usersRouter)
app.post('/change', function (req, res) {
  console.log('开始爬取');
  var workProcess = child_process.exec(
    `python novel_first.py`,
    function (error, stdout, stderr) {
      if (error) {
        console.info("stderr:" + stderr)
      }
      console.log("exec:" + stdout)
    }
  )
  workProcess.on('exit', function (code) {
    console.log(code.toString(),'3333');
  })
})

server.listen(5000, () => {
  console.log('服务器启动成功！')
  console.log('可以使用http:127.0.0.1:5000进行访问了')
})
