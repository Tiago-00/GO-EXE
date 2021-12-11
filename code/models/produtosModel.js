var pool = require("./connections");

module.exports.getAllProdutos = async function () {
    try {
        let sql = "Select id_p,prod_nome as nome, prod_preco as preco, prod_descricao as descricao, prod_quantidade as quantidade " +
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

module.exports.UpdateUserProduct = async function (id_u,id_p) {
    
   let verificar = true;
    try{
        
        let sql2= "Select use_pontos "+
        "from utilizador "+
        "where id_u =$1 ";
        let result1 = await pool.query(sql2, [id_u]);
        let utilizador = result1.rows[0].use_pontos;
        

        let sql3= "Select prod_preco "+
        "from produtos "+
        "where id_p = $1";
        let result2 = await pool.query(sql3, [id_p]);
        let product1 = result2.rows[0].prod_preco;
        

        if (utilizador < product1) {
        
            verificar = false;
            return {
                status: 400,
                result: {err:"erro"}
            };
        }
        if(verificar){
            
        let sql = "update utilizador "+
        "set use_pontos = use_pontos - prod_preco "+
        "from produtos,utilizadorproduto "+
        "where  id_u= $1 and id_p = $2";
        let result = await pool.query(sql, [id_u,id_p]);
        let products = result.rows; 
        
        let sql4 = "Insert into Utilizadorproduto(up_id_u,up_id_p) values($1,$2)";
        let result5 = await pool.query(sql4, [id_u,id_p]);
        let products1 = result5.rows;
        return {
            status: 200,
            result: products1
        };
    }       
    } catch (err) {
        console.log(err);
        console.log("ERRO ATUALIZAR");
        return {
            status: 500,
            result: err
        };
    
    }
    
}
