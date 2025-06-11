const canvas = document.getElementById("canvas");
canvas.width = 500; // add a scaler/slider
canvas.height = 500;

let video = document.getElementById("video");

let context = canvas.getContext("2d");

let picture = document.getElementById("picture");
let start_background_color = "white";
context.fillStyle = start_background_color;
//context.fillRect(0, 0, canvas.width, canvas.height);

let webcamVideo = document.getElementById("webcamVideo");


// div as a brush tip;

let draw_color = "rgba(0, 0, 0)";
let draw_width = "2";
let is_drawing = false;
let opacity = 1;
let brush = 0;
let contrast = 100;
let hueRotation = 0;
let bluring = 0;
let setComp = 0;

//video.setAttribute("style", "display: filter: hue-rotate("+ hueRotation +"deg);");
// picture.setAttribute("style", "display: filter: hue-rotate("+ hueRotation +"deg);");
// webcamVideo.setAttribute("style", "display: filter: hue-rotate("+ hueRotation +"deg);");



let restore_array = [];
let redo_array = [];

let index = -1;
restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
index += 1;

// canvas resize
canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px";
canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";

document.getElementById("canvasWidth").addEventListener(
  "input",
  function () {
    canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px";
    canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";
  },
  false
);

document.getElementById("canvasHeight").addEventListener(
  "input",
  function () {
    canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px";
    canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";
  },
  false
);

window.addEventListener("resize", () => {
  canvas.style.left = (window.innerWidth - canvas.width) / 2 + "px";
  canvas.style.top = (window.innerHeight - canvas.height) / 2 + "px";
});
////////////

canvas.addEventListener("mousedown", start, false);
canvas.addEventListener("mousemove", handleDraw, false);
canvas.addEventListener("mouseup", stop, false);
canvas.addEventListener("mouseout", stop, false);

canvas.addEventListener("touchstart", start, false);
canvas.addEventListener("touchmove", handleDraw, false);
canvas.addEventListener("touchend", stop, false);

document.getElementById("inputVideo").addEventListener("change", function () {
  var mediaVideo = URL.createObjectURL(this.files[0]);
  var video = document.getElementById("video");
  video.src = mediaVideo;
  video.style.display = "hidden";
  video.play();
});

document.getElementById("inputImage").addEventListener("change", function () {
  var mediaImage = URL.createObjectURL(this.files[0]);
  var picture = document.getElementById("picture");
  picture.src = mediaImage;
  picture.style.display = "hidden";
});

function change_color(element) {
  draw_color = element.style.background;
}

document.getElementById("inputVideo").setAttribute("style", "display: none;");
document.getElementById("inputImage").setAttribute("style", "display: none;");

function setBrush() {
  brush = document.getElementById("brushes").selectedIndex;
  // use as a setup for each brush
  if (brush == 4) {
    document.getElementById("inputVideo").setAttribute("style", "display: none;");
    document.getElementById("inputImage").setAttribute("style", "display: none;");
    startCam();
  } else if (brush == 3) {
    document.getElementById("inputVideo").setAttribute("style", "display: block;");
    document.getElementById("inputImage").setAttribute("style", "display: none;");
    stopCam();

  } else if (brush == 2) {
    document.getElementById("inputVideo").setAttribute("style", "display: none;");
    document.getElementById("inputImage").setAttribute("style", "display: block;");
    stopCam();

  } else if (brush == 1) {
    document.getElementById("inputVideo").setAttribute("style", "display: none;");
    document.getElementById("inputImage").setAttribute("style", "display: none;");
    stopCam();
    console.log("erasing");

  } else if (brush == 0) {
    document.getElementById("inputVideo").setAttribute("style", "display: none;");
    document.getElementById("inputImage").setAttribute("style", "display: none;");
    stopCam();
  }
}

function setComposition() {
  setComp = document.getElementById("setting").selectedIndex;
  const gco = [
    "source-over",
    "xor",
    "source-atop",
    "source-in",
    "source-out",
    "lighter",
    "multiply",
    "screen",
    "overlay",
    "darken",
    "lighten",
    "color-dodge",
    "color-burn",
    "hard-light",
    "soft-light",
    "difference",
    "exclusion",
    "hue",
    "saturation",
    "color",
    "luminosity",
  ];

  for (let i = 0; i <= setComp; i++) {
    if (setComp == i) {
      return gco[i];

    }
    // }
    // if(setComp == 0){
    //   return "source-over"
    // }else if (setComp == 1){
    //   return "xor"
    // }else if (setComp == 2){
    //   return "source-atop"
    // }
  }
}

function handleDraw(event) {
  context.globalCompositeOperation = setComposition();
  var x = brush; //document.getElementById("brushes").selectedIndex;
  context.globalAlpha = opacity;
  console.log(draw_color);

  if (x == 3) {
    drawVideo(event);

  } else if (x == 2) {
    drawPicture(event);

  } else if (x == 1) {
    eraser(event);
    draw(event);

  } else if (x == 4) {
    drawVideoCam(event);

  } else if (x == 0) {
    draw(event);

  }
}

