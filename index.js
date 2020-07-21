const {app} = require('./connection.js')
const {getName, postName, deleteName, updateName} = require('./names.js')
const {getTask, postTask} = require('./tasks.js')
const { postPushResult, fetchTestResult } = require('./pipeline.js');

//Names
getName;
postName;
deleteName;
updateName;

//Tasks
getTask;
postTask;

//Pipeline
postPushResult;
fetchTestResult;

// Start the server
app.listen(8082, () => {
    console.log('Server is running');
   });