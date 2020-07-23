# Vibe Frontend

## About:

* Mobile app made using React Native, in the future might consider making purely native pages in Swift and Kotlin for specific tasks
* Uses: Axios, Redux, React Navigation
* Goal: Make a modern video sharing social media interface with a light green theme throughout the app. 
* Compatible with: 
    - Android 4.1+
    - iOS 10+

## Local Installation:

### 1. Setting up Environment:
1. Install Node.js https://nodejs.org/en/
1. Install the development environment for Android and iOS by following the **React-Native-CLI section** in this tutorial https://reactnative.dev/docs/environment-setup without performing the step where 'npx react-native init myproject' is called (do not create a new project).
1. Clone the repo onto your local hard-drive
2. Change directory to ```Vibe-Frontend``` in your command line using the command ```cd Vibe-Frontend``` and run then command ``` npm install ``` inside the directory

### 2. Running the app

* #### iOS: Mac only
    - Download Xcode from the app store
    - Open the Vibe-Frontend directory from the command line
    - Run the command ```npm start```
    - In a new window in the same directory run the command ```npx react-native run-ios```

* #### Android: All Devices
    - If you did not download Android Studio during the environment setup download Android Studio 
    - Create a new virtual device in the Android Studio Virtual Device Manager by going to ```Tools > Android > AVD Manager``` or clicking the settings cog on the Android Studio start screen and pressing ```AVD Manager```
    - Open the Vibe-Frontend directory from the command line
    - Run the command ```npm start```
    - In a new window in the same directory run the command ```npx react-native run-android```
