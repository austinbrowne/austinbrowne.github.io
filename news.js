document.addEventListener("DOMContentLoaded", () => {
    const newsContainer = document.getElementById("news-container");

    // Helper function to load JSON
    const loadNews = (url) => {
        if (window.location.protocol === "file:") {
            // Use XMLHttpRequest for local files
            const xhr = new XMLHttpRequest();
            xhr.open("GET", url, true);
            xhr.onload = () => {
                if (xhr.status === 200) {
                    const articles = JSON.parse(xhr.responseText);
                    renderNews(articles);
                } else {
                    newsContainer.innerHTML = "<p>Unable to load news articles at this time.</p>";
                }
            };
            xhr.onerror = () => {
                newsContainer.innerHTML = "<p>Unable to load news articles at this time.</p>";
            };
            xhr.send();
        } else {
            // Use fetch for HTTP/HTTPS
            fetch(url)
                .then(response => response.json())
                .then(articles => renderNews(articles))
                .catch(error => {
                    console.error("Error loading news articles:", error);
                    newsContainer.innerHTML = "<p>Unable to load news articles at this time.</p>";
                });
        }
    };

    // Function to render news
    const renderNews = (articles) => {
        articles.forEach(article => {
            const newsCard = document.createElement("article");
            newsCard.className = "news-card";

            newsCard.innerHTML = `
                <h2 class="news-card__title">${article.title}</h2>
                <p class="news-card__date">${article.date}</p>
                <p class="news-card__content">${article.content}</p>
                <a href="${article.url}" class="news-card__link">Read More</a>
            `;
            newsContainer.appendChild(newsCard);
        });
    };

    // Load news
    loadNews("news.json");
});
