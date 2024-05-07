$(document).ready(function() {
    
    // Event listener for the Logout button
    $('#logout').click(function() {
        
        // Retrieve session ID from sessionStorage
        var sessionId = sessionStorage.getItem('sessionId');

        // Clear session storage
        sessionStorage.clear();
        console.log("session data after cleared",sessionId);
        
        // Remove the 'show' class from the logout alert
        $('.alert').removeClass('show');

        // Send AJAX request to remove session data from Redis
        $.ajax({
            type: 'POST',
            url: 'php/logout.php',
            data: { sessionId: sessionId },
            success: function(response) {
                console.log('Session data cleared from Redis.');
            },
            error: function(xhr, status, error) {
                console.error('Error clearing session data from Redis:', error);
            }
        });

        // Redirect to the login page or perform any other necessary action
        setTimeout(() => { window.location.assign("index.html"); }, 2500); // Redirect to the starting page after 2.5 seconds
    });

    // Fetch user details when the page loads
    fetchUserDetails();

    $('.btn-outline-success').click(function(e) {
        e.preventDefault();
        // Loop through each editable table cell containing user details
        $('.editable').each(function() {
            // Make the content editable
            $(this).attr('contentEditable', true);
            // Add the editing class to highlight the field
            $(this).addClass('editing');
        });
        // Remove readonly attribute from all input fields with class change
        $('.change').removeAttr('readonly');
        // Show the "Save Changes" button
        $('#liveAlertBtn').removeClass('hide');
    });

    // Hide the "Save Changes" button when the success button is clicked
    $('#liveAlertBtn').click(function() {
        // Loop through each editable table cell containing user details
        
        $('.editable').each(function() {
            // Make the content non-editable
            $(this).removeAttr('contentEditable');
            // Remove the editing class
            $(this).removeClass('editing');
        });
        // Add readonly attribute to input fields with class "change"
        $('.change').attr('readonly', true);

        // Hide the "Save Changes" button
        $('#liveAlertBtn').addClass('hide');

        // Display success message
        appendAlert('Changes are saved', 'success');

        var firstName = $('#inputFirstName').val().trim();
        var lastName = $('#inputLastName').val().trim();
        var email = $('#inputEmail').val().trim();
        var password = $('#inputPassword').val().trim();
        var contactNumber = $('#inputContactNumber').val().trim();
        var gender = $('#inputGender').val().trim();
        var address =  $('#inputAddress').val().trim();
        var dob =  $('#inputDateOfBirth').val().trim();

        // Prepare the data object with updated values
        var updatedValues = {
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            contactNumber: contactNumber,
            gender: gender,
            address: address,
            dob: dob
        };

        var sessionEmail = sessionStorage.getItem('email');
        var sessionPassword = sessionStorage.getItem('password');

        console.log("email",sessionEmail);
        console.log("password",sessionPassword);
        
        // Send updated values to profile.php using AJAX
        $.ajax({
        type: 'POST',
        url: 'php/update_profile.php',
        data: {
            updatedValues: updatedValues,
            sessionEmail: sessionEmail,
            sessionPassword: sessionPassword
        },
        success: function(response) {
            // Handle response from server if needed
            console.log('Response:', response);
            fetchUserDetails();
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
    
    });
});

function fetchUserDetails() {
    var email = sessionStorage.getItem('email');
    var password = sessionStorage.getItem('password');
    var loggedIn = sessionStorage.getItem('loggedIn');
    var sessionId = sessionStorage.getItem('sessionId');
    console.log("session email",email);
    console.log("session password",password);
    console.log("session id",sessionId);
    console.log("is user logged in?",loggedIn);

    // Make an AJAX request to profile.php with email and password as URL parameters
    $.ajax({
        type: 'POST',
        url: 'php/profile.php', // Replace with the actual path to your PHP script
        data: {
            email: email,
            password: password,
            loggedIn: loggedIn, 
            sessionId: sessionId
        },
        success: function(response) {
            // Fill the retrieved user details into HTML input fields
            console.log("Success ",response);
            $('#inputFirstName').val(response.firstName);
            $('#inputLastName').val(response.lastName);
            $('#inputEmail').val(response.email);
            $('#inputContactNumber').val(response.contactNumber);
            $('#inputGender').val(response.gender);
            $('#inputAddress').val(response.address);
            $('#inputDateOfBirth').val(response.dob);
            $('#inputPassword').val(response.password);
        },
        error: function(xhr, status, error) {
            console.error(xhr.responseText);
        }
    });
}

const alertPlaceholder = document.getElementById('liveAlertPlaceholder')
                const appendAlert = (message, type) => {
                  const wrapper = document.createElement('div')
                  wrapper.innerHTML = [
                    `<div class="alert alert-${type} alert-dismissible" role="alert">`,
                    `   <div>${message}</div>`,
                    '   <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>',
                    '</div>'
                  ].join('')
                
                  alertPlaceholder.append(wrapper)
                }
