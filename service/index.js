const express = require('express');


const app = express();


const port = process.argv.length > 2 ? process.argv[2] : 4000;
app.use(express.static('public'));

app.use((_req, res) => {
  res.sendFile('index.html', {root: '../'});
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
