const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://kafder97:5051Peniss@bakuninjegor.pcbgs3b.mongodb.net/test', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', function() {
  console.log('MongoDB connected!');
});

const articleSchema = new mongoose.Schema({
    title: String,
    author: String,
    date: Date,
    comments: [{
      author: String,
      text: String
    }]
  });
  
  const Article = mongoose.model('Article', articleSchema);
  const app = express();
  app.use(bodyParser.json());
  
  app.get('/articles', function(req, res) {
    Article.find({}, function(err, articles) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(articles);
      }
    });
  });
  
  app.post('/articles', function(req, res) {
    const article = new Article(req.body);
    article.save(function(err) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else {
        res.send(article);
      }
    });
  });
  
  app.get('/articles/:id', function(req, res) {
    Article.findById(req.params.id, function(err, article) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else if (!article) {
        res.status(404).send();
      } else {
        res.send(article);
      }
    });
  });
  
  app.put('/articles/:id', function(req, res) {
    Article.findByIdAndUpdate(req.params.id, req.body, { new: true }, function(err, article) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else if (!article) {
        res.status(404).send();
      } else {
        res.send(article);
      }
    });
  });
  
  app.delete('/articles/:id', function(req, res) {
    Article.findByIdAndRemove(req.params.id, function(err, article) {
      if (err) {
        console.log(err);
        res.status(500).send();
      } else if (!article) {
        res.status(404).send();
      } else {
        res.send();
      }
    });
  });
  
  app.listen(3000, function() {
    console.log('Server started on port 3000');
  });
    