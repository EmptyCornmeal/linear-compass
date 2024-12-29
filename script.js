let currentHeading = 0; // Initial heading in degrees
const compassBar = document.querySelector('.compass-bar');
const indicator = document.querySelector('.indicator');
const headingDisplay = document.getElementById('heading-display');

// Function to update the compass display
function updateCompass(heading) {
  const normalized = heading % 360; // Ensure heading stays within 0-359
  const offset = (normalized + 180) % 360 - 180; // Convert to -180 to 180 range
  const position = ((offset + 90) / 180) * 100; // Scale to 0-100 for the compass
  indicator.style.left = `${position}%`;
  headingDisplay.textContent = `Heading: ${normalized.toFixed(1)}°`;
}

// Drag functionality
let isDragging = false;
compassBar.addEventListener('mousedown', (event) => {
  isDragging = true;
  document.body.style.cursor = 'grabbing';
});

window.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  // Calculate heading based on cursor position
  const rect = compassBar.getBoundingClientRect();
  const x = event.clientX - rect.left; // Get cursor position within the compass bar
  const percentage = Math.min(Math.max(x / rect.width, 0), 1); // Clamp to [0, 1]
  currentHeading = (percentage * 180) - 90; // Map to -90 to 90 range
  updateCompass(currentHeading);
});

window.addEventListener('mouseup', () => {
  isDragging = false;
  document.body.style.cursor = 'default';
});

// Initialize the compass
updateCompass(currentHeading);
