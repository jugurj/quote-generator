// Global variables
const MAX_API_CALLS = 10;
const LONG_QUOTE_LENGHT = 80;

// Count to avoid infinite loop for API calls
let quoteApiCalls = 0;

// Get HTML elements
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function showLoadingSpinner() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}

function hideLoadingSpinner() {
    if (!loader.hidden) {
        quoteContainer.hidden = false;
        loader.hidden = true;
    }
}

// Get quote from API
async function getQuote() {
    showLoadingSpinner();

    const proxyUrl = 'https://pacific-harbor-33249.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    
    try {
        const res = await fetch(proxyUrl + apiUrl);
        const data = await res.json();

        // Incrementing API calls counter
        quoteApiCalls++;

        // If from API fetching author property comes as blank string set author as unknown instead
        if (data.quoteAuthor === '') {
            authorText.innerText = 'Unknown'
        } else {
            authorText.innerText = data.quoteAuthor;
        }

        // Reduce font size for longer quotes
        if (data.quoteText.length > LONG_QUOTE_LENGHT) {
            quoteText.classList.add('long-quote');
        } else {
            quoteText.classList.remove('long-quote');
        }

        quoteText.innerText = data.quoteText;
        hideLoadingSpinner();
    } catch (err) {
        // Stop rerunning API call function if calls counter is above max calls value and show error details in the quote container isntead
        if (quoteApiCalls < MAX_API_CALLS) {
            getQuote();
        } else {
            renderError(err);
            console.error(err)
        }
    }
}

// Display error details in the quote container area
function renderError(errorMsg) {
    hideLoadingSpinner();
    quoteText.innerText = 'Oops, something went wrong!';
    authorText.innerText = errorMsg;
}

// Tweet quote
function tweetQuote() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl, '_blank');
}

//Event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// On laod
getQuote();