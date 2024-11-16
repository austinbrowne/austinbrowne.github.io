document.addEventListener("DOMContentLoaded", () => {
    const articleContent = document.getElementById("article-content");
    const suggestedContainer = document.getElementById("suggested-container");

    // Get the article title from the query parameter
    const params = new URLSearchParams(window.location.search);
    const articleTitle = params.get("title");

    // Helper to parse dates for sorting
    const parseDate = (dateString) => new Date(dateString);

    fetch("news.json")
        .then((response) => response.json())
        .then((articles) => {
            // Find the selected article
            const selectedArticle = articles.find(
                (article) => article.title === articleTitle
            );

            if (selectedArticle) {
                // Split content into paragraphs
                const paragraphs = selectedArticle.content.split("\n").map(
                    (line) => `<p>${line}</p>`
                ).join("");

                // Display the selected article
                articleContent.innerHTML = `
                    <h1 class="article__title">${selectedArticle.title}</h1>
                    <p class="article__author">By: ${selectedArticle.author}</p>
                    <p class="article__date">${selectedArticle.date}</p>
                    <div class="article__content">${paragraphs}</div>
                `;

                // Filter and sort suggested articles
                const suggestedArticles = articles
                    .filter((article) => article.title !== articleTitle)
                    .sort((a, b) => parseDate(b.date) - parseDate(a.date));

                // Display suggested articles
                suggestedArticles.forEach((article) => {
                    const suggestedCard = document.createElement("article");
                    suggestedCard.className = "news-card";

                    suggestedCard.innerHTML = `
                        <h2 class="news-card__title">${article.title}</h2>
                        <p class="news-card__date">${article.date}</p>
                        <p class="news-card__content">${article.content.substring(0, 100)}...</p>
                        <a href="article.html?title=${encodeURIComponent(
                            article.title
                        )}" class="news-card__link">Read More</a>
                    `;

                    suggestedContainer.appendChild(suggestedCard);
                });
            } else {
                articleContent.innerHTML = "<p>Article not found.</p>";
            }
        })
        .catch((error) => {
            console.error("Error loading article:", error);
            articleContent.innerHTML = "<p>Unable to load the article.</p>";
        });
});
