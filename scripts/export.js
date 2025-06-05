
// record canvas
let recording = true;
const canvasStream = canvas.captureStream();
const mediaRecorder = new MediaRecorder(canvasStream, {
  mimeType: "video/webm",
});

let chunks = [];

mediaRecorder.ondataavailable = (e) => {
  if (e.data.size > 0) chunks.push(e.data);
};

mediaRecorder.onstop = () => {
  const blob = new Blob(chunks, { type: "video/webm" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "canvas-recording.webm";
  a.click();
  chunks = [];
};
var recordingButton = document.getElementById("recordingButton");
var recordButton = document.getElementById("recordButton");
var recorderButton = document.getElementById("recorderButton");

recordingButton.style.display = "none"; // change style in js
recordButton.style.display = "block"; //


function startOrStopRecording() {
  if (recording) {
    mediaRecorder.start();
    recordButton.style.display = "none";
    recordingButton.style.display = "block";
    recorderButton.style.backgroundColor="red";
  } else {
    mediaRecorder.stop();
    recordingButton.style.display = "none";
    recordButton.style.display = "block";
    recorderButton.style.backgroundColor="black";
  }
  recording = !recording;
}

//export image
function exportPNG() {
    let canvasUrl = canvas.toDataURL("image/png", 0.5);
    console.log(canvasUrl);
    const createEl = document.createElement("a");
    createEl.href = canvasUrl;
    createEl.download = "download-this-canvas";
    createEl.click();
    createEl.remove();
  }
  ////////////////////////////