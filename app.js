const express = require('express');
const {projects} = require('./data.json');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));


app.get('/', (req,res) => {
    res.render('index', {projects});
})

app.get('/about', (req, res) => {
    res.render('about');
})

// Displays projects depending on project id
app.get('/project/:id', (req, res) => {
    // gets id from url
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);
    if (project) {
      res.render('project', { project });
    } else {
      res.sendStatus(404);
    }
  });


app.listen(3000);