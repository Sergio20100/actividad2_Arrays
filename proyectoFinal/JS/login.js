// archivo de login.html

let users = [
    {email:'admin@colombia.com', password:'admin01'}
]

async function cargarUsuarios(){
   return new Promise((resolve,reject)=>{
    const current_users = localStorage.getItem('users')
    const newUsers = current_users!==null ? JSON.parse(current_users) : users   
    resolve(newUsers)
   })
}

 function validarUsuarios(users, data){
    
        return users.some(user=>(user.email === data.email && user.password === data.password)) ? true : false
}

function main(users){
    const form = document.getElementById('formulario')
    const form_registro = document.getElementById('formulario-registro')
    form_registro && (
        form_registro.hidden = true
    )
    const registro = document.getElementById('registro')
    form && (
        // inicio de sesion
        form.addEventListener('submit',(event)=>{
            event.preventDefault()
            const data = {
                email: event.target[0].value,
                password: event.target[1].value
            }
            console.log(data);
            console.log(validarUsuarios(users,data));
        })
    )
    registro && (
        registro.addEventListener('click',(event)=>{
            form.hidden = true
            form_registro.hidden = false
            form_registro.addEventListener('submit',(event)=>{
                event.preventDefault()
                const data = {
                    email: event.target[0].value,
                    password: event.target[1].value
                }
                console.log(data);
                users.push(data)
            })
        })
    )

}
cargarUsuarios().then(usuarios=>{
    main(usuarios)
})