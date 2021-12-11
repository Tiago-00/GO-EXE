var pool = require("./connections");
module.exports.getAllTypeProducts = async function() {
    try {
        let sql ="Select * from TipoProdutos";
        let result = await pool.query(sql);
        let courses = result.rows;
        return { status:200, result:courses};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}

