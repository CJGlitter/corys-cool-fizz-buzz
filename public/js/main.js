document.addEventListener('DOMContentLoaded', function() {
    const inputField = document.getElementById('numberInput');
    const submitButton = document.getElementById('submitButton');
    const voiceInputButton = document.getElementById('voiceInputButton');
    const resultDisplay = document.getElementById('result');

    // Process input function to avoid code duplication
    function processInput() {
        const number = parseInt(inputField.value);
        if (isNaN(number)) {
            console.log('Please enter a valid number');
            return;
        }
        const result = fizzBuzz(number);
        resultDisplay.textContent = result;
        SpeechManager.speakResult(result);
        createRainingEffect(result);
    }

    // Submit button event listener
    submitButton.addEventListener('click', processInput);
    
    // Allow Enter key to submit
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            processInput();
        }
    });
    
    // Initialize voice recognition
    if (VoiceRecognitionManager.init(function(number) {
        // This callback will be called when speech is recognized
        inputField.value = number;
        processInput();
    })) {
        // If speech recognition is available, set up the voice input button
        voiceInputButton.addEventListener('click', function() {
            VoiceRecognitionManager.startListening(voiceInputButton);
        });
    } else {
        // If speech recognition is not available, hide the button
        voiceInputButton.style.display = 'none';
    }
    
    // Store rain elements batches with their timestamps
    let rainBatches = [];
    
    function createRainingEffect(result) {
        // Do not cancel previous fade-out timers - let them run independently
        // We'll manage each batch separately
        
        // Remove the fade-out class if it exists
        let rainContainer = document.getElementById('rain-container');
        if (rainContainer) {
            rainContainer.classList.remove('fade-out');
        } else {
            // Create rain container if it doesn't exist
            rainContainer = document.createElement('div');
            rainContainer.id = 'rain-container';
            document.body.appendChild(rainContainer);
        }
        
        // Create 50 falling text elements
        const textToRain = result.toString();
        // Rainbow colors array
        const rainbowColors = [
            '#FF0000', // Red
            '#FF7F00', // Orange
            '#FFFF00', // Yellow
            '#00FF00', // Green
            '#0000FF', // Blue
            '#4B0082', // Indigo
            '#9400D3'  // Violet
        ];
        
        for (let i = 0; i < 50; i++) {
            const rainText = document.createElement('div');
            rainText.className = 'rain-text';
            rainText.textContent = textToRain;
            
            // Random position and animation delay
            rainText.style.left = Math.random() * 100 + 'vw';
            rainText.style.animationDelay = Math.random() * 5 + 's';
            rainText.style.animationDuration = (Math.random() * 2 + 3) + 's';
            rainText.style.opacity = Math.random() * 0.5 + 0.5;
            rainText.style.fontSize = (Math.random() * 20 + 14) + 'px';
            
            // Apply random color from rainbow colors
            const randomColor = rainbowColors[Math.floor(Math.random() * rainbowColors.length)];
            rainText.style.color = randomColor;
            
            // Store original opacity for fade-out calculations
            const opacity = rainText.style.opacity;
            rainText.setAttribute('data-original-opacity', opacity);
            
            rainContainer.appendChild(rainText);
        }
        
        // Tag this batch of rain elements with a unique timestamp
        const timestamp = Date.now();
        // Only select elements inside the rain container without a timestamp
        const newRainElements = rainContainer.querySelectorAll('.rain-text:not([data-timestamp])');
        newRainElements.forEach(element => {
            element.setAttribute('data-timestamp', timestamp);
        });
        
        // Set a timeout to start fading out elements after 5 seconds
        const fadeOutTimeout = setTimeout(() => {
            const elementsToFade = document.querySelectorAll(`.rain-text[data-timestamp="${timestamp}"]`);
            console.log(`Starting fadeout of ${elementsToFade.length} elements`);
            
            // Use a manual animation approach instead of CSS transitions
            elementsToFade.forEach(element => {
                const startOpacity = parseFloat(window.getComputedStyle(element).opacity);
                const fadeStartTime = Date.now();
                const fadeDuration = 1500;
                
                // Force the animation to render and stay active even if the user switches tabs
                const fadeInterval = setInterval(() => {
                    const elapsedTime = Date.now() - fadeStartTime;
                    const progress = Math.min(elapsedTime / fadeDuration, 1);
                    const newOpacity = startOpacity * (1 - progress);
                    
                    // Use !important to override any animations
                    element.style.setProperty('opacity', newOpacity, 'important');
                    
                    // If fade is complete, clean up
                    if (progress >= 1) {
                        clearInterval(fadeInterval);
                        element.remove();
                    }
                }, 16); // ~60fps
                
                // Store the interval ID for potential cleanup
                element.setAttribute('data-fade-interval', fadeInterval);
                console.log(`Started fade interval ${fadeInterval} for element`);
            });
        }, 5000);
        
        // Track this batch for debugging purposes
        rainBatches.push({
            timestamp: timestamp,
            fadeOutTimeout: fadeOutTimeout,
            textValue: result.toString()
        });
        
        console.log(`Created new batch with timestamp ${timestamp} and fadeout timer ${fadeOutTimeout}`);
    }
    
    // We've already updated the click handler above
});