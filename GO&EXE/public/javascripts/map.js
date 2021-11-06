var mymap;

var cities = L.layerGroup();

L.marker([38.73923, -9.21054]).bindPopup('Pista do bairro do Zambujal').addTo(cities),
    L.marker([37.09713, -8.66981]).bindPopup('Campo Militar').addTo(cities),
    L.marker([38.71242, -9.22483]).bindPopup('Parque Urbano de Miraflores').addTo(cities);


window.onload = async function () {
    mymap = L.map('mapa').setView([38.707325418964764, -9.152454160542419], 7);


    L.tileLayer('https://api.mapbox.com/styles/v1/%7Bid%7D/tiles/%7Bz%7D/%7Bx%7D/%7By%7D?access_token=%7BaccessToken%7D', {
        attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/%22%3EMapbox</a>',
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        tileSize: 512,
        zoomOffset: -1,
        accessToken: 'pk.eyJ1IjoibWJ1Z2FsaG8iLCJhIjoiY2phOWdhbWR5MGprdDJ5cDgzenR5MXMxMCJ9.n38CZPOHiDjdbKXw2YuEmA'
    }).addTo(mymap);

    cities.addTo(mymap);


}