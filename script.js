function showError(input, message) {
  let errorElem = input.parentElement.querySelector(".error-message");
  if (!errorElem) {
    errorElem = document.createElement("span");
    errorElem.classList.add("error-message");
    input.parentElement.appendChild(errorElem);
  }
  errorElem.textContent = message;
}

function clearError(input) {
  const errorElem = input.parentElement.querySelector(".error-message");
  if (errorElem) errorElem.remove();
}

// Email regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[0-9]{10}$/;
const nameRegex = /^[A-Za-z\s]{2,}$/;

// Validate individual fields
function validateField(input) {
  const id = input.id;
  const value = input.value.trim();

  switch (id) {
    case "name":
    case "contact-name":
      if (!value) showError(input, "Name is required.");
      else if (!nameRegex.test(value))
        showError(input, "Only letters allowed.");
      else clearError(input);
      break;

    case "dob":
      if (!value) showError(input, "Date of birth is required.");
      else clearError(input);
      break;

    case "gender":
      if (!value) showError(input, "Please select a gender.");
      else clearError(input);
      break;

    case "email":
    case "contact-email":
      if (!value) showError(input, "Email is required.");
      else if (!emailRegex.test(value))
        showError(input, "Enter a valid email.");
      else clearError(input);
      break;

    case "phone":
      if (!value) showError(input, "Phone number is required.");
      else if (!phoneRegex.test(value))
        showError(input, "Enter a 10-digit phone number.");
      else clearError(input);
      break;

    case "address":
      if (!value) showError(input, "Address is required.");
      else clearError(input);
      break;

    case "course":
      if (!value) showError(input, "Course name is required.");
      else clearError(input);
      break;

    case "contact-subject":
      if (!value) showError(input, "Subject is required.");
      else clearError(input);
      break;

    case "contact-message":
      if (!value) showError(input, "Message cannot be empty.");
      else clearError(input);
      break;
  }
}

// Add real-time validation to all inputs
document.querySelectorAll("input, select, textarea").forEach((input) => {
  input.addEventListener("input", () => validateField(input));
});

// Admission form validation on submit
document
  .getElementById("admission-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    this.querySelectorAll("input, select, textarea").forEach((input) => {
      validateField(input);
      if (input.parentElement.querySelector(".error-message")) isValid = false;
    });

    if (isValid) {
      document.getElementById("admission-message").innerHTML =
        "<p style='color: green;'>Admission form submitted successfully!</p>";
      this.reset();
    } else {
      document.getElementById("admission-message").innerHTML = "";
    }
  });

// Contact form validation on submit
document
  .getElementById("contact-form")
  .addEventListener("submit", function (e) {
    e.preventDefault();
    let isValid = true;

    this.querySelectorAll("input, textarea").forEach((input) => {
      validateField(input);
      if (input.parentElement.querySelector(".error-message")) isValid = false;
    });

    if (isValid) {
      document.getElementById("contact-response").innerHTML =
        "<p style='color: green;'>Thanks! We'll get back to you soon.</p>";
      this.reset();
    } else {
      document.getElementById("contact-response").innerHTML = "";
    }
  });
// Review form validation on submit
const reviewForm = document.getElementById("reviewForm");
const reviewsList = document.getElementById("reviewsList");

reviewForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const reviewText = document.getElementById("reviewText").value.trim();
  const rating = document.querySelector('input[name="rating"]:checked');

  if (reviewText && rating) {
    const div = document.createElement("div");
    div.className = "review";
    div.innerHTML = `<strong>Rating: ${rating.value} stars</strong><br>${reviewText}`;
    reviewsList.appendChild(div);

    reviewForm.reset();
  } else {
    alert("Please write a review and select a rating.");
  }
});
