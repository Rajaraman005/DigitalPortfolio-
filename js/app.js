const filter_btns = document.querySelectorAll(".filter-btn");
const skills_wrap = document.querySelector(".skills");
const skills_bars = document.querySelectorAll(".skill-progress");
const records_wrap = document.querySelector(".records");
const records_numbers = document.querySelectorAll(".number");
const footer_input = document.querySelector(".footer-input");
const hamburger_menu = document.querySelector(".hamburger-menu");
const navbar = document.querySelector("header nav");
const links = document.querySelectorAll(".links a");

footer_input.addEventListener("focus", () => {
  footer_input.classList.add("focus");
});

footer_input.addEventListener("blur", () => {
  if (footer_input.value != "") return;
  footer_input.classList.remove("focus");
});

function closeMenu() {
  navbar.classList.remove("open");
  document.body.classList.remove("stop-scrolling");
}

hamburger_menu.addEventListener("click", () => {
  if (!navbar.classList.contains("open")) {
    navbar.classList.add("open");
    document.body.classList.add("stop-scrolling");
  } else {
    closeMenu();
  }
});

links.forEach((link) => link.addEventListener("click", () => closeMenu()));

filter_btns.forEach((btn) =>
  btn.addEventListener("click", () => {
    filter_btns.forEach((button) => button.classList.remove("active"));
    btn.classList.add("active");

    let filterValue = btn.dataset.filter;

    $(".grid").isotope({ filter: filterValue });
  })
);

$(".grid").isotope({
  itemSelector: ".grid-item",
  layoutMode: "fitRows",
  transitionDuration: "0.6s",
});

window.addEventListener("scroll", () => {
  skillsEffect();
  countUp();
});

function checkScroll(el) {
  let rect = el.getBoundingClientRect();
  if (window.innerHeight >= rect.top + el.offsetHeight) return true;
  return false;
}

function skillsEffect() {
  if (!checkScroll(skills_wrap)) return;
  skills_bars.forEach((skill) => (skill.style.width = skill.dataset.progress));
}

function countUp() {
  if (!checkScroll(records_wrap)) return;
  records_numbers.forEach((numb) => {
    const updateCount = () => {
      let currentNum = +numb.innerText;
      let maxNum = +numb.dataset.num;
      let speed = 100;
      const increment = Math.ceil(maxNum / speed);

      if (currentNum < maxNum) {
        numb.innerText = currentNum + increment;
        setTimeout(updateCount, 1);
      } else {
        numb.innerText = maxNum;
      }
    };

    setTimeout(updateCount, 400);
  });
}

var mySwiper = new Swiper(".swiper-container", {
  speed: 1100,
  slidesPerView: 1,
  loop: true,
  autoplay: {
    delay: 5000,
  },
  navigation: {
    prevEl: ".swiper-button-prev",
    nextEl: ".swiper-button-next",
  },
});

//typing
const text = [
  "a web developer.",
  "passionate about coding.",
  "a problem solver.",
  "a lifelong learner.",
];

let wordIndex = 0;
let charIndex = 0;
const textElement = document.getElementById("auto-type");

function type() {
  if (wordIndex < text.length) {
    const word = text[wordIndex].toUpperCase(); // Convert the text to uppercase
    if (charIndex < word.length) {
      textElement.innerHTML += word.charAt(charIndex);
      charIndex++;
      setTimeout(type, 50); // Adjust typing speed here (in milliseconds)
    } else {
      setTimeout(erase, 1000); // Delay before erasing
    }
  } else {
    restart(); // Start the loop again immediately
  }
}

function erase() {
  if (charIndex >= 0) {
    const word = text[wordIndex].toUpperCase(); // Convert the text to uppercase
    textElement.innerHTML = word.substring(0, charIndex);
    charIndex--;
    setTimeout(erase, 50);
  } else {
    wordIndex++;
    charIndex = 0;
    setTimeout(type, 1000);
  }
}

function restart() {
  wordIndex = 0;
  charIndex = 0;
  setTimeout(type, 1000);
}

type();

//nav

const nav = document.querySelector("nav");

window.addEventListener("scroll", () => {
  if (window.scrollY > 100) {
    nav.style.backgroundColor = "#fff";
    nav.style.text = "black";
  } else {
    nav.style.backgroundColor =
      "transparent"; /* Return to the initial transparent background */
  }
});

//scrool
// Get all elements with the "scroll-link" class
const scrollLinks = document.querySelectorAll(".scroll-link");

// Add a click event listener to each scroll link
scrollLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    event.preventDefault();

    // Get the target section's ID from the data-target attribute
    const targetId = link.getAttribute("data-target");

    // Find the target section by its ID
    const targetSection = document.getElementById(targetId);

    // Calculate the offset to scroll to the section smoothly
    const offset =
      targetSection.offsetTop - document.querySelector("nav").offsetHeight;

    // Scroll to the target section with smooth behavior
    window.scrollTo({
      top: offset,
      behavior: "smooth",
    });
  });
});

//msg
function openWhatsAppChat() {
  var phoneNumber = "+916383634873"; // Replace with your actual phone number
  var message = "I'm interested in working with you."; // Optional message
  var whatsappURL =
    "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);
  window.open(whatsappURL, "_blank");
}
