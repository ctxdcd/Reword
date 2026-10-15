
"use strict";

/* =========================
   1. LANGUAGE DATA
========================= */

const languages = [
    {
        name: "Arabic",
        native: "العربية",
        image: "arabic.webp"
    },
    {
        name: "Japanese",
        native: "日本語",
        image: "japanese.webp"
    },
    {
        name: "German",
        native: "Deutsch",
        image: "german.webp"
    },
    {
        name: "Italian",
        native: "Italiano",
        image: "italian.webp"
    },
    {
        name: "Turkish",
        native: "Türkçe",
        image: "turkish.webp"
    },
    {
        name: "Chinese (Mandarin)",
        native: "中文",
        image: "chinese.webp"
    },
    {
        name: "Spanish",
        native: "Español",
        image: "spanish.webp"
    },
    {
        name: "Korean",
        native: "한국어",
        image: "korean.webp"
    },
    {
        name: "French",
        native: "Français",
        image: "french.webp"
    },
    {
        name: "Portuguese",
        native: "Português",
        image: "portuguese.webp"
    },
    {
        name: "Russian",
        native: "Русский",
        image: "russian.webp"
    },
    {
        name: "Vietnamese",
        native: "Tiếng Việt",
        image: "vietnamese.webp"
    },
    {
        name: "Malay",
        native: "Bahasa Melayu",
        image: "malay.webp"
    },
    {
        name: "Hindi",
        native: "हिन्दी",
        image: "hindi.webp"
    },
    {
        name: "Kurdish",
        native: "Kurdî · کوردی",
        image: "kurdish.webp"
    }
];


/* =========================
   2. HTML ELEMENTS
========================= */

const languageGrid = document.querySelector("#language-grid");
const searchInput = document.querySelector("#language-search");
const languageCount = document.querySelector("#language-count");
const emptyMessage = document.querySelector("#empty-message");


/* =========================
   3. CREATE LANGUAGE CARDS
========================= */

function createLanguageCard(language) {
    const card = document.createElement("article");
    card.className = "language-card";

    // Image thumbnail
    const image = document.createElement("img");
    image.className = "language-image";
    image.src = `assets/images/${language.image}`;
    image.alt = "";
    image.width = 44;
    image.height = 44;
    image.loading = "lazy";
    image.decoding = "async";

    // Show a simple placeholder if the image
    // has not been added yet or cannot load.
    image.addEventListener("error", () => {
        const placeholder = document.createElement("div");
        placeholder.className = "image-placeholder";
        placeholder.setAttribute("aria-hidden", "true");
        placeholder.textContent = "RW";

        image.replaceWith(placeholder);
    }, { once: true });

    // Language information
    const info = document.createElement("div");
    info.className = "language-info";

    const name = document.createElement("h3");
    name.className = "language-name";
    name.textContent = language.name;

    const native = document.createElement("p");
    native.className = "language-native";
    native.textContent = language.native;

    const status = document.createElement("span");
    status.className = "language-status";
    status.textContent = "Coming soon";

    info.append(name, native, status);
    card.append(image, info);

    return card;
}


/* =========================
   4. DISPLAY LANGUAGES
========================= */

function renderLanguages(items) {
    const fragment = document.createDocumentFragment();

    items.forEach((language) => {
        fragment.appendChild(createLanguageCard(language));
    });

    languageGrid.replaceChildren(fragment);

    languageCount.textContent =
        `${items.length} ${items.length === 1 ? "language" : "languages"}`;

    emptyMessage.hidden = items.length !== 0;
}


/* =========================
   5. SEARCH LANGUAGES
========================= */

function searchLanguages() {
    const query = searchInput.value
        .trim()
        .toLocaleLowerCase();

    const filteredLanguages = languages.filter((language) => {
        const searchableText =
            `${language.name} ${language.native}`.toLocaleLowerCase();

        return searchableText.includes(query);
    });

    renderLanguages(filteredLanguages);
}


/* =========================
   6. START HOMEPAGE
========================= */

searchInput.addEventListener("input", searchLanguages);

renderLanguages(languages);
