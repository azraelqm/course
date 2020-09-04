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











//**********VIDEO*************** */

// myapp.js
// response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");

var manifestUri =
    // 'https://storage.googleapis.com/shaka-demo-assets/angel-one/dash.mpd';
    // 'manifesturl.mpd';
    // 'cmaf4/manifest.mpd';
    // 'cmaf6/manifesturl.mpd';
    // 'ElephantsDream/stream.mpd'
    // 'https://drive.google.com/uc?export=download&id=1g0yEUW8jWQfrjcz7Y-fmOD8aKC24sasg';
    // 'https://drive.google.com/uc?export=download&id=1LPqBbNXrTltki7fXFCKZx72QlWyeQWoC';
    // 'videotss/index.m3u8';
    // 'https://googledrive.com/host/1LPqBbNXrTltki7fXFCKZx72QlWyeQWoC';

var invocation = new XMLHttpRequest();
var url = '"https://drive.google.com/';

function callOtherDomain(){
  if(invocation) {
    invocation.open('GET', url, true);
    invocation.withCredentials = true;
    invocation.onreadystatechange = handler;
    invocation.send();
  }
}

async function init() {
  // When using the UI, the player is made automatically by the UI object.
  const video = document.getElementById('video');

  video.setAttribute('crossorigin', 'anonymous');


  if (window.MediaSource) {
    var mediaSource = new MediaSource();
    // mediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E"; mediaOption=' + mediaOption);
    video.src = URL.createObjectURL(mediaSource);
    mediaSource.addEventListener('sourceopen', sourceOpen);
  } else {
    console.log("The Media Source Extensions API is not supported.")
  }

  function sourceOpen(e) {
    URL.revokeObjectURL(video.src);
    var mime = 'video/mp4';
    var mediaSource = e.target;
    var sourceBuffer = mediaSource.addSourceBuffer(mime);
    var videoUrl = 'droid.webm';
    fetch(videoUrl, {
      // NEW - add a Content-Type header
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
      .then(function(response) {
        return response.arrayBuffer();
      })
      .then(function(arrayBuffer) {
        sourceBuffer.addEventListener('updateend', function(e) {
          if (!sourceBuffer.updating && mediaSource.readyState === 'open') {
            mediaSource.endOfStream();
          }
        });
        sourceBuffer.appendBuffer(arrayBuffer);
      });
  }


  const ui = video['ui'];

  const config = {
    //addSeekBar: false, //para no mostrar barra de produccion
    // 'controlPanelElements': ['rewind', 'fast_forward'],
    'overflowMenuButtons' : ['cast']
  };
  ui.configure(config);
  // MediaSource.isTypeSupported('video/mp4; codecs="avc1.42E01E"; mediaOption=' + mediaOption);

  const controls = ui.getControls();
  const player = controls.getPlayer();

  // Listen for error events.
  player.addEventListener('error', onPlayerErrorEvent);
  controls.addEventListener('error', onUIErrorEvent);

  // Try to load a manifest.
  // This is an asynchronous process.
  try {
    await player.load(manifestUri);
    // This runs if the asynchronous load is successful.
    console.log('The video has now been loaded!');
  } catch (error) {
    onPlayerError(error);
  }
}

function onPlayerErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function onPlayerError(error) {
  // Handle player error
  console.error('Error code', error.code, 'object', error);
}

function onUIErrorEvent(errorEvent) {
  // Extract the shaka.util.Error object from the event.
  onPlayerError(event.detail);
}

function initFailed() {
  // Handle the failure to load
  console.error('Unable to load the UI library!');
}

// Listen to the custom shaka-ui-loaded event, to wait until the UI is loaded.
document.addEventListener('shaka-ui-loaded', init);
// Listen to the custom shaka-ui-load-failed event, in case Shaka Player fails
// to load (e.g. due to lack of browser support).
document.addEventListener('shaka-ui-load-failed', initFailed);


// let vidd = document.getElementById("videopp");

// var source = document.createElement('source');
// source.setAttribute('src', 'https://drive.google.com/uc?export=download&id=1LPqBbNXrTltki7fXFCKZx72QlWyeQWoC');

// vidd.appendChild(source);
