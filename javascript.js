let letras = ['J','Q','K'];
let simbolos = ['corazones', 'picas', 'treboles', 'diamantes'];
let diler = document.getElementsByClassName('carta_diler');
let player = document.getElementsByClassName('carta_player');
let accion = document.querySelector('.jugar');
let solicitud = document.querySelector('.botones_accion');
let pedir_carta = document.querySelector('.solicitar_carta');
let parar = document.querySelector('.plantar');
let boton_recargar = document.querySelector('.recargar');



function numero_azar(){
    //devuelve un numero al azar entre 0 y 10
    let numero = Math.round(Math.random()*10);
    return numero;
}

function letra_azar(){
    //devuelve una letra al azar entre (J,Q,K) del array letras
    let letra = Math.round(Math.random()*2);
    let letra_escogida = letras[letra];
    return letra_escogida;
}

function cambio_numero(lista){
    //cambia el 11 por el numero 1 si la suma del array es mayor a 21
    lista.forEach(element => {
        if(element == 11){
            let suma = lista.reduce((a,b) => a+b);
            if(suma>21){
                lista.splice(lista.indexOf(element),1,1);
            }
        } 
    });
}

function cambio_numero2(lista2){
    //cambia el 11 por el numero 1 si la suma del array es mayor a 21
    lista2.forEach(element => {
        if(element == 11){
            let suma = lista2.reduce((a,b) => a+b);
            lista2.splice(lista2.indexOf(element),1,1);
        } 
    });
}

function empacador(array, almacenador){
    //recorre un array de etiquetas y alamecena un dato en un array definido llamado alamacenador
    for(let unidad of array){
        if(unidad.innerHTML == 'A'){
            almacenador.push(11);
        } else if(unidad.innerHTML == 'J'){
            almacenador.push(10);
        } else if(unidad.innerHTML == 'Q'){
            almacenador.push(10);
        } else if(unidad.innerHTML == 'K'){
            almacenador.push(10);
        } else {
            almacenador.push(parseInt(unidad.innerHTML));
        }
    }
}


accion.addEventListener('click', ()=>{
    for(let dile of diler){
        let azardiler = numero_azar();
        let azarletrad = letra_azar();
        if(azardiler === 1){
            dile.append('A');
        } else if (azardiler === 0) {
            dile.append(azarletrad);
        } else {
            dile.append(azardiler);
        }
    }
    for(let playe of player){
        let azarplayer = numero_azar();
        let azarletrap = letra_azar();
        if(azarplayer === 1){
            playe.append('A');
        } else if(azarplayer === 0) {
            playe.append(azarletrap);
        } else {
            playe.append(azarplayer);
        }
    }
    accion.style.display = 'none';
    solicitud.style.display = 'block';
    boton_recargar.style.display = 'inline';
    diler[1].style.color = 'white';
    //diler
    let sumandosdiler = document.getElementsByClassName('carta_diler');
    let sumatoriadiler = [];
    empacador(sumandosdiler, sumatoriadiler);
    cambio_numero(sumatoriadiler);
    // jugador
    let sumandos = document.getElementsByClassName('carta_player');
    let sumatoria = [];
    empacador(sumandos, sumatoria)
    cambio_numero(sumatoria);
})

pedir_carta.addEventListener('click', ()=>{
    let caja_carta = document.createElement('div');
    caja_carta.setAttribute('class', 'carta_player');
    let azarplayer = numero_azar();
    let azarletrap = letra_azar();
    let numero_carta
    if(azarplayer === 1){
        numero_carta = document.createTextNode('A');
    } else if (azarplayer === 0) {
        numero_carta = document.createTextNode(azarletrap);
    } else {
        numero_carta = document.createTextNode(azarplayer);
    }
    caja_carta.append(numero_carta);
    document.querySelector('.player').append(caja_carta);
    let sumandos = document.getElementsByClassName('carta_player');
    let sumatoria = [];
    empacador(sumandos, sumatoria);
    cambio_numero(sumatoria);
    let sumatotal = sumatoria.reduce((a,b)=> a+b);
    //suma cartas diler
    let sumandosdiler = document.getElementsByClassName('carta_diler');
    let sumatoriadiler = [];
    empacador(sumandosdiler, sumatoriadiler);
    let sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
    if(sumatotal > 21){
        alert('Te has pasado :( ,gana la CASA');
        let etiquetasuma = document.createElement('p');
        etiquetasuma.append(`Tus cartas suman ${sumatotal}`);
        document.querySelector('.player').append(etiquetasuma);
        let etiquetasumadiler = document.createElement('p');
        etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
        document.querySelector('.diler').append(etiquetasumadiler);
        pedir_carta.style.display = 'none';
        parar.style.display = 'none';
        diler[1].style.color = 'black';
    }
})

