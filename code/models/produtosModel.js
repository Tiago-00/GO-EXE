var pool = require("./connections");

module.exports.getAllProdutos = async function () {
    try {
        let sql = "Select prod_nome as nome, prod_preco as preco, prod_descricao as descricao, prod_quantidade as quantidade " +
            "From Produtos " +
            "order by prod_preco asc";
        let result = await pool.query(sql);
        let products = result.rows;
        return {
            status: 200,
            result: products
        }

    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}
module.exports.getProductsFilteredBy = async function (productId) {
    try {
        let sql;
        let params;
        if (!productId) {
            sql = "Select prod_nome as nome, prod_preco as preco, prod_descricao as descricao, prod_quantidade as quantidade " +
                "From Produtos " +
                "order by prod_preco asc";
            params = [];
        } else if (productId) {
            sql = "Select  prod_nome as nome, prod_preco as preco, prod_descricao as descricao, prod_quantidade as quantidade " +
                "From Produtos " +
                "where Prod_Tipo_Id = $1 " +
                "order by prod_preco asc";
            params = [productId];
        }
        let result = await pool.query(sql, params);
        let products = result.rows;
        return {
            status: 200,
            result: products
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }

}

module.exports.SaveProduct = async function (prod) {
   console.log(prod);
   
    try {
        let sql = "Insert into produtos(prod_nome,prod_preco,prod_descricao,prod_quantidade,prod_tipo_id) values($1,$2,$3,$4,$5)";
        let result = await pool.query(sql, [prod.prod_nome, prod.prod_preco, prod.prod_descricao, prod.prod_quantidade, prod.prod_tipo_id]);
        let events = result.rows;
        return {
            status: 200,
            result: events
        };
    } catch (err) {
        console.log(err);
        return {
            status: 500,
            result: err
        };
    }
}