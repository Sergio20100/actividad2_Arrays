// const Swal = require('sweetalert2')


async function main() {
  let contenedor = document.getElementById("cards")
  contenedor.classList.add("cards-container")
  const btn = document.getElementById('agregar')
  const logout = document.getElementById('logout')
  // CERRAR SESION
  logout.addEventListener('click',(event)=>{
    event.preventDefault()
    localStorage.removeItem('login')
    window.location.replace('login.html')
  })
  let contador = 0

  // fetch('https://dog.ceo/api/breeds/image/random')
  //   .then((res) => {
  //     const response = res.json()
  //     const imageURL = response.message
  //     return response
  //   })
  //   .then(json => {
  //     contenedor.innerHTML += `<img src="${json.message}" alt="perro" width="400px">`
  //   })



  btn.addEventListener("click", (e) => {
    contador++
    const newCard = document.createElement("div")
    newCard.classList.add("card-container")
    newCard.classList.add("card")
    newCard.classList.add("mb-3")
    newCard.classList.add("w-75")
    newCard.classList.add("text-center")
    newCard.id = `card${contador}`
    fetch('https://dog.ceo/api/breeds/image/random')
      .then((res) => {
        const response = res.json()
        const imageURL = response.message
        return response
      }).then(json => {
        // const img = `<img src="${json.message}"  class="card-img-top" alt="perro" width="400px">`
        newCard.innerHTML = `
    
    <div class="row g-0">
        <div class="col-md-4">
            <i
                class="img-fluid rounded-start icon"
                alt="Card title"
                id="close${contador}"
            > 
                <svg xmlns="http://www.w3.org/2000/svg" width="20%" height="20%" fill="currentColor" class="bi bi-x-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14m0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16"/>
                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708"/>
                </svg>
            </i>
        </div>
        <div class="col-md-8">
        <img src="${json.message}"  class="card-img-top" alt="perro" ">
            <div class="card-body">
                <h5 class="card-title">Nueva Card ${contador}</h5>
                
            </div>
        </div>
    </div>

    `
    contenedor.appendChild(newCard)
    const close = document.getElementById("close" + contador)

    close.addEventListener("click", (event) => {
      const card = document.getElementById(`card${contador}`)
      console.log(card)
      contador--
      contenedor.removeChild(card)

    })
      
      })
  })

}
async function validarLogin() {
  return new Promise((resolve, reject) => {
    const loginState = localStorage.getItem('login')
    const state = loginState !== null ? JSON.parse(loginState) : false
    state ? resolve(state) : reject(state)
  })
}


// Comienza el programa y no para hasta que metan un conjunto de numeros separados por coma
validarLogin().then(state => {
  main()
}).catch(state => {
  window.location.replace('login.html')
})


