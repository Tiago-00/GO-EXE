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
    console.log(event);
    
     try {
         let sql = "Insert into eventos(event_nome,event_coordenadas,event_local,event_lotacao,event_tip_id) values($1,$2,$3,$4,$5)";
         let result = await pool.query(sql, [event.event_nome,event.event_coordenadas,event.event_local,event.event_lotacao,event.event_tip_id]);
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