const compass = document.querySelector('.compass');
const points = document.querySelector('.points');
const dragBox = document.querySelector('.drag-box');

// Variables to Track Dragging
let isDragging = false;
let startX = 0;
let currentOffset = 0; // Tracks the current offset for seamless wrapping
const pointsWidth = points.offsetWidth / 2; // Half the width for wrapping

// Handle Drag Start
dragBox.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX; // Get the initial mouse X position
  dragBox.style.cursor = 'grabbing'; // Change cursor to grabbing
  event.preventDefault(); // Prevent text selection
});

// Handle Drag Movement
window.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - startX; // Difference in mouse movement
  currentOffset += deltaX; // Update the offset
  startX = event.clientX; // Reset the start position
  points.style.transform = `translateX(${currentOffset}px)`; // Move the compass

  // Seamless Wrapping Logic
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
