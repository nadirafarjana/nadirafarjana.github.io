document.addEventListener("DOMContentLoaded", function () {

    const currentPage =
        window.location.pathname.split("/").pop() || "index.html";

    document.querySelectorAll(".navigation a").forEach(link => {

        const page = link.getAttribute("href");

        if (page === currentPage) {
            link.classList.add("active");
        }

    });

});
