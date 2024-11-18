document.addEventListener("DOMContentLoaded", () => {
    const playlistId = "PLeZ6YstWzTKvbe0dmWj9iqWg6zDXXlw0T";
    const videosContainer = document.getElementById("videos-container");

    const fetchVideos = async () => {
        try {
            const response = await fetch(`https://api.invidious.com/v1/playlists/${playlistId}/videos?maxResults=10`);
            const data = await response.json();

            const videos = data.items.map(item => ({
                videoId: item.id,
                title: item.title,
                description: item.description,
                thumbnail: item.thumbnails.high.url,
                publishedAt: new Date(item.publishedAt),
                url: `https://www.youtube.com/watch?v=${item.id}`
            }));

            // Sort videos by publish date
            videos.sort((a, b) => b.publishedAt - a.publishedAt);

            videos.forEach(video => {
                const videoCard = document.createElement("article");
                videoCard.className = "episode-card";

                videoCard.innerHTML = `
                    <div class="episode-card__thumbnail-container">
                        <iframe class="episode-card__thumbnail" width="560" height="315" src="https://www.youtube.com/embed/${video.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
                    </div>
                    <div class="episode-card__details">
                        <h3 class="episode-card__title">${video.title}</h3>
                        <p class="episode-card__date">${video.publishedAt.toLocaleDateString()}</p>
                    </div>
                    <a href="${video.url}" class="episode-card__link">Listen to this episode</a>
                `;

                videosContainer.appendChild(videoCard);
            });
        } catch (error) {
            console.error("Error fetching videos:", error);
            videosContainer.innerHTML = "<p>Unable to load videos at this time.</p>";
        }
    };

    fetchVideos();
});