document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".fixedHeader nav ul li a");
  const viewMoreBtn = document.getElementById("view-more-btn");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("close-modal-btn");

  let currentIndex = 0;

  // Attach click event listeners to navbar links
  navLinks.forEach((link, index) => {
    link.addEventListener("click", function(event) {
      event.preventDefault();
      navigateToSection(index);
    });
  });

  // Swipe gesture detection
  let touchstartX = 0;
  let touchendX = 0;

  document.addEventListener("touchstart", function(event) {
    touchstartX = event.changedTouches[0].screenX;
  });

  document.addEventListener("touchend", function(event) {
    touchendX = event.changedTouches[0].screenX;
    handleSwipe();
  });

  function handleSwipe() {
    if (touchendX < touchstartX) {
      // Swiped left
      navigateToSection(currentIndex + 1);
    } else if (touchendX > touchstartX) {
      // Swiped right
      navigateToSection(currentIndex - 1);
    }
  }

  function navigateToSection(index) {
    if (index < 0) {
      index = sections.length - 1; // Loop back to the last section
    } else if (index >= sections.length) {
      index = 0; // Loop back to the first section
    }
    sections[index].scrollIntoView({ behavior: "smooth" });
    currentIndex = index;
    updateNav(index);
  }

  function updateNav(index) {
    navLinks.forEach((link, i) => {
      if (i === index) {
        link.classList.add("currentSection");
      } else {
        link.classList.remove("currentSection");
      }
    });
  }

  viewMoreBtn.addEventListener("click", function() {
    modal.style.display = "flex";
  });

  closeModalBtn.addEventListener("click", function() {
    modal.style.display = "none";
  });

  window.addEventListener("click", function(event) {
    if (event.target === modal) {
      modal.style.display = "none";
    }
  });
});
