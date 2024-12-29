const points = document.querySelector('.points');
const dragBox = document.querySelector('.drag-box');

// Variables to Track Dragging
let isDragging = false;
let startX = 0;
let currentOffset = 0;

// Handle Drag Start
dragBox.addEventListener('mousedown', (event) => {
  isDragging = true;
  startX = event.clientX; // Initial mouse X position
  dragBox.style.cursor = 'grabbing'; // Change cursor to grabbing
  event.preventDefault(); // Prevent text selection
});

// Handle Drag Movement
window.addEventListener('mousemove', (event) => {
  if (!isDragging) return;

  const deltaX = event.clientX - startX; // Calculate horizontal movement
  startX = event.clientX; // Reset the start position
  currentOffset += deltaX; // Update the offset
  points.style.transform = `translateX(${currentOffset}px)`; // Move the compass

  // Seamless Looping
  const pointsWidth = points.scrollWidth / 2; // Half the width for seamless wrapping
  if (currentOffset > pointsWidth) {
    currentOffset -= pointsWidth; // Wrap backward
  } else if (currentOffset < -pointsWidth) {
    currentOffset += pointsWidth; // Wrap forward
  }
});

// Handle Drag End
window.addEventListener('mouseup', () => {
  isDragging = false;
  dragBox.style.cursor = 'grab'; // Reset cursor
});
