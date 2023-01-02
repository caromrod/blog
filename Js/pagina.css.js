/**
* funcion para que aparezca el form 
*
*/
function Opem(id) {
    document.getElementById(id).classList.toggle('visto')
}

/**
 * Funcion que visualiza la fecha , la hora y los minutos de cada comentario.
 */
function VerFechayHora() {
    let dia = new Date();
    let fecha = dia.toLocaleDateString();// 20/06/2022
    let hora = dia.getHours();
    let minutos = dia.getMinutes();

    return ` Dia:${fecha}, hora: ${hora}:${minutos}`;
}

//El form y los comenarios
/**
 * Clases que guarda los datos del input
 */
class Comentador {
    Nombre;
    Apellido;
    Comentario;

    Numero;

    constructor(_nombre, _apellido, _comentario) {
        this.Nombre = _nombre;
        this.Apellido = _apellido;
        this.Comentario = _comentario;
    }
}

var listadeComentarios = new Array();

const btnguardar = document.getElementById('btnguardarCss');
const comentarioguardado = document.getElementById('ResultadoDComentariosCss');
const cantDeComentarios = document.getElementById('cantDeComentariosCss');

btnguardar.addEventListener('click', guardar)

/**
 * Funcion que guarda la carga de datos de los input y 
 * lo que muestra en la pantalla
 */
function guardar(e) {
    carga(e);
    guardarEnPC();
    cargaenDiv();
}

/**
 * funcion que guarda en el localstorage la lista de comentarios que guardamos en nuestro fom.
*/
function guardarEnPC() {
    if (!window.localStorage.key('ListaComments')) {
        window.localStorage.setItem('ListaComments', JSON.stringify(listadeComentarios));
    }
    else {
        window.localStorage.setItem('ListaComments', JSON.stringify(listadeComentarios));
    }
}

/**
* Funcion que guarda y despues muestra en el browser o navegador la lista de comentarios que guardamos en nuestro fom.
*/
function obtenerEnPC() {
    if (window.localStorage.key('ListaComments')) {
        listadeComentarios = JSON.parse(window.localStorage.getItem('ListaComments'));
    }
}

/**
 * Funcion que carga los value de los input, los valida, y los pushea en la listadecomentario
 */
function carga(e) {
    e.preventDefault();
    console.log(window.localStorage.ListaComments)
    console.log(localStorage.ListaComments)

    let nombresinput = document.getElementById('TxtNombres').value;
    let apellidosinput = document.getElementById('TxtApellidos').value;
    let comentariotext = document.getElementById('TxtComentarios').value;

    let comentarios = new Comentador(
        nombresinput,
        apellidosinput,
        comentariotext
    )

    comentarios.Numero = listadeComentarios.length;

    if (typeof (comentarios.Nombre) != 'string' || comentarios.Nombre === '') {
        comentarios.Numero === NaN;
        return alert(`El parametro Nombres no es un texto o se encuentra incompleto`)
    }
    else if (typeof (comentarios.Apellido) != 'string' || comentarios.Apellido === '') {
        comentarios.Numero === NaN;
        return alert(`El parametro Apellidos no es un texto o se encuentra incompleto`)
    }
    else if (typeof (comentarios.Comentario) != 'string' || comentarios.Comentario === '') {
        comentarios.Numero === NaN;
        return alert(`El parametro Comentario no es un texto o se encuentra incompleto`)
    } else {
        listadeComentarios.push(comentarios)
    }
}

/**
 * Funcion recorre el html y busca nuestro div donde se va a mostrar lo que queremos.
 * Crea un div nuevo con un h3 y un p, tambien un botton para borrar cada comentario.
 */
function cargaenDiv() {
    comentarioguardado.innerHTML = "";

    listadeComentarios.forEach((c, ind) => {

        let aux = [] //nombre +apellido
        let aux2 = []//comentario
        let div = document.createElement('div');//creo un div padre 
        let h = document.createElement('h3');//creo un h3 donde van los nombres y apellidos
        let p = document.createElement('p');//creo un p donde va el comentario
        div.appendChild(h, p)//abro el div con sus hijos h y p

        let hora = document.createElement('h5');//creo un h5 para la hora y fecha
        //let cantdeComentarios = document.createElement('h5')
        let btnBorrar = document.createElement('button');// creo un botton para eliminar
        let br = document.createElement('br');//creo un br para dejar un espacio para cada uno

        div.append(hora);//abro la hora en el div
        div.append(btnBorrar);//abro el botton en el div

        for (let prop in c) {
            if (prop != 'Nombre' && prop != 'Apellido' && prop != 'Numero') {
                let p = document.createElement('p');
                aux.push(c[prop])
                p.innerHTML = c[prop]
                div.appendChild(p)
            }
            else if (prop != 'Comentario' && prop != 'Numero') {
                aux2.push(c[prop])
                h.innerHTML = aux2.join(', ');
                div.appendChild(h)
            }
        }

        cantDeComentarios.innerHTML = listadeComentarios.length;
        hora.innerHTML = VerFechayHora();
        btnBorrar.setAttribute('data-indice-ciclo', c.Numero);
        btnBorrar.addEventListener('click', Borrar);
        btnBorrar.innerHTML = 'X';

        div.append(br)
        comentarioguardado.appendChild(div)
    })
}

/**
 * Funcion que busca en el html y borra el comentario que queremos.
 */
function Borrar(e) {
    e.preventDefault();
    let index = e.currentTarget.getAttribute('data-indice-ciclo');
    listadeComentarios.splice(parseInt(index), 1);
    listadeComentarios.forEach((b, ind) => {
        b.Numero = ind
    })

    guardarEnPC();
    cargaenDiv();
}

obtenerEnPC();
cargaenDiv();
