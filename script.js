let txtcid = window.document.getElementById('cid')
let botao = window.document.getElementById('btn-buscar')
let res = window.document.querySelector('section#clima')

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
    }else{   
        res.innerHTML = `Buscando clima para <strong>${txtcid.value}...</strong>`  
    }
}

function mensagem(txt){
    window.alert(txt)
    return;
}
