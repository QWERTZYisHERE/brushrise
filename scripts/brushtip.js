const brushCursor = document.getElementById('brush-cursor');
const canvasBrush = document.getElementById('canvas');
var previewImg = document.getElementById("picture");


canvasBrush.addEventListener('mousemove', (e) => {
    brushCursor.style.display = 'block';
    const rect = canvasBrush.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;
    brushCursor.appendChild(previewImg);

    brushCursor.style.left = x + "px";
    brushCursor.style.top = y + "px";

    if(brush == 0 || brush == 1){
        brushCursor.style.width = draw_width + "px";
        brushCursor.style.height = draw_width + "px";

        brushCursor.style.borderRadius = "50%";


    }else if(brush == 2){
        brushCursor.style.width = (draw_width * (picture.naturalWidth / picture.naturalHeight)) + "px";
        brushCursor.style.height = draw_width + "px";

        brushCursor.style.borderRadius = "1%";

    }else if(brush == 3){
        brushCursor.style.width = (draw_width * (video.videoWidth / video.videoHeight))+ "px";
        brushCursor.style.height = draw_width + "px";

        brushCursor.style.borderRadius = "1%";

    }else if(brush == 4){
        brushCursor.style.width = (draw_width * (webcamVideo.videoWidth / webcamVideo.videoHeight)) + "px";
        brushCursor.style.height = draw_width + "px";

        brushCursor.style.borderRadius = "1%";

    }

    brushCursor.style.border = `"1px solid ${draw_color}`;
});

canvasBrush.addEventListener('mouseleave', () => {
    brushCursor.style.display = 'none';
});

