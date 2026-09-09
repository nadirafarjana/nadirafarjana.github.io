/* =========================================================
   NADIRA FARJANA — PORTFOLIO JAVASCRIPT
   ========================================================= */


/* ================= MOBILE MENU ================= */

const menuButton = document.querySelector(".menu-toggle");
const navLinks = document.querySelector(".nav-links");

if (menuButton) {

    menuButton.addEventListener("click", () => {

        navLinks.classList.toggle("mobile-open");

    });

}


/* ================= CLOSE MOBILE MENU ================= */

document.querySelectorAll(".nav-links a").forEach(link => {

    link.addEventListener("click", () => {

        navLinks.classList.remove("mobile-open");

    });

});


/* ================= ACTIVE NAVIGATION ================= */

const sections = document.querySelectorAll("section[id]");
const navigationLinks = document.querySelectorAll(".nav-links a");

const observer = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                navigationLinks.forEach(link => {

                    link.classList.remove("active");

                    if (
                        link.getAttribute("href") ===
                        "#" + entry.target.id
                    ) {

                        link.classList.add("active");

                    }

                });

            }

        });

    },

    {
        threshold: 0.25
    }

);

sections.forEach(section => {

    observer.observe(section);

});


/* ================= REVEAL ANIMATION ================= */

const revealElements = document.querySelectorAll(
    ".research-card, .project-card, .timeline-item, .achievement, .publication-card"
);

const revealObserver = new IntersectionObserver(

    entries => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("revealed");

                revealObserver.unobserve(entry.target);

            }

        });

    },

    {
        threshold: 0.12
    }

);

revealElements.forEach(element => {

    element.classList.add("reveal");

    revealObserver.observe(element);

});


/* ================= YEAR ================= */

const yearElements = document.querySelectorAll(
    "[data-current-year]"
);

yearElements.forEach(element => {

    element.textContent = new Date().getFullYear();

});
