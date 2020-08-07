// Get quote from API
async function getQuote() {
    const proxyUrl = 'https://pacific-harbor-33249.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        const res = await fetch(proxyUrl + apiUrl);
        const data = await res.json();
        console.log(data);
    } catch (err) {
        console.log('Oops, something went wrong.', err);
    }
}

// On laod
getQuote();