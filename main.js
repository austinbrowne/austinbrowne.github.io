document.addEventListener("DOMContentLoaded", () => {
    const newsPreviewContainer = document.getElementById("news-preview-container");

    // Helper to parse dates for sorting
    const parseDate = (dateString) => new Date(dateString);

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

    // Display latest news articles on the home page (limit to 4)
    fetchAndDisplayNews(newsPreviewContainer, 4);
});