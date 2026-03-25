const cookieParser = require('cookie-parser');
const bcrypt = require('bcryptjs');
const express = require('express');
const uuid = require('uuid');
const app = express();
const db = require('./database.js');
(async () => {
  try {
    await db.seedRecipes();
  } catch (err) {
    console.error('Error seeding recipes:', err);
  }
})();

const authCookieName = 'token';

const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.json());
app.use(cookieParser());
app.use(express.static('public'));

var apiRouter = express.Router();
app.use('/api', apiRouter);


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
apiRouter.post('/recipes', verifyAuth, async (req, res) => {
  const recipe = {
    id: uuid.v4(),
    title: req.body.title,
    link: req.body.link,
    imgSrc: req.body.imgSrc,
    userName: req.body.userName,
    totalScore: 0,
    numRatings: 0
  };
  const result = await db.addRecipe(recipe);
  res.send(result);
});

//Get saved recipes endpoint
apiRouter.get('/recipes', async (req, res) => {
  const recipes = await db.getRecipes();
  console.log(recipes);
  const formatted = recipes.map(r => ({
    ...r,
    totalScore: r.totalScore || 0,
    numRatings: r.numRatings || 0,
    avgRating:
      r.numRatings > 0 ? r.totalScore / r.numRatings : null,
  }));
  res.send(formatted);
});

//Submit ratings endpoint
apiRouter.post('/recipes/rate', async (req, res) => {
  const { id, rating } = req.body;
  console.log("POST /recipes/rate received", id, rating);

  try {
    const average = await db.rateRecipe(id, rating);

    if (average === null) {
      return res.status(404).send('Recipe not found');
    }
    console.log("ID:", id);
    console.log("Average:", average);
    res.json({ average });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
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
  res.sendFile('index.html', {root: 'public'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});