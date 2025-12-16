
//update view when button clicked
var updateView = async (button) => {
    let api = ''; //api url variable

    //checking which button was clicked
    if(button.dataset.querytype == 'by_name') {
   let queryValue = document.querySelector('#nameQuery').value;

   // api url with name parameter
   api = `http://localhost:3000/api/by_name/${queryValue}`;
}

//age search parameter
else if 
    (button.dataset.querytype == 'by_age') {
   let queryStartAge = document.querySelector('#startAgeQuery').value; //start age value
   let queryEndAge = document.querySelector('#endAgeQuery').value; //end age value

    //api url with age range parameters
   api = `http://localhost:3000/api/by_age/${queryStartAge}/${queryEndAge}`; 
}

//fetch data from api
const data = await fetch(api);
const model = await data.json(); //parsing json data
render_view(model); //rendering view with the data
}

var render_view = (model) => { //model is the data from the api
    var source = document.querySelector('#show_results_view').innerHTML; //getting the template from the html
    var template = Handlebars.compile(source); //compiling the template
    var newHTML = template(model); //invoking template using the model

    document.querySelector("#results").innerHTML =newHTML;
    document.querySelector("#resultCount").innerHTML = model.employees.length; //updating result count
}

//reset form function
var resetForm = () => {
    document.querySelector('#queryForm').reset(); //resetting the form input fields
    document.querySelector('#results').innerHTML = ''; //clear results section
    document.querySelector("#resultCount").textContent = 0; //reset result count
}   
