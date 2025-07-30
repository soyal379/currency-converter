let dropdowns = document.querySelectorAll('.converter select');
let btn = document.getElementById('convertBtn');
let result = document.getElementById('result');
const API_KEY = "2d4a02f7c7156a566a05ccc0"
const API_URL = 'https://v6.exchangerate-api.com/v6/';


for (select of dropdowns) {
    for (code in countryList) {
        let option = document.createElement('option')
        option.value = code
        option.innerText = code
        if (select.name === 'fromCurrency' && code === 'USD') {
            option.selected = true
        } else if (select.name === 'toCurrency' && code === 'INR') {
            option.selected = true
        }
        select.append(option)
    }

    select.addEventListener('change', (e) => {
        updateFlag(e.target);
    })
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`
    let parent = element.parentElement.querySelector('img');
    parent.src = newsrc;
}

async function getExchangeRate(fromCurrency, toCurrency, amount) {
    try {
        const response = await fetch(`${API_URL}/${API_KEY}/pair/${fromCurrency}/${toCurrency}/${amount}`)
        const data = await response.json()

        if (data.result === "success") {
            result.innerText = `${amount} ${fromCurrency} = ${data.conversion_result} ${toCurrency}`
        } else {
            throw new Error("Enable to get exchange rate")
        }
    } catch (error) {
        result.innerText = "Error fetching exchange rate. Please try again.";
        console.error(error);
    }
}

btn.addEventListener('click', async (e) => {
    e.preventDefault();
    let amount = document.querySelector('.converter #amount');
    let amtval = amount.value
    if (amtval === '' || amtval < 1) {
        amtval = 1
        amount.value = "1"
    }

    const fromCur = document.querySelector(".from select").value
    const toCur = document.querySelector(".to select").value

    getExchangeRate(fromCur, toCur, amtval)

})

