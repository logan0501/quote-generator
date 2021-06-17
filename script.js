let apiquotes =[];
// get quotes from api
const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const author = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newquoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

function loading(){
    loader.hidden = false;
    quoteContainer.hidden = true;
}
function complete(){
    quoteContainer.hidden = false;
    loader.hidden = true;
   
}
function newQuote(){
    loading()
    const quote = apiquotes[Math.floor(Math.random()*apiquotes.length)];
    
    if (quote.author){
        author.textContent = quote.author;
    }else{
        author.textContent = 'Unknown';
    }
    if (quote.text.length >50){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    quoteText.textContent = quote.text;
    complete();
}
async function getQuotes(){
    loading();
    const apiUrl = 'https://type.fit/api/quotes';
    try{
        const res = await fetch(apiUrl);
        apiquotes = await res.json();
        newQuote();
    } catch(error){
        alert(error);
    }
}

function tweetQuote(){
    const twitterurl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${author.textContent}`;
    window.open(twitterurl,'_blank');
}

newquoteBtn.addEventListener('click',newQuote);
twitterBtn.addEventListener('click',tweetQuote);
getQuotes();
