const db = require("../models")
const mongoose = require("mongoose");

module.exports = function (app) {
  app.get("/api/workouts", (req, res) => {
    db.workout.find()
      // .sort({ date: -1 })
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.get("/api/workouts/range", (req, res) => {
    db.workout.find()
      .limit(7)
      .then((dbWorkout) => {
        res.json(dbWorkout);
      })
      .catch((err) => {
        res.status(400).json(err);
      });
  });

  app.post("/api/workouts", (req, res) => {
    console.log(req.body);
    db.workout.create(req.body)
      .then(dbWorkouts => {
        res.json(dbWorkouts);
      })
      .catch(err => {
        res.json(err);
      })
  });

  app.put("/api/workouts/:id", (req, res) => {
    db.workout.findByIdAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      function (err, result) {
          if (err) {
              console.log("Error: ", err);
              res.send(err);
          } else {
              console.log("Updated dbWorkout: ", result);
              res.send(result);
          }
      }
  );
    });

};
