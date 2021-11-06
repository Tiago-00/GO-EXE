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