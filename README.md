# FizzBuzz Speaker

This project is a simple web application that implements the FizzBuzz logic and utilizes the Web Speech API to vocalize the results. Users can enter a number, and the application will display and speak "Fizz", "Buzz", "FizzBuzz", or the number itself based on the FizzBuzz rules.

## Project Structure

```
corys-cool-fizz-buzz
├── public
│   ├── css
│   │   └── style.css       # Styles for the application
│   ├── js
│   │   ├── fizzbuzz.js     # FizzBuzz logic for client-side
│   │   └── main.js         # Main client-side JavaScript
│   └── index.html          # Main HTML file
├── src
│   ├── server.js           # Node.js server setup
│   └── fizzbuzz.js         # FizzBuzz logic for server-side
├── package.json            # npm configuration
├── .gitignore              # Git ignore file
└── README.md               # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd fizzbuzz-speaker
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
- The application will display the result ("Fizz", "Buzz", "FizzBuzz", or the number itself) and will also speak the result using the Web Speech API.

## Technologies Used

- Node.js
- Express
- HTML/CSS
- JavaScript
- Web Speech API

## Contributing

Feel free to submit issues or pull requests for improvements or bug fixes.