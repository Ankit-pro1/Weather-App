let wrapper = document.querySelector('.wrapper'),
inputPart = document.querySelector('.input-part'),
txtInfo = document.querySelector('.txt-info'),
inputField = document.querySelector('.input'),
locationBtn = document.querySelector('.btn'),
arrowBtn = wrapper.querySelector(".header i");

let api;

inputField.addEventListener('keyup', e=>{
    if(e.key == 'Enter' && inputField.value != ""){
        requestAPI(inputField.value);
    }
})

let apiKey = '3af185e061efbbac3a16b67f77a5d701';

locationBtn.addEventListener('click',()=>{
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }else{
        console.log("Your doesn't support geolocation");
    }
})

onSuccess = (position) =>{
    const {latitude, longitude} = position.coords;
    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`;
    fetchData();
}
onError = (error) =>{
    console.log(error);
    txtInfo.innerHTML=`${error.message}`;
    txtInfo.classList.add("error");
}

const requestAPI=(city)=>{
    api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    fetchData();
}

fetchData = () =>{
    txtInfo.innerHTML="Getting weather details...";
    txtInfo.classList.add("pending");

    fetch(api).then(response=>response.json()).then(result=>weatherDetails(result));
}

weatherDetails=(info)=>{
    txtInfo.classList.replace("pending","error");
    if(info.cod == 404){
        txtInfo.innerHTML=`${inputField.value} is not a valid city`;
    }
    else{
        // let's get the required properties value from the info object
        const city = info.name;
        const country = info.sys.country;
        const {description, id} = info.weather[0];
        const {feels_like, humidity, temp} = info.main;

        // lets pass these value to a particular html element
        wrapper.querySelector('.temp .num').innerText = Math.floor(temp);
        wrapper.querySelector('.weather').innerText = description;
        wrapper.querySelector('.location span').innerText = `${city}, ${country}`;
        wrapper.querySelector('.detail .num1').innerText = Math.floor(feels_like);
        wrapper.querySelector('.detail .num2').innerText = `${humidity} %`;


        txtInfo.classList.remove("pending","error");
        wrapper.classList.add('active');
        console.log(info);
    }
}

arrowBtn.addEventListener('click', ()=>{
    wrapper.classList.remove('active');
})