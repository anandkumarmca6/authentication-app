# authentication-app
 authentication system
# Overview
Create a complete authentication system which can be used as a starter code for creating any new application

# Functionalties
-	Sign up with email
-	Sign in 
-	Sign out 
-	Reset password after sign in
-	The password stored in the db should be encrypted
-	Google login/signup (Social authentication)
-	re-captcha on both sign up and log in

# Languages & Tools Used for development
- Nodejs
- Express
- Mongoose
- MongoDB
- Javascript
- EJS
- Git
- CSS
- SCSS
- MongoDB Compass
- Visual Studio Code
# Tools used for hosting
- Railway
- Git
# Live project Link
https://authentication-app-production.up.railway.app

# Steps to set project locally[Windows]
- Go to terminal. Run below command:
     git clone https://github.com/anandkumarmca6/authentication-app.git
-  cd authentication-app
- npm install
- npm start
 # Your project is set up and running!. You can check with url localhost:6564
 
 # To test google authentication
 - Create project on google developer console.
 - Replace demo value with clientID,clientSecret and callbackURL respectively in config/environment.js file for object named development
  clientID: 'demo',
  clientSecret: 'demo',
  callbackURL: 'demo',


