let changeContrast = document.getElementById("changeContrast");
let changeHue = document.getElementById("changeHue");
let changeBlur = document.getElementById("changeBlur");
let sizeChange = document.getElementById("sizeChange");
let opacityChange = document.getElementById("opacityChange");

let contrastInput = document.getElementById("contrastInput");
let hueInput = document.getElementById("hueInput");
let blurInput = document.getElementById("blurInput");

let sizeInput = document.getElementById("sizeInput");
let opacityInput = document.getElementById("opacityInput");


contrastInput.innerHTML = contrast+" %";
hueInput.innerHTML = hueRotation+" deg";
blurInput.innerHTML = bluring+" px";
opacityInput.innerHTML = opacity*100+" %";
sizeInput.innerHTML = draw_width+" px";


changeContrast.addEventListener('input', function () {
    contrastInput.innerHTML = contrast+" %";
});

changeHue.addEventListener('input', function () {
    hueInput.innerHTML = hueRotation+" deg";
});

changeBlur.addEventListener('input', function () {
    blurInput.innerHTML = bluring+" px";
});

sizeChange.addEventListener('input', function () {
    sizeInput.innerHTML = draw_width+" px";
});

opacityChange.addEventListener('input', function () {
    opacityInput.innerHTML = opacity*100+" %";
});