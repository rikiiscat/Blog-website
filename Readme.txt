Introduction:
We developed a blog website which supports user login. The user information is stored
in firebase. In order to login the blog website, the user need to have an account: if 
the user does not have an account yet then user needs to use signup step to create one;
otherwise user can just log in to the website by entering his email address and password.
And if the user forgot his password then he can use the reset step to reset his password;
this time user will receive an email telling him to confirm that he want to reset the
password and will update the new password in the firebase database storage.
If the user has successfully logged into his account: he can create a new blog post by 
entering the title and the content of the blog, and click the submit button to submit this
blog. There is a "home" page: "/blog", showing all the blogs that have already been posted
by all the users. Users can share their ideas about data privacy their.

We used React and firebase for building this blog website.
We first need to get an account in firebase and do the setup step. In firebase, click on
"create new project" and enter the project name. After the project has been set up, click
on the web tag to name this app, and for the purpose of deploying remember to allow setting
up hosting, then click "register app". In the next step, we'll see the firebaseConfig. Copy
all the fields into /src/firebase.js. Open linux, cd to the forlder of the app, call it 
"my-app", run "npx create-react-app my-app", then run "npm install firebase". Run 
"npm install -g firebase-tools", "firebase login" to login your account (the one you used
in firebase).
Open Authentication: get started, go to the sign-method field, choose the sign-in provider
as Email/Password only, and enable then save it. Delete localhost from Authorised domain.
Open Firebase database: click "create database", use default option (start in production
mode) and click Next. Choose firestore location (us-central), click Enable. Then start
collection: enter a valid collection id then click next, document ID: click Auto-ID then save.
Go to the Rule fiels and change "allow read, write: if false;" to "allow read, write: if true;".
We are good to go!

Continue on linux:
Install router: npm install react-router-dom
Install bootstrap: npm install bootstrap react-toastify
Install faker-js: npm install @faker-js/faker --save-dev

Then we can run "npm start" and we can see the web page on localhost:3000!!! 
However, we still want to deploy it.
Deploy:(follow the below steps in linux)
1. firebase login (if it shows "zsh: command not found: firebase" then run 
"alias firebase="`npm config get prefix`/bin/firebase"" before "firebase login")
2. firebase init (select the forth option: "Hosting: ..")
                 ("What do you want to use as your public directory?" : build)
                 ("Configure as a single-page app (rewrite all urls to /index.html)?": y)
                 ("Set up automatic builds and deploys with GitHub?": N)
                 ("File build/index.html already exists. Overwrite?": y)
3. npm run build
4. firebase deploy => after this, it will tell us the Hosting URL:
                     (in my example, "https://web-production-74721.web.app")
                     we can copy the URL and paste it on browser to see the website now!
                     Successfully deployed!



** In Our website, https://web-production-74721.web.app/signup is the starting up step