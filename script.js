function initApp() {

    /**
     * Initiate element vars
     */
    elementUnassigned = document.getElementById('counterUnassigned');
    elementOverdue = document.getElementById('counterOverdue');
    elementTotal = document.getElementById('counterTotal');
    elementLogo = document.getElementById('logo');
    
    /**
     * Initiate object
     */
    elementsCounters = document.getElementsByClassName('counter');

}


/**
 * Fetch the data from the api
 * @return object
 */
function ajaxCall() {
  var ajax = new XMLHttpRequest ();
      ajax.overrideMimeType('application/json');
      method = 'GET';
      file = 'd.json'

  ajax.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      dataCounter = JSON.parse(this.responseText);
    }
  };

  // Open the 'url', send the request and return the response
  ajax.open(method, file, true);
  ajax.send();
};


/**
 * Get the IDs and total of unassigned tickets
 * @param  {data object} data
 * @return {array}  dataUnassigned
 */
function getUnassigned(data) {
  var data = dataCounter;
      dataUnassigned = [];
  for (var i = data.requests.length - 1; i >= 0; i--) {
    if (data.requests[i].technician === null) {
      dataUnassigned.push(data.requests[i].id);
    }
  }
}


/**
 * Get the total overdue tickets
 * @param  {data object} data
 * @return {array} dataOverdue
 */
function getOverdue(data) {
  var data = dataCounter;
      dataOverdue = [];
  for (var i = data.requests.length - 1; i >= 0; i--) {
    if (data.requests[i].is_overdue === true) {
      dataOverdue.push(data.requests[i].id);
    }
  }
}


/**
 * Update the counter with date
 * @return {none}
 */
function updateCounters() {
  
  /**
   * Update unassigned
   */
  var unassignedCntr = elementUnassigned.childNodes[1].childNodes[0];
  unassignedCntr.innerText = dataUnassigned.length;
  if (dataUnassigned.length > 0) {
    elementUnassigned.classList.add('alert');
    elementUnassigned.classList.remove('green');
  } else {
    elementUnassigned.classList.remove('alert');
    elementUnassigned.classList.add('green');
  }

  /**
   * Update Overdue
   */
  var overdueCntr = elementOverdue.childNodes[1].childNodes[0];
  overdueCntr.innerText = dataOverdue.length;
  if (dataOverdue.length > 0) {
    elementOverdue.classList.add('alert');
    elementOverdue.classList.remove('green');
  } else {
    elementOverdue.classList.remove('alert');
    elementOverdue.classList.add('green');
  }

  /**
   * Update total
   */
  var totalCntr = elementTotal.childNodes[1].childNodes[0];
  totalCntr.innerText = dataCounter.requests.length;

}


/**
 * Check if there are any alerts, and change the colour of the logo
 * @return {none}
 */
function checkAlert() {
  var counters = elementsCounters;
      control = 0
  for (var i = counters.length - 1; i >= 0; i--) {
    if (counters[i].classList.contains('alert')) {
      control++
    }
  }
  if (control > 0) {
    elementLogo.classList.add('alert');
  } else {
    elementLogo.classList.remove('alert');
  }
}


////////////////////////
// Call the functions //
////////////////////////
ajaxCall();
initApp();
setInterval(function(){
  ajaxCall();
  getUnassigned();
  getOverdue();
  updateCounters();
  checkAlert();
}, 30000);
