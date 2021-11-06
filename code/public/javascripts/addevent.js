async function addEvent() {
    try {
        let events = {


            event_nome: document.getElementById("atividade").value,
            event_tip_id: document.getElementById("eventos").value,
            event_dist_id: document.getElementById("local").value


        }

        console.log(JSON.stringify(events));
        let result = await $.ajax({
            url: "/api/eventos",
            method: "post",
            dataType: "json",
            data: JSON.stringify(events),
            contentType: "application/json"
        });
        alert("Evento adicionado")
        window.location = "events.html";
    } catch (err) {
        console.log(err);
    }
}
