var currentTab = 0; // Current tab is set to be the first tab (0)
let selectedUser = undefined;

showTab(currentTab); // Display the current tab



/**
 * Displays the content of the tab in question for login: user selection or info input
 * and updates the Prev/Next buttons logic
 */
function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block"; // displays the block of the tab i want

  // CHOOSING WHAT USER YOU ARE TAB
  if (n == 0) {
    // if (!selectedUser){
    //   document.getElementById("nextBtn").style.display = "none";
    // }
    // else{
    //   document.getElementById("nextBtn").style.display = "inline";
    // }
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }

  // ENTERING INFO TAB
  if (n == (x.length - 1) || selectedUser == 'person') {
    document.getElementById("nextBtn").innerHTML = "Continue";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
  const selectedOption = document.querySelector('input[name="signup-gender"]:checked');
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  //ALLLOOOOO BORRE ALGO IMPORTANTE
  if (n == 1 && !validateForm()){
    return false;
  }
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  if (selectedUser == 'person' && n == 1 && currentTab == 2){
    currentTab += 1;
  }
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    document.getElementById("signupForm").submit();
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // y = x[currentTab].querySelectorAll(".tab-content input");

  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty and in corresponding tab...
    if (y[i].value == ""){
      if ((currentTab == 2 && y[i].id.startsWith(selectedUser+"-")) || (currentTab != 2)) {
        // add an "invalid" class to the field:
        y[i].className += " invalid";
        // and set the current valid status to false:
        valid = false;
      }
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

const radioButtons = document.querySelectorAll('input[name="signup-gender"]');

radioButtons.forEach(function(radioButton) {
  radioButton.addEventListener('change', function() {
    // Remove 'selected' class from all radio buttons
    const selectedOption = this.value;
    selectedUser = selectedOption;
      showTabContent(selectedOption);
    radioButtons.forEach(function(rb) {
      rb.parentNode.classList.remove('selected');
    });

    // Add 'selected' class to the currently selected radio button
    this.parentNode.classList.add('selected');
  });
});


  const tabContentElements = document.querySelectorAll('.tab-content');

  function showTabContent(selectedOption) {

    tabContentElements.forEach(content => {
      content.style.display = "none";
    });

    const selectedContent = document.getElementById(`content${selectedOption}`);
    if (selectedContent) {
      selectedContent.style.display = "block";
    }
  }

