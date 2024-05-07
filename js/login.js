$(document).ready(function() {

    $('#liveAlertBtn').click(function(event) {
        // Prevent the default form submission
        event.preventDefault();

        // Retrieve the values from the input fields
        var email = $('#floatingInputx').val();
        var password = $('#floatingPasswordx').val();

        // Check if email or password is empty
        if (email === '' || password === '') {
            appendAlert('Email and password are required', 'warning');
            return; // Exit the function early
        }

        // Generate a random session ID
        var sessionId = generateSessionId();
        var loggedIn;
        // Create an object to hold the data
        var formData = {
            email: email,
            password: password
        };

        // Send the data to the PHP script using AJAX
        $.ajax({
            type: 'POST',
            url: 'php/login.php',
            data: formData,
            success: function(response) {
                // Handle the response from the PHP script
                console.log("Response:", response);
                if (response === "success") {
                    // Save email, password, and session ID in sessionStorage
                    sessionStorage.setItem('email', email);
                    sessionStorage.setItem('password', password);
                    sessionStorage.setItem('sessionId', sessionId);
                    sessionStorage.setItem('loggedIn', true);
                    
                    appendAlert('You have successfully logged in', 'success');

                    // Wait for 5 seconds and then redirect to login page
                    setTimeout(() => {window.location.assign("profile.html");}, 2500); // Wait for 5 seconds (5000 milliseconds)
                } else {
                    // Handle invalid email or password
                    appendAlert('Invalid email or password', 'danger');
                }
            },
            error: function(xhr, status, error) {
                // Handle errors
                console.error(xhr.responseText);

            }
        });
    });
});

// Function to generate a random session ID
function generateSessionId() {
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var sessionId = '';
    for (var i = 0; i < 10; i++) {
        sessionId += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return sessionId;
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
