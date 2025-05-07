document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  const ratingForm = document.getElementById("rating-form");
  const ratingCard = document.getElementById("rating-card");
  const thankYouCard = document.getElementById("thank-you-card");
  const chosenRatingSpan = document.getElementById("chosen-rating");
  const ratingButtons = document.querySelectorAll(".rating-btn");
  const errorMsg = document.getElementById("error-msg");
  const rateAgainBtn = document.getElementById("rate-again-btn");
  const ratingTitle = document.querySelector(".rating-title");
  const thankYouTitle = document.querySelector(".thank-you-title");

  let selectedRating = null;

  // Initialize animations
  ratingTitle.style.animation = "backInDown 1s ease-out both";

  // Rating Selection
  ratingButtons.forEach(button => {
    button.addEventListener("click", () => {
      ratingButtons.forEach(btn => {
        btn.classList.remove("selected");
        btn.setAttribute("aria-selected", "false");
      });
      button.classList.add("selected");
      button.setAttribute("aria-selected", "true");
      selectedRating = button.dataset.rating;
      errorMsg.classList.add("hidden");
    });
  });

  // Form Submission
  ratingForm.addEventListener("submit", (e) => {
    e.preventDefault();
    
    if (!selectedRating) {
      errorMsg.classList.remove("hidden");
      return;
    }

    chosenRatingSpan.textContent = selectedRating;
    ratingCard.classList.add("hidden");
    thankYouCard.classList.remove("hidden");
    
    // Reset animation to trigger it again
    thankYouTitle.style.animation = "none";
    void thankYouTitle.offsetWidth; // Trigger reflow
    thankYouTitle.style.animation = "bounceInRight 1s ease-out both";
  });

  // Rate Again Button
  rateAgainBtn.addEventListener("click", () => {
    ratingButtons.forEach(btn => {
      btn.classList.remove("selected");
      btn.setAttribute("aria-selected", "false");
    });
    selectedRating = null;
    thankYouCard.classList.add("hidden");
    ratingCard.classList.remove("hidden");
    
    // Reset animation to trigger it again
    ratingTitle.style.animation = "none";
    void ratingTitle.offsetWidth; // Trigger reflow
    ratingTitle.style.animation = "backInDown 1s ease-out both";
    
    ratingButtons[0].focus();
  });
});