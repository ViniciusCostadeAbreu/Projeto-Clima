let txtcid = window.document.getElementById('cid')
let botao = window.document.getElementById('btn-buscar')
let res = window.document.querySelector('section#clima')
const API_KEY = 'SUA_API_KEY_AQUI'
const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather'


botao.addEventListener("click",buscarCidade)

txtcid.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarCidade()
    }
})


function buscarCidade(){

    let cidade = txtcid.value.trim()

    if(cidade === ''){
        mensagem("Por favor, informe uma cidade valida")
        txtcid.value = ''
        txtcid.focus()
        return
    }else{ 
        console.log(`${URL_BASE}?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`)
        res.innerHTML = `Buscando clima para <strong>${txtcid.value}...</strong>`  
    }
}

function mensagem(txt){
    window.alert(txt)
    return;
}
