'use strict';

//show when scroll
document.addEventListener("DOMContentLoaded", function () {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, {
    threshold: 0.1
  });

  const sections = document.querySelectorAll('.testimonials, .clients');

  sections.forEach(section => {
    observer.observe(section);
  });
});


// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });


//auto typing titles
document.addEventListener("DOMContentLoaded", function () {
  const titles = ["Front-End Developer", "WordPress Developer", "YouTuber"];
  let titleIndex = 0;
  let charIndex = 0;
  let isDeleting = false;

  function typeEffect() {
    const currentTitle = titles[titleIndex];
    const typingElement = document.getElementById("typing");

    if (!typingElement) return;

    if (isDeleting) {
      charIndex--;
      typingElement.textContent = currentTitle.substring(0, charIndex);
    } else {
      charIndex++;
      typingElement.textContent = currentTitle.substring(0, charIndex);
    }

    if (!isDeleting && charIndex === currentTitle.length) {
      setTimeout(() => {
        isDeleting = true;
        typeEffect();
      }, 1500);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      titleIndex = (titleIndex + 1) % titles.length;
    }

    setTimeout(typeEffect, isDeleting ? 50 : 100);
  }

  typeEffect();
});



//autosliding testimonial
document.addEventListener('DOMContentLoaded', () => {
  const slider = document.querySelector('.testimonials-list');
  const slideAmount = 320; // width + gap of one item approx (adjust if needed)
  let scrollPos = 0;

  function autoSlide() {
    if (!slider) return;
    scrollPos += slideAmount;

    if (scrollPos >= slider.scrollWidth - slider.clientWidth) {
      // Loop back to start
      scrollPos = 0;
    }

    slider.scrollTo({
      left: scrollPos,
      behavior: 'smooth'
    });
  }

  // Slide every 3 seconds (adjust speed here)
  setInterval(autoSlide, 3000);
});

//autosliding clients
document.addEventListener('DOMContentLoaded', () => {
  function setupAutoSlide(selector, slideAmount = 320, interval = 3000) {
    const slider = document.querySelector(selector);
    if (!slider) return;

    let scrollPos = 0;

    function autoSlide() {
      scrollPos += slideAmount;

      if (scrollPos >= slider.scrollWidth - slider.clientWidth) {
        scrollPos = 0; // Loop back to start
      }

      slider.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }

    setInterval(autoSlide, interval);
  }

  // Apply to both sliders
  setupAutoSlide('.testimonials-list');
  setupAutoSlide('.clients-list');
});




// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variable
const modalImg = document.querySelector("[data-modal-img]");
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {

  testimonialsItem[i].addEventListener("click", function () {

    modalImg.src = this.querySelector("[data-testimonials-avatar]").src;
    modalImg.alt = this.querySelector("[data-testimonials-avatar]").alt;
    modalTitle.innerHTML = this.querySelector("[data-testimonials-title]").innerHTML;
    modalText.innerHTML = this.querySelector("[data-testimonials-text]").innerHTML;

    testimonialsModalFunc();

  });

}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    const itemCategory = filterItems[i].dataset.category.toLowerCase(); // normalize category

    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else if (selectedValue === itemCategory) {
      filterItems[i].classList.add("active");
    } else {
      filterItems[i].classList.remove("active");
    }
  }
};


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {

    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }

  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


//skill set animation
document.addEventListener('DOMContentLoaded', () => {
  const skillSection = document.querySelector('.skill');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          skillSection.classList.add('visible');
          observer.unobserve(skillSection); // Animate only once
        }
      });
    },
    {
      threshold: 0.1, // Trigger when 10% visible
    }
  );

  observer.observe(skillSection);
});


// In your JavaScript file (e.g., script.js)

document.addEventListener('DOMContentLoaded', () => {
  // Get a reference to your avatar figure element, which now has the ID 'theme-toggle'
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body; // Or document.documentElement if you prefer to put the class on <html>

  // Function to set the theme
  function setTheme(theme) {
    if (theme === 'light') {
      body.classList.add('light-mode');
      localStorage.setItem('theme', 'light');
    } else {
      // Dark mode
      body.classList.remove('light-mode');
      localStorage.setItem('theme', 'dark');
    }
  }

  // Check for saved theme preference on page load
  const savedTheme = localStorage.getItem('theme');

  if (savedTheme === 'light') {
    // If the saved theme is explicitly 'light', set it to light mode
    setTheme('light');
  } else {
    // In all other cases (no saved theme, or saved theme is 'dark'), default to dark mode
    setTheme('dark');
  }

  // Add an event listener to your avatar figure
  themeToggle.addEventListener('click', () => {
    if (body.classList.contains('light-mode')) {
      setTheme('dark'); // Currently light, switch to dark
    } else {
      setTheme('light'); // Currently dark, switch to light
    }
  });
});