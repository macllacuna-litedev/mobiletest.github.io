const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function() {
    const drawingDataUrl = canvas.toDataURL();

    console.log(drawingDataUrl);
});

// Set canvas size to the screen size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

// Event listeners for touch and mouse input
canvas.addEventListener('mousedown', startDrawing);
canvas.addEventListener('touchstart', startDrawing);

canvas.addEventListener('mousemove', draw);
canvas.addEventListener('touchmove', draw);

canvas.addEventListener('mouseup', stopDrawing);
canvas.addEventListener('touchend', stopDrawing);
canvas.addEventListener('mouseout', stopDrawing);

function startDrawing(e) {
    drawing = true;
    draw(e); // To start drawing immediately at the initial touch/mouse click position
}

function draw(e) {
    if (!drawing) return;

    // Get the position of the touch or mouse event
    const x = e.clientX || e.touches[0].clientX;
    const y = e.clientY || e.touches[0].clientY;

    // Set drawing styles
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000'; // Black color

    // Draw a line to the current position
    ctx.lineTo(x, y);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Start a new path for the next drawing action
}