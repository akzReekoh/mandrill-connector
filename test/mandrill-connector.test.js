'use strict'

const amqp = require('amqplib')

const API_KEY = '_VdVE3l0ZHoZx7F4JQa-ew'
const DEFAULT_SENDER = 'adinglasan@reekoh.com'
const DEFAULT_RECEIVER = 'akzdinglasan@gmail.com'
const DEFAULT_HTML_MESSAGE = '<h1>This is a default message from Mandrill Connector Plugin.</h1>'
const DEFAULT_TEXT_MESSAGE = 'This is a default message from Mandrill Connector Plugin.'
const DEFAULT_SUBJECT = 'test'

let _channel = null
let _conn = null
let app = null

describe('Mandrill Connector Test', () => {
  before('init', () => {
    process.env.ACCOUNT = 'adinglasan'
    process.env.CONFIG = JSON.stringify({
      apiKey: API_KEY,
      defaultSender: DEFAULT_SENDER,
      defaultReceiver: DEFAULT_RECEIVER,
      defaultHtmlMessage: DEFAULT_HTML_MESSAGE,
      defaultTestMessage: DEFAULT_TEXT_MESSAGE,
      defaultSubject: DEFAULT_SUBJECT
    })
    process.env.INPUT_PIPE = 'ip.mandrill'
    process.env.LOGGERS = 'logger1, logger2'
    process.env.EXCEPTION_LOGGERS = 'ex.logger1, ex.logger2'
    process.env.BROKER = 'amqp://guest:guest@127.0.0.1/'

    amqp.connect(process.env.BROKER)
      .then((conn) => {
        _conn = conn
        return conn.createChannel()
      }).then((channel) => {
      _channel = channel
    }).catch((err) => {
      console.log(err)
    })
  })

  after('close connection', function (done) {
    _conn.close()
    done()
  })

  describe('#start', function () {
    it('should start the app', function (done) {
      this.timeout(10000)
      app = require('../app')
      app.once('init', done)
    })
  })

  describe('#data', () => {
    it('should send data to third party client', function (done) {
      this.timeout(15000)

      let data = {
        sender: 'adinglasan@reekoh.com',
        receiver: 'akzdinglasan@gmail.com',
        messageHtml: '<h1>This is test message from Mandrill Connector Plugin.</h1>',
        messageText: 'This is test message from Mandrill Connector Plugin.',
        subject: 'Test',
        cc: '',
        bcc: ''
      }

      _channel.sendToQueue('ip.mandrill', new Buffer(JSON.stringify(data)))
      setTimeout(done, 10000)
    })
  })
})
