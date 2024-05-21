
function main() {
    
    let resultado = false
    let numeros = []
    do {
        alert("Hola este es un validador de numeros")
        const data = prompt("Digita Un conjunto de Numeros seguidos del caracter 'coma' - ','")
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

        mapeo.some((value) => isNaN(value)) ? alert("Digite DATOS VALIDOS") : alert("CONJUNTO DE NUMEROS VALIDOS")
        resultado = mapeo.some((value) => isNaN(value))
        if(!resultado){
            numeros = mapeo
        }
    } while (resultado);

    return numeros
    
}


// Comienza el programa y no para hasta que metan un conjunto de numeros separados por coma
let numeros = []
numeros = main()
console.log("Numeros son: ")
console.log(numeros);

if(numeros.length > 0 ){
    const conjunto = document.getElementById("numeros")

    numeros.forEach((num,i)=>{
        conjunto.innerHTML += ` <li class="list-group-item" >Numero ${num}</li>` 
         
    })
}

