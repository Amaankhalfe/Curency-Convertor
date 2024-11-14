const BASE_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=fca_live_VCNSkBs92DtVrz8PTiuqknWDRuHqh1taEVQhEZ12";



const dropdown= document.querySelectorAll(".dropdown select");

const Btn= document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");


let i=0;
for(let select of dropdown){
    
    for(let currCode in countryList){
        let newOption = document.createElement("option")
        newOption.innerText =currCode;
        newOption.value=currCode;  
        if(select.name ==='from' && currCode==="USD"){
            newOption.selected="selected";
        } else if(select.name ==='to' && currCode==="INR"){
            newOption.selected="selected"
        }
         select.append(newOption)

                  
}
    select.addEventListener("change", (evt)=>{
        console.log(evt.target);
        updateFlag(evt.target);
    })

    //select.addEventListener("change", ...): This line adds an event listener to the select element (dropdown). The "change" event fires whenever the user selects a different option in the dropdown.
    //(evt) => { ... }: This is an arrow function that gets called when the "change" event occurs. It receives an event object, evt, which contains details about the event.
    //evt.target: This refers to the element that triggered the event, in this case, the dropdown that was changed. By passing evt.target, you're passing the specific <select> element where the option was changed to the updateFlag function.
}


const updateFlag =(element)=>{

    let currencyCode= element.value;    //get what exact change was made in the element  check on console how it works by changing dropdown values
    console.log(currencyCode);

    let countryCode= countryList[currencyCode];
    let newSrc= `https://flagsapi.com/${countryCode}/flat/64.png`;
    const img = element.parentElement.querySelector("img");
    img.src=newSrc;
}

Btn.addEventListener('click', async (evt)=>{
    evt.preventDefault();  //to prevent default behaviour of refreshing a page when clicked on button
    let amount=document.querySelector('.amount input');
    let amtVal = amount.value;
    if(amtVal==" "|| amtVal<1){
        amtVal=1;
        amount.value=1;

    }
  
    try {
        let response = await fetch(BASE_URL);
        if (!response.ok) throw new Error("Network response was not ok");

        let data = await response.json();
        console.log(data)
        // Get the rates for the selected currencies
        const fromRate = data.data[fromCurr.value];
        const toRate = data.data[toCurr.value];

        // Calculate the converted amount
        const convertedAmount = (amtVal * toRate) / fromRate;

        // Display the result
        document.querySelector('.msg').innerText = `${amtVal} ${fromCurr.value} = ${convertedAmount.toFixed(2)} ${toCurr.value}`;
    } catch (error) {
        console.error("Error fetching the currency data:", error);
    }
})