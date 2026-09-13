/* =========================================================
   NADIRA FARJANA
   Editorial Academic Portfolio
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    const menuButton = document.getElementById("menuButton");
    const closeMenu = document.getElementById("closeMenu");
    const mobileMenu = document.getElementById("mobileMenu");

    const mobileLinks = mobileMenu.querySelectorAll("a");


    /* -------------------------------------------------------
       MOBILE MENU
    ------------------------------------------------------- */

    function openMenu() {
        mobileMenu.classList.add("open");
        document.body.style.overflow = "hidden";
    }

    function closeNavigation() {
        mobileMenu.classList.remove("open");
        document.body.style.overflow = "";
    }

    menuButton.addEventListener("click", openMenu);

    closeMenu.addEventListener("click", closeNavigation);

    mobileLinks.forEach(link => {
        link.addEventListener("click", closeNavigation);
    });


    /* -------------------------------------------------------
       ESCAPE KEY
    ------------------------------------------------------- */

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeNavigation();
        }

    });


    /* -------------------------------------------------------
       SCROLL REVEAL
    ------------------------------------------------------- */

    const revealElements = document.querySelectorAll(
        ".editorial-section, .work-feature, .publication, .news-item, .contact-content"
    );

    const observer = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("reveal");

                    observer.unobserve(entry.target);

                }

            });

        },
        {
            threshold: 0.08,
            rootMargin: "0px 0px -50px 0px"
        }
    );


    revealElements.forEach(element => {
        observer.observe(element);
    });


    /* -------------------------------------------------------
       CURRENT YEAR
    ------------------------------------------------------- */

    const year = document.getElementById("year");

    if (year) {
        year.textContent = new Date().getFullYear();
    }


    /* -------------------------------------------------------
       ACTIVE SECTION
    ------------------------------------------------------- */

    const sections = document.querySelectorAll(
        "section[id]"
    );

    const navLinks = document.querySelectorAll(
        ".desktop-nav a[href^='#']"
    );

    const sectionObserver = new IntersectionObserver(
        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    navLinks.forEach(link => {
                        link.classList.remove("active");
                    });

                    const activeLink = document.querySelector(
                        `.desktop-nav a[href="#${entry.target.id}"]`
                    );

                    if (activeLink) {
                        activeLink.classList.add("active");
                    }

                }

            });

        },
        {
            threshold: 0.15
        }
    );


    sections.forEach(section => {
        sectionObserver.observe(section);
    });

});
