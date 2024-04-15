document.querySelector('.busca').addEventListener('submit', async(event) => {

    //previne o carregamento do site ao apertar o submit
    event.preventDefault();
    //capturando o value do input e atribuindo a variável(captura da escrita da pessoa para análise)
    let input = document.querySelector('#searchInput').value

    //Se input for diferente de vazio ele irá realizar a busca pelas informações
    if(input !== ''){
        clearInfo();
        showWarning('');
        document.querySelector('.loader').style.display = 'block';

        let results = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&lang=pt_br&units=metric&appid=d06cdb298fafc83c520d5ab677fc477e`);

        let json = await results.json();

        if (json.cod === 200) {
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg

            });
        }else {
            clearInfo()
            showWarning('Cidade não encontrada');
        }

        //console.log(json)
    } else {
        clearInfo;
    }



    //console.log(input)

})

function showInfo(json) {
    //Retirando a mensagem da tela antes de exibir os resultados
    showWarning('');

    //alterando o display do elemento .aviso para que ele seja exibido na tela
    document.querySelector('.resultado').style.display = 'block';
    
    document.querySelector('.titulo').innerHTML = `${json.name},${json.country}`;
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC</sup>`;

    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed}<span>km/h</span>`;

    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}.png`)

    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
    
    document.querySelector('.loader').style.display = 'none';
}



function showWarning(msg) {
    
    //let aviso = document.querySelector('.aviso');

    document.querySelector('.aviso').innerHTML = msg;
    document.querySelector('.loader').innerHTML = msg;
}

function clearInfo() {
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';

}

