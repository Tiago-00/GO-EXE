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
            let html = "";        
            html+=`<section id="moderador">
            <h1> Perfil</h1><br>
            <p> Nome do moderador:  ${user.use_nome}</P>
            <p> Idade: ${user.use_idade} anos</P>
            <p> Sexo: ${user.use_sexo}</P>
            <p> Morade: ${user.use_morada}</p>
            <a href=/ ><input type=button id=sair2  value=LogOut></a>
                    
            </section>`
        document.getElementById("perfil").innerHTML = html;
                 
        }else{

            let eventos = await $.ajax({
                url: `/api/users/${userId}/event`,
                method: 'get',
                dataType: 'json'
            });

            var show_map = document.getElementById('create');
            show_map.style.visibility = 'visible';
            let html = "";
            
        
            html+=`<section>
            <h1> Perfil</h1><br>
            <p> Nome do utilizador:  ${user.use_nome}</P>
            <p> Idade: ${user.use_idade} anos</P>
            <p>  Sexo: ${user.use_sexo}</P>
            <p>  Morada: ${user.use_morada}</P>
            <p>  Pontos: ${user.use_pontos} fitcoins</P>
            <a href=/ ><input type=button id=sair  value=LogOut></a>
            </section>`
            
           for (let user of eventos) {
            html+=`<section id="eventos">
            <h1> ${user.event_local}</h1><br>
            <p>Tipo de atividade:  ${user.event_nome}</p>
            </section>`

            }

            document.getElementById("perfil").innerHTML = html;
            
          
        }
    }catch (err) {
        console.log(err);
    }

}
