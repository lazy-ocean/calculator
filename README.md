# Simple React calculator 🧮

This is a simple calculator that supports basic arithmetic calculations on integers.
All calculations made using [mathjs](https://mathjs.org/) library.
Keyboard controls are also available.

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Some functions in details

| Button | Function                                                                                |
| ------ | --------------------------------------------------------------------------------------- |
| C      | Clears the calculator without saving last calculations                                  |
| ⌫      | Deletes last entered character (number / operation sign / dot / percent)                |
| π      | Enters _pi_ as 3.14159                                                                  |
| e      | Enters _e_ as 2.71828                                                                   |
| %      | `3%` results in 0.03 as in 3% of 100<br>`12 - 3%` results in 11.64, as in 12 - 3% of 12 |

## Available scripts for the build

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes.\
