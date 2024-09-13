const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const amt = document.querySelector("form input");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg")

for (let select of dropdowns) {
    for (let currCode in countryList) {
        let newOption = document.createElement("option");
        newOption.innerText = currCode;
        newOption.value = currCode;
        select.append(newOption);
        if (currCode === "USD" && select.name === "from") {
            newOption.selected = "selected";
        } else if (currCode === "INR" && select.name === "to") {
            newOption.selected = "selected";
        }
    };
    select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
    });
};

const updateExchangeRate = async () => {
    let amtVal = amt.value;
    if (amtVal === "" || amtVal < 1) {
        amt.value = 1;
    };
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
    let response = await fetch(URL);
    let data = await response.json();
    let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]
    let finalAmt = rate*amtVal;
    msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt} ${toCurr.value}`;
};

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrcImg = `https://flagsapi.com/${countryCode}/flat/64.png`;
    const flag = element.parentElement.querySelector("img");
    flag.src = newSrcImg;
};

btn.addEventListener("click", (evt) => {
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load", () => {
    updateExchangeRate();
});



























