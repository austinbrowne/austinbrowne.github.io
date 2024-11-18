document.addEventListener("DOMContentLoaded", () => {
    const playlistId = "PLeZ6YstWzTKvbe0dmWj9iqWg6zDXXlw0T";
    const apiKey = "AIzaSyBpU6i4uwVQlNN9nEry20b4Su8vxrIxOt8";
    const videosContainer = document.getElementById("videos-container");

    const fetchVideos = async () => {
        try {
            const response = await fetch(`https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&maxResults=10&playlistId=${playlistId}&key=${apiKey}`);
            const data = await response.json();

            const videos = data.items.map(item => ({
                videoId: item.snippet.resourceId.videoId,
                title: item.snippet.title,
                description: item.snippet.description,
                thumbnail: item.snippet.thumbnails.high.url,
                publishedAt: new Date(item.snippet.publishedAt),
                url: `https://www.youtube.com/watch?v=${item.snippet.resourceId.videoId}`
            }));

            // Sort videos by publish date
            videos.sort((a, b) => b.publishedAt - a.publishedAt);

            videos.forEach(video => {
                const videoCard = document.createElement("article");
                videoCard.className = "episode-card";

                videoCard.innerHTML = `
                    <a href="${video.url}" target="_blank">
                        <img class="episode-card__thumbnail" src="${video.thumbnail}" alt="${video.title} Thumbnail">
                    </a>
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