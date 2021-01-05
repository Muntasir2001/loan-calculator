//project 4 - loan calculator..

//listen for submit
document.querySelector('#loan-form').addEventListener('submit', function(e) {
   //Hide results
   document.getElementById('results').style.display = 'none';

   calculateResults();

   e.preventDefault();
});

function calculateResults() {
   //UI variables
   const amount = document.getElementById('amount');
   const interest = document.getElementById('interest');
   const years = document.getElementById('years');
   const monthlyPayment = document.getElementById('monthly-payment');
   const totalPayment = document.getElementById('total-payment'); 
   const totalInterest = document.getElementById('total-interest');

   const principal = parseFloat(amount.value);
   const calculatedInterest = parseFloat(interest.value) / 100 / 12;
   const calculatedPayments = parseFloat(years.value) * 12;

   // Compute monthly payments (dont worry about the code)
   const x = Math.pow(1 + calculatedInterest, calculatedPayments);
   const monthly = (principal*x*calculatedInterest)/(x-1);

   if (isFinite(monthly)) {
      monthlyPayment.value = monthly.toFixed(2); //toFixed(2) will put the number into 2 dp. It has exactly digits digits after the decimal place...
      totalPayment.value = (monthly * calculatedPayments).toFixed(2);
      totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);

      document.getElementById('results').style.display = 'block';
   } else {
      // console.log('Please check your numbers');
      showError('Please check your numbers');
   }
}

//show error
function showError(error) {
   //hide results
   document.getElementById('results').style.display = 'none';

   const errorDiv = document.createElement('div');

   //Get elements
   const card = document.querySelector('.card');
   const heading = document.querySelector('.heading');

   //add class
   errorDiv.className = "alert alert-danger";

   //create text node and append to div
   errorDiv.appendChild(document.createTextNode(error));

   //Insert error above heading
   card.insertBefore(errorDiv, heading); //insert errorDiv before heading

   //clear error after 3 seconds (way to set timeout feature for a notification)
   setTimeout(clearError, 3000); //in the place of "clearError", you can create a function instead. The second parameter it takes is the timeout parameter (3000) and the unit is in ms so 3000 ms is equal to 3 sec.
}

//clear error
function clearError() {
   document.querySelector('.alert').remove();
}