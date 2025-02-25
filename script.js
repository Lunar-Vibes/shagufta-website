// Select the theme toggle button
const themeToggle = document.getElementById("theme-toggle");

// Add an event listener to toggle Dark Mode
themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    // Save the user's preference in localStorage
    if (document.body.classList.contains("dark-mode")) {
        localStorage.setItem("darkMode", "enabled");
        themeToggle.innerText = "☀️ Light Mode";
    } else {
        localStorage.setItem("darkMode", "disabled");
        themeToggle.innerText = "🌙 Dark Mode";
    }
});

// Apply saved theme on page load
if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
    themeToggle.innerText = "☀️ Light Mode";
}
// Select the form and list container
const form = document.getElementById("review-form");
const reviewList = document.getElementById("review-list");

// Load reviews from localStorage
document.addEventListener("DOMContentLoaded", loadReviews);

// Handle Form Submission
form.addEventListener("submit", (event) => {
    event.preventDefault(); // Prevent page reload

    const name = document.getElementById("name").value;
    const rating = document.getElementById("rating").value;
    const comment = document.getElementById("comment").value;

    if (name && comment) {
        const review = { name, rating, comment };
        saveReview(review);
        displayReview(review);
        form.reset(); // Clear form after submission
    }
});

// Save Review to localStorage
function saveReview(review) {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.push(review);
    localStorage.setItem("reviews", JSON.stringify(reviews));
}

// Load Reviews on Page Load
function loadReviews() {
    let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
    reviews.forEach(displayReview);
}

// Display Review on the Page
function displayReview(review) {
    const reviewDiv = document.createElement("div");
    reviewDiv.classList.add("review-item");
    reviewDiv.innerHTML = `
        <strong>${review.name}</strong> - ⭐️ ${review.rating}/5 <br>
        <p>${review.comment}</p>
    `;
    reviewList.prepend(reviewDiv);
}

