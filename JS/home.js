document.addEventListener("DOMContentLoaded", () => {
  let pictures = [
    "./images/girl-slider.jpg",
    "./girl-slider-2.jpg",
    "./girl-slider-3.jpg",
    "./images/man-slider.jpg"
  ];
  let currentIndex=0;

  let img = document.getElementById("imgSlide");
  let btnPrev = document.getElementById("prev");
  let btnNext = document.getElementById("next");
 

  function prev() {
      currentIndex = (currentIndex - 1 + pictures.length) % pictures.length;
      img.src = pictures[currentIndex];
  }

  function next() {
      currentIndex = (currentIndex + 1) % pictures.length;
      img.src = pictures[currentIndex];
  }



  function autoSlide() {
    currentIndex = (currentIndex + 1) % pictures.length;
    img.src = pictures[currentIndex];
  }

  
  setInterval(autoSlide, 3000);

  btnPrev.addEventListener("click", prev);
  btnNext.addEventListener("click", next);
});