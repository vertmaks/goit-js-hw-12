import{i as g,a as b,S as L}from"./vendor-QQhsBNEi.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))a(e);new MutationObserver(e=>{for(const s of e)if(s.type==="childList")for(const n of s.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&a(n)}).observe(document,{childList:!0,subtree:!0});function r(e){const s={};return e.integrity&&(s.integrity=e.integrity),e.referrerPolicy&&(s.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?s.credentials="include":e.crossOrigin==="anonymous"?s.credentials="omit":s.credentials="same-origin",s}function a(e){if(e.ep)return;e.ep=!0;const s=r(e);fetch(e.href,s)}})();function i(o){g.error({message:o,position:"topRight",maxWidth:"400px"})}const w="https://pixabay.com/api/",S="50658945-6d505dd3b22d0da0b5135219d",P=16;async function $(o,t=1){const r=new URLSearchParams({key:S,q:o,orientation:"horizontal",safesearch:!0,image_type:"photo",per_page:P,page:t}),a=`${w}?${r.toString()}`;try{return(await b.get(a)).data}catch(e){throw i(`Error fetching images: ${e.message}`),e}}const d=document.querySelector(".gallery"),m=document.querySelector(".loader"),y=document.querySelector(".load-more");let v=new L(".gallery a",{captionsData:"alt",captionDelay:250});function q(o){const t=o.map(({largeImageURL:r,webformatURL:a,tags:e,views:s,likes:n,comments:h,downloads:p})=>`<li class="gallery-item">
        <a class="img-link" href="${r}">
          <img
            class="gall-img"
            src="${a}"
            alt="${e}"
        />
          <div class="stats-wrapper">
            <ul class="stats-list">
              <li class="stats-item">Views </br><span class="stats-number">${s}</span></li>
              <li class="stats-item">Likes </br><span class="stats-number">${n}</span></li>
              <li class="stats-item">Comments </br><span class="stats-number">${h}</span></li>
              <li class="stats-item">Downloads </br><span class="stats-number">${p}</span></li>
          </ul>
          </div>
        </a>
      </li>`).join("");d.innerHTML+=t,v.refresh()}function E(){d.innerHTML=""}function M(){m.style.display="inline-block"}function B(){m.style.display="none"}function x(){y.style.display="block"}function c(){y.style.display="none"}const O=document.querySelector(".form"),A=document.querySelector(".load-more");let u="",l=1;O.addEventListener("submit",H);async function H(o){o.preventDefault();const t=o.currentTarget,r=t.elements["search-text"].value.trim();if(!r){i("Please, fill search field"),t.reset();return}u=r,l=1,E(),c(),await f(u,l),t.reset()}A.addEventListener("click",async()=>{l+=1,await f(u,l)});async function f(o,t){M();try{const r=await $(o,t);if(!r.hits.length){i("Sorry, there are no images matching your search query. Please try again!"),c(),gallery.innerHTML="";return}q(r.hits);const a=Math.ceil(r.totalHits/15);if(t>=a?(c(),i("We're sorry, but you've reached the end of search results.")):x(),t>1){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}}catch(r){console.log(r),i("An error occurred while loading images.")}finally{B()}}
//# sourceMappingURL=main-MEuZaznV.js.map
