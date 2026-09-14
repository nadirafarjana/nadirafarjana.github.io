/* =========================================================
   NADIRA FARJANA
   ACADEMIC RESEARCH PORTFOLIO — V2.2
   JavaScript
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       01. MOBILE MENU
       ===================================================== */

    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", () => {

            const isOpen = mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.setAttribute(
                "aria-label",
                isOpen ? "Close navigation" : "Open navigation"
            );

            menuButton.textContent = isOpen ? "×" : "☰";
        });


        /* Close mobile menu after clicking a link */

        const mobileLinks = mobileMenu.querySelectorAll("a");

        mobileLinks.forEach(link => {

            link.addEventListener("click", () => {

                mobileMenu.classList.remove("open");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuButton.textContent = "☰";
            });

        });

    }


    /* =====================================================
       02. CURRENT PAGE NAVIGATION
       ===================================================== */

    const currentPage = window.location.pathname
        .split("/")
        .pop() || "index.html";

    const navLinks = document.querySelectorAll(".nav a");

    navLinks.forEach(link => {

        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       03. MOBILE NAV CURRENT PAGE
       ===================================================== */

    const mobileLinks = document.querySelectorAll(".mobile-menu a");

    mobileLinks.forEach(link => {

        const linkPage = link
            .getAttribute("href")
            ?.split("/")
            .pop();

        if (linkPage === currentPage) {
            link.classList.add("active");
        }

    });


    /* =====================================================
       04. SMOOTH INTERNAL LINKS
       ===================================================== */

    const internalLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    internalLinks.forEach(link => {

        link.addEventListener("click", event => {

            const targetID = link.getAttribute("href");

            if (!targetID || targetID === "#") {
                return;
            }

            const target = document.querySelector(targetID);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        });

    });


    /* =====================================================
       05. BACK TO TOP BUTTON
       ===================================================== */

    const backToTop = document.querySelector(".back-to-top");

    if (backToTop) {

        const updateBackToTop = () => {

            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }

        };

        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );

        updateBackToTop();


        backToTop.addEventListener("click", event => {

            event.preventDefault();

            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });

        });

    }


    /* =====================================================
       06. CLOSE MOBILE MENU WITH ESCAPE
       ===================================================== */

    document.addEventListener("keydown", event => {

        if (event.key !== "Escape") {
            return;
        }

        if (!mobileMenu || !menuButton) {
            return;
        }

        if (mobileMenu.classList.contains("open")) {

            mobileMenu.classList.remove("open");

            menuButton.setAttribute(
                "aria-expanded",
                "false"
            );

            menuButton.setAttribute(
                "aria-label",
                "Open navigation"
            );

            menuButton.textContent = "☰";

        }

    });


    /* =====================================================
       07. CLOSE MOBILE MENU WHEN RESIZING TO DESKTOP
       ===================================================== */

    window.addEventListener("resize", () => {

        if (window.innerWidth > 800) {

            if (mobileMenu) {
                mobileMenu.classList.remove("open");
            }

            if (menuButton) {

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

                menuButton.setAttribute(
                    "aria-label",
                    "Open navigation"
                );

                menuButton.textContent = "☰";
            }

        }

    });


    /* =====================================================
       08. IMAGE LIGHTBOX
       ===================================================== */

    const galleryImages = document.querySelectorAll(
        ".gallery-item img, .project-gallery img"
    );

    if (galleryImages.length > 0) {

        galleryImages.forEach(image => {

            image.style.cursor = "zoom-in";

            image.addEventListener("click", () => {

                const overlay = document.createElement("div");

                overlay.className = "image-lightbox";

                overlay.innerHTML = `
                    <button
                        class="lightbox-close"
                        aria-label="Close image"
                    >
                        ×
                    </button>

                    <img
                        src="${image.src}"
                        alt="${image.alt || ""}"
                    >
                `;

                document.body.appendChild(overlay);

                requestAnimationFrame(() => {
                    overlay.classList.add("show");
                });


                const closeLightbox = () => {

                    overlay.classList.remove("show");

                    setTimeout(() => {
                        overlay.remove();
                    }, 200);

                };


                overlay.addEventListener(
                    "click",
                    event => {

                        if (
                            event.target === overlay ||
                            event.target.classList.contains(
                                "lightbox-close"
                            )
                        ) {
                            closeLightbox();
                        }

                    }
                );


                document.addEventListener(
                    "keydown",
                    function escapeHandler(event) {

                        if (event.key === "Escape") {

                            closeLightbox();

                            document.removeEventListener(
                                "keydown",
                                escapeHandler
                            );

                        }

                    }
                );

            });

        });

    }


    /* =====================================================
       09. EXTERNAL LINKS
       ===================================================== */

    const externalLinks = document.querySelectorAll(
        'a[href^="http://"], a[href^="https://"]'
    );

    externalLinks.forEach(link => {

        if (
            link.hostname &&
            link.hostname !== window.location.hostname
        ) {

            link.setAttribute("target", "_blank");
            link.setAttribute("rel", "noopener noreferrer");

        }

    });


    /* =====================================================
       10. YEAR
       ===================================================== */

    const yearElements = document.querySelectorAll(
        "[data-current-year]"
    );

    yearElements.forEach(element => {
        element.textContent = new Date().getFullYear();
    });

});
