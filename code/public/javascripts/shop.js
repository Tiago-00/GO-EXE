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
            var create = document.getElementById('create_1');
            create_event.style.visibility = 'visible';
            create.style.visibility = 'visible';
        } else {
            var show_map = document.getElementById('create');
            show_map.style.visibility = 'visible';

        }
        let produtos = await $.ajax({
            url: '/api/produtos',
            method: 'get',
            dataType: 'json'
        });
        createProductsHTML(produtos);
        let product_types = await $.ajax({
            url: '/api/tipoprodutos',
            method: 'get',
            dataType: 'json'
        });
        let html = "<option value=''> </option>";
        for (let product_type of product_types) {
            html += `<option  value='${product_type.id_tp}'>
                        ${product_type.tip_produtos}
                    </option>`
        }
        document.getElementById("type").innerHTML = html;
    } catch (err) {
        console.log(err);
    }

}

function createProductsHTML(produtos) {
    
    let html = "";
    let index = 0;
    let array = ["garrafa", "bolsa", "t-shirt", "calcao_pret1", "camisola", "tenis"];
    let userAdmin = sessionStorage.getItem("userAdmin");
    for (let produto of produtos) {
        html += `<section class=flip-card>
                    <section class="flip-card-inner">
                        <section class="flip-card-front">
                            <h1> ${produto.nome}</h1><br>
                            <img class="image" src="images/${array[index]}.png">
                           
                        </section>
                <section class="flip-card-back">
                    <h1> ${produto.nome}</h1><br>
                    <h2>Preço:  ${produto.preco}</h2>
                    <h2>Quantidade:${produto.quantidade}</h2><br>`
        if (!JSON.parse(userAdmin)) {
            html += ` <input type=button id="comprar" onclick=AddProductuser(${produto.id_p}) value=Comprar>`
        }
        html += `</section>
            </section>      
    </section>`
        index++;
        if (index == array.length) {
            index = 0;
        }
    }
    document.getElementById("cart").innerHTML = html;
}

async function filter() {
    try {
        let productId = document.getElementById("type").value;
        let products = await $.ajax({
            url: `/api/produtos/filter/?productId=${productId}`,
            method: 'get',
            dataType: 'json'
        });
        createProductsHTML(products);
    } catch (err) {
        console.log(err);
    }

}

async function AddProductuser(id_p) {
    let id_u = sessionStorage.getItem("userId");

    try {
        let adduserproduct = {
            up_id_u: sessionStorage.getItem("userId"),
            up_id_p: id_p
        };

        let result_1 = await $.ajax({
            url: `/api/produtos/updateuserproduct/` + id_u + `/${id_p}`,
            method: "post",
            dataType: "json",
            data: JSON.stringify(adduserproduct),
            contentType: "application/json"
        });

        alert("O produto foi comprado com sucesso!")
        window.location = "cart.html";
    } catch (err) {
        console.log(err);
        alert("Não tem pontos suficientes!")

    }
}