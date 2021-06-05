const express = require('express');
const {projects} = require('./data.json');
const app = express();


app.set('view engine', 'pug');
app.use('/static', express.static('public'));

// Index Page
app.get('/', (req,res) => {
    res.render('index', {projects});
})

// About page
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
    err.status = 404;
    res.render('page-not-found', {err});
    err.message = 'Project not found';
    next(err);
  }
});

//404 error handler
app.use((req, res, next) => {
  const err = new Error('Page not found');
  err.status = 404;
  console.log(`404: The page you're looking for doesn't exist.`)
  next(err);
});

//Global error handler
app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  if (err.status === 404) {
    res.render('page-not-found', { err });
  } else {
    res.status(err.status || 500);
    err.message = err.message || `Something went wrong on the server.`;
    console.log(`${err.status}: Something went wrong on the server.`)
    res.render('error', { err });
  }
});

/**
 * When starting localhost it will listen to the port 3000
 */
app.listen(3000);