const { connection, app } = require("./connection.js");
const { calculateModifer } = require("./extra_functions.js");
module.exports = {
  postPushResult: app.post("/push-result", function (req, res) {
    connection.query(
      "SELECT commit_message FROM pipeline_inserts WHERE commit_message = (?)",
      [req.body.commit_message],
      function (error, results, fields) {
        if (results.length === 0) {
          connection.query(
            "INSERT INTO pipeline_inserts (commit_message, test_results, total_tests, tests_passed, fk_task_id) SELECT ?, ?, ?, ?, tasks.task_id FROM tasks WHERE task_title = (?) AND task_status = 'Claimed'",
            [
              req.body.commit_message,
              req.body.test_results,
              req.body.total_tests,
              req.body.tests_passed,
              req.body.commit_message,
            ],
            function () {
              connection.query(
                "UPDATE tasks SET task_reward=task_reward * (?) WHERE task_title = (?)",
                [
                  calculateModifer(req.body.total_tests, req.body.tests_passed),
                  req.body.commit_message,
                ],
                function (result, error) {
                  console.log(result, error);
                }
              );
            }
          );
          res.send(results);
        } else if (results.length === 1) {
          connection.query(
            'UPDATE pipeline_inserts SET test_results=(?) WHERE commit_message = (SELECT * FROM (SELECT commit_message FROM pipeline_inserts WHERE commit_message=(?)) AS y)',
            [req.body.test_results,
            req.body.commit_message],
            function (result, error) {
              console.log(result, error);
            }
          );
          res.send(results);
        } else {
          res.send("Er is iets fout gegaan.");
        }
      }
    );
  }),

  fetchTestResult: app.get("/test-result/:task_id", function (req, res) {
    connection.query(
      "SELECT test_results FROM pipeline_inserts WHERE fk_task_id = (?)",
      [req.params.task_id],
      function (error, results, fields) {
        if (error) {
          res.status(500).send(error);
        }
        res.send(results);
      }
    );
  }),
};
