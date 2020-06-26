//constructor del seguro
class Seguro{
    constructor(marca, anio, tipo){
        this.marca = marca;
        this.anio = anio;
        this.tipo = tipo;
    }

    cotizarSeguro(informacion){
        /*
            1 = americano 1.15
            2 = asiatico 1.05
            3 = europeo 1.35
        */
       let cantidad;
       const base = 2000;

       switch(informacion.marca){
           case '1' : cantidad = base * 1.15;
                break;
           case '2' : cantidad = base * 1.05;
                break;
           case '3' : cantidad = base * 1.35;
                break;
       }

       //leer anio
       const diferencia = new Date().getFullYear() - this.anio;

       //cada anio de diferencia se reduce 3% el valor del seguro
       cantidad -= (diferencia*3) * cantidad / 100;

       //leer tipo de seguro
       /*
        basico = 30% mas
        completo = 50% mas
       */

       if(this.tipo === 'basico'){
           cantidad *= 1.30;
       }else{
           cantidad *= 1.50;
       }

       return cantidad;

    }
}

//consttructor de interfaz, relacionado con todo lo que se muestra
class Interfaz{
    mostrarError(mensaje, tipo){
        const div = document.createElement('div');

        if(tipo === 'error'){
            div.classList.add('mensaje', 'correcto');
        }else{
            div.classList.add('mensaje', 'error');
        }
        div.innerHTML = `${mensaje}`;

        formulario.insertBefore(div, document.querySelector('.form-group'));
        
        setTimeout(function(){
            document.querySelector('.mensaje').remove();
        }, 3000);
    }

    //imprime resultado de la cotizacion
    mostrarResultado(seguro, total){
        const resultado = document.querySelector('#resultado');
        let marca;

        switch(seguro.marca){
            case '1': marca = 'Americana';
                break;
            case '2': marca = 'Asiatico';
                break;
            case '3': marca = 'Europeo';
                break;    
        }

        console.log(total);

        //crear un div
        const div = document.createElement('div');

        div.innerHTML = `<p class="header">Tu resumen:</p>
                        <p>Marca: ${marca} <br>
                        Año: ${seguro.anio} <br>
                        Tipo: ${seguro.tipo} <br>
                        Total: $ ${total}<p>`;

        const spinner = document.querySelector('#cargando img');
        spinner.style.display = 'block';
        setTimeout(function(){
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 2000)

                        
    }
}

//----------------EVENT LISTENERS
const formulario = document.querySelector('#cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();

    //acceder al valor del opcion del select para leer marca
    const marca = document.querySelector('#marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    //acceder al valor del opcion del select para leer anio
    const anio = document.querySelector('#anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;

    //leer el valor del radioButton
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //crear instancia de interfaz
    const interfaz = new Interfaz();
    
    //revisamos que los campos no esten vacios
    if(marcaSeleccionada === '' || anioSeleccionado ==='' || tipo ===''){
        //error, falta algo
        interfaz.mostrarError('Faltan datos, revisa el formulario e intentalo de nuevo');
    }else{
        //limpiar resultados anteriores
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        //todo esta lleno, correcto
        const seguro = new Seguro(marcaSeleccionada, anioSeleccionado, tipo);
        
        //cotizar seguro
        const cantidad = seguro.cotizarSeguro(seguro);

        //mostrar resultado
        interfaz.mostrarResultado(seguro, cantidad);
    }
});



//-----------GENERAR SELECT CON JAVASCRIPT
const max = new Date().getFullYear(),//obtener año actual
      min = max - 20;

    /* console.log(max);
    console.log(min); */

const selectAnios = document.querySelector('#anio');
for(let i = max; i >= min; i-- ){

    /* let option = document.createElement('option');
    option.value = i;
    option.innerHTML = i;
    selectAnios.appendChild(option); */
    selectAnios.innerHTML += `<option value="${i}">${i}</option>`;
    
}