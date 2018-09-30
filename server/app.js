const express = require('express');
const app = express();
const path = require('path');
const chalk = require('chalk');


app.use(require('body-parser').json());

app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/api/schools', require('./schools'));
app.use('/api/students', require('./students'));

app.use((err, req, res, next) => {
   /*  console.log(err);
    res.status(err.status || 500).send({ error: err.message }); */
      // just in case
    if (!err.stack || !err.message) next(err);
    // clean up the trace to just relevant info
    const cleanTrace = err.stack
    .split('\n')
    .filter(line => {
        // comment out the next two lines for full (verbose) stack traces
        const projectFile = line.indexOf(__dirname) > -1; // omit built-in Node code
        const nodeModule = line.indexOf('node_modules') > -1; // omit npm modules
        return projectFile && !nodeModule;
    })
    .join('\n');
    // colorize and format the output
    console.log(chalk.magenta('      ' + err.message));
    console.log('    ' + chalk.gray(cleanTrace));
    // send back error status
    res.status(err.status || 500).end();
})

module.exports = app;