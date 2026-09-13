document.addEventListener("DOMContentLoaded", function () {

    const menuButton = document.querySelector(".menu-button");
    const mobileMenu = document.querySelector(".mobile-menu");

    if (menuButton && mobileMenu) {
        menuButton.addEventListener("click", function () {
            mobileMenu.classList.toggle("open");

            if (mobileMenu.classList.contains("open")) {
                menuButton.textContent = "CLOSE";
            } else {
                menuButton.textContent = "MENU";
            }
        });
    }

    // Highlight current page in desktop navigation
    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".sidebar-nav a").forEach(function (link) {
        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }
    });

});
