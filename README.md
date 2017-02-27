# Mandrill Connector
[![Build Status](https://travis-ci.org/Reekoh/mandrill-connector.svg)](https://travis-ci.org/Reekoh/mandrill-connector)
![Dependencies](https://img.shields.io/david/Reekoh/mandrill-connector.svg)
![Dependencies](https://img.shields.io/david/dev/Reekoh/mandrill-connector.svg)
![Built With](https://img.shields.io/badge/built%20with-gulp-red.svg)

Mandrill Connector Plugin for the Reekoh IoT Platform. Integrates a Reekoh instance with Mandrill to send emails.

## Description
This plugin sends emails/notifications based on devices' data connected to the Reekoh Instance via Mandrill.

## Configuration
To configure this plugin, a Mandrill account is needed to provide an API Key.

Other Parameters:

1. Default HTML Message - The HTML version of the message to be sent (to be used if the email client supports HTML).
2. Default Text Message - The Text version of the message to be sent (to be used if the email client does not support HTML).
3. Default Sender - The default sender to be used.
4. Default Receiver - The default receiver in which the email will be sent.
5. Default Subject - The default subject to be used.

These parameters are then injected to the plugin from the platform.

## Sample input data
```
{
    sender : 'sender@domain.com',
    receiver : 'receiver@domain.com,receiver2@domain.com',
    messageText : 'This is a test email from Mandrill Connector Plugin.',
    messageHtml : '<h1>This is a test email from Mandrill Connector Plugin.</h1> <a href="http://reekoh.com/">Reekoh Website</a>',
    bcc : 'bcc1@domain.com,bcc2@domain.com',
    cc : 'cc1@domain.com,cc2@domain.com',
    subject : 'Test email'
}
```