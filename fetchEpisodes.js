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