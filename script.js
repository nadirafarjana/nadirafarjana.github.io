document.addEventListener("DOMContentLoaded", () => {

    // Highlight the current page in the navigation
    const currentPage = window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".nav a").forEach(link => {
        const linkPage = link.getAttribute("href");

        if (linkPage === currentPage) {
            link.classList.add("active");
        }
    });

});
