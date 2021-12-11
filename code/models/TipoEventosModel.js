var pool = require("./connections");
module.exports.getAllTypeEventos = async function() {
    try {
        let sql ="Select * from TipoEventos";
        let result = await pool.query(sql);
        let events = result.rows;
        return { status:200, result:events};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}
