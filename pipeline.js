const { connection, app } = require("./connection.js");

module.exports = {
    postPushResult: app.post("/push-result", function (req, res) {
        console.log(req.body.test)
        connection.query(
          "INSERT INTO pipeline_inserts (test) VALUES (?)",
          [
            req.body.test
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
