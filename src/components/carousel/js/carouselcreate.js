"use strict"


import { Filmes } from '../../../db/filmes.js';
export function CarouselCreate() {

const Section04 = document.querySelector(".section04");
const divTitle = document.querySelector(".section04__title")
const divContent = document.querySelector(".section04__content")
const playFilme = document.querySelector(".filmeplay")
const home = document.querySelector(".home.container")
const carousel = document.querySelector(".carousel")
const pageHome = document.querySelector(".page__home")
const play = document.querySelector(".play")
let btnPlay = document.querySelector(".bxs-right-arrow");
let playvideo = document.querySelector(".playvideo");

let btnNav = document.querySelector(".section04__nav__btn")


let homeImg = document.querySelector(".filmeplay__img");
let homeInfo = document.querySelector(".filmeplay__info");

const state = {
    iframe: 0,
    widthWindowPlayer: 0
}


function filmePlay(e) {

    // Atualizar variaveis de elementos HTML 


    btnPlay = document.querySelector(".bxs-right-arrow");
    btnNav = document.querySelector(".section04__nav__btn")
    homeImg = document.querySelector(".filmeplay__img");
    homeInfo = document.querySelector(".filmeplay__info");

    if (playFilme.getAttribute("class", "is-hidde") == "filmeplay container is-hidde" && e.target.getAttribute("bt", "btn") != "btn") {


        playvideo.classList.add("is-hidde");

        home.classList.toggle("is-hidde");
        carousel.classList.toggle("is-hidde");
        playFilme.classList.toggle("is-hidde");
        btnPlay = document.querySelector(".bxs-right-arrow");



    } else if (e.target.getAttribute("bt") == "btn") {
        // Atualizar variaveis de elementos HTML 

        // homeImg = document.querySelector(".filmeplay__img");
        // homeInfo = document.querySelector(".filmeplay__info");

        // homeImg.classList.remove("is-hidde");
        // homeInfo.classList.remove("is-hidde");

        play.classList.remove("is-hidde");

        const ifram = document.querySelector("iframe")
        playvideo.removeChild(ifram)

        home.classList.remove("is-hidde");
        carousel.classList.remove("is-hidde");


        playFilme.classList.add("is-hidde");

    } else if (e.target.getAttribute("class") == "bx bxs-right-arrow") {

        // homeImg.classList.add("is-hidde");
        // homeInfo.classList.add("is-hidde");
        playvideo.classList.remove("is-hidde");

        play.classList.add("is-hidde");
        
        playvideo.innerHTML = state.iframe
    }
}

function CreateCarousel() {

    Filmes.forEach((element) => {
        if (element.categoria == "aventura") {
            // Create elements HTML
            const divProductList = document.createElement("div"); divProductList.classList.add("section04__product-list");
            const divProductContent = document.createElement("div"); divProductContent.classList.add("section04__product-content");
            const divWrapperImage = document.createElement("div"); divWrapperImage.classList.add("section04__wrapper-image");
            const imgProductImg = document.createElement("img"); imgProductImg.classList.add("section04__product-img");
            const imgProductImgClone = document.createElement("img"); imgProductImgClone.classList.add("section04__product-img-clone");
            const sectionNav = document.createElement("div"); sectionNav.classList.add("section04__nav");
            const btnNav = document.createElement("button"); btnNav.classList.add("section04__nav__btn");


            // Create Content dinamic
            imgProductImg.setAttribute("src", element["url-img"])
            imgProductImgClone.setAttribute("src", `${element["url-img"]}`);
            btnNav.innerHTML = "<span> > </span> Assistir";
            btnNav.onclick = (e) => {
                state.iframe = element.iframe
                filmePlay(e);
            }


            // Append Child 
            divContent.appendChild(divProductList);
            divProductList.appendChild(divProductContent);
            divProductContent.appendChild(divWrapperImage);
            divWrapperImage.appendChild(imgProductImg);
            divWrapperImage.appendChild(imgProductImgClone);
            divProductList.appendChild(sectionNav);
            sectionNav.appendChild(btnNav);
            console.log("primeiro cria")
        }
    })

}

pageHome.addEventListener("click", (e) => filmePlay(e))
homeInfo.addEventListener("click", (e) => filmePlay(e))

CreateCarousel();

// btnNav.addEventListener("click", (e) => {

//     state.iframe = element.iframe
//     filmePlay(e);


// });

}