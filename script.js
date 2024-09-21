const API_KEY="375a2d62f3374be9be0b016e95cf7e8e";
const URL="https://newsapi.org/v2/everything?q=";

// when the window will load the news will get fetche from the by using api 
// from then news website 
window.addEventListener('load',()=>fetchnews("India"));

function reload()
{
    window.location.reload();
}

async function fetchnews(query)
{
  const res =await fetch(`${URL}${query}&apiKey=${API_KEY}`);
  const data=await res.json();
  //   console.log(data);
  bindData(data.articles);
}
function bindData(articles)
{
    const cardContainer=document.getElementById("card-container");
    const newsCardTemplate=document.getElementById("template-newcard");
    cardContainer.innerHTML= "";
    articles.forEach((article) => {

        if(!article.urlToImage) return;
        const cardClone=newsCardTemplate.content.cloneNode(true);
        fillDatainCard(cardClone,article);
        cardContainer.appendChild(cardClone);

    });
}
function fillDatainCard(cardClone,article)
{
    const newsImg=cardClone.querySelector('#news-image');
    const newsTitle=cardClone.querySelector('#news-title');
    const newsSource=cardClone.querySelector('#new-source');
    const newsDesc=cardClone.querySelector('#news-desc');

    newsImg.src=article.urlToImage;
    newsTitle.innerHTML=article.title;
    newsDesc.innerHTML=article.description;

    const date=new Date(article.publishedAt).toLocaleString("en-US",{
        timeZone:"Asia/Jakarta"
    });

    newsSource.innerHTML=`${article.source.name} ▪️ ${date}`;
    cardClone.firstElementChild.addEventListener('click',()=>{
        window.open(article.url,"_blank");
    });


}
let currentselectednav=null;

function onnavclick(id)
{
   fetchnews(id);
   const navitem=document.getElementById(id);
   currentselectednav?.classList.remove("active");
   currentselectednav=navitem;
   currentselectednav.classList.add("active");

}
const SearchButton=document.getElementById("search-button");
const SearchInput=document.getElementById("search-input");

SearchButton.addEventListener("click",()=>{
    const query=SearchInput.value;
    if(!query) return;
    fetchnews(query);
    currentselectednav?.classList.remove("active");
    currentselectednav=null;


});