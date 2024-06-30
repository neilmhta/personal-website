document.addEventListener("DOMContentLoaded", function() {
  const sections = document.querySelectorAll(".section");
  const navLinks = document.querySelectorAll(".fixedHeader nav ul li a");
  const viewMoreBtn = document.getElementById("view-more-btn");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("close-modal-btn");
  const favicon = document.querySelector("link[rel='icon']");

  // Set initial index to the landing section (assuming it's the first section)
  let currentIndex = 0;
  navigateToSection(currentIndex);

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

  // Navigate using left and right arrow keys
  document.addEventListener("keydown", function(event) {
    if (event.key === "ArrowLeft") {
      navigateToSection(currentIndex - 1);
    } else if (event.key === "ArrowRight") {
      navigateToSection(currentIndex + 1);
    }
  });

  function navigateToSection(index) {
    if (index < 0) {
      index = sections.length - 1; // Loop back to the last section
    } else if (index >= sections.length) {
      index = 0; // Loop back to the first section
    }
    sections[index].scrollIntoView({ behavior: "smooth" });
    currentIndex = index;
    updateNav(index);
    
    // Change favicon based on section index
    changeFavicon(index);
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

  // Function to change the favicon based on section index
  function changeFavicon(index) {
    switch (index) {
      case 0:
        favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👤</text></svg>";
        break;
      case 1:
        favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>📔</text></svg>";
        break;
      case 2:
        favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🖋️</text></svg>";
        break;
      case 3:
        favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>💌</text></svg>";
        break;
      // Add more cases for other sections if needed
      default:
        favicon.href = "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>👤</text></svg>";
    }
  }
});
