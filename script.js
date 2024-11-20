document.addEventListener('DOMContentLoaded',function() {
    const amountInput = document.getElementById("amount");
    const fromCurrency = document.getElementById("from-currency");
    const toCurrency = document.getElementById("to-currency");
    const result = document.getElementById("converted-amount");
    const convertBtn = document.getElementById("convertBtn");

    // fetch  data from the API
    fetch("https://api.exchangerate-api.com/v4/latest/USD")
    .then(response => response.json())
    .then(data =>{
        const currencies = Object.keys(data.rates);
            currencies.forEach(currency => {
                const option1 = document.createElement('option');
                option1.value = currency;
                option1.text = currency;
                fromCurrency.appendChild(option1);

                const option2 = document.createElement('option');
                option2.value = currency;
                option2.text = currency;
                toCurrency.appendChild(option2);
            })
    })

    // Currency Conversion
    convertBtn.addEventListener("click", ()=>{
        const amount = amountInput.value;
        const from = fromCurrency.value;
        const to = toCurrency.value;

        if (amount === '' || isNaN(amount)) {
            result.textContent = 'Please enter a valid amount.';
            return;
        }

        fetch(`https://api.exchangerate-api.com/v4/latest/${from}`)
            .then(response => response.json())
            .then(data => {
                const rate = data.rates[to];
                const convertedAmount = (amount * rate).toFixed(2);
                result.innerHTML = `${amount} ${from} = ${convertedAmount} ${to}`;
            })
            .catch(error => {
                result.textContent = 'Error fetching exchange rates. Please try again later.';
            });
    })


})