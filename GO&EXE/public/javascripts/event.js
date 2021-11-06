window.onload = async function(){

    try {
        let eventos = await $.ajax({
            url: '/api/eventos',
            method: 'get',
            dataType: 'json'
        });
        createEventsHTML(eventos);
        let events = await $.ajax({
            url: '/api/tipoeventos',
            method: 'get',
            dataType: 'json'
    });
        let html = "<option value=''> </option>";
        for(let evento of events) {
            html+=`<option  value='${evento.id_te}'>
                        ${evento.tip_evento}
                    </option>`
    }
    document.getElementById("type").innerHTML = html;
    }catch (err) {
        console.log(err);
}
}  

function createEventsHTML(eventos) {
    let html = "";
        for (let evento of eventos) {
            html+=`<section>
            <h1> ${evento.evento}</h1><br>
            </section>`
        }
        document.getElementById("eventos").innerHTML = html;

}

async function filter() {
    try {
        let eventId = document.getElementById("type").value;
        let event = await $.ajax({
            url: `/api/eventos/filter/?eventId=${eventId}`,
            method: 'get',
            dataType: 'json'
        });
        createEventsHTML(event);
    } catch (err) {
        console.log(err);
    }  


}