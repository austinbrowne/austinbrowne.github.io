document.addEventListener("DOMContentLoaded", () => {
    const episodesContainer = document.querySelector(".episodes__list");
    const newsPreviewContainer = document.getElementById("news-preview-container");

    // Helper to parse dates for sorting
    const parseDate = (dateString) => new Date(dateString);

    // Fetch and display episodes
    const fetchAndDisplayEpisodes = (container, limit = null) => {
        fetch("episodes.json")
            .then((response) => response.json())
            .then((episodes) => {
                // Sort episodes by most recent
                episodes.sort((a, b) => parseDate(b.date) - parseDate(a.date));

                // Display episodes (limit if specified)
                (limit ? episodes.slice(0, limit) : episodes).forEach((episode) => {
                    // Extract YouTube video ID
                    const videoId = episode.youtubeLink.split("v=")[1];
                    const thumbnailUrl = `http://i3.ytimg.com/vi/${videoId}/hqdefault.jpg`;

                    // Create episode card
                    const episodeCard = document.createElement("article");
                    episodeCard.className = "episode-card";

                    episodeCard.innerHTML = `
                        <a href="${episode.youtubeLink}">
                            <img class="episode-card__thumbnail" src="${thumbnailUrl}" alt="${episode.title} Thumbnail">
                        </a>
                        <div class="episode-card__details">
                            <h3 class="episode-card__title">${episode.title}</h3>
                            <p class="episode-card__summary">${episode.summary}</p>
                            <p class="episode-card__date">${episode.date}</p>
                            <a href="${episode.youtubeLink}" class="episode-card__link">Listen to this episode</a>
                        </div>
                    `;

                    container.appendChild(episodeCard);
                });
            })
            .catch((error) => {
                console.error("Error loading episodes:", error);
                container.innerHTML = "<p>Unable to load episodes at this time.</p>";
            });
    };

    // Fetch and display news articles
    const fetchAndDisplayNews = (container, limit = null) => {
        fetch("news.json")
            .then((response) => response.json())
            .then((articles) => {
                // Sort articles by most recent
                articles.sort((a, b) => parseDate(b.date) - parseDate(a.date));

                // Display articles (limit if specified)
                (limit ? articles.slice(0, limit) : articles).forEach((article) => {
                    const newsCard = document.createElement("article");
                    newsCard.className = "news-card";

                    newsCard.innerHTML = `
                        <h3 class="news-card__title">${article.title}</h3>
                        <p class="news-card__date">${article.date}</p>
                        <p class="news-card__content">${article.content.substring(0, 100)}...</p>
                        <a href="article.html?title=${encodeURIComponent(article.title)}" class="news-card__link">Read More</a>
                    `;

                    container.appendChild(newsCard);
                });
            })
            .catch((error) => {
                console.error("Error loading news articles:", error);
                container.innerHTML = "<p>Unable to load news articles at this time.</p>";
            });
    };

    // Display latest episodes on the home page (limit to 4)
    fetchAndDisplayEpisodes(episodesContainer, 4);

    // Display latest news articles on the home page (limit to 4)
    fetchAndDisplayNews(newsPreviewContainer, 4);
});