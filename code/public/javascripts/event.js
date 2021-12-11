var eventId;
var evento;


window.onload = async function () {
    try {
        let userId = sessionStorage.getItem("userId");
        let user = await $.ajax({
            url: `/api/users/${userId}`,
            method: "get",
            dataType: "json"
        });

        if (user.use_admin) {
            var create_event = document.getElementById('create');
            create_event.style.visibility = 'visible';


        } else {
            var show_map = document.getElementById('create');
            show_map.style.visibility = 'visible';
        }

        let eventos = await $.ajax({
            url: '/api/eventos',
            method: 'get',
            dataType: 'json'
        });
        createEventsHTML(eventos);
        let event_types = await $.ajax({
            url: '/api/tipoeventos',
            method: 'get',
            dataType: 'json'
        });
        let html = "<option value=''> </option>";
        for (let event_type of event_types) {
            html += `<option  value='${event_type.id_te}'>
                        ${event_type.tip_evento}
                    </option>`
        }
        document.getElementById("type").innerHTML = html;
    } catch (err) {
        console.log(err);
    }
}

async function createEventsHTML(eventos) {
    let html = "";
    let userAdmin = sessionStorage.getItem("userAdmin");
    let index =0;
    let array =["parq","bairrozambujal","camping","santiago","serra","urbano"];
    for ( evento of eventos) {
        let count = await $.ajax({
            url: `/api/eventos/${evento.id_e}/count`,
            method: 'get',
            dataType: 'json'
        });
        
        html += `<section class=flip-card>
                    <section class="flip-card-inner">
                        <section class="flip-card-front">
                            <h1> ${evento.event_local}</h1><br>
                            <img class="image" src="images/${array[index]}.png">
                          
                        </section>
                <section class="flip-card-back">
                    <h1> ${evento.event_local}</h1><br>
                    <h2>Atividade:${evento.event_nome}</h2>
                    <h2>Lotação: ${count.contagem} / ${evento.event_lotacao}</h2><br>
                    <input type=button id=percurso onclick=verPercurso(${evento.id_e}) value="Ver Percurso">`
        if (!JSON.parse(userAdmin)) {
            html += ` <input type=button id=inscrever onclick=AddUserEvent(${evento.id_e}) value=Inscrever>`
        }
        html += `</section>
        </section>       
     </section>`
        index ++;
        if(index == array.length){
            index = 0;
        }
    }
    document.getElementById("eventos").innerHTML = html;
}

async function filter() {
    try {
        let eventId = document.getElementById("type").value;
        let events = await $.ajax({
            url: `/api/eventos/filter/?eventId=${eventId}`,
            method: 'get',
            dataType: 'json'
        });
        createEventsHTML(events);
    } catch (err) {
        console.log(err);
    }
}


async function AddUserEvent(id_e) {
    try {
        let adduser = {
            ue_id_u: sessionStorage.getItem("userId"),
            ue_id_e: id_e,
        }

        let result = await $.ajax({
            url: "/api/eventos/adduserevent",
            method: "post",
            dataType: "json",
            data: JSON.stringify(adduser),
            contentType: "application/json"
        });

        alert("Foi adicionado ao evento")
        window.location = "perfil.html";
    } catch (err) {
        console.log(err);
        alert(err.responseText);
    }
}

async function verPercurso(id_e) {

    try {

        let event = await $.ajax({
            url: `/api/eventos/${id_e}`,
            method: "get",
            dataType: "json"
        });

        sessionStorage.setItem("eventx", event.event_coordenadas.x);
        sessionStorage.setItem("eventy", event.event_coordenadas.y);
        console.log(event);
        window.location = "location.html";
    } catch (err) {
        console.log(err);

    }
}
