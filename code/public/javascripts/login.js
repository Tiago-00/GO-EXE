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


async function login() {
    try {
        let obj = {
            nome: document.getElementById("nome").value,
            password: document.getElementById("password").value
        }
        let user = await $.ajax({
            url: '/api/users/login',
            method: 'post',
            dataType: 'json',
            data: JSON.stringify(obj),
            contentType: 'application/json'
        });
        sessionStorage.setItem("userId",user.id_u);
        window.location = "home.html";


    } catch (err) {
        document.getElementById("msg").innerText = err.responseJSON.msg;
    }
}