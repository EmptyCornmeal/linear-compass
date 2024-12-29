const compass = document.querySelector('.compass');
const points = document.querySelector('.points');
const dragBox = document.querySelector('.drag-box');

// Variables to Track Dragging
let isDragging = false;
let startX = 0;
let currentOffset = 0; // Tracks the current left offset of the points container

// Handle Drag Start
dragBox.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX; // Get the initial mouse X position
  dragBox.style.cursor = 'grabbing'; // Change cursor to grabbing
});

// Handle Drag Movement
window.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - startX; // Calculate drag distance
  const newOffset = currentOffset + deltaX; // Update offset
  points.style.left = `${newOffset}px`; // Move the points

  // Wrap Around for Infinite Scrolling
  const pointsWidth = points.offsetWidth / 2; // Half the width for wraparound
  if (newOffset > pointsWidth) {
    currentOffset = -pointsWidth;
  } else if (newOffset < -pointsWidth) {
    currentOffset = pointsWidth;
  }
});

// Handle Drag End
window.addEventListener('mouseup', () => {
  isDragging = false;
  currentOffset = parseFloat(points.style.left) || 0; // Save current offset
  dragBox.style.cursor = 'grab'; // Reset cursor
});