function start(event) {
  // what exactly does event make?
  is_drawing = true;
  const { x, y } = getEventPosition(event);
  context.beginPath();
  context.moveTo(x, y);
  event.preventDefault();
}

function draw(event) {
  if (!is_drawing) return;
  const { x, y } = getEventPosition(event);
  clear_redo();

  context.filter = `hue-rotate(${hueRotation}deg) contrast(${contrast}%) blur(${bluring}px)`;
  context.lineTo(x, y);
  context.strokeStyle = draw_color;
  context.lineWidth = draw_width;
  context.lineCap = "round";
  context.lineJoin = "round";
  context.stroke();
  event.preventDefault();
  context.filter = "none";
}


//////////////////////////////////////////////
var stopCam = function () { // doesnt work
  console.log("stop cam");
  var stream = webcamVideo.srcObject;
  console.log(stream);
  var tracks = stream.getTracks();
  for (var i = 0; i < tracks.length; i++) {
    tracks[i].stop();
  }
  webcamVideo.srcObject = null;
}
var startCam = function () {
  console.log("start cam");
  if (navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ video: true })
      .then(function (stream) {
        webcamVideo.srcObject = stream;
        webcamVideo.addEventListener('loadedmetadata', () => {
          // webcam loaded....
        });
      }).catch(function (error) {
        console.log("Something went wrong!");
      });
  }
}


////// brushes /////////////////////////////////////////////////////////////

function eraser(event) {
  if (!is_drawing) return;
  context.globalCompositeOperation = "destination-out"; // finding out more
  clear_redo();
}



function drawVideo(event) {
  if (!is_drawing) return;
  const { x, y } = getEventPosition(event);
  clear_redo();

  context.filter = `hue-rotate(${hueRotation}deg) contrast(${contrast}%) blur(${bluring}px)`;
  context.drawImage(
    video,
    x - (draw_width * (video.videoWidth / video.videoHeight)) / 2,
    y - draw_width / 2,
    draw_width * (video.videoWidth / video.videoHeight),
    draw_width
  );
  context.filter = "none";
  event.preventDefault();
}




function drawVideoCam(event) {
  if (!is_drawing) return;
  const { x, y } = getEventPosition(event);
  clear_redo();



  context.filter = `hue-rotate(${hueRotation}deg) contrast(${contrast}%) blur(${bluring}px)`;
  context.drawImage(
    webcamVideo,
    x - (draw_width * (webcamVideo.videoWidth / webcamVideo.videoHeight)) / 2,
    y - draw_width / 2,
    draw_width * (webcamVideo.videoWidth / webcamVideo.videoHeight),
    draw_width
  );
  context.filter = "none";
  event.preventDefault();
}



function drawPicture(event) {
  if (!is_drawing) return;
  const { x, y } = getEventPosition(event);
  clear_redo();

  context.filter = `hue-rotate(${hueRotation}deg) contrast(${contrast}%) blur(${bluring}px)`;
  context.drawImage(
    picture,
    x - (draw_width * (picture.naturalWidth / picture.naturalHeight)) / 2,
    y - draw_width / 2,
    draw_width * (picture.naturalWidth / picture.naturalHeight),
    draw_width
  );
  context.filter = "none";

}
//////////////////////////////////////////////////////////////////////////////





/////////////////////////////////////////////////////////////////////////////

function stop(event) {
  if (is_drawing) {
    context.stroke();
    context.closePath();
    is_drawing = false;
  }

  if (event.type !== "mouseout") {
    restore_array.push(context.getImageData(0, 0, canvas.width, canvas.height));
    index += 1;
  }

  event.preventDefault();
}

function getEventPosition(event) {
  let x, y;
  if (event.touches && event.touches.length > 0) {
    x = event.touches[0].clientX - canvas.offsetLeft;
    y = event.touches[0].clientY - canvas.offsetTop;
  } else {
    x = event.clientX - canvas.offsetLeft;
    y = event.clientY - canvas.offsetTop;
  }
  return { x, y };
}

function clear_canvas() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillStyle = start_background_color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  restore_array = [];
  index = -1;
}

function clear_redo() {
  redo_array = [];
}

function undo_last() {
  if (index > 0) {
    //clear_canvas();
    //} else {
    index -= 1;
    redo_array.push(restore_array[restore_array.length - 1]);
    restore_array.pop();
    context.putImageData(restore_array[index], 0, 0); // ?

    console.log(restore_array.length + " undo length");
    console.log(restore_array + " undo button");
    console.log(redo_array.length + " redo length");


  }
}

function redo_last() {
  index += 1;
  console.log(redo_array.length + " redo length"); //
  console.log(redo_array + " redo button"); //
  console.log(restore_array.length + " undo length");

  restore_array.push(redo_array[redo_array.length - 1]);
  context.putImageData(restore_array[restore_array.length - 1], 0, 0);

  redo_array.pop(); // how to redo?



}