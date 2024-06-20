// const Swal = require('sweetalert2')


async function main() {
    
    
    let resultado = false
    let numeros = []
    do {
        // alert("Hola este es un validador de numeros")
      await  Swal.fire({
            title: "Hola este es un validador de numeros",
            // text: "That thing is still around?",
            icon: "info"
          });
        // const data = prompt("Digita Un conjunto de Numeros seguidos del caracter 'coma' - ','")
        const { value: text } = await Swal.fire({
            input: "textarea",
            inputLabel: "Digita Un conjunto de Numeros seguidos del caracter 'coma' - ','",
            inputPlaceholder: "escribe aqui los numeros...",
            inputAttributes: {
              "aria-label": "escribe aqui los numeros"
            },
            showCancelButton: false
          });
          let data;
          if (text) {
            // Swal.fire(text);
            data = text
          }else{
            data = null
          }
        
        // const data = mensaje("Digita Un conjunto de Numeros seguidos del caracter 'coma' - ','")
        if (data != null) { console.log(data.split(',')) }
        else {
            return true
        }



        const mapeo = data.split(',').map((element) => {

            // console.log("elemento "+element+" es de tipo de dato -> "+typeof(element))
            try {
                return Number(element)
            } catch (error) {
                console.log(error)
            }

        })

        console.table(mapeo);
        console.log(mapeo.some((value) => isNaN(value)))

        mapeo.some((value) => isNaN(value)) ? await Swal.fire({
            title: "CONJUNTO DE NUMEROS INVALIDO",
            text: "Digite los numeros separados por coma",
            icon: "error"
          }) : await Swal.fire({
            title: "CONJUNTO DE NUMEROS VALIDO",
            text: "Se mostraran a continuacion...",
            icon: "success"
          })
        resultado = mapeo.some((value) => isNaN(value))
        if(!resultado){
            numeros = mapeo
        }
    } while (resultado);

    console.log("Numeros son: ")
    console.log(numeros);

    if(numeros.length > 0 ){
    const conjunto = document.getElementById("numeros")

    numeros.forEach((num,i)=>{
        conjunto.innerHTML += ` <li class="list-group-item" >Numero ${num}</li>` 
         
    })
}
    
}

// Comienza el programa y no para hasta que metan un conjunto de numeros separados por coma
main()


