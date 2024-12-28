document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector(".trial-form");
    const firstNameInput = document.querySelector("#firstName");
    const lastNameInput = document.querySelector("#lastName");
    const emailInput = document.querySelector("#email");
    const passwordInput = document.querySelector("#password");
    const toast = document.querySelector("#toast");

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        clearErrors();

        let valid = true;

        if (!firstNameInput.value.trim()) {
            showError(firstNameInput, "First Name cannot be empty");
            valid = false;
        }

        if (!lastNameInput.value.trim()) {
            showError(lastNameInput, "Last Name cannot be empty");
            valid = false;
        }

        if (!emailInput.value.trim()) {
            showError(emailInput, "Email Address cannot be empty");
            valid = false;
        } else if (!validateEmail(emailInput.value.trim())) {
            showError(emailInput, "Looks like this is not an email");
            valid = false;
        }

        if (!passwordInput.value.trim()) {
            showError(passwordInput, "Password cannot be empty");
            valid = false;
        }

        if (valid) {
            showToast("Form submitted successfully!");
            clearInputs();
        }
    });

    function showError(input, message) {
        const errorDiv = input.parentElement.querySelector(".error-message");
        errorDiv.innerText = message;
        input.parentElement.classList.add("error");
        errorDiv.style.display = "block"; // Ensure error message is displayed

        // Add input event listener to clear error on input 
        input.addEventListener("input", function () {
            clearErrors(input);
        });
    }

    function clearErrors() {
        const errorMessages = document.querySelectorAll(".error-message");
        errorMessages.forEach(message => {
            message.innerText = '';
            message.style.display = 'none';
        });

        const errorInputs = document.querySelectorAll(".error");
        errorInputs.forEach(input => input.classList.remove("error"));
    }

    function validateEmail(email) {
        const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,3}$/;
        return emailPattern.test(email);
    }

    // Define the showToast function 
    function showToast(message) {
        toast.innerText = message;
        toast.style.display = "block";

        setTimeout(() => {
            toast.style.display = "none";
        }, 4000); // Hide toast after 3 seconds 
    }

    // Define the clearInputs function 
    function clearInputs() {
        firstNameInput.value = '';
        lastNameInput.value = '';
        emailInput.value = '';
        passwordInput.value = ''
    }
});