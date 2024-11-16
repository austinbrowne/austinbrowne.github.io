document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-container");

    // Helper to parse dates for sorting
    const parseDate = (dateString) => new Date(dateString);

    // Fetch articles
    fetch("news.json")
        .then((response) => response.json())
        .then((articles) => {
            // Sort articles by most recent
            articles.sort((a, b) => parseDate(b.date) - parseDate(a.date));

            // Display all articles
            articles.forEach((article) => {
                const newsCard = document.createElement("article");
                newsCard.className = "news-card";

                newsCard.innerHTML = `
                    <h2 class="news-card__title">${article.title}</h2>
                    <p class="news-card__date">${article.date}</p>
                    <p class="news-card__content">${article.content.substring(0, 200)}...</p>
                    <a href="article.html?title=${encodeURIComponent(article.title)}" class="news-card__link">Read More</a>
                `;

                newsContainer.appendChild(newsCard);
            });
        })
        .catch((error) => {
            console.error("Error loading news articles:", error);
            newsContainer.innerHTML =
                "<p>Unable to load news articles at this time.</p>";
        });
});
