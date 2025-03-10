//listen for submit
document.getElementById('loan-form').addEventListener('submit', function(e){
    //hide results
    document.getElementById('Results').style.display = 'none';
    document.getElementById('loading').style.display = 'block';

    setTimeout(calculateResults ,2000);

    event.preventDefault();

});

//calculatr results
function calculateResults(){

    
    console.log('calculating...');
    //UI vars
    const amount = document.getElementById('amount');
    const interest = document.getElementById('interest');
    const years = document.getElementById('years');
    const monthlyPayment = document.getElementById('monthly-payment');
    const totalPayment = document.getElementById('total-payment');
    const totalInterest = document.getElementById('total-interest');

    const principal = parseFloat(amount.value);
    const calculatedInterest = parseFloat(interest.value)/ 100 /12;
    const calculatedPayments = parseFloat(years.value) * 12 ;

    //Compute monthly payments
    const x = Math.pow(1 + calculatedInterest, calculatedPayments);
    const monthly = (principal*x*calculatedInterest)/(x-1);

    if(isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments)-principal).toFixed(2);

        //shoe results
        document.getElementById('Results').style.display = 'block';

        //hide loader
        document.getElementById('loading').style.display = 'none';

    }else{
        showError('Please check your numbers');
    }

  
}

//show error
function showError(error){
            //shoe results
    document.getElementById('Results').style.display = 'none';

            //hide loader
    document.getElementById('loading').style.display = 'none';
    const errorDiv = document.createElement('div');

    //get elements
    const card = document.querySelector('.card');
    const heading = document.querySelector('.heading');

    //add class
    errorDiv.className = 'alert alert-danger';

    //addtextnode and apend child
    errorDiv.appendChild(document.createTextNode(error));

    //insert error above heading
    card.insertBefore(errorDiv, heading);

    //clear error after 3 seconds
    setTimeout(clearError, 3000);
}

//clear error
function clearError(){
    document.querySelector('.alert').remove();
}