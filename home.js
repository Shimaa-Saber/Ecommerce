
let pictures=["girl-slider.jpg","girl-slider (2).jpg","girl-slider (3).jpg","man-slider.jpg"];
imageURL="images/";
let img=document.getElementById("imgSlide");
let index=0;
function prev(){
  index--;
  index=((index%4)+4)%4;
  img.setAttribute("src",imageURL+pictures[index]);
  console.log(index);

}
function test(){
  console.log("hello");
}
let btnPrev=document.getElementById("prev");
btnPrev.onclick=test;

console.log("tota")