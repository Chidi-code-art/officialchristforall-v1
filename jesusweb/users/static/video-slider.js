document.addEventListener("DOMContentLoaded", function () {
    const videos = Array.from(document.querySelectorAll(".video-post"));
    const prevBtn = document.getElementById("video-prevBtn");
    const nextBtn = document.getElementById("video-nextBtn");
    const currentPageEl = document.getElementById("currentPage");
    const totalPagesEl = document.getElementById("totalPages");

    let index = 0;
    let videosPerPage;
    let totalPages;

    function updateVideosPerPage() {
        const width = window.innerWidth;
        if (width <= 480) videosPerPage = 2;
        else if (width <= 768) videosPerPage = 4;
        else videosPerPage = 8;

        totalPages = Math.ceil(videos.length / videosPerPage);
        index = Math.min(index, totalPages - 1);
        showPage();
    }

    function showPage() {
        videos.forEach(video => video.style.display = "none");

        const start = index * videosPerPage;
        const end = start + videosPerPage;

        for (let i = start; i < end && i < videos.length; i++) {
            videos[i].style.display = "block";
        }

        prevBtn.style.display = index > 0 ? "block" : "none";
        nextBtn.style.display = end < videos.length ? "block" : "none";

        currentPageEl.textContent = index + 1;
        totalPagesEl.textContent = totalPages;
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

    updateVideosPerPage();
    window.addEventListener("resize", updateVideosPerPage);
});
