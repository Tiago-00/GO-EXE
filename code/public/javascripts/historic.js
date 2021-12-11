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
            let html = "";
           
            let produtos = await $.ajax({
                url: `/api/users/${userId}/product`,
                method: 'get',
                dataType: 'json'
            });
        
            for (let user of produtos) {
                html+=`<section id="eventos">
                <h2> ${user.prod_nome}</h2>
                <p> Descrição:  ${user.prod_descricao}</P><br>
                <p> Gastou : ${user.prod_preco} pontos </p><br>
                <p> Total: ${user.use_pontos} pontos</p>
                </section>`
                
            }

            document.getElementById("historico").innerHTML = html;          
          
        }
    }catch (err) {
        console.log(err);
    }

}
