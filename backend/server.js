const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true }
);
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

const userSignUpRouter = require('./routes/user.signUp.route')
const userSignInRouter = require('./routes/user.signIn.route')
const postRouter = require('./routes/content.route')
const makePostRouter = require('./routes/postContent.route')
const profileRouter = require('./routes/profile.route')

app.use('/',userSignInRouter)
app.use('/signUp',userSignUpRouter)
app.use('/home', postRouter)
app.use('/post-content', makePostRouter)
app.use('/profile', profileRouter)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});