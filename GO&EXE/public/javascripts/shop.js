window.onload = async function () {

    try {
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
    for (let produto of produtos) {
        html += `<section>
            <h1> ${produto.nome}</h1><br>
            Preço: ${produto.preco}
            Quantidade: ${produto.quantidade}
            <br><br> 
            <input type=button id=compra  value="Ver detalhes"></input> 
         </section>`
        

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