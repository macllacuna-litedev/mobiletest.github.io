const canvas = document.getElementById('drawingCanvas');
const ctx = canvas.getContext('2d');
let drawing = false;

const submitButton = document.getElementById('submitButton');

submitButton.addEventListener('click', function() {
    var imageDataURL = canvas.toDataURL('image/png');

    var image = new Image();

    image.src = imageDataURL;
});

// Set initial canvas size
updateCanvasSize();

// Update canvas size when the window is resized
window.addEventListener('resize', updateCanvasSize);

function updateCanvasSize() {
    const fixedWidth = 800;
    const fixedHeight = 800;

    canvas.width = fixedWidth;
    canvas.height = fixedHeight;
}

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

    // Get the position of the canvas on the page
    const canvasRect = canvas.getBoundingClientRect();

    // Calculate the mouse or touch coordinates relative to the canvas
    const x = (e.clientX || e.touches[0].clientX) - canvasRect.left;
    const y = (e.clientY || e.touches[0].clientY) - canvasRect.top;

    // Set drawing styles
    ctx.lineWidth = 5;
    ctx.lineCap = 'round';
    ctx.strokeStyle = '#000'; // Black color

    // Draw a line to the current position using scaled coordinates
    ctx.lineTo(x * (canvas.width / canvas.offsetWidth), y * (canvas.height / canvas.offsetHeight));
    ctx.stroke();

    // Start a new path for the next drawing action
    ctx.beginPath();
    ctx.moveTo(x * (canvas.width / canvas.offsetWidth), y * (canvas.height / canvas.offsetHeight));
}

function stopDrawing() {
    drawing = false;
    ctx.beginPath(); // Start a new path for the next drawing action
}