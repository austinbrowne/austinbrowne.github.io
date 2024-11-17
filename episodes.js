document.addEventListener("DOMContentLoaded", () => {
    const episodesContainer = document.getElementById("episodes-container");

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

    // Display all episodes on the episodes page
    fetchAndDisplayEpisodes(episodesContainer);
});