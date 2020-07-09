const { connection, app } = require("./connection.js");

module.exports = {
    postPushResult: app.post("/push-result", function (req, res) {
        console.log(req.body.test)
        connection.query(
          "INSERT INTO pipeline_inserts (commit_message, test_results, total_tests, tests_passed) VALUES (?, ?, ?, ?)",
          [
            req.body.commit_message,
            req.body.test_results,
            req.body.total_tests,
            req.body.tests_passed
          ],
          function (error, results, fields) {
            if (error) {
              res.status(500).send(error);
            }
            res.send(results);
          }
        );
      }),
};
