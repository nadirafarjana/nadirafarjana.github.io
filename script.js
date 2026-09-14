/* =========================================================
   NADIRA FARJANA
   ACADEMIC RESEARCH PORTFOLIO — V2.2
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       MOBILE MENU
       ===================================================== */

    const menuButton =
        document.querySelector(".mobile-menu-button");

    const mobileMenu =
        document.querySelector(".mobile-menu");


    if (menuButton && mobileMenu) {

        menuButton.addEventListener("click", function () {

            const open =
                mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                open ? "true" : "false"
            );

            menuButton.textContent =
                open ? "×" : "☰";
        });


        mobileMenu
            .querySelectorAll("a")
            .forEach(function (link) {

                link.addEventListener("click", function () {

                    mobileMenu.classList.remove("open");

                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.textContent = "☰";
                });

            });
    }


    /* =====================================================
       CURRENT PAGE
       ===================================================== */

    const currentPage =
        window.location.pathname
            .split("/")
            .pop() || "index.html";


    document
        .querySelectorAll(".nav a")
        .forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const linkPage =
                href.split("/").pop();

            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        });


    /* =====================================================
       MOBILE CURRENT PAGE
       ===================================================== */

    document
        .querySelectorAll(".mobile-menu a")
        .forEach(function (link) {

            const href =
                link.getAttribute("href");

            if (!href) return;

            const linkPage =
                href.split("/").pop();

            if (linkPage === currentPage) {
                link.classList.add("active");
            }
        });


    /* =====================================================
       BACK TO TOP
       ===================================================== */

    const backToTop =
        document.querySelector(".back-to-top");


    if (backToTop) {

        function updateBackToTop() {

            if (window.scrollY > 500) {
                backToTop.classList.add("visible");
            } else {
                backToTop.classList.remove("visible");
            }
        }


        window.addEventListener(
            "scroll",
            updateBackToTop,
            { passive: true }
        );


        updateBackToTop();


        backToTop.addEventListener(
            "click",
            function () {

                window.scrollTo({
                    top: 0,
                    behavior: "smooth"
                });

            }
        );
    }


    /* =====================================================
       ESCAPE CLOSES MOBILE MENU
       ===================================================== */

    document.addEventListener(
        "keydown",
        function (event) {

            if (
                event.key === "Escape" &&
                mobileMenu &&
                mobileMenu.classList.contains("open")
            ) {

                mobileMenu.classList.remove("open");

                if (menuButton) {
                    menuButton.setAttribute(
                        "aria-expanded",
                        "false"
                    );

                    menuButton.textContent = "☰";
                }
            }
        }
    );


    /* =====================================================
       IMAGE LIGHTBOX
       ===================================================== */

    const images =
        document.querySelectorAll(
            ".gallery-item img"
        );


    images.forEach(function (image) {

        image.addEventListener(
            "click",
            function () {

                const overlay =
                    document.createElement("div");

                overlay.className =
                    "image-lightbox";


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


                requestAnimationFrame(function () {
                    overlay.classList.add("show");
                });


                function closeLightbox() {

                    overlay.classList.remove("show");

                    setTimeout(function () {
                        overlay.remove();
                    }, 200);
                }


                overlay.addEventListener(
                    "click",
                    function (event) {

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

            }
        );

    });


    /* =====================================================
       EXTERNAL LINKS
       ===================================================== */

    document
        .querySelectorAll(
            'a[href^="http://"], a[href^="https://"]'
        )
        .forEach(function (link) {

            if (
                link.hostname &&
                link.hostname !== window.location.hostname
            ) {

                link.setAttribute(
                    "target",
                    "_blank"
                );

                link.setAttribute(
                    "rel",
                    "noopener noreferrer"
                );
            }

        });


    /* =====================================================
       CURRENT YEAR
       ===================================================== */

    document
        .querySelectorAll("[data-current-year]")
        .forEach(function (element) {

            element.textContent =
                new Date().getFullYear();

        });

});
