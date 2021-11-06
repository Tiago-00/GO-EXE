var pg = require('pg');

const connectionString = "postgres://postgres:1234@localhost:5432/go_exe"
const Pool = pg.Pool
const pool = new Pool({
    connectionString,
    max: 10,
    
})

module.exports = pool;