document.addEventListener("DOMContentLoaded", () => {
    const usefulLinksContainer = document.querySelector(".useful-links__list");
    const usefulFilesContainer = document.querySelector(".useful-files__list");

    // Example useful links data
    const usefulLinks = [
        {
            title: "RJN Top Mouse List",
            description: "Reasonably good possibly helpful suggestions.",
            link: "https://www.rocketjumpninja.com/top-mice"
        },
        {
            title: "r/MouseReview",
            description: "Stay updated with the latest news in gaming peripherals.",
            link: "https://www.reddit.com/r/MouseReview/"
        },
        {
            title: "Viscose Mousepad Friction Spreadsheet",
            description: "Spreadsheet created by top aimer Viscose.",
            link: "https://docs.google.com/spreadsheets/d/1Ix0RN4WDgRIn9uSUMy2smG_vWR3FTnZHgNpumChfHM0/edit?gid=0#gid=0"
        },
        {
            title: "Stubby Mouse Feet Spreadsheet",
            description: "Spreadsheet created by YouTuber StubbyFPS.",
            link: "https://docs.google.com/spreadsheets/d/10Bv6R09IX4EtvxTfN7KmDgNp8epTmgd6v5lvF0d9Jl0/edit?gid=0#gid=0"
        }
    ];

    // Example useful files data
    const usefulFiles = [
        {
            title: "Battery Swap Chart",
            description: "All of the info you need to know about battery swapping.",
            link: "files/gaming-mouse-comparison-chart.pdf"
        },
        {
            title: "Phalanges Mousefeet Guide",
            description: "A guide that will help you find the best mouse feet for your mouse.",
            link: "files/peripheral-setup-guide.pdf"
        }
    ];

    usefulLinks.forEach((link) => {
        const linkCard = document.createElement("article");
        linkCard.className = "useful-link-card";

        linkCard.innerHTML = `
            <h3 class="useful-link-card__title">${link.title}</h3>
            <p class="useful-link-card__description">${link.description}</p>
            <a href="${link.link}" class="useful-link-card__link">Visit Link</a>
        `;

        usefulLinksContainer.appendChild(linkCard);
    });

    usefulFiles.forEach((file) => {
        const fileCard = document.createElement("article");
        fileCard.className = "useful-file-card";

        fileCard.innerHTML = `
            <h3 class="useful-file-card__title">${file.title}</h3>
            <p class="useful-file-card__description">${file.description}</p>
            <a href="${file.link}" class="useful-file-card__link">Download File</a>
        `;

        usefulFilesContainer.appendChild(fileCard);
    });
});