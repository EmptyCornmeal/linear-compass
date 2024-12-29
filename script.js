// Variables
let currentHeading = 0; // Initial heading
const compassBar = document.querySelector('.compass-bar');
const indicator = document.querySelector('.indicator');
const headingDisplay = document.getElementById('heading-display');
const measureLines = document.querySelector('.measure-lines');

// Function to Create Measure Lines and Labels
function createMeasureLines() {
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  // Clear previous labels
  measureLines.innerHTML = '';

  // Dynamically add 5 visible labels for the 180-degree range
  for (let i = 0; i < 5; i++) {
    const label = document.createElement('span');
    label.className = 'label';
    label.textContent = directions[i];
    label.style.left = `${(i / 4) * 100}%`; // Distribute evenly
    measureLines.appendChild(label);
  }
}

// Function to Update Compass and Labels
function updateCompass(heading) {
  const normalized = heading % 360; // Normalize heading to 0-359
  const offset = ((normalized + 180) % 360 - 180) + 90; // Offset for 0-180 range
  const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];

  // Update indicator position
  indicator.style.left = `${(offset / 180) * 100}%`;

  // Update heading display
  headingDisplay.textContent = `Heading: ${normalized.toFixed(1)}°`;

  // Update visible direction labels
  const startIndex = Math.round((normalized - 90 + 360) % 360 / 45);
  const labels = measureLines.querySelectorAll('.label');
  for (let i = 0; i < labels.length; i++) {
    const directionIndex = (startIndex + i) % directions.length;
    labels[i].textContent = directions[directionIndex];
  }
}

// Drag Functionality
let isDragging = false;
compassBar.addEventListener('mousedown', () => {
  isDragging = true;
  document.body.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  // Calculate heading based on cursor position
  const rect = compassBar.getBoundingClientRect();
  const x = event.clientX - rect.left; // Cursor position relative to compass
  const percentage = Math.min(Math.max(x / rect.width, 0), 1); // Clamp to [0, 1]
  currentHeading = (percentage * 180) - 90; // Map to -90 to 90 range
  updateCompass(currentHeading);
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.style.cursor = 'default';
});

// Initialize Compass
createMeasureLines();
updateCompass(currentHeading);
