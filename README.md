# LeetMetric

LeetMetric is a web application that visualizes a user's LeetCode problem-solving progress by difficulty level (Easy, Medium, Hard). It fetches data from the LeetCode GraphQL API and displays interactive progress circles for each category.

## Features

- **Live LeetCode Stats:** Enter your LeetCode username to view your solved problems by difficulty.
- **Progress Visualization:** See your progress as animated circles for Easy, Medium, and Hard problems.
- **Responsive Design:** Works well on desktop and mobile devices.
- **Error Handling:** Alerts for invalid usernames and displays errors if data cannot be fetched.

## Technologies Used

- HTML5
- CSS3
- JavaScript (ES6)
- LeetCode GraphQL API

## Getting Started

### Prerequisites

- Modern web browser (Chrome, Firefox, Edge, etc.)
- Internet connection

### Installation

1. **Clone the repository:**
    ```bash
    git clone https://github.com/yourusername/LeetMetric.git
    cd LeetMetric
    ```

2. **Run locally:**
    - Open `index.html` in your browser.

### Usage

1. Enter your LeetCode username in the input field.
2. Click the **Search** button.
3. View your progress for Easy, Medium, and Hard problems.

## Project Structure

```
LeetMetric/
├── index.html
├── style.css
├── script.js
└── README.md
```

## API Notes

- This app uses the [LeetCode GraphQL API](https://leetcode.com/graphql/).
- A CORS proxy (`https://cors-anywhere.herokuapp.com/`) is used for development. You may need to request temporary access [here](https://cors-anywhere.herokuapp.com/corsdemo).

## Contributing

Contributions are welcome! Please open issues or submit pull requests for improvements and bug fixes.


## Acknowledgements
