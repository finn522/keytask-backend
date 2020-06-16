const { connection, app } = require("./connection.js");

module.exports = {
  getUsers: app.get("/users", function (req, res) {
    connection.query("SELECT * FROM users", function (error, results, fields) {
      if (error) {
        res.status(500).send(error);
      }
      res.send(results);
    });
  }),
  getUser: app.get("/users/:user_id", function (req, res) {
    connection.query(
      "SELECT * FROM users WHERE user_id=(?)",
      [req.params.user_id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),
  getUserRankedPoints: app.get("/users-ranked-points", function (req, res) {
    connection.query(
      'SELECT * FROM users WHERE user_role = ("Developer") ORDER BY user_points DESC ',
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),
  getUserRankedTasks: app.get("/users-ranked-tasks", function (req, res) {
    connection.query(
      'SELECT * FROM users WHERE user_role = ("Developer") ORDER BY user_completed_tasks DESC',
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),
};
