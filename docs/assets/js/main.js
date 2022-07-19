"use strict";const inputSearch=document.querySelector(".input-search-js"),searchButton=document.querySelector(".button-js-search"),resetButton=document.querySelector(".button-js-reset"),searchResult=document.querySelector(".search-js"),favouriteList=document.querySelector(".favourites"),animeList=document.querySelector(".list-anime-js");let animes=[],favorites=[];const animeRender=e=>{let t="",a="";for(const i of e){a=-1!==favorites.findIndex(e=>e.mal_id===i.mal_id)?"fav":"",t+=`<li class="list-anime list-anime-js ${a}" id="${i.mal_id}">`,t+=`<h2 class="title2">${i.title}</h2>`,"https://cdn.myanimelist.net/img/sp/icon/apple-touch-icon-256.png"!==i.images.jpg.small_image_url?t+=`<img class="img-list" src=${i.images.jpg.image_url}>`:t+="<img class=\"img-list\" src='https://via.placeholder.com/210x295/ffffff/666666/?text=TV'>",t+="</li>"}return t},renderAnimeSearch=()=>{let e=animeRender(animes);searchResult.innerHTML=e,listenerSerie()},handleSearch=e=>{e.preventDefault();const t=inputSearch.value.toLowerCase();getDataAPI(t)},handleClick=e=>{const t=parseInt(e.currentTarget.id),a=animes.find(e=>e.mal_id===t),i=favorites.findIndex(e=>e.mal_id===t);-1===i?favorites.push(a):favorites.splice(i,1),animeRenderFav()},animeRenderFav=()=>{let e=animeRender(favorites);favouriteList.innerHTML=e,localStorage.setItem("favorites",JSON.stringify(favorites)),renderAnimeSearch()};function listenerSerie(){const e=document.querySelectorAll(".list-anime-js");for(const t of e)t.addEventListener("click",handleClick)}const getDataAPI=e=>{fetch("https://api.jikan.moe/v4/anime?q="+e).then(e=>e.json()).then(e=>{animes=e.data,renderAnimeSearch()})},dataLS=JSON.parse(localStorage.getItem("favorites"));function initPage(){null!==dataLS?(favorites=dataLS,animeRenderFav()):favouriteList.innerHTML=""}function resetData(){localStorage.removeItem("favorites")}resetButton.addEventListener("click",resetData),searchButton.addEventListener("click",handleSearch),initPage();