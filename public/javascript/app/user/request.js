$(window).on('load', initialize);

function initialize() {


    //the submission of a form with the ID request-form.
    // Let's break down what each part of the code is doing:

    $('#request-form').on('submit', function (e) {
        e.preventDefault();



    //his part uses jQuery to attach a submit event handler to 
    //the form with the ID request-form.
    //Here, the script is creating an empty object formData 
    //to store the form data.
        const formData = {};
        const data = $(this).serializeArray();
        data.forEach(({ name, value }) => {
            formData[name] = value;
        })

    //This section uses jQuery's $.ajax() function to make an HTTP POST request
       $.ajax({

    //The request is sent to the '/api/app' URL .
            url: '/api/app',
    //This specifies that the HTTP method for the request is 'POST', 
    //indicating that the intention is to send data to the server.
            method: 'post',
            cache: false,

    //The contentType is set to indicate that the data being sent is JSON.      
            contentType: 'application/json; charset=utf-8',

    //This specifies the expected data type of the response from the server. 
    //In this case, it expects the response to be in JSON format.
            dataType: 'json',

    //This converts the formData object into a JSON string using JSON.stringify() 
    //and sends it as the data payload of the request. The server can then parse this JSON data.
            data: JSON.stringify(formData),


    //This is the callback function that will be executed if the AJAX request is successful. 
            success: function () {

    //This uses the SweetAlert library to show a success message with a title 'Success!' 
    //and a message 'Your request is updated.' in a pop-up dialog with a success icon.
                Swal.fire(
                    'Success!',
                    'Your request is updated.',
                    'success'
                )
            },

    //This is the callback function that will be executed if the AJAX request encounters an error.
            error: function () {

    //if error occur then below code will run
                Swal.fire(
                    'Error!',
                    'Something went wrong.',
                    'error'
                );
            }
        })
    });

}