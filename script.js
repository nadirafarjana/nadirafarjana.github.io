document.addEventListener("DOMContentLoaded", () => {

    /* ======================================================
       MOBILE MENU
    ====================================================== */

    const menuToggle = document.getElementById("menuToggle");
    const menuClose = document.getElementById("menuClose");
    const mobileMenu = document.getElementById("mobileMenu");

    const mobileLinks =
        mobileMenu.querySelectorAll("a");


    function openMenu() {

        mobileMenu.classList.add("open");

        document.body.style.overflow = "hidden";

    }


    function closeMenu() {

        mobileMenu.classList.remove("open");

        document.body.style.overflow = "";

    }


    menuToggle.addEventListener(
        "click",
        openMenu
    );


    menuClose.addEventListener(
        "click",
        closeMenu
    );


    mobileLinks.forEach(link => {

        link.addEventListener(
            "click",
            closeMenu
        );

    });


    document.addEventListener(
        "keydown",
        event => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    /* ======================================================
       SCROLL REVEAL
    ====================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section, .project-row, .publication-row, .news-row, .award-row"
        );


    const observer =
        new IntersectionObserver(
            entries => {

                entries.forEach(entry => {

                    if (entry.isIntersecting) {

                        entry.target.classList.add(
                            "visible"
                        );

                        observer.unobserve(
                            entry.target
                        );

                    }

                });

            },
            {
                threshold: 0.08,
                rootMargin: "0px 0px -40px 0px"
            }
        );


    revealElements.forEach(element => {

        observer.observe(element);

    });


    /* ======================================================
       CURRENT YEAR
    ====================================================== */

    const year =
        document.getElementById("year");

    if (year) {

        year.textContent =
            new Date().getFullYear();

    }

});
