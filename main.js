var momentumID;
var carousel;
var imageLocations = [];


function momentumScroll(){
    carousel.scrollLeft += scrollVelocity;
    scrollVelocity *= 0.95;
    if (!imageLocations.includes(carousel.scrollLeft)){    
        if (Math.abs(scrollVelocity) > 0.5){       
            momentumID = requestAnimationFrame(momentumScroll);
        }
    }
}

document.addEventListener("DOMContentLoaded", function() {

    for (let image of document.getElementsByClassName("carouselImage")) {
        imageLocations.push(image.x);
    }

    carousel = document.querySelector(".carouselContainer")
    let startPosition;
    let scrollLeft;
    let carouselBeingClicked = false;

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