parar.addEventListener('click', ()=>{
    diler[1].style.color = 'black';
    let sumandos = document.getElementsByClassName('carta_player');
    let sumatoria = [];
    empacador(sumandos, sumatoria);
    cambio_numero(sumatoria);
    let sumatotal = sumatoria.reduce((a,b)=> a+b);
    pedir_carta.style.display = 'none';
    parar.style.display = 'none';
    let etiquetasuma = document.createElement('p');
    etiquetasuma.append(`Tus cartas suman ${sumatotal}`);
    document.querySelector('.player').append(etiquetasuma);
    //codigo para el diler
    let sumandosdiler = document.getElementsByClassName('carta_diler');
    let sumatoriadiler = [];
    empacador(sumandosdiler, sumatoriadiler);
    cambio_numero(sumatoriadiler);
    let sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
    while(sumatotaldiler < 17){
        sumatoriadiler;
        let caja_cartadiler = document.createElement('div');
        caja_cartadiler.setAttribute('class', 'carta_diler');
        let azardiler = numero_azar();
        let azarletrad = letra_azar();
        let numero_carta
        if(azardiler === 1){
            numero_carta = document.createTextNode('A');
        } else if (azardiler === 0) {
        numero_carta = document.createTextNode(azarletrad);
        } else {
            numero_carta = document.createTextNode(azardiler);
        }
        caja_cartadiler.append(numero_carta);
        document.querySelector('.diler').append(caja_cartadiler);
        if(caja_cartadiler.innerHTML == 'A'){
            sumatoriadiler.push(11);
            sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
        } else if (caja_cartadiler.innerHTML == 'J'){
            sumatoriadiler.push(10);
            sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
        } else if (caja_cartadiler.innerHTML == 'Q'){
            sumatoriadiler.push(10);
            sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
        } else if (caja_cartadiler.innerHTML == 'K'){
            sumatoriadiler.push(10);
            sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
        } else {
            sumatoriadiler.push(parseInt(caja_cartadiler.innerHTML));
            sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
        }
        cambio_numero(sumatoriadiler);
        sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
    }
    if(sumatotaldiler > 21){
        let etiquetasumadiler = document.createElement('p');
        etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
        document.querySelector('.diler').append(etiquetasumadiler);
        alert('Felicidades has ganado');
    } else if(sumatotal == sumatotaldiler == 21){
        let etiquetasumadiler = document.createElement('p');
        etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
        document.querySelector('.diler').append(etiquetasumadiler);
        if(sumatoria.length < sumatoriadiler.length){
            alert('Felicidades has ganado');
        } else if(sumatoria.length > sumatoriadiler.length){
            alert('Perdiste gana el Cruopier');
        } else {
            alert('Empatados nadie gana');
        }
    } else if (sumatotal > sumatotaldiler){
        sumatoriadiler;
        cambio_numero2(sumatoriadiler);
        sumatotaldiler = sumatoriadiler.reduce((a,b) => a+b);
        while(sumatotaldiler < 17){
            sumatoriadiler;
            cambio_numero2(sumatoriadiler);
            let caja_cartadiler = document.createElement('div');
            caja_cartadiler.setAttribute('class', 'carta_diler');
            let azardiler = numero_azar();
            let azarletrad = letra_azar();
            let numero_carta
            if(azardiler === 1){
                numero_carta = document.createTextNode('A');
            } else if (azardiler === 0) {
            numero_carta = document.createTextNode(azarletrad);
            } else {
                numero_carta = document.createTextNode(azardiler);
            }
            caja_cartadiler.append(numero_carta);
            document.querySelector('.diler').append(caja_cartadiler);
            if(caja_cartadiler.innerHTML == 'A'){
                sumatoriadiler.push(11);
                sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
            } else if (caja_cartadiler.innerHTML == 'J'){
                sumatoriadiler.push(10);
                sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
            } else if (caja_cartadiler.innerHTML == 'Q'){
                sumatoriadiler.push(10);
                sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
            } else if (caja_cartadiler.innerHTML == 'K'){
                sumatoriadiler.push(10);
                sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
            } else {
                sumatoriadiler.push(parseInt(caja_cartadiler.innerHTML));
                sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
            }
            cambio_numero2(sumatoriadiler);
            sumatotaldiler = sumatoriadiler.reduce((a,b)=> a+b);
        }
        if(sumatotaldiler > 21){
            let etiquetasumadiler = document.createElement('p');
            etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
            document.querySelector('.diler').append(etiquetasumadiler);
            alert('Felicidades has ganado ');
        } else if(sumatotal == 21 &&  sumatotaldiler == 21){
            let etiquetasumadiler = document.createElement('p');
            etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
            document.querySelector('.diler').append(etiquetasumadiler);
            if(sumatoria.length < sumatoriadiler.length){
                alert('Felicidades has ganado');
            } else if(sumatoria.length > sumatoriadiler.length){
                alert('Perdiste gana el Cruopier');
            } else {
                alert('Empatados nadie gana');
            }
        } else if(sumatotal >= sumatotaldiler){
            let etiquetasumadiler = document.createElement('p');
            etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
            document.querySelector('.diler').append(etiquetasumadiler);
            setTimeout(function(){
                alert('Felicidades has ganado');
            }, 500); 
        } else {
            let etiquetasumadiler = document.createElement('p');
            etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
            document.querySelector('.diler').append(etiquetasumadiler);
            setTimeout(function(){
                alert('Perdiste gana el Croupier');
            }, 500);
        }      
    } else if (sumatotal == sumatotaldiler) {
        let etiquetasumadiler = document.createElement('p');
        etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
        document.querySelector('.diler').append(etiquetasumadiler);
        setTimeout(function(){
            alert('Empatados nadie gana');
        }, 500);
    } else {
        let etiquetasumadiler = document.createElement('p');
        etiquetasumadiler.append(`Las cartas del croupier suman ${sumatotaldiler}`);
        document.querySelector('.diler').append(etiquetasumadiler);
        setTimeout(function(){
            alert('perdiste gana el Croupier');
        }, 500);
    }
})
