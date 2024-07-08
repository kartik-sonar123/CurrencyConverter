
let BASE_URL = "https://2024-03-06.currency-api.pages.dev/v1";  //api/

let dropdowns=document.querySelectorAll(".dropdown select");
// console.log(dropdowns);

let btn=document.querySelector("form button");
let fromCurr=document.querySelector(".from select");
let toCurr=document.querySelector(".to select");
let msg=document.querySelector(".msg");

window.addEventListener("load",()=>{

    updateExchangeRate();
})

for(let select of dropdowns)
{
    for(currCode in countryList)
        {
            let newOption=document.createElement("option");
            newOption.innerText=currCode;
            newOption.value=currCode;
            if(select.name === "from" && currCode==="USD")
            {
                newOption.selected="selected";
            }
            else if(select.name === "to" && currCode==="INR")
            {
                newOption.selected="selected";
            }
            select.append(newOption);
        }
    select.addEventListener("change",(evt)=>{
        updateFlag(evt.target)
    });
}


let updateFlag=(element)=>{
    let currCode=element.value;
    // console.log(currCode);
    contryCode=countryList[currCode];
    // console.log(contryCode);
    let newsrc=`https://flagsapi.com/${contryCode}/flat/64.png`;
    img=element.parentElement.querySelector("img");
    img.src=newsrc;
}

btn.addEventListener("click",(evt)=>{
    evt.preventDefault();
    updateExchangeRate();
});

const updateExchangeRate= async()=>{
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;
    // console.log(amtVal);
    if(amtVal==="" || amtVal<1)
    {  
        amtVal=1;
        amount.value="1";
    }
     
    const URL = `${BASE_URL}/currencies/${fromCurr.value.toLowerCase()}.json`;
    let responce=await fetch(URL);
    // console.log(responce)
    let data =await responce.json();
    // console.log(data)
    
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
    // console.log("rate",rate);
    // console.log(amtVal);
    let finalAmount=amtVal*rate;
     // console.log(finalAmount)
    msg.innerText=`${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
};