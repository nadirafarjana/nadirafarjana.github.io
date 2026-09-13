document.addEventListener("DOMContentLoaded", () => {
    const sidebar = document.querySelector(".sidebar");
    const menuButton = document.querySelector(".menu-button");

    if (menuButton && sidebar) {
        menuButton.addEventListener("click", () => {
            sidebar.classList.toggle("open");

            const isOpen = sidebar.classList.contains("open");
            menuButton.setAttribute("aria-expanded", isOpen);
            menuButton.textContent = isOpen ? "CLOSE" : "MENU";
        });

        document.querySelectorAll(".sidebar-nav a").forEach(link => {
            link.addEventListener("click", () => {
                sidebar.classList.remove("open");
                menuButton.textContent = "MENU";
                menuButton.setAttribute("aria-expanded", "false");
            });
        });
    }

    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".sidebar-nav a").forEach(link => {
        const href = link.getAttribute("href");

        if (href === currentPage) {
            link.classList.add("active");
        }
    });
});
