const { connection, app } = require("./connection.js");
const { swapDate, setDeadlineToNull } = require("./extra_functions.js");
module.exports = {
  getTask: app.get("/tasks", function (req, res) {
    connection.query("SELECT * FROM tasks", function (error, results, fields) {
      if (error) {
        res.status(500).send(error);
      }
      res.send(results);
    });
  }),

  postTask: app.post("/insert-task", function (req, res) {
    connection.query(
      "INSERT INTO tasks (task_title, task_priority, task_customer, task_deadline, task_deadline_date, task_creator, task_location, task_description, task_custom_reward, task_reward) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
      [
        req.body.title,
        req.body.priority,
        req.body.customer,
        req.body.deadline,
        setDeadlineToNull(req.body.deeadline, swapDate(req.body.deadline_date)),
        req.body.creator,
        req.body.location,
        req.body.description,
        req.body.custom_reward,
        req.body.reward,
      ],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),

  updateTask: app.put("/update-task/:task_id", function (req, res) {
    connection.query(
      "UPDATE tasks SET task_title=(?), task_priority=(?), task_customer=(?), task_deadline=(?), task_deadline_date=(?), task_creator=(?), task_location=(?), task_description=(?), task_custom_reward=(?), task_reward=(?) WHERE task_id=(?)",
      [
        req.body.title,
        req.body.priority,
        req.body.customer,
        req.body.deadline,
        setDeadlineToNull(req.body.deeadline, swapDate(req.body.deadline_date)),
        req.body.creator,
        req.body.location,
        req.body.description,
        req.body.custom_reward,
        req.body.reward,
        req.body.id,
      ],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),

  deleteTask: app.delete("/delete-task", function (req, res) {
    connection.query(
      "DELETE FROM tasks WHERE task_id=(?)",
      [req.body.id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),

  claimTask: app.put("/tasks/:task_id", function (req, res) {
    connection.query(
      "UPDATE tasks SET fk_user_id=(?), task_status='Claimed', task_claimant=(SELECT user_name FROM users WHERE user_id=(?)) WHERE task_id=(?)",
      [req.body.user_id, req.body.user_id, req.body.task_id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),
  finishTask: app.put("/users/:user_id", function (req, res) {
    connection.query(
      "UPDATE users SET user_points = (user_points + (SELECT task_reward FROM tasks WHERE task_id = (?))), user_completed_tasks = (user_completed_tasks + 1) WHERE user_id = (?)",
      [req.body.task_id, req.body.user_id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),
  changeStatus: app.put("/status-task/:task_id", function (req, res) {
    connection.query(
      "UPDATE tasks SET task_status='Archived', task_finished=(?) WHERE task_id=(?)",
      [new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      ), req.body.id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  })
};
