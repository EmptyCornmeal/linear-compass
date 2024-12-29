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
  currentOffset += deltaX; // Update offset
  startX = event.clientX; // Reset start position
  points.style.left = `${currentOffset}px`; // Move the points

  // Seamless Looping
  const pointsWidth = points.offsetWidth / 2; // Half the width for wraparound
  if (currentOffset > 0) {
    currentOffset -= pointsWidth; // Wrap backward when scrolling left
  } else if (currentOffset < -pointsWidth) {
    currentOffset += pointsWidth; // Wrap forward when scrolling right
  }
});

// Handle Drag End
window.addEventListener('mouseup', () => {
  isDragging = false;
  dragBox.style.cursor = 'grab'; // Reset cursor
});
