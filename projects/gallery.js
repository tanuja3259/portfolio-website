const images = document.querySelectorAll(".screenshots img");

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");

const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".prev");
const nextBtn = document.querySelector(".next");

let currentIndex = 0;
let zoomed = false;

function openImage(index){

    currentIndex = index;

    lightbox.style.display = "flex";

    lightboxImg.src = images[index].src;

    lightboxImg.style.transform = "scale(1)";

    zoomed = false;
}

images.forEach((img,index)=>{

    img.addEventListener("click",()=>{

        openImage(index);

    });

});

closeBtn.addEventListener("click",()=>{

    lightbox.style.display="none";

});

nextBtn.addEventListener("click",()=>{

    currentIndex++;

    if(currentIndex >= images.length){

        currentIndex = 0;

    }

    lightboxImg.src = images[currentIndex].src;

});

prevBtn.addEventListener("click",()=>{

    currentIndex--;

    if(currentIndex < 0){

        currentIndex = images.length - 1;

    }

    lightboxImg.src = images[currentIndex].src;

});

/* Double Click Zoom */

lightboxImg.addEventListener("dblclick",()=>{

    if(!zoomed){

        lightboxImg.style.transform = "scale(2)";
        zoomed = true;

    }else{

        lightboxImg.style.transform = "scale(1)";
        zoomed = false;
    }

});

/* Keyboard Controls */

document.addEventListener("keydown",(e)=>{

    if(lightbox.style.display !== "flex")
        return;

    if(e.key==="ArrowRight")
        nextBtn.click();

    if(e.key==="ArrowLeft")
        prevBtn.click();

    if(e.key==="Escape")
        closeBtn.click();

});

/* Click outside image */

lightbox.addEventListener("click",(e)=>{

    if(e.target === lightbox){

        lightbox.style.display = "none";

    }

});