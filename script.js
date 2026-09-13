/* =========================================================
   NADIRA FARJANA — PORTFOLIO
   Main JavaScript
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. ELEMENTS
    ===================================================== */

    const header = document.getElementById("site-header");
    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    const navLinks = document.querySelectorAll(
        "#navMenu a"
    );


    /* =====================================================
       02. HEADER SCROLL EFFECT
    ===================================================== */

    function updateHeader() {

        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    }

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );


    /* =====================================================
       03. MOBILE MENU
    ===================================================== */

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {

            const isOpen =
                navMenu.classList.toggle("open");

            menuToggle.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                isOpen
                    ? "Close navigation"
                    : "Open navigation"
            );

            menuToggle.textContent =
                isOpen ? "CLOSE" : "MENU";
        });


        /* Close menu after clicking a navigation link */

        navLinks.forEach(link => {

            link.addEventListener("click", () => {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.textContent = "MENU";
            });

        });


        /* Close menu when clicking outside */

        document.addEventListener("click", event => {

            const clickedInsideMenu =
                navMenu.contains(event.target);

            const clickedToggle =
                menuToggle.contains(event.target);

            if (
                !clickedInsideMenu &&
                !clickedToggle &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove("open");

                menuToggle.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuToggle.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuToggle.textContent = "MENU";
            }
        });

    }


    /* =====================================================
       04. CLOSE MOBILE MENU ON RESIZE
    ===================================================== */

    window.addEventListener("resize", () => {

        if (
            window.innerWidth > 850 &&
            navMenu &&
            menuToggle
        ) {

            navMenu.classList.remove("open");

            menuToggle.setAttribute(
                "aria-expanded",
                "false"
            );

            menuToggle.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuToggle.textContent = "MENU";
        }
    });


    /* =====================================================
       05. SMOOTH INTERNAL NAVIGATION
    ===================================================== */

    document.querySelectorAll(
        'a[href^="#"]'
    ).forEach(link => {

        link.addEventListener("click", event => {

            const targetID =
                link.getAttribute("href");

            if (
                !targetID ||
                targetID === "#"
            ) {
                return;
            }

            const target =
                document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            const headerHeight =
                header
                    ? header.offsetHeight
                    : 0;

            const targetPosition =
                target.getBoundingClientRect().top +
                window.pageYOffset -
                headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: "smooth"
            });

        });

    });


    /* =====================================================
       06. ACTIVE NAVIGATION
    ===================================================== */

    const sections = document.querySelectorAll(
        "main section[id]"
    );


    function updateActiveNavigation() {

        if (!sections.length) {
            return;
        }

        const scrollPosition =
            window.scrollY +
            (header ? header.offsetHeight : 0) +
            100;

        let currentSection = "";

        sections.forEach(section => {

            const sectionTop =
                section.offsetTop;

            const sectionBottom =
                sectionTop +
                section.offsetHeight;

            if (
                scrollPosition >= sectionTop &&
                scrollPosition < sectionBottom
            ) {
                currentSection =
                    section.getAttribute("id");
            }

        });


        navLinks.forEach(link => {

            const href =
                link.getAttribute("href");

            link.classList.remove("active");

            if (
                href === `#${currentSection}`
            ) {
                link.classList.add("active");
            }

        });

    }

    updateActiveNavigation();

    window.addEventListener(
        "scroll",
        updateActiveNavigation,
        { passive: true }
    );


    /* =====================================================
       07. REVEAL ANIMATIONS
    ===================================================== */

    const revealElements =
        document.querySelectorAll(
            ".section-head, " +
            ".about-grid, " +
            ".research-row, " +
            ".feature, " +
            ".work-card, " +
            ".project-table a, " +
            ".publication, " +
            ".achievement-list article, " +
            ".contact-grid"
        );


    /*
        Respect users who prefer reduced motion.
    */

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;


    if (
        !prefersReducedMotion &&
        "IntersectionObserver" in window
    ) {

        revealElements.forEach(element => {

            element.style.opacity = "0";

            element.style.transform =
                "translateY(25px)";

            element.style.transition =
                "opacity 0.7s ease, " +
                "transform 0.7s ease";

        });


        const observer =
            new IntersectionObserver(
                entries => {

                    entries.forEach(entry => {

                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.style.opacity =
                            "1";

                        entry.target.style.transform =
                            "translateY(0)";

                        observer.unobserve(
                            entry.target
                        );

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

    }


    /* =====================================================
       08. CURRENT YEAR
    ===================================================== */

    const footerYear =
        document.querySelector(
            "footer .footer-inner span"
        );


    if (footerYear) {

        const currentYear =
            new Date().getFullYear();

        footerYear.textContent =
            `© ${currentYear} Nadira Farjana`;
    }


    /* =====================================================
       09. IMAGE ERROR HANDLING
    ===================================================== */

    const images =
        document.querySelectorAll("img");


    images.forEach(image => {

        image.addEventListener(
            "error",
            () => {

                /*
                    Prevent broken images from creating
                    an ugly browser icon.

                    The container remains visible so the
                    missing asset can easily be identified
                    and replaced later.
                */

                image.style.display = "none";

                const parent =
                    image.parentElement;

                if (parent) {
                    parent.classList.add(
                        "image-missing"
                    );
                }

            }
        );

    });


    /* =====================================================
       10. KEYBOARD ACCESSIBILITY
    ===================================================== */

    document.addEventListener(
        "keydown",
        event => {

            if (
                event.key === "Escape" &&
                navMenu &&
                navMenu.classList.contains("open")
            ) {

                navMenu.classList.remove("open");

                if (menuToggle) {

                    menuToggle.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuToggle.setAttribute(
                        "aria-label",
                        "Open navigation"
                    );

                    menuToggle.textContent =
                        "MENU";
                }
            }

        }
    );


    /* =====================================================
       11. EXTERNAL LINKS
    ===================================================== */

    document.querySelectorAll(
        'a[target="_blank"]'
    ).forEach(link => {

        if (!link.hasAttribute("rel")) {

            link.setAttribute(
                "rel",
                "noopener noreferrer"
            );

        }

    });


    /* =====================================================
       12. HERO PARALLAX — DESKTOP ONLY
    ===================================================== */

    const heroImage =
        document.querySelector(
            ".hero-image-wrap"
        );


    if (
        heroImage &&
        !prefersReducedMotion
    ) {

        window.addEventListener(
            "scroll",
            () => {

                if (window.innerWidth <= 850) {
                    return;
                }

                const scroll =
                    window.scrollY;

                /*
                    Keep movement extremely subtle.
                    This avoids making the site feel like
                    a template or presentation website.
                */

                if (scroll < window.innerHeight) {

                    heroImage.style.transform =
                        `translateY(${scroll * 0.045}px)`;
                }

            },
            { passive: true }
        );

    }


    /* =====================================================
       13. INITIAL PAGE STATE
    ===================================================== */

    document.body.classList.add(
        "page-ready"
    );

});
