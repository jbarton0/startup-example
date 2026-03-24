const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const db = require('./database.js');

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);

let users = [];
let recipes = [
  {
    id: uuid.v4(),
    title: "Burrito Bowl",
    link: "https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/", 
    rating: "8.7", 
    imgSrc: "https://www.budgetbytes.com/wp-content/uploads/2018/04/Easiest-Burrito-Bowl-Meal-Prep-V3.jpg",
    userName: "system"
  },
  {
    id: uuid.v4(),
    title: "Spicy Salmon",
    link: "https://girlheartfood.com/spicy-salmon-rice-bowl-recipe/",
    rating: "9.1",
    imgSrc: "https://girlheartfood.com/wp-content/uploads/2021/09/Salmon-Rice-Bowl-2.jpg",
    userName: "system"
  },
  {
    id: uuid.v4(),
    title: "Chicken Enchiladas",
    link: "https://thegirlonbloor.com/meal-prep-chicken-enchiladas-verdes/",
    rating: "7.4",
    imgSrc: "https://thegirlonbloor.com/wp-content/uploads/2019/04/Meal-Prep-Chicken-Enchiladas-Verdes-6.jpg",
    userName: "system"
  }
];

//Helper functions
async function findUser(field, value) {
  if (!value) return null;

  if (field === 'token') {
    return db.getUserByToken(value);
  }
  return db.getUser(value);
}

async function createUser(email, password) {
  const passwordHash = await bcrypt.hash(password, 10);

  const user = {
    email: email,
    password: passwordHash,
    token: uuid.v4(),
  };
  
  await db.addUser(user);
  return user;
}

function setAuthCookie(res, authToken) {
  res.cookie(authCookieName, authToken, {
    maxAge: 1000 * 60 * 60 * 24 * 365,
    secure: true,
    httpOnly: true,
    sameSite: 'strict',
  });
}

const verifyAuth = async (req, res, next) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    next();
  } else {
    res.status(401).send({ msg: 'Unauthorized' });
  }
};

//Create user endpoint
apiRouter.post('/auth/create', async (req, res) => {
  if (await findUser('email', req.body.email)) {
    console.log("Existing user")
    res.status(409).send({ msg: 'Existing user' });
  } else {
    console.log("Creating user")
    const user = await createUser(req.body.email, req.body.password);

    setAuthCookie(res, user.token);
    res.send({ email: user.email });
  }
});

//Login user endpoint
apiRouter.post('/auth/login', async (req, res) => {
  const user = await findUser('email', req.body.email);
  if (user) {
    if (await bcrypt.compare(req.body.password, user.password)) {
      user.token = uuid.v4();
      await db.updateUser(user);
      setAuthCookie(res, user.token);
      res.send({ email: user.email });
      return;
    }
  }
  res.status(401).send({ msg: 'Unauthorized' });
});

//Logout user endpoint
apiRouter.delete('/auth/logout', async (req, res) => {
  const user = await findUser('token', req.cookies[authCookieName]);
  if (user) {
    await db.updateUserRemoveAuth(user);
  }
  res.clearCookie(authCookieName);
  res.status(204).end();
});

//Save new recipe endpoint
apiRouter.post('/recipes', verifyAuth, (req, res) => {
  const recipe = {
    id: uuid.v4(),
    title: req.body.title,
    link: req.body.link,
    rating: req.body.rating,
    imgSrc: req.body.imgSrc,
    userName: req.body.userName
  };
  recipes.push(recipe);
  res.send(recipe);
});

//Get saved recipes endpoint
apiRouter.get('/recipes', verifyAuth, (req, res) => {
  res.send(recipes);
});

//Get random image endpoint
apiRouter.get('/random-food', async (req, res) => {
  const response = await fetch('https://foodish-api.com/api/');
  const data = await response.json();

  res.send({
    imgSrc: data.image
  });
});

//Error handling
app.use(function (err, req, res, next) {
  res.status(500).send({ type: err.name, message: err.message });
});

app.use((_req, res) => {
  res.sendFile('index.html', {root: 'startup-example'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});


