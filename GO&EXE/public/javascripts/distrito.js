window.onload = async function(){

    try {
        let eventos = await $.ajax({
            url: '/api/eventos',
            method: 'get',
            dataType: 'json'
        });
        createDistritoHTML(eventos);
        let events = await $.ajax({
            url: '/api/distritos',
            method: 'get',
            dataType: 'json'
    });
        let html = "<option value=''> </option>";
        for(let event of events) {
            html+=`<option  value='${event.id_dis}'>
                        ${event.distrit_nome}
                    </option>`
    }
    document.getElementById("type1").innerHTML = html;
    }catch (err) {
        console.log(err);
}
}  

function createDistritoHTML(eventos) {
    let html = "";
        for (let evento of eventos) {
            html+=`<section>
            <h1> ${evento.evento}</h1><br>
            </section>`
        }
        document.getElementById("eventos").innerHTML = html;

}

async function filter1() {
    try {
        let distritoId = document.getElementById("type1").value;
        let distrit = await $.ajax({
            url: `/api/distritos/filter/?distritoId=${distritoId}`,
            method: 'get',
            dataType: 'json'
        });
        createDistritoHTML(distrit);
    } catch (err) {
        console.log(err);
    }  


}