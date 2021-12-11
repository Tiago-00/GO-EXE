var mymap;

var popup = L.popup();
var coordenadas;

var eventId = sessionStorage.getItem("eventx");
var eventIdy = sessionStorage.getItem("eventy");


var redIcon = new L.Icon({
    iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
  });

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
            let html = "";
            html += `<form>
            <h2>Nome do Personal Trainer: <input type="text" id="pt"></h2>
            <h2>Lotação Máxima:<input type="number" id="lotacao" step="1" min="0" max="25"></h2>          
            <h2>Local: <input type="text" id="local"></h2>
           
            <h2>Tipo de Evento: <select id="eventos">
              <option value="1">Caminhada</option>
              <option value="2">Corrida</option>
              <option value="3">Yoga</option>
              <option value="4">Ciclismo</option>
          </select></h2>
            <h2>Nome da atividade: <input type="text" id="atividade"></h2>
            <h2><input type="button" class="adicionar" value="Adicionar" onclick="addEvent()"></h2>
          </form>`
            document.getElementById("criar").innerHTML = html;

            function onMapClick(e) {
                popup
                    .setLatLng(e.latlng)
                    .setContent("As coordenadas do ponto são: " + e.latlng.toString())
                    .openOn(mymap);

                coordenadas = "" + e.latlng.lat + "," + e.latlng.lng; /*guarda*/
                
                 
            }

        } else {
            var show_map = document.getElementById('create');
            show_map.style.visibility = 'visible';
            let html = "";
            html += `<form>
            <img  id="logo_2" src=images/treino.png>
            <h2>Locais de Treino </h2>
            <p>Explora o teu país, ou o local onde estás de momento e fica a saber as tuas possibilidades de exercício que tem para oferecer.</p>  
            
            <img id="logo_2" src=images/Personal.png>
            <h2>Personal Trainers</h2>
            <p>Tens objetivos de fitness ambiciosos? 
            Poderás inscrever-te num evento e ter a possibilidade de treinares com um PT, numa lista de profissionais selecionados pela equipa GO&EXE.</p>

            <img id="logo_2" src=images/Pontos.png>
            <h2>Pontos E Benefícios</h2>
            <p>No GO&EXE, toda a tua atividade vale pontos. Quando és consistente e desafias-te, ganhas pontos que podes trocar na loja GO&EXE.</p>
          </form>`
            document.getElementById("criar").innerHTML = html;       
        }
    } catch (err) {
        console.log(err);
    }

    mymap = L.map('mapa').setView([38.707325418964764, -9.152454160542419], 7);

    L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        markerColor: 'green',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWJ1Z2FsaG8iLCJhIjoiY2phOWdhbWR5MGprdDJ5cDgzenR5MXMxMCJ9.n38CZPOHiDjdbKXw2YuEmA'
    }).addTo(mymap);

    mymap.on('click', onMapClick);

    let events = await $.ajax({
        url: '/api/eventos',
        method: 'get',
        dataType: 'json'
    });

    for (let event of events) {
        var marker = L.marker([event.event_coordenadas.x, event.event_coordenadas.y]).addTo(mymap);
        var container = $('<section />');
        container.html("<h2>" + event.event_local + "</h2>" +
            "Nome da atividade: " + event.event_nome + "<br><br>" +
            "<a href=events.html ><input type='button'  value='Ver nos Eventos'></input></a>");
        marker.bindPopup(container[0]);
}

    if (eventId && eventIdy) {
        const status = document.querySelector('#status');
        function success(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;
            L.Routing.control({
                waypoints: [
                   L.latLng(latitude, longitude),
                    L.latLng(eventId,eventIdy)
                ],
               
              }).addTo(mymap);
              
              newMarker = L.marker([latitude, longitude],{icon: redIcon}).addTo(mymap);
       
        }
        navigator.geolocation.getCurrentPosition(success, error);

        function error() {
            status.textContent = 'Unable to retrieve your location';
        }       
    }
}

async function addEvent() {
    try {
        let events = {

            event_nome: document.getElementById("atividade").value,
            event_tip_id: document.getElementById("eventos").value,
            event_lotacao: document.getElementById("lotacao").value,
            event_local: document.getElementById("local").value,
            event_coordenadas: coordenadas
        }

      
        let result = await $.ajax({
            url: "/api/eventos",
            method: "post",
            dataType: "json",
            data: JSON.stringify(events),
            contentType: "application/json"
        });

        let event_types = await $.ajax({
            url: '/api/tipoeventos',
            method: 'get',
            dataType: 'json'
        });
        
        alert("Evento adicionado")
        window.location = "events.html";
    } catch (err) {
        console.log(err);
    }

}