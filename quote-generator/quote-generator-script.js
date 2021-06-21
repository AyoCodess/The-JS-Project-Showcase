// ? getting quotes from API

let apiQuotes = [];

//? show new quote

function newQuote() {
  //? pick a random quote from api array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  console.log(quote);
}

async function getQuotes() {
  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(`Sorry we encountered this ${error}, please try again.`);
  }
}

//? on load

getQuotes();
