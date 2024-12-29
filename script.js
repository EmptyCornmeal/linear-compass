const compass = document.querySelector('.compass');
const points = document.querySelector('.points');

// Variables to track drag position
let isDragging = false;
let startX = 0;
let currentOffset = 0; // Tracks the current left offset of the points container

// Handle drag start
compass.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX; // Get initial mouse X position
  compass.style.cursor = 'grabbing'; // Change cursor to grabbing
});

// Handle drag movement
window.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - startX; // Difference between current and starting position
  const newOffset = currentOffset + deltaX; // Update offset dynamically
  points.style.left = `${newOffset}px`; // Move the points container

  // Optional: Wrap around to create an infinite loop effect
  const pointsWidth = points.offsetWidth;
  if (newOffset > pointsWidth / 2) {
    currentOffset = -pointsWidth / 2; // Reset offset to start
  } else if (newOffset < -pointsWidth / 2) {
    currentOffset = pointsWidth / 2; // Reset offset to end
  }
});

// Handle drag end
window.addEventListener('mouseup', () => {
  isDragging = false;
  currentOffset = parseFloat(points.style.left) || 0; // Save current offset
  compass.style.cursor = 'grab'; // Reset cursor
});
