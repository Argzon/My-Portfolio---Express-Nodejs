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

/**
 * Displays projects depending on project id
 */
app.get('/project/:id', (req, res, next) => {
    const projectId = req.params.id;
    const project = projects.find(({ id }) => id === +projectId);
    if (project) {
      res.render('project', { project });
    } else {
      const err = new Error();
      res.status = 404;
      res.render('page-not-found');
      err.message = 'Project not found';
      next(err);
    }
  });


  app.get('/', (req, res, next) => {

    // Log out custom error handler indication
    console.log('Custom error route called');
  
    const err = new Error();
    err.message = `Custom 500 error thrown`
    res.render('error');
    err.status = 500;
    throw err;
  });
/**
 * When starting localhost it will listen to the port 3000
 */
app.listen(3000);