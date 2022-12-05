# Earth and Trees 3d 

this is a POC project for loading, viewing and interacting with 3d scenes in React Native project using Babylon.

![Alt text](screenshot.png?raw=true "Optional Title")

- The used Earth 3d model is downloaded from Nasa website, you can find it here https://solarsystem.nasa.gov/resources/2393/earth-3d-model/
- For the tree I used "Low Poly Tree" (https://skfb.ly/ooBRz) by Šimon Ustal which is licensed under Creative Commons Attribution (http://creativecommons.org/licenses/by/4.0/).
- I optimized both models to be used on mobile devices using [Blender](https://www.blender.org/)

# this project is based on the Babylon React native sample

you can find the main sample [Here](https://github.com/BabylonJS/BabylonReactNativeSample), for more informating about how to setup the development environment please check their readme file.It is recommended to read through their readme file first then continue reading this one.

# How to run the project 

## Android
- clone the repo
- open the terminal and  cd to the project folder and type ```yarn```
- next run the server by typing ```yarn start```
- to run the project on android type ```yarn run android```, please note that you need extra configuration if you plan to run the project on android emulator, you can find the instructions for doing that [here](https://github.com/BabylonJS/BabylonReactNativeSample/blob/main/docs/ANDROID_EMULATOR.md) 

## IOS 
- clone the repo
- open the terminal and  cd to the project folder and type ```yarn```
- Go to the iOS project folder and run ```pod install```
- next run the server by typing ```yarn start```
- run on IOS by opening another terminal window and typing ```yarn run ios```
