const pairs=[
    ['#020024','#7777b8','#00d4ff'],
    ['#020024', '#6b6bb8', '#00cfff'],
    ['#020024', '#6d6db9', '#00d1ff'],
    ['#020024', '#5f5fb8', '#00d2ff']
]
function changeBg(){
   const [color1,color2,color3]=pairs[Math.floor(Math.random()* pairs.length)];

    document.body.style.background=`linear-gradient(90deg,${color1} 0%,${color2} 35%,${color3} 100%)`;
}
window.Bginterval=setInterval(changeBg,2000);



function getweather(){
 const apiKey='22acd6c1d3899fa2114b74ead5bd742f';
 const city=document.getElementById('city').value;

 if(!city){
    alert('Please enter a City');
    return;
 }

 const WeatherUrl =  `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

 fetch(WeatherUrl)
    .then(Response=>
    {
        if(!Response.ok)
            {
                throw new Error("City not  found");
            }
        return Response.json();
    }
    )

    .then(data=>
    {
        console.log(data);
        displayData(data);
    })

    .catch(error=>
    {
        console.error('error:', error);
        displayError("Error fetching weather data.Please try again")
    }
    )
}

    function  displayData(data)
    {
        const weatherDiv=document.getElementById('weather');

        weatherDiv.innerHTML='';

        const name=data.name;
        const temp= Math.round(data.main.temp - 273.15);
        const humidity=data.main.humidity;
        const  wind=data.wind.speed;
        const desc=data.weather[0].description;
        const iconCode=data.weather[0].icon;
        const iconUrl=`https://openweathermap.org/img/wn/${iconCode}.png`
    

    const weatherHtml=`
    <img src="${iconUrl}" alt="${desc}">
    <h1>${temp}°C</h1>
    <p>${name}</p>
    <p>${desc}</p>
    <p>Humidity:${humidity}</p>
    <p>Wind speed:${wind}Kmph</p>

    `;
    
    weatherDiv.innerHTML=weatherHtml;

    // if(desc=="mist")
    //     {
    //         const imageUrl=`https://img.freepik.com/free-photo/misty-landscape-with-bridge-footbridge_1136-273.jpg?t=st=1726255037~exp=1726258637~hmac=2711f67e0a908cb42f8c464b3ca13be1d01035348e3dc525cd75e2f64785fc3e&w=740`;
    //         document.body.style.backgroundImage=`Url(${imageUrl})`;
    //         document.body.style.backgroundRepeat='no-repeat';
    //         document.body.style.backgroundSize='cover';
    //         document.body.style.backgroundPosition = 'center'
    //         clearInterval(window.Bginterval);

    //     }
    //     else{
    //         changeBg();
    //     }
}
    function displayError(Message)
    {
        const weatherDiv=document.getElementById('weather');
        weatherDiv.innerHTML=`<p class="error">${Message}</p>`;
  
    }



