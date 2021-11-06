var pool = require("./connections");
module.exports.getAllDistritos = async function () {
    try {
        let sql = "Select * from Distritos";
        let result = await pool.query(sql);
        let distrito = result.rows;
        return {
            status: 200,
            result: distrito
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}