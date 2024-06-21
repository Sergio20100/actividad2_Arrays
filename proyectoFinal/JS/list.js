{/* <option value="1">One</option>
  <option value="2">Two</option>
  <option value="3">Three</option> */}



async function main() {
    let contenedor = document.getElementById("cards")
    contenedor.classList.add("cards-container")
    const selectRaza = document.getElementById('datalistOptions')
    // const razaSelected = document.getElementById('selectRaza')
    const btnConocerRaza = document.getElementById('conocerRaza')
    const logout = document.getElementById('logout')

    // CERRAR SESION
    logout.addEventListener('click', (event) => {
        event.preventDefault()
        localStorage.removeItem('login')
        window.location.replace('login.html')
    })
    let razas = []
    fetch('https://dog.ceo/api/breeds/list/all')
        .then((res) => {
            const response = res.json()
            return response
        })
        .then(json => {
            console.log(json.message);
            console.log(Object.entries(json.message))
            razas = Object.entries(json.message)

            razas.map(raza => {
                const name = raza[0]
                // selectRaza.innerHTML += `<option value="${name}">`
                selectRaza.innerHTML += `<option value="${name}">${name}</option>`
            })
        })

    // selectRaza.innerHTML += `<option value="2">Two</option>`
    let nameRaza = null
    selectRaza.addEventListener('change', (event) => {
        console.log(event.target.value)
        nameRaza = event.target.value
        // SE LIMPIAN LAS CARDS
            contenedor.innerHTML = ''
    })

    btnConocerRaza.addEventListener("click", () => {
        let contador = 0
        
        console.log("Conocer Raza")
        nameRaza === null && (nameRaza = razas[0][0])
        console.log(nameRaza)
        fetch(`https://dog.ceo/api/breed/${nameRaza}/images/random/6`).then(response => {
            const data = response.json()
            return data
        }).then(json => {
            console.log(json.message)
            json.message.map(imagenSrc => {
                contador++
                const newCard = document.createElement("div")
                newCard.classList.add("card-container")
                newCard.classList.add("card")
                newCard.classList.add("mb-3")
                newCard.classList.add("w-75")
                newCard.classList.add("text-center")
                newCard.id = `card${contador}`

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
                                    <img src="${imagenSrc}"  class="card-img-top" alt="perro" ">
                                        <div class="card-body">
                                            <h5 class="card-title">${nameRaza} ${contador}</h5>
                                            
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


