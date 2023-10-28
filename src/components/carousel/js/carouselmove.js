"use strict"
export function CarouselMove() {

    const listCarousel = document.querySelector('.section04__content');
    const productList = document.querySelectorAll('.section04__product-list');
    let productContent = document.querySelectorAll('.section04__product-content');

    const state = {
        starting_point: 0,
        current_point: 0,
        movement_point: 0,
        salved_position: 0,
        current_slide_index: 0,
        widthWindow: 0
    }

    function calcWidthViewPort() {

        let position = productList[state.current_slide_index].offsetLeft;
        state.salved_position = -position;
        translateX(-position);
    }

    function setVisibleSlide({ event }) {

        listCarousel.style.transition = `transform 0.35s`;
        let position = productList[state.current_slide_index].offsetLeft;;

        translateX(-position);
        state.salved_position = -position;
    }


    function translateX(position) {
        listCarousel.style.transform = `translateX(${position}px)`;
    }

    function nextSlide({ event }) {

        setVisibleSlide({ event: event })
    }

    function previouSlide({ event }) {

        setVisibleSlide({ event: event });
    }

    function removeEvents(event) {
        const slide_item = event.currentTarget;
        slide_item.removeEventListener("mousemove", mouseMove);
        productContent.forEach(element => {
            element.removeEventListener("mousemove", mouseMove);
        });
    }

    function mouseDown(event, index) {

        state.starting_point = event.clientX;
        const slide_item = event.target.parentNode.parentNode;

        slide_item.addEventListener("mousemove", mouseMove);
        slide_item.addEventListener("touchmove", touchMove);
    }

    function mouseMove(event) {
        state.current_point = event.clientX - state.starting_point;
        state.movement_point = state.current_point + state.salved_position;
        listCarousel.style.transition = `none`;
        listCarousel.style.transform = `translateX(${state.movement_point}px)`;
    }

    function mouseUp(event, index) {
        removeEvents(event);

        state.widthWindow = window.innerWidth;
        state.current_slide_index = index;
        let position = productList[index].offsetLeft;;
        if (index == 0) {
            previouSlide({ evente: event })
        }

        if (state.current_point > 30 && !index == 0) {

            if (state.widthWindow > 900) {

                if (index == 0 || index == 1 || index == 2) {
                    state.current_slide_index = 0;
                } else {
                    state.current_slide_index = index - 3;
                }

            } else if (state.widthWindow > 700) {

                if (index == 0 || index == 1) {
                    state.current_slide_index = 0;
                } else {
                    state.current_slide_index = index - 2;
                }

            } else if (state.widthWindow > 300) {
                state.current_slide_index--
            }
            previouSlide({ event: event });
        }

        if (state.current_point < -50) {

            position = productList[index].offsetLeft;

            if (position >= productList[productList.length - 3].offsetLeft && state.widthWindow > 900) {
                state.current_slide_index = (productList.length - 4)

            } else if (position >= productList[productList.length - 2].offsetLeft && state.widthWindow > 700) {
                state.current_slide_index = (productList.length - 3)

            } else if (position >= productList[productList.length - 1].offsetLeft && state.widthWindow > 300) {
                state.current_slide_index = (productList.length - 2)

            }
            nextSlide({ event: event });
        }
    }

    function touchStart(event, index) {
        event = event.targetTouches[0];
        mouseDown(event, index);
    }

    function touchMove(event) {
        event = event.targetTouches[0];
        mouseMove(event);
    }

    function touchEnd(event, index) {
        event = event;
        mouseUp(event, index);
    }

    function setListeners(params) {
        productContent.forEach((slide_item, index) => {

            slide_item.addEventListener("dragstart", e => e.preventDefault());
            slide_item.addEventListener("mousedown", event => mouseDown(event, index));
            slide_item.addEventListener("mouseup", event => mouseUp(event, index));

            slide_item.addEventListener("touchstart", event => touchStart(event, index));
            slide_item.addEventListener("touchend", event => touchEnd(event, index));

        });

        window.addEventListener('resize', calcWidthViewPort);

    }
    setListeners();

    /*------- Efects Hover -------*/
    let img = document.querySelectorAll('.section04__product-img');
    let imageWrapper = document.querySelectorAll('.section04__wrapper-image');



    function setListenersAnimate() {
        console.log(imageWrapper)

        imageWrapper.forEach((element, index) => {
            element.addEventListener('mouseover', (divImage) => {
                element.children[1].style.cssText = ` 
                transition: 1s;
                animation: animate 0.5s ease-in-out both;
                filter: brightness(1.1) opacity(1);
                cursor: point;
                `;
            });
            element.addEventListener('mouseleave', (divImage) => {
                divImage.target.style.transition = `transform 2s`;
                divImage.target.children[1].style.cssText = `
                animation: animate-out 0.5s ease-in-out both;
                filter: brightness(1.1) opacity(1);
            `;

            });
        });
    }

    function callListenersAnimate() {
        setListenersAnimate();

    };
    callListenersAnimate();
}