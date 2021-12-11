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
            var show_map = document.getElementById('show_map');
           
            show_map.style.visibility = 'visible';
        }
    }catch (err) {
        console.log(err);
    }

}

async function addProduct() {
    try {
        let products = {
            
            prod_nome: document.getElementById("produto").value,
            prod_preco: document.getElementById("preco").value,
            prod_descricao: document.getElementById("Descricao").value,
            prod_quantidade: document.getElementById("quantidade").value,
            prod_tipo_id: document.getElementById("categorias").value

        }

        console.log(JSON.stringify(products));
        let result = await $.ajax({
            url: "/api/produtos",
            method: "post",
            dataType: "json",
            data: JSON.stringify(products),
            contentType: "application/json"
        });
        alert("Produto adicionado")
        window.location = "shop.html";
    } catch (err) {
        console.log(err);
    }
}