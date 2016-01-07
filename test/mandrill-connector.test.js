'use strict';

const API_KEY = '_VdVE3l0ZHoZx7F4JQa-ew',
    DEFAULT_SENDER = 'adinglasan@reekoh.com',
    DEFAULT_RECEIVER = 'akzdinglasan@gmail.com',
    DEFAULT_HTML_MESSAGE = '<h1>This is a default message from Mandrill Connector Plugin.</h1>',
    DEFAULT_TEXT_MESSAGE = 'This is a default message from Mandrill Connector Plugin.',
    DEFAULT_SUBJECT = 'test';

var cp     = require('child_process'),
    assert = require('assert'),
    connector;

describe('Connector', function () {
    this.slow(5000);

    after('terminate child process', function () {
        setTimeout(function(){
            connector.kill('SIGKILL');
        }, 5000);
    });

    describe('#spawn', function () {
        it('should spawn a child process', function () {
            assert.ok(connector = cp.fork(process.cwd()), 'Child process not spawned.');
        });
    });

    describe('#handShake', function () {
        it('should notify the parent process when ready within 5 seconds', function (done) {
            this.timeout(5000);

            connector.on('message', function (message) {
                if (message.type === 'ready')
                    done();
            });

            connector.send({
                type: 'ready',
                data: {
                    options: {
                        api_key: API_KEY,
                        default_sender: DEFAULT_SENDER,
                        default_receiver: DEFAULT_RECEIVER,
                        default_html_message: DEFAULT_HTML_MESSAGE,
                        default_test_message: DEFAULT_TEXT_MESSAGE,
                        default_subject: DEFAULT_SUBJECT
                    }
                }
            }, function (error) {
                assert.ifError(error);
            });
        });
    });

    describe('#data', function (done) {
        it('should process the data', function () {
            connector.send({
                type: 'data',
                data: {
                    sender: 'adinglasan@reekoh.com',
                    receiver: 'akzdinglasan@gmail.com',
                    message_html: '<h1>This is test message from Mandrill Connector Plugin.</h1>',
                    message_text: 'This is test message from Mandrill Connector Plugin.',
                    subject: 'Test',
                    cc: '',
                    bcc: ''
                }
            }, done);
        });
    });
});