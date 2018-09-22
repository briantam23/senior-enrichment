const db = require('./db');
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
const path = require('path');

app.use(require('body-parser').json());

app.use('/public', express.static(path.join(__dirname, '../public')));

app.get('/', (req, res) => res.sendFile(path.join(__dirname, '../public/index.html')));

app.use('/api/schools', require('./schools'));
app.use('/api/students', require('./students'));

app.listen(PORT, () => console.log(`

        Listening on PORT ${PORT}! 
        http://localhost:${PORT}`

    )
)

db.syncAndSeed();