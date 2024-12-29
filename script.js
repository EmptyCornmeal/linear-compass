let currentHeading = 0; // Initial heading in degrees (0 = North)

// Function to update the compass
function updateCompass(heading) {
  const indicator = document.querySelector('.indicator');

  // Normalize heading to fit a 180-degree linear compass (centered on W)
  const normalized = (heading + 180) % 360 - 180; // Convert to -180 to 180 range
  const offset = normalized + 90; // Shift -90 to +90 range to 0-180

  // Move the indicator
  indicator.style.transform = `translateX(${offset * 2}%` // Scale to 0-180
}

// Simulate heading changes
document.getElementById('change-heading').addEventListener('click', () => {
  currentHeading = (currentHeading + 30) % 360; // Increment heading by 30 degrees
  updateCompass(currentHeading);
});

// Initialize the compass
updateCompass(currentHeading);
