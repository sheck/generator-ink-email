# Ink Email Generator

Scaffold and build HTML emails on Zurb Ink templates using Yeoman and Grunt

### Installing
`npm install -g generator-ink-email`

### Commands
 - `grunt` - compiles and inlines email
 - `grunt serve` - previews email in browser (with livereload!)

### Sending test emails
There currently isn't an implementation for sending emails from the command 
line (pull request welcome!). One way to send a test email is to run the full 
build with `grunt build` and then paste contents of compiled/email-inlined.html 
into a service like [Putsmail](https://putsmail.com/)
