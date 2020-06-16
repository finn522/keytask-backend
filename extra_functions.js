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
  }
}