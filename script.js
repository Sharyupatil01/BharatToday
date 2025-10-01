const API_KEY = "375a2d62f3374be9be0b016e95cf7e8e";
const URL = "https://newsapi.org/v2/everything?q=";

// When the window loads, fetch news about India
window.addEventListener('load', () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    try {
        // Encode query to handle spaces & special chars
        const encodedQuery = encodeURIComponent(query);
        const newsApiUrl = `${URL}${encodedQuery}&apiKey=${API_KEY}`;

        // Using free proxy to avoid CORS issues
        const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(newsApiUrl)}`;

        const res = await fetch(proxyUrl);
        const data = await res.json();
        const parsedData = JSON.parse(data.contents); // contents has actual API JSON

        bindData(parsedData.articles);
    } catch (error) {
        console.error("Error fetching news:", error);
        alert("Failed to fetch news. Try again later.");
    }
}

function bindData(articles) {
    const cardContainer = document.getElementById("card-container");
    const newsCardTemplate = document.getElementById("template-newcard");
    cardContainer.innerHTML = "";

    articles.forEach(article => {
        if (!article.urlToImage) return;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardContainer.appendChild(cardClone);
    });
}

function fillDataInCard(cardClone, article) {
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-title');
    const newsSource = cardClone.querySelector('#new-source');
    const newsDesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} ▪️ ${date}`;

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url, "_blank");
    });
}

let currentSelectedNav = null;

function onNavClick(id) {
    fetchNews(id);
    const navItem = document.getElementById(id);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = navItem;
    currentSelectedNav.classList.add("active");
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return;
    fetchNews(query);
    currentSelectedNav?.classList.remove("active");
    currentSelectedNav = null;
});
