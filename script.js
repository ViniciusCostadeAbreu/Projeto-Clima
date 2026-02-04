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
        <div class="clima-info">
            <h2 class="cidNome"><i class="fa-solid fa-map-location-dot"></i> ${data.name}</h2>

            <div class="clima-principal">
                <img src="${iconUrl}" alt="Clima: ${data.weather[0].description}">
                <span class="temperatura">${Math.round(data.main.temp)}°C</span>
            </div>
    
            <h3 class="descricao">${data.weather[0].description}</h3>

            <div class="detalhes">
                <p>Sensação térmica: ${Math.round(data.main.feels_like)}°C</p>
                <p>Umidade: ${data.main.humidity}%</p>
            </div>
        </div>   
    `
    mudaFundo(data.weather[0].main)
    mudaCorClima(data.weather[0].main)
}

function mudaFundo(clima){
    document.body.className = '' 

    switch (clima){
        case 'Clear':
            document.body.classList.add('sol')
            break
        case 'Clouds':
            document.body.classList.add('nublado')
            break
        case 'Rain':
        case 'Drizzle':
            document.body.classList.add('chuva')
            break
        case 'Snow':
            document.body.classList.add('neve')
            break
        case 'Mist':
        case 'Fog':
            document.body.classList.add('neblina')
            break
    }

}

function mudaCorClima(clima){
    const climaInfo =  document.querySelector('.clima-info')
    if (!climaInfo) return

    climaInfo.className = 'clima-info'

    switch (clima){
        case 'Clear':
            climaInfo.classList.add('clima-sol')
            break
        case 'Clouds':
            climaInfo.classList.add('clima-nublado')
            break
        case 'Rain':
        case 'Drizzle':
            climaInfo.classList.add('clima-chuva')
            break
        case 'Snow':
            climaInfo.classList.add('clima-neve')
            break
        case 'Mist':
        case 'Fog':
            climaInfo.classList.add('clima-neblina')
            break
    }

}

function mensagem(txt){
    window.alert(txt)
    return;
}
