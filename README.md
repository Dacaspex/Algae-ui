# Algae-ui
User interface for Algae, a fractal image generator

**Note:** This repository is considered legacy and will not be updated. It was meant as a test.

## Installation instructions
This project uses Node JS, npm and Electron. 

To enable the image generating features of Algae, the Algae-core must be installed next to Algae-ui. To make the development process easier, create a new folder "Algae". In this folder, we will clone both git repositories to get the following structure
```
Algae/
  +- Algae-core/
  +- Algae-ui/
```
The `algae-core.jar` will then automatically be installed in the Algae-ui folder. See the [installation instructions](https://github.com/Dacaspex/Algae-core/blob/master/README.md).

First make sure Node JS and npm are installed. 
Then, install Electron with 
```
npm install -g electron-prebuilt
```
Clone this repository in the Algae project folder
```
git clone https://github.com/Dacaspex/Algae-ui.git
```
CD into the folder and install all dependencies with
```
cd algae-ui/
npm install
```
Run the ui with 
```
npm run start
```
