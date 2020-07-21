module.exports = {

swapDate: function swapDate(date) {
    let value = date.split("-").reverse().join("-");
    return value;
  },

  setDeadlineToNull: function setDeadlineToNull(deadline, deadline_date){
    if(deadline === 0 || deadline === false){
      return null;
    }
    else{
      return deadline_date;
    }
  },

  calculateModifer: function calculateModifer(total_tests, completed_tests){
   if ( total_tests / completed_tests === 1){
     return 1.10;
   }
   else{
     let percentage = completed_tests / total_tests;
     if (percentage === 0){
       return 0.1
     }
     else{
       return percentage;
     }

   }
  }
}