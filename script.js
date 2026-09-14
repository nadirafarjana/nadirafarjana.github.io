/* =========================================================
   NADIRA FARJANA — SITE SCRIPT
   Version 2.2
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* -----------------------------------------------------
       Mobile menu
       ----------------------------------------------------- */

    const menuButton = document.querySelector(".mobile-menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", () => {
            const isOpen = mobileMenu.classList.toggle("open");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );

            menuButton.textContent = isOpen ? "×" : "☰";
        });

        mobileMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", () => {
                mobileMenu.classList.remove("open");
                menuButton.setAttribute("aria-expanded", "false");
                menuButton.textContent = "☰";
            });
        });
    }

    /* -----------------------------------------------------
       Active navigation
       ----------------------------------------------------- */

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav a, .mobile-menu a").forEach(link => {
        const href = link.getAttribute("href");

        if (
            href === currentPage ||
            (currentPage === "" && href === "index.html")
        ) {
            link.classList.add("active");
        }
    });

    /* -----------------------------------------------------
       Image lightbox
       ----------------------------------------------------- */

    const lightbox = document.createElement("div");
    lightbox.className = "lightbox";

    lightbox.innerHTML = `
        <button class="lightbox-close" aria-label="Close image">×</button>
        <img src="" alt="">
    `;

    document.body.appendChild(lightbox);

    const lightboxImage = lightbox.querySelector("img");
    const lightboxClose = lightbox.querySelector(".lightbox-close");

    document.querySelectorAll("[data-lightbox]").forEach(image => {

        image.style.cursor = "zoom-in";

        image.addEventListener("click", () => {
            lightboxImage.src = image.src;
            lightboxImage.alt = image.alt || "";
            lightbox.classList.add("open");
            document.body.style.overflow = "hidden";
        });
    });

    const closeLightbox = () => {
        lightbox.classList.remove("open");
        document.body.style.overflow = "";
    };

    lightboxClose.addEventListener("click", closeLightbox);

    lightbox.addEventListener("click", event => {
        if (event.target === lightbox) {
            closeLightbox();
        }
    });

    document.addEventListener("keydown", event => {
        if (event.key === "Escape") {
            closeLightbox();
        }
    });

    /* -----------------------------------------------------
       Current year
       ----------------------------------------------------- */

    document.querySelectorAll("[data-year]").forEach(element => {
        element.textContent = new Date().getFullYear();
    });

});
