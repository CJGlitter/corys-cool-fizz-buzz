# FizzBuzz Speaker

This project is a simple web application that implements the FizzBuzz logic and utilizes the Web Speech API to vocalize the results. Users can enter a number, and the application will display and speak "Fizz", "Buzz", "FizzBuzz", or the number itself based on the FizzBuzz rules.

_Project created as part of a GitHub Copilot training workshop._

## Live Demo

Check out the live application at: https://cjglitter.github.io/corys-cool-fizz-buzz/public/index

## Project Structure

```
corys-cool-fizz-buzz
├── public
│   ├── css
│   │   └── style.css       # Styles for the application
│   ├── js
│   │   ├── fizzbuzz.js     # FizzBuzz logic for client-side
│   │   ├── main.js         # Main client-side JavaScript
│   │   ├── speech.js       # Speech synthesis functionality
│   │   └── voiceRecognition.js # Voice recognition functionality
│   ├── favicon-16x16.png   # Favicon for smaller screens (16x16px)
│   ├── favicon-32x32.png   # Favicon for standard displays (32x32px)
│   ├── apple-touch-icon.png # Touch icon for Apple devices (180x180px)
│   └── index.html          # Main HTML file
├── src
│   ├── server.js           # Node.js server setup
│   └── fizzbuzz.js         # FizzBuzz logic for server-side
├── package.json            # npm configuration
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Setup Instructions

### Local Development

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd corys-cool-fizz-buzz
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Run the server:**
   ```
   npm start
   ```

4. **Open your browser:**
   Navigate to `http://localhost:3000` to access the FizzBuzz Speaker application.

## Usage

- Enter a number in the input field and click the "Submit" button.
- Alternatively, click the microphone button and speak a number to input it by voice.
- The application will display the result ("Fizz", "Buzz", "FizzBuzz", or the number itself) and will also speak the result using the Web Speech API with expressive variations in pitch and rate.

## Technologies Used

- Node.js
- Express (for local development)
- HTML/CSS
- JavaScript
- Web Speech API
- GitHub Pages
- GitHub Actions

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes but I will NOT address them. 🤪
