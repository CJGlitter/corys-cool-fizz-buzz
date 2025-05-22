
/**
 * VoiceRecognitionManager handles speech-to-text functionality for the FizzBuzz application
 */
const VoiceRecognitionManager = {
    recognition: null,
    isListening: false,
    listenTimeout: null,
    
    /**
     * Initializes voice recognition and sets up handlers
     * @param {Function} onResultCallback - Called when speech is recognized with the recognized text
     * @returns {boolean} - Whether voice recognition is available
     */
    init: function(onResultCallback) {
        // Check if browser supports speech recognition
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            console.error("Speech recognition not supported in this browser");
            return false;
        }
        
        // Create speech recognition instance
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.recognition = new SpeechRecognition();
        
        // Configure speech recognition
        this.recognition.continuous = false;
        this.recognition.interimResults = false;
        this.recognition.lang = 'en-US';
        this.recognition.maxAlternatives = 1;
        
        // Set up event handlers
        this.recognition.onresult = (event) => {
            const speechResult = event.results[0][0].transcript;
            console.log(`Speech recognized: "${speechResult}"`);
            
            // Try to parse as a number
            const number = this.parseSpokenNumber(speechResult);
            if (number !== null) {
                console.log(`Parsed number: ${number}`);
                onResultCallback(number);
            } else {
                console.log('Could not parse as a number');
            }
        };
        
        this.recognition.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            this.isListening = false;
        };
        
        this.recognition.onend = () => {
            this.isListening = false;
        };
        
        return true;
    },
    
    /**
     * Starts listening for voice input
     * @param {HTMLElement} buttonElement - The button element to update during listening
     */
    startListening: function(buttonElement) {
        if (!this.recognition) {
            console.error("Speech recognition not initialized");
            return false;
        }
        
        if (this.isListening) {
            this.stopListening(buttonElement);
            return false;
        }
        
        // Update button state
        buttonElement.textContent = "Listening...";
        buttonElement.classList.add("listening");
        
        // Start recognition
        try {
            this.recognition.start();
            this.isListening = true;
            
            // Stop listening after 5 seconds if no result
            this.listenTimeout = setTimeout(() => {
                this.stopListening(buttonElement);
            }, 5000);
            
            return true;
        } catch (error) {
            console.error("Error starting speech recognition:", error);
            this.stopListening(buttonElement);
            return false;
        }
    },
    
    /**
     * Stops listening for voice input
     * @param {HTMLElement} buttonElement - The button element to update
     */
    stopListening: function(buttonElement) {
        if (this.recognition && this.isListening) {
            try {
                this.recognition.stop();
            } catch (e) {
                // Ignore errors when stopping
            }
            this.isListening = false;
        }
        
        if (this.listenTimeout) {
            clearTimeout(this.listenTimeout);
            this.listenTimeout = null;
        }
        
        if (buttonElement) {
            buttonElement.textContent = "🎤 Speak";
            buttonElement.classList.remove("listening");
        }
    },
    
    /**
     * Parses a spoken phrase into a number
     * @param {string} text - The spoken text to parse
     * @returns {number|null} - The parsed number or null if not parseable
     */
    parseSpokenNumber: function(text) {
        // Remove punctuation and convert to lowercase
        const cleanText = text.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        
        // Direct number parsing
        const directNumber = parseInt(cleanText);
        if (!isNaN(directNumber)) {
            return directNumber;
        }
        
        // Handle spoken numbers (limited set for demo)
        const numberWords = {
            'zero': 0, 'one': 1, 'two': 2, 'three': 3, 'four': 4, 
            'five': 5, 'six': 6, 'seven': 7, 'eight': 8, 'nine': 9,
            'ten': 10, 'eleven': 11, 'twelve': 12, 'thirteen': 13, 'fourteen': 14,
            'fifteen': 15, 'sixteen': 16, 'seventeen': 17, 'eighteen': 18, 'nineteen': 19,
            'twenty': 20, 'thirty': 30, 'forty': 40, 'fifty': 50,
            'sixty': 60, 'seventy': 70, 'eighty': 80, 'ninety': 90,
            'hundred': 100
        };
        
        // Check for exact matches
        if (numberWords[cleanText] !== undefined) {
            return numberWords[cleanText];
        }
        
        // Check for compound numbers (e.g., "twenty one")
        const parts = cleanText.split(' ');
        if (parts.length === 2) {
            const tens = numberWords[parts[0]];
            const ones = numberWords[parts[1]];
            
            if (tens !== undefined && ones !== undefined && tens % 10 === 0 && ones < 10) {
                return tens + ones;
            }
        }
        
        // For more complex number parsing, we'd need a more sophisticated algorithm
        return null;
    }
};
