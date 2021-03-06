const db = require("../models");

// Defining methods for the commentsController
module.exports = {
  findAll: function(req, res) {
    console.log("Here In The Controller!");
    db.Snipit
      .find(req.query)
      .sort({ date: -1 })
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  findById: function(req, res) {
     console.log(req.params.id)
    db.Snipit
      .findById(req.params.id)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  create: function(req, res) {
     // if no user on the session
     if(!req.user) return res.status(401).end('user isnt authenticated')

     db.Snipit
      .create({...req.body, email: req.user.email, username: req.user.username ,title: req.user.title,category: req.user.category})
      .then(({_id}) => db.User.findOneAndUpdate({_id: req.user._id}, { $push: { snipits: _id } }, { new: true }))
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  update: function(req, res) {
     db.Snipit
      .findOneAndUpdate({ _id: req.params.id }, req.body)
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  },
  remove: function(req, res) {
     db.Snipit
      .findById({ _id: req.params.id })
      .then(dbModel => dbModel.remove())
      .then(dbModel => res.json(dbModel))
      .catch(err => res.status(422).json(err));
  }
  // TO-DO: find by user
};
