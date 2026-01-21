let txtcid = window.document.getElementById('cid')
let botao = window.document.getElementById('btn-buscar')
let res = window.document.querySelector('section#clima')
const API_KEY = '8b3066d39459bb6f8a13b787b2be7391'
const URL_BASE = 'https://api.openweathermap.org/data/2.5/weather'


botao.addEventListener("click",buscarCidade)

txtcid.addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        buscarCidade()
    }
})


async function buscarCidade(){

    let cidade = txtcid.value.trim()

    if(cidade === ''){
        mensagem("Por favor, informe uma cidade valida")
        txtcid.value = ''
        txtcid.focus()
        return
    }else{ 
        res.innerHTML = `Buscando clima para <strong>${cidade}...</strong>`

        let url = `${URL_BASE}?q=${encodeURIComponent(cidade)}&appid=${API_KEY}&units=metric&lang=pt_br`
        
        try {
            const response = await fetch(url)

            if(!response.ok){
                throw new Error(`Não foi possivel encontrar a cidade "${cidade}"`)
            }

            const data = await response.json()
            mostrarClima(data) 
        } catch (error) {
            res.innerHTML = 'Erro ao buscar dados. Tente novamente.'//error.message
        };         
    }
}

function mostrarClima(data) {
    
    const iconCode = data.weather[0].icon
    const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@2x.png`

    res.innerHTML = `
        <h2>${data.name}</h2>
        <img src="${iconUrl}" alt="${data.weather[0].description}">
        <p>${data.main.temp}°C</p>
        <p>${data.weather[0].description}</p>
    `

    return res.innerHTML
}

function mensagem(txt){
    window.alert(txt)
    return;
}
