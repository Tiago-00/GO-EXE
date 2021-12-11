var pool = require("./connections");

module.exports.getAllEventos = async function () {
    try {
        let sql = "Select * " +
            "From Eventos ";
        let result = await pool.query(sql);
        let events = result.rows;
        return {
            status: 200,
            result: events
        }

    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.getEventosFilteredBy = async function (eventId) {
    try {
        let sql;
        let params;
        if (!eventId) {
            sql = "Select * " +
                "From Eventos ";
            params = [];
        } else if (eventId) {
            sql = "Select * " +
                "From Eventos " +
                "where event_tip_id = $1";
            params = [eventId];
        }
        let result = await pool.query(sql, params);
        let products = result.rows;
        return {
            status: 200,
            result: products
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }

}

module.exports.SaveEvent = async function (event) {


    try {
        let sql = "Insert into eventos(event_nome,event_coordenadas,event_local,event_lotacao,event_tip_id) values($1,$2,$3,$4,$5)";
        let result = await pool.query(sql, [event.event_nome, event.event_coordenadas, event.event_local, event.event_lotacao, event.event_tip_id]);
        let events = result.rows;
        return {
            status: 200,
            result: events
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.AddUserEvent = async function (adduserevent) {


    try {
        let usercount = await this.getCountUsers(adduserevent.ue_id_e);

        if (usercount.result.contagem >= usercount.result.lotacaoMax) {
            return {
                status: 500,
                result: "O evento já está cheio!"
            };
        }

        let sql1 = "Select * from utilizadorevento where ue_id_u=$1 and  ue_id_e =$2";
        let result1 = await pool.query(sql1, [adduserevent.ue_id_u, adduserevent.ue_id_e]);

        if (result1.rows.length > 0) {
            return {
                status: 500,
                result: "O utilizador já foi inscrito"
            };
        }

        let sql = "Insert into utilizadorevento (ue_id_u, ue_id_e) values($1, $2)";
        let result = await pool.query(sql, [adduserevent.ue_id_u, adduserevent.ue_id_e]);
        let events = result.rows;
        return {
            status: 200,
            result: events
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.getEventById = async function (id) {
    try {
        let sql = "Select * " +
            "From Eventos  where id_e = $1";
        let result = await pool.query(sql, [id]);
        let events = result.rows[0];
        return {
            status: 200,
            result: events
        }

    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}

module.exports.getCountUsers = async function (id_e) {

    try {
        let sql = "select count(*) from utilizadorevento " +
            "inner join eventos on ue_id_e = id_e " +
            "where ue_id_e = $1";
        let result = await pool.query(sql, [id_e]);
        let count_1 = result.rows[0];

        let sql1 = "Select event_lotacao from eventos " +
            "where id_e = $1";
        let result1 = await pool.query(sql1, [id_e]);
        let lotacao = result1.rows[0];

        return {
            status: 200,
            result: {
                contagem: count_1.count,
                lotacaoMax: lotacao.event_lotacao
            }
        }
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}