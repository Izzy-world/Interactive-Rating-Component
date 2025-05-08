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

  // State
  let selectedRating = null;
  let isSubmitting = false;

  // Initialize animations
  const initAnimations = () => {
    ratingTitle.style.animation = "backInDown 1s ease-out both";
    thankYouTitle.style.animation = "none";
  };

  // Reset rating selection
  const resetRatingSelection = () => {
    ratingButtons.forEach(btn => {
      btn.classList.remove("selected");
      btn.setAttribute("aria-selected", "false");
      btn.style.backgroundColor = "";
      btn.style.color = "";
    });
    selectedRating = null;
  };

  // Handle rating selection
  const handleRatingSelection = (button) => {
    resetRatingSelection();
    button.classList.add("selected");
    button.setAttribute("aria-selected", "true");
    selectedRating = button.dataset.rating;
    errorMsg.classList.add("hidden");
  };

  // Submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (isSubmitting) return;
    
    if (!selectedRating) {
      errorMsg.classList.remove("hidden");
      // Add shake animation to error message
      errorMsg.style.animation = "shake 0.5s ease-in-out";
      setTimeout(() => errorMsg.style.animation = "", 500);
      return;
    }

    isSubmitting = true;
    chosenRatingSpan.textContent = selectedRating;
    
    // Transition between cards
    ratingCard.classList.add("hidden");
    setTimeout(() => {
      thankYouCard.classList.remove("hidden");
      resetAnimation(thankYouTitle, "bounceInRight 1s ease-out both");
      isSubmitting = false;
    }, 300); // Match this with your CSS transition duration
  };

  // Reset animation helper
  const resetAnimation = (element, animation) => {
    element.style.animation = "none";
    void element.offsetWidth; // Trigger reflow
    element.style.animation = animation;
  };

  // Rate again functionality
  const handleRateAgain = () => {
    thankYouCard.classList.add("hidden");
    setTimeout(() => {
      ratingCard.classList.remove("hidden");
      resetAnimation(ratingTitle, "backInDown 1s ease-out both");
      resetRatingSelection();
      ratingButtons[0].focus();
    }, 300);
  };

  // Event Listeners
  ratingButtons.forEach(button => {
    button.addEventListener("click", () => handleRatingSelection(button));
    // Keyboard accessibility
    button.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleRatingSelection(button);
      }
    });
  });

  ratingForm.addEventListener("submit", handleSubmit);
  rateAgainBtn.addEventListener("click", handleRateAgain);

  // Initialize
  initAnimations();
});