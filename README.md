<div>

# Login and Registration Form Using MERN stack, Redux, jwt and 2 step verification

<a href="https://lr-tempelate-frontend.vercel.app/"
 alt="Try the Demo on Vercel!">

## `/register`

<img src="./screenshots/screenshot-3.png"
  alt="ToDo!">

## `/login`

<img src="./screenshots/screenshot-2.png"
  alt="ToDo!">

## `/loggedin {when you are logged in}`

<img src="./screenshots/screenshot-1.png"
  alt="ToDo!">

## `/loggedin {when you are not logged in}`

<img src="./screenshots/screenshot-4.png"
  alt="ToDo!">
</a>

> Before you continue, try the demo: https://ay-todoapp.vercel.app/ <br />

> A login and signup form which allows users to register and login.
> All information is stored in MongoDB.
> After successful login the user is redirected to their dashboard.
> User Password is stored and fetched as encrypted for security.
> Email is verified by sending otp to user's mail ,to check wether email is genuine or not.
> Once you have had a "play" with the demo, come back and _build_ it!!

<hr />

## What?

Build a fully functional Login and Registration Form! <br />

- [x] Building an App using MERN stack where React and Next.js for frontend and node.js with [expressjs](https://expressjs.com/en/4x/api.html#express) & [mongoosejs](https://mongoosejs.com/) for backend!
- [x] MongoDB as database
- [x] UI build using [tailwindcss](https://tailwindcss.com/docs)!
- [x] State Management with [react redux](https://react-redux.js.org/api/hooks)!
- [x] Password encyption using [bcryptjs](https://www.npmjs.com/package/bcryptjs)!
- [x] Logged IN checking using a token by using [jwt](https://www.npmjs.com/package/jsonwebtoken)!
- [x] Email verification done using [nodemailer](https://nodemailer.com/about/)!
- [x] Animations made using [Famer Motion Api](https://www.framer.com/api/motion/)!
- [x] Animated icons and svg using [lottie](https://lottiefiles.com/featured)!

## _Who?_

This repo is for anyone/everyone who wants
to use this login and registration form or create their own.Also, anyone who wants to see authentication is done using email verification and password encyption for security.

## _How?_

Start by cloning this repository to your `localhost`
so that you can follow the example/tutorial offline:

```sh
git clone https://github.com/Apoorvssj/TodoApp.git
```

Install the `devDependencies` so you can run the tests:

```sh
 npm install
```

### Set Up your `.env` file for backend

- In backend folder create a `.env` file and variables given below.

* Create your db collection in mongoDB and connect it to your app thourgh setting up an environment variable in `.env` file

```env
mongo_url = "your collection url"
```

- Create your jwt key variable in your `.env` file

```env
jwt_key = "set any key you want"
```

- Add email and password in `.env` file from which verification emails are to sent

```env
emailID = "gmail id"
password = "password"
```

### Set Up your `.env` file for frontend

- In frontend folder create a `.env.local` file and variables given below.

```env
//for local port
NEXT_PUBLIC_BACKEND_API_PATH = http://localhost:3000/api

//for production set port to your deployed url
NEXT_PUBLIC_BACKEND_API_PATH = "deployed app url"
```

### Set Up your `smtp server` for email verification functionality

### In `./backend/api/routes/otp.js`

- When in development

```js
let mailTransporter = nodemailer.createTransport({
  host: "gmail",
  auth: {
    user: `${user}`,
    pass: `${pass}`,
  },
});
```

- When in production

```js
let mailTransporter = nodemailer.createTransport({
  port: 587,
  host: "smtp.gmail.com",
  auth: {
    user: `${user}`,
    pass: `${pass}`,
  },
});
```

- Note: We are using `gmail` as our smtp server, which is less secure than a custom smtp server as said on nodemailer docs. So if you can host your own smtp server , please use that.

Now you have _everything_ you need to start this Tempelate !

```sh
 npm run dev
```

## Additional info

- How is email verification applied?
  - When clicked on generate otp button on `/register` page , `/otp` route in fetched from `/backend/api/routes/otp`
  - Then if , user doesnot already exists we will send `senmail()` function

```js
let sendmail = async () => {
  await mailTransporter.sendMail({
    from: `${user}`,
    to: req.body.email,
    subject: "OTP for you",
    html: `
        <div>
          <h1>Email Confirmation</h1>
          <h2>Hello ${req.body.email}</h2>
          <p>${genotp}</p>
        </div>
        `,
  });
};
```

- - Then with mailtransporter created by nodemailer , mail will be sent to the user's email
- - Then from frontend a modal will pop up to write the recieved otp , and when clicked on register button on that modal `/backend/api/routes/register.js` will be fetched , here we will first check , if the otp matches from mongoDb and what user has typed by

```js
Foundotp = await otp.findOne({ email: req.body.email, otp: req.body.otp });
```

- - If otp matches we will continue with password encyption using `bcyptjs` or error will be thrown. Then user will be registered with encypted password

```js
//password ecryption using bcrypt
const salt = await bcrypt.genSalt(10);
const hashedPassword = await bcrypt.hash(req.body.password, salt);
const user = new User({
  username: req.body.username,
  email: req.body.email,
  password: hashedPassword,
});
```

- How is jwt used for creating a private route page `/loggedin` only available with info for loggeg in user?

  - When clicked on login button , a jason web token will be given to the user using jwt

```js
//assinging token
const token = await jwt.sign({ userID: FoundUser._id }, process.env.jwt_key);
```

- - After this fetch of `/login` route , we will store token in a global piece if state using redux and in our localstorage using redux persist, which will be set to null only when clicked on logout button in `/loggedin`

- - Now when user accesses `/loggedin` page , if the token exist we will send it to header of browser(req) as authorization variable using fetch function

- - Now in `/backend/api/routes/checkLogin.js` will we apply a middleware for checking if token is present which is in `/backend/api/middlewares/loggedIn.js`

- - In middleware we will req value of authorization from header, and if authorization value is there , user will be logged in

- - Here, after login , we are sending user data to the private route `/loggedin` for them, and displaying `user.name`, You can do nothing you like in this private route, or create multiple routes like this

```js
// in middleware loggedIn
req.user = USER; //USER is our user model fetched from mongoDB
// in checkLogin
const user = req.user;
res.status(200).json(user);
```
