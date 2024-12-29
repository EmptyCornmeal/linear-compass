document.addEventListener('DOMContentLoaded', () => {
    let currentHeading = 0; // Initial heading in degrees
    const compassBar = document.querySelector('.compass-bar');
    const indicator = document.querySelector('.indicator');
    const headingDisplay = document.getElementById('heading-display');
  
    // Function to update the compass display
    function updateCompass(heading) {
        const normalized = heading % 360; // Keep heading within 0-359
        const startHeading = (normalized - 90 + 360) % 360; // Start of visible 180° range
        const endHeading = (startHeading + 180) % 360; // End of visible range
        
        // Update the indicator position
        const offset = ((normalized + 180) % 360 - 180) + 90; // Normalize to 0-180
        indicator.style.left = `${offset / 180 * 100}%`;
      
        // Update heading display
        headingDisplay.textContent = `Heading: ${normalized.toFixed(1)}°`;
      
        // Update visible compass labels
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
        const startIndex = Math.round(startHeading / 45) % directions.length;
        const labels = document.querySelectorAll('.label');
        for (let i = 0; i < labels.length; i++) {
          const directionIndex = (startIndex + i) % directions.length;
          labels[i].textContent = directions[directionIndex];
        }
      }

      function createMeasureLines() {
        const measureLines = document.querySelector('.measure-lines');
        const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
      
        // Clear previous labels
        measureLines.innerHTML = '';
      
        // Dynamically add labels and lines
        for (let i = 0; i < 5; i++) { // Only show 5 labels for 180°
          const label = document.createElement('span');
          label.className = 'label';
          label.textContent = directions[i];
          label.style.left = `${(i / 4) * 100}%`; // Distribute evenly
          measureLines.appendChild(label);
        }
      }
      createMeasureLines();
      
  
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
  });
  