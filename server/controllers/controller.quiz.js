const Quiz = require("../models/model.quiz");

module.exports.findALLQuiz = (req, res) => {
    Quiz.find()
      .then((Quiz) => {
    //   console.log("all Quiz", Quiz);
        res.json(Quiz);   
      })
      .catch((err) => {
        res.status(400).json(err);
        
      });
  };
  
  module.exports.findOneSingleQuiz = (req, res) => {
    Quiz.findOne({ _id: req.params.id })
      .then((oneSingleQuiz) => {
        res.json(oneSingleQuiz );
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  module.exports.createNewQuiz = (req, res) => {
    Quiz.create(req.body)
      .then((newlyCreatedQuiz) => {
        res.json({ Quiz: newlyCreatedQuiz });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  module.exports.updateExistingQuiz = (req, res) => {
    Quiz.findOneAndUpdate({ _id: req.params.id }, req.body, {
      new: true,
      runValidators: true,
    })
      .then((updatedQuiz) => {
        res.json({ Quiz: updatedQuiz });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };
  
  module.exports.deleteAnExistingQuiz = (req, res) => {
    Quiz.deleteOne({ _id: req.params.id })
      .then((result) => {
        res.json({ result: result });
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  };