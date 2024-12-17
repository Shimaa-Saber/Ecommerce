let prevbtn = document.getElementById('prev');
let nextbtn = document.getElementById('next');



let sliderImg = 0;
let img = document.getElementById("slider-img");
let slider = document.getElementsByTagName("header");



var interval;

interval = setInterval(next, 3000);


 slider[0].addEventListener('mouseenter',()=>clearInterval(interval));   
 nextbtn.addEventListener('mouseenter',()=>clearInterval(interval));
 prevbtn.addEventListener('mouseenter',()=>clearInterval(interval));
 slider[0].addEventListener('mouseleave',()=>interval = setInterval(next, 3000));
 function next() {
    sliderImg++;
    sliderImg = ((sliderImg % 3) + 3) % 3;
    img.setAttribute("src", `images/${sliderImg}.jpg`);
}
function prev(){

    sliderImg--;
    sliderImg = ((sliderImg % 3) + 3) % 3;
    img.setAttribute("src", `images/${sliderImg}.jpg`);
}




nextbtn.addEventListener('click', next);


prevbtn.addEventListener('click',prev);