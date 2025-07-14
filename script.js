const BASE_URL="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const entry=document.querySelector("form input");
const message=document.querySelector("form .msg");
let fromC=document.querySelector(".from select");
let toC=document.querySelector(".to select");


window.addEventListener("load", ()=>{
    updateExchangeRate();
})
/*
for(code in countryList)
{
    console.log(code,countryList[code]);
}
*/

for(let select of dropdowns){
    for(let cc in countryList){
        let newOption=document.createElement("option");
        newOption.innerText=cc;
        newOption.value=cc;
        if(select.name==="from" && cc==="USD"){
            newOption.selected="selected";
        } else if(select.name==="to" && cc==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag = (element) =>{

    let countryCode=countryList[element.value];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;

}

btn.addEventListener("click",(evt) => {
    evt.preventDefault();   
    updateExchangeRate();
})

const updateExchangeRate = async ()=>{
    if(entry.value==="" || entry.value<0)
    {
        entry.value=0;
    }

    fC = (fromC.value).toLowerCase();
    tC= (toC.value).toLowerCase();
    
    const URL=`${BASE_URL}/${fC}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let outputMessage=`${entry.value}${fromC.value} = ${entry.value*data[fC][tC]}${toC.value}`;
    message.innerText=outputMessage;
    
}