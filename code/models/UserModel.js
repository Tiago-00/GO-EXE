var pool = require("./connections");

module.exports.getAllUsers = async function() {
    try {
        let sql ="Select * from utilizador";
        let result = await pool.query(sql);
        let users = result.rows;
        return { status:200, result:users};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}

module.exports.login = async function(nome,password) {
    try {
        let sql ="Select * from utilizador where use_nome = $1 and use_pass = $2";
        let result = await pool.query(sql,[nome,password]);
        if (result.rows.length > 0)
            return { status:200, result:result.rows[0]};
        else return { status:401, result: {msg: "Nome ou password incorreta"}};
    } catch (err) {
        console.log(err);
        return { status:500, result: err};
    }
}

module.exports.getUserById = async function(id) {
    try {
        let sql = "Select * from utilizador where id_u = $1";
        let result = await pool.query(sql,[id]);
        if (result.rows.length > 0)  
            return {status: 200, result: result.rows[0] };
        else return {status: 404, result: {msg: "Utilizador não encontrado"}};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
} 

module.exports.getUserEventById = async function(id) {
    try {
        let sql = "Select event_nome,event_local,event_lotacao "+
                    "From utilizadorevento "+
                    "inner join eventos on id_e=ue_id_e "+
                    "where ue_id_u = $1 ";
        let result = await pool.query(sql,[id]);
        if (result.rows.length > 0)  
            return {status: 200, result: result.rows };
        else return {status: 404, result: {msg: "Utilizador não encontrado"}};
    } catch(err) {
        console.log(err);
        return {status:500, result: err};
    }
}


