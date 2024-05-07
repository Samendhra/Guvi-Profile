$(document).ready(function() {
    $('#Number1').keypress(function(event) {
        // Allow only numbers (0-9) and backspace (8) key
        var charCode = (event.which) ? event.which : event.keyCode;
        if (charCode > 31 && (charCode < 48 || charCode > 57) && charCode !== 8) {
            event.preventDefault();
        }
    });

    $('#liveAlertBtn').click(function(e) {
        e.preventDefault();
        
        // Reset all validation messages
        $('.invalid-feedback').hide();
        
        // Validate First Name
        var firstName = $('#validationCustom01').val().trim();
        if (firstName === '') {
            $('#validationCustom01').next('.invalid-feedback').show();
            return;
        }
        
        // Validate Last Name
        var lastName = $('#validationCustom02').val().trim();
        if (lastName === '') {
            $('#validationCustom02').next('.invalid-feedback').show();
            return;
        }
        
        // Validate Email
        var email = $('#inputEmail4').val().trim();
        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            $('#inputEmail4').next('.invalid-feedback').show();
            return;
        }
        
        // Validate Password
        var password = $('#inputPassword5').val().trim();
        var passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,20}$/;
        if (!passwordPattern.test(password)) {
            $('#inputPassword5').next('.invalid-feedback').show();
            return;
        }
        
        // Validate Contact Number
        var contactNumber = $('#Number1').val().trim();
        var contactNumberPattern = /^\d{10}$/;
        if (!contactNumberPattern.test(contactNumber)) {
            $('#Number1').next('.invalid-feedback').show();
            return;
        }

        // Validate Gender
        var gender = $('#validationCustom04').val().trim();
        if (gender === '' || gender === null) {
            $('#validationCustom04').next('.invalid-feedback').show();
            return;
        }

        // Validate Address
        var address = $('#Address').val().trim();
        if (address === '') {
            $('#Address').next('.invalid-feedback').show();
            return;
        }

        // Validate Date of Birth
        var dob = $('#date').val().trim();
        if (dob === '') {
            $('#date').next('.invalid-feedback').show();
            return;
        }
        
        // If all validations pass, send data to PHP using AJAX
        $.ajax({
            type: "POST",
            url: "php/register.php",
            data: {
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password,
                contactNumber: contactNumber,
                gender: gender,
                address: address,
                dob: dob
            },
            success: function(response) {
                // Handle success response here
                console.log("success", response);
                
                appendAlert('You have successfully registered', 'success')

                // Wait for 5 seconds and then redirect to login page
                setTimeout(() => {window.location.assign("login.html");}, 2500); // Wait for 5 seconds (5000 milliseconds)
            },
            error: function(xhr, status, error) {
                // Handle error response here
                console.error(xhr.responseText);
            }
        });
    });
});

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