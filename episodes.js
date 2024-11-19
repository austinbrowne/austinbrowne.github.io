document.addEventListener("DOMContentLoaded", () => {
    const playlistId = "PLeZ6YstWzTKvbe0dmWj9iqWg6zDXXlw0T";
    const apiKey = "AIzaSyBpU6i4uwVQlNN9nEry20b4Su8vxrIxOt8";
    const episodesContainer = document.getElementById("episodes-container");

    const fetchEpisodes = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`);
            const data = await response.json();

            const episodes = data.items.map(item => ({
                videoId: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                publishedAt: new Date(item.snippet.publishedAt),
                url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
            }));

            // Sort episodes by publish date
            episodes.sort((a, b) => b.publishedAt - a.publishedAt);

            episodes.forEach(episode => {
                const episodeCard = document.createElement("article");
                episodeCard.className = "episode-card";

                episodeCard.innerHTML = `
                    <div class="episode-card__thumbnail-container">
                        <iframe class="episode-card__thumbnail" width="560" height="315" src="https://www.youtube.com/embed/${episode.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="episode-card__details">
                        <h3 class="episode-card__title">${episode.title}</h3>
                        <p class="episode-card__date">${episode.publishedAt.toLocaleDateString()}</p>
                    </div>
                    <a href="${episode.url}" class="episode-card__link">Listen to this episode</a>
                `;

                episodesContainer.appendChild(episodeCard);
            });
        } catch (error) {
            console.error("Error fetching episodes:", error);
            episodesContainer.innerHTML = "<p>Unable to load episodes at this time.</p>";
        }
    };

    fetchEpisodes();
});