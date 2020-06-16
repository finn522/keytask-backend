const {app} = require('./connection.js')
const {getName, postName, deleteName, updateName} = require('./names.js')
const {getTask, postTask} = require('./tasks.js')

//Names
getName;
postName;
deleteName;
updateName;

//Tasks
getTask;
postTask;

// Start the server
app.listen(8081, () => {
    console.log('Server is running');
   });