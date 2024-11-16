document.addEventListener("DOMContentLoaded", () => {
    const episodesContainer = document.querySelector(".episodes__list");

    // Example episodes data
    const episodes = [
        {
            title: "Episode 1: Intro and Latest Gaming News",
            summary: "We give some info on who we are and the latest happenings in the space.",
            youtubeLink: "https://www.youtube.com/watch?v=rgURKS5hSbI"
        },
        {
            title: "Episode 2: Gaming Trends 2024",
            summary: "Discussing the hottest trends and what's next in gaming peripherals.",
            youtubeLink: "https://www.youtube.com/watch?v=04WelCrtG1U"
        }
    ];

    episodes.forEach((episode) => {
        // Extract YouTube video ID
        const videoId = episode.youtubeLink.split("v=")[1];
        const thumbnailUrl = `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

        // Create episode card
        const episodeCard = document.createElement("article");
        episodeCard.className = "episode-card";

        episodeCard.innerHTML = `
            <a href="${episode.youtubeLink}">
                <img class="episode-card__thumbnail"  src="${thumbnailUrl}" alt="${episode.title} Thumbnail">
            </a>
            <h3 class="episode-card__title">${episode.title}</h3>
            <p class="episode-card__summary">${episode.summary}</p>
            <a href="${episode.youtubeLink}" class="episode-card__link">Listen to this episode</a>
        `;

        episodesContainer.appendChild(episodeCard);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const newsPreviewContainer = document.getElementById("news-preview-container");

    // Helper to parse dates for sorting
    const parseDate = (dateString) => new Date(dateString);

    fetch("news.json")
        .then((response) => response.json())
        .then((articles) => {
            // Sort articles by most recent
            articles.sort((a, b) => parseDate(b.date) - parseDate(a.date));

            // Display up to 4 most recent articles
            articles.slice(0, 4).forEach((article) => {
                const newsCard = document.createElement("article");
                newsCard.className = "news-card";

                newsCard.innerHTML = `
                    <h3 class="news-card__title">${article.title}</h3>
                    <p class="news-card__date">${article.date}</p>
                    <p class="news-card__content">${article.content.substring(0, 100)}...</p>
                    <a href="article.html?title=${encodeURIComponent(article.title)}" class="news-card__link">Read More</a>
                `;

                newsPreviewContainer.appendChild(newsCard);
            });
        })
        .catch((error) => {
            console.error("Error loading news articles:", error);
            newsPreviewContainer.innerHTML =
                "<p>Unable to load news articles at this time.</p>";
        });
});