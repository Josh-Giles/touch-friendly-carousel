var momentumID;
var carousel;
var imageLocations = [];
var approxImageLocations = [];


function momentumScroll(){
    carousel.scrollLeft += scrollVelocity;
    scrollVelocity *= 0.95;

    if (approxImageLocations.includes(Math.round(carousel.scrollLeft/100)*100)) {
        scrollToNearest(carousel.scrollLeft);
    }
    else if (Math.abs(scrollVelocity) > 0.5){       
        momentumID = requestAnimationFrame(momentumScroll);
    }
    else{
        scrollToNearest(carousel.scrollLeft);
    }
}

function scrollToNearest(currentScrollPosition){
    const output = imageLocations.reduce((prev, curr) => Math.abs(curr - currentScrollPosition) < Math.abs(prev - currentScrollPosition) ? curr : prev);
    carousel.scroll({top:0, left:output, behavior:'smooth'}); 
}

document.addEventListener("DOMContentLoaded", function() {

    carousel = document.querySelector(".carouselContainer")
    let startPosition;
    let scrollLeft;
    let carouselBeingClicked = false;

    for (let image of document.getElementsByClassName("carouselImage")) {
        imageLocations.push(image.offsetLeft);
        approxImageLocations.push(Math.round(image.offsetLeft/100)*100)
    }

    carousel.addEventListener("mousedown", function(event){
        carouselBeingClicked = true;
        carousel.classList.add("grabbing");
        startPosition = event.pageX - carousel.offsetLeft
        scrollLeft = carousel.scrollLeft
        cancelAnimationFrame(momentumID); 
    });

    carousel.addEventListener("mouseup", function(){
        carouselBeingClicked = false;
        carousel.classList.remove("grabbing");
        cancelAnimationFrame(momentumID);
        momentumID = requestAnimationFrame(momentumScroll)
    });

    carousel.addEventListener("mouseleave", function(){
        carouselBeingClicked = false;
        carousel.classList.remove("grabbing");
    });

    carousel.addEventListener("mousemove", function(event){
        if (carouselBeingClicked){
            event.preventDefault();
            const currentPosition = event.pageX - carousel.offsetLeft;
            const amountToScroll = (currentPosition - startPosition) * 1.1;
            var previousLeftScroll = carousel.scrollLeft;
            carousel.scrollLeft = scrollLeft - amountToScroll;
            scrollVelocity = carousel.scrollLeft - previousLeftScroll;         
        }
    })
});
