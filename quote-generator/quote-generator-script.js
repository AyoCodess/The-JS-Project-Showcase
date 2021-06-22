const quoteContainer = document.getElementById(`quote-container`);
const quoteText = document.getElementById(`quote`);
const authorText = document.getElementById(`author`);
const twitterBtn = document.getElementById(`twitter`);
const facebookBtn = document.getElementById(`facebook`);
const linkedinBtn = document.getElementById(`linkedin`);
const NewBtn = document.getElementById(`new-quote`);

const loader = document.getElementById(`loader`);

// ? getting quotes from API

let apiQuotes = [];

// ? we are loading quote

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

function hideLoading() {
  loader.hidden = true;
  quoteContainer.hidden = false;
}

//? show new quote

function newQuote() {
  loading();
  //? pick a random quote from api array

  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];

  //? check if author field is black and replace with unknown

  if (!quote.author) quote.author = `Unknown`;
  authorText.textContent = quote.author;

  //? check quote length to determine styling

  if (quote.text.length < 50) {
    quoteText.classList.add("short-quote");
  } else {
    quoteText.classList.remove("short-quote");
  }

  quoteText.textContent = quote.text;
  hideLoading();
}

//? share quotes

function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quote.textContent} - ${authorText.textContent} %23AyoAdesanya.com`;
  window.open(twitterUrl, "_blank");
}

// Share the quote on Facebook!
const facebookShare = () => {
  const quote = quoteText.textContent;
  const author = authorText.textContent;
  const title = "Modern Quote Generator";
  const personalLink = "www.ayoadesanya.com";
  const facebookUrl = `http://www.facebook.com/sharer.php?s=100&p[title]=${title}&p[url]=${encodeURIComponent(
    personalLink
  )}&p[quote]=${quote} ~${author}`;

  window.open(facebookUrl, "_blank");
};

// Share the quote on Linkedin!
const linkedinShare = () => {
  const personalLink = "www.ayoadesanya.com";
  const linkedinUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    personalLink
  )}`;

  window.open(linkedinUrl, "_blank");
};

// * EVENT LISTENERS
twitterBtn.addEventListener(`click`, function () {
  tweetQuote();
});

NewBtn.addEventListener(`click`, function () {
  newQuote();
});

facebookBtn.addEventListener("click", facebookShare);
linkedinBtn.addEventListener("click", linkedinShare);

async function getQuotes() {
  loading();
  const apiURL = "https://type.fit/api/quotes";

  try {
    const response = await fetch(apiURL);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    apiQuotes = localQuotes;
  }
}

//? on load

getQuotes();
