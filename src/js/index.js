// para admin cms 
import '../css/browse.css';
import '../css/single.css';
// import { saludar } from './carousel.js';
import  { Carousel }  from './carousel.js';


// const nombre = 'Fernando';

// saludar( nombre );
// saludar('Jefry');

//console.log(aprend);


// ---------- INICIO para admin de netlify
if (window.netlifyIdentity) {
  window.netlifyIdentity.on("init", user => {
    if (!user) {
      window.netlifyIdentity.on("login", () => {
        document.location.href = "/admin/";
      });
    }
  });
}
// ---------- Fin para dmin de netlify

// ---------- INICIO Para el Header autoplay y transparencia del nav
let videoheader = document.getElementById("hero-video");

// if (videoheader !== undefined){
  setTimeout(function () {
    // videoheader.play().then(()=>{
    //   // videoheader.play();
    // }).catch((e)=>{
    //   console.log('error videoHeader: ',e);
    // });
    videoheader.play();
  }, 3000);
// 
  
window.onscroll = function(){
  let header = document.querySelector('header');
  if (window.scrollY >100) {
      //console.log('scroll ',window.scrollY);
      header.style.backgroundColor = "black";//  css("background-color", "black");
      videoheader.pause();
  } else {
      header.style.backgroundColor = "transparent"; //header.css("background-color", "transparent");
      videoheader.play();
  }
}


// window.onscroll = function(){
//   let header = document.querySelector('header');
//   if (window.scrollY >100) {
//       header.style.backgroundColor = "black";//  css("background-color", "black");
      
//   } else {
//       header.style.backgroundColor = "transparent"; //header.css("background-color", "transparent");
      
//   }
// }
// ---------- FIN Para el Header autoplay y transparencia del nav


//VIDEO hover play
let figuras = document.querySelectorAll(".video");


figuras.forEach(fig => {
  let videocarousel = fig.querySelector(".video-item");
fig.addEventListener("mouseenter", function () {
    // console.log(fig.childNodes[1].nodeName)
    // fig.childNodes[1].nodeName.play();
    videocarousel.play()
    videocarousel.muted = false;
})

fig.addEventListener("mouseleave", function () {
    videocarousel.pause();
    videocarousel.load();
    videocarousel.muted = true;
})
});


// Inicio de carousel
let btnNext = document.querySelector(".btnNext");
let btnPrev = document.querySelector(".btnPrev");
//let imgn = document.querySelector(".car_item img");
//btnPrev.style.height = imgn.style.height;
//let imgnhe = imgn.offsetHeight;
//btnPrev.style.height = (parentHeight) + 'px';
//btnPrev.style.height = imgnhe + 'px';
//console.log("asd ",imgnhe);


const carouselas = new Carousel({
    selector: ".car",
    rowSize: 5,
    responsive: [
        {
            breakpoint: 0,
            items: 2
        },
        {
            breakpoint: 768,
            items: 5
        },
        {
            breakpoint: 1485,
            items: 6
        }
    ]
});
carouselas.initialize();
// carouselas.goTo("7") // opcion para ir a un item exacto

btnNext.addEventListener("click", e=>{
    console.log("clickeaste");
    //carousel.goto("next");
    carouselas.goTo("next")
});

btnPrev.addEventListener("click", e=>{
    //console.log("clickeaste2");
    //carousel.goto("next");

    carouselas.goTo("previous")

  //   carouselas.reInitialize({ //opcion ppara reiniciar
  //     selector: ".car",
  //     rowSize: 5,
  //     responsive: [
  //         {
  //             breakpoint: 0,
  //             items: 2
  //         },
  //         {
  //             breakpoint: 768,
  //             items: 3
  //         },
  //         {
  //             breakpoint: 1485,
  //             items: 6
  //         }
  //     ]
  // });

  // console.log(carouselas.eventArray);
  // console.log("--------------");
  // console.log(carouselas.eventArray[0].eventName); 
  

  // carouselas.eventArray.forEach(function(val, index, array) {
  //   console.log("val ", val, "index ", index, "array ",array);
  //   val.el.addEventListener("click", e=>{
  //     console.log("ahora click ",index);
  //   })
  // });

  // carouselas.eventArray[0].el.addEventListener()
  
  
});

// carouselas.eventArray[0].addEventListener("click",e=>{
//   console.log("CLICKE1ERRR");
// })
// carouselas



var carousel2 = new Carousel({
  selector: ".car2",
  rowSize: 5
});
carousel2.initialize();
// ---------- Fin de carousel