const PORT = process.env.PORT || 8080;
const db = require('./db');

require('./app').listen(PORT, () => console.log(`

        Listening on PORT ${PORT}! 
        http://localhost:${PORT}
    
    `)
)

db.syncAndSeed();

