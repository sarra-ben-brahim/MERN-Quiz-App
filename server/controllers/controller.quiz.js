const Quiz = require("../models/model.quiz");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, "uploads/"); 
  },
  filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
  },
});

const upload = multer({
  storage,
  fileFilter: (req, file, cb) => {
      const allowedExtensions = /jpeg|jpg|png/;
      const extension = path.extname(file.originalname).toLowerCase();
      if (allowedExtensions.test(extension)) {
          cb(null, true);
      } else {
          cb(new Error("Only .jpeg, .jpg, and .png formats are allowed!"));
      }
  },
});

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
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      const quizData = {
        ...req.body,
        image: req.file ? req.file.path : undefined,
      };
  
      Quiz.create(quizData)
        .then((newlyCreatedQuiz) => {
          res.json({ Quiz: newlyCreatedQuiz });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
    });
  };
  
  module.exports.updateExistingQuiz = (req, res) => {
    upload.single("image")(req, res, (err) => {
      if (err) {
        return res.status(400).json({ message: err.message });
      }
  
      const updatedData = {
        ...req.body,
        ...(req.file && { image: req.file.path }), 
      };
  
      Quiz.findOneAndUpdate({ _id: req.params.id }, updatedData, {
        new: true,
        runValidators: true,
      })
        .then((updatedQuiz) => {
          res.json({ Quiz: updatedQuiz });
        })
        .catch((err) => {
          res.status(400).json(err);
        });
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