document.addEventListener("DOMContentLoaded", function () {
    const posts = Array.from(document.querySelectorAll(".recent-post"));
    const prevBtn = document.getElementById("prevBtn");
    const nextBtn = document.getElementById("nextBtn");
    const paginationIndicator = document.createElement("div");
    paginationIndicator.id = "paginationIndicator";
    document.querySelector(".post-slider").appendChild(paginationIndicator);

    let index = 0;
    let postsPerPage;
    let totalPages;

    function updatePostsPerPage() {
        const width = window.innerWidth;
        if (width <= 480) postsPerPage = 2;
        else if (width <= 768) postsPerPage = 4;
        else postsPerPage = 8;

        totalPages = Math.ceil(posts.length / postsPerPage);
        index = Math.min(index, totalPages - 1);
        showPage();
    }

    function showPage() {
        posts.forEach(post => post.style.display = "none");
        const start = index * postsPerPage;
        const end = start + postsPerPage;
        for (let i = start; i < end && i < posts.length; i++) {
            posts[i].style.display = "block";
        }
        prevBtn.style.display = index > 0 ? "block" : "none";
        nextBtn.style.display = end < posts.length ? "block" : "none";
        paginationIndicator.textContent = `Page ${index + 1} of ${totalPages}`;
    }

    prevBtn.addEventListener("click", () => {
        if (index > 0) {
            index--;
            showPage();
        }
    });

    nextBtn.addEventListener("click", () => {
        if (index < totalPages - 1) {
            index++;
            showPage();
        }
    });

    updatePostsPerPage();
    window.addEventListener("resize", updatePostsPerPage);
});
