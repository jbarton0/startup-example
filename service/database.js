const { MongoClient } = require('mongodb');
const config = require('./dbConfig.json');
const uuid = require('uuid');

const url = `mongodb+srv://${config.userName}:${config.password}@${config.hostname}`;

// Connect to the database cluster
const client = new MongoClient(url);
const db = client.db('mealPrep');
const userCollection = db.collection('user');
const recipeCollection = db.collection('recipes');


(async function testConnection() {
try {

  await db.command({ ping: 1 });
  console.log('Connect to database');
} catch (ex) {
  console.log(`Unable to connect to database with ${url} because ${ex.message}`);
  process.exit(1);
}
})();

//Login
async function addUser(user) {
  await userCollection.insertOne(user);
}

async function getUser(email) {
  return userCollection.findOne({ email: email });
}

async function getUserByToken(token) {
  return userCollection.findOne({ token: token });
}

async function updateUser(user) {
  await userCollection.updateOne({ email: user.email }, { $set: user });
}

async function updateUserRemoveAuth(user) {
  await userCollection.updateOne({ email: user.email }, { $unset: { token: 1 } });
}

//Recipes  
async function seedRecipes() {
  const recipes = [
    {
      id: uuid.v4(),
      title: "Burrito Bowl",
      link: "https://www.budgetbytes.com/easiest-burrito-bowl-meal-prep/",
      // rating: 8.7,
      imgSrc: "https://www.budgetbytes.com/wp-content/uploads/2018/04/Easiest-Burrito-Bowl-Meal-Prep-V3.jpg",
      userName: "system",
      totalScore: 0,
      numRatings: 0
    },
    {
      id: uuid.v4(),
      title: "Spicy Salmon",
      link: "https://girlheartfood.com/spicy-salmon-rice-bowl-recipe/",
      // rating: 9.1,
      imgSrc: "https://girlheartfood.com/wp-content/uploads/2021/09/Salmon-Rice-Bowl-2.jpg",
      userName: "system",
      totalScore: 0,
      numRatings: 0
    },
    {
      id: uuid.v4(),
      title: "Chicken Enchiladas",
      link: "https://thegirlonbloor.com/meal-prep-chicken-enchiladas-verdes/",
      // rating: 7.4,
      imgSrc: "https://thegirlonbloor.com/wp-content/uploads/2019/04/Meal-Prep-Chicken-Enchiladas-Verdes-6.jpg",
      userName: "system",
      totalScore: 0,
      numRatings: 0
    }
  ];

  const count = await recipeCollection.countDocuments();

  if (count === 0) {
    await recipeCollection.insertMany(recipes);
    console.log("Hardcoded recipes");
  } else {
    console.log("Recipes already exist");
  }
}

async function addRecipe(recipe) {
  const result = await recipeCollection.insertOne(recipe);
  return { ...recipe, _id: result.insertedId };
}

async function getRecipes() {
  const cursor = recipeCollection.find({});
  return cursor.toArray();
}

async function rateRecipe(id, rating) {
  await recipeCollection.updateOne(
    { id },
    { $inc: {
        totalScore: rating,
        numRatings: 1,
      },
    }
  );
  const updated = await recipeCollection.findOne({ id });
  if (!updated) return null;
  return updated.numRatings > 0
    ? updated.totalScore / updated.numRatings
    : null;
}

module.exports = {
  userCollection,
  recipeCollection,
  addUser,
  getUser,
  getUserByToken,
  updateUser,
  updateUserRemoveAuth,
  addRecipe,
  getRecipes,
  rateRecipe,
};