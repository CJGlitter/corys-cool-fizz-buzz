
/**
 * SpeechManager handles text-to-speech functionality for the FizzBuzz application
 * with expressive voice modulation based on the content.
 */
const SpeechManager = {
    /**
     * Speaks the given result with appropriate expression based on content
     * @param {string} result - The text to speak (Fizz, Buzz, FizzBuzz, or a number)
     */
    speakResult: function(result) {
        const utterance = new SpeechSynthesisUtterance(result);
        
        // Get available voices
        const voices = window.speechSynthesis.getVoices();
        
        // Try to find a more energetic voice (preferences vary by OS)
        let preferredVoice = voices.find(voice => 
            voice.name.includes('Google') || 
            voice.name.includes('Samantha') ||
            voice.name.includes('Daniel')
        );
        
        // Set voice if found
        if (preferredVoice) utterance.voice = preferredVoice;
        
        // Helper function to add randomness within a range
        const addRandomness = (baseValue, range) => {
            // Random value between -range and +range
            const randomOffset = (Math.random() * 2 * range) - range;
            return baseValue + randomOffset;
        };
        
        // Make speech more expressive by adjusting parameters with randomness
        if (result === "FizzBuzz") {
            // More excited for FizzBuzz!
            utterance.pitch = addRandomness(1.5, 0.5);  // Base 1.5 ± 0.5
            utterance.rate = addRandomness(1.1, 0.1);   // Base 1.1 ± 0.1
            utterance.volume = 1.0; // Full volume
        } else if (result === "Fizz") {
            // Playful for Fizz
            utterance.pitch = addRandomness(1.2, 0.5);  // Base 1.2 ± 0.5
            utterance.rate = addRandomness(0.9, 0.1);   // Base 0.9 ± 0.1
        } else if (result === "Buzz") {
            // Deeper for Buzz
            utterance.pitch = addRandomness(0.7, 0.5);  // Base 0.7 ± 0.5
            utterance.rate = addRandomness(1.0, 0.1);   // Base 1.0 ± 0.1
        } else {
            // For numbers, add some randomness too
            utterance.pitch = addRandomness(1.0, 0.3);  // Base 1.0 ± 0.3
            utterance.rate = addRandomness(1.0, 0.05);  // Base 1.0 ± 0.05 (smaller range)
        }
        
        // Ensure values stay within reasonable bounds
        utterance.pitch = Math.max(0.1, Math.min(2.0, utterance.pitch));
        utterance.rate = Math.max(0.5, Math.min(2.0, utterance.rate));
        
        // Speak the text
        window.speechSynthesis.speak(utterance);
        
        // Log speech parameters for debugging
        console.log(`Speaking with pitch: ${utterance.pitch.toFixed(2)}, rate: ${utterance.rate.toFixed(2)}`);
    },
    
    /**
     * Gets all available speech synthesis voices
     * @returns {Array} Array of available voice objects
     */
    getAvailableVoices: function() {
        return window.speechSynthesis.getVoices();
    }
};
