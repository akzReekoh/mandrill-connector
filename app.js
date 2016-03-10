'use strict';

var platform = require('./platform'),
    isEmpty = require('lodash.isempty'),
    isPlainObject = require('lodash.isplainobject'),
    isArray = require('lodash.isarray'),
    async = require('async'),
    config,
    mandrillClient;

let sendData = (data) => {
    if(isEmpty(data.sender))
        data.sender = config.default_sender;

    if(isEmpty(data.receiver))
        data.receiver = config.default_receiver;

    if(isEmpty(data.message_html))
        data.message = config.default_html_message;

    if(isEmpty(data.message_text))
        data.message = config.default_text_message;

    if(isEmpty(data.subject))
        data.subject = config.default_subject;

    mandrillClient.sendMail({
        from: data.sender,
        to: data.receiver,
        subject: data.subject,
        html: data.message_html,
        text: data.message_text,
        cc: data.cc,
        bcc: data.bcc
    }, function(error, info) {
        if(error) {
            console.error(error);
            platform.handleException(error);
        }else{
            platform.log(JSON.stringify({
                title: 'Mandrill Email sent.',
                data: data
            }));
        }
    });
};

platform.on('data', function (data) {
    if(isPlainObject(data)){
        sendData(data);
    }
    else if(isArray(data)){
        async.each(data, (datum) => {
            sendData(datum);
        });
    }
    else
        platform.handleException(new Error('Invalid data received. Must be a valid Array/JSON Object. Data ' + data));
});

platform.once('close', function () {
    platform.notifyClose();
});

platform.once('ready', function (options) {

    config = options;

    var nodemailer = require('nodemailer');
    var mandrillTransport = require('nodemailer-mandrill-transport');

    mandrillClient = nodemailer.createTransport(mandrillTransport({
        auth: {
            apiKey: options.api_key
        }
    }));

    platform.notifyReady();
    platform.log('Connector has been initialized.');
});