window.onload = async function() {
    try {
        let userId = sessionStorage.getItem("userId");
        let user = await $.ajax({
            url: `/api/users/${userId}`,
            method: "get",
            dataType: "json"
        });
      
        if(user.use_admin) {
            var create_event = document.getElementById('create');
            
            create_event.style.visibility = 'visible';
        }else{
            var show_map = document.getElementById('create');
           
            show_map.style.visibility = 'visible';
        }
    }catch (err) {
        console.log(err);
    }

    try {
        let eventos = await $.ajax({
            url: '/api/eventos',
            method: 'get',
            dataType: 'json'
        });
        createEventsHTML(eventos);
        let product_types = await $.ajax({
            url: '/api/tipoeventos',
            method: 'get',
            dataType: 'json'
    });
        let html = "<option value=''> </option>";
        for(let product_type of product_types) {
            html+=`<option  value='${product_type.id_te}'>
                        ${product_type.tip_evento}
                    </option>`
    }
    document.getElementById("type").innerHTML = html;
    }catch (err) {
        console.log(err);
}
}  


function createEventsHTML(eventos) {
    let html = "";
        for (let produto of eventos) {
            html+=`<section>
            <h1> ${produto.event_nome}</h1><br>
                Local: ${produto.event_local}<br>
                Lotação: ${produto.event_lotacao}<br>

            <br>
            <input type=button id=evento  value="Ver detalhes">
            
            </section>`
           
        }
        document.getElementById("eventos").innerHTML = html;

}

async function filter() {
    try {
        let eventId = document.getElementById("type").value;
        let products = await $.ajax({
            url: `/api/eventos/filter/?eventId=${eventId}`,
            method: 'get',
            dataType: 'json'
        });
        createEventsHTML(products);
    } catch (err) {
        console.log(err);
    }  


}
