"use strict";

// ========================================
// 1. LANGUAGE DATA
// ========================================

const languages = [
    { name: "Arabic", native: "العربية", image: "arabic.webp", slug: "arabic" },
    { name: "Chinese (Mandarin)", native: "中文", image: "chinese.webp", slug: "chinese" },
    { name: "French", native: "Français", image: "french.webp", slug: "french" },
    { name: "German", native: "Deutsch", image: "german.webp", slug: "german" },
    { name: "Hindi", native: "हिन्दी", image: "hindi.webp", slug: "hindi" },
    { name: "Italian", native: "Italiano", image: "italian.webp", slug: "italian" },
    { name: "Japanese", native: "日本語", image: "japanese.webp", slug: "japanese", page: true },
    { name: "Korean", native: "한국어", image: "korean.webp", slug: "korean" },
    { name: "Kurdish", native: "Kurdî · کوردی", image: "kurdish.webp", slug: "kurdish" },
    { name: "Malay", native: "Bahasa Melayu", image: "malay.webp", slug: "malay" },
    { name: "Portuguese", native: "Português", image: "portuguese.webp", slug: "portuguese" },
    { name: "Russian", native: "Русский", image: "russian.webp", slug: "russian" },
    { name: "Spanish", native: "Español", image: "spanish.webp", slug: "spanish" },
    { name: "Turkish", native: "Türkçe", image: "turkish.webp", slug: "turkish" },
    { name: "Vietnamese", native: "Tiếng Việt", image: "vietnamese.webp", slug: "vietnamese" }
];


// ========================================
// 2. LANGUAGE CARDS
// ========================================

const languageGrid = document.getElementById("language-grid");
const languageCount = document.getElementById("language-count");
const emptyMessage = document.getElementById("empty-message");

function createLanguageCard(language) {
    // Japanese uses a link; other languages remain non-clickable.
    const card = document.createElement(language.page ? "a" : "article");

    card.className = "language-card";

    if (language.page) {
        card.href = `languages/${language.slug}/index.html`;
        card.setAttribute("aria-label", "Learn Japanese — 日本語");
    }

    // Language thumbnail
    const image = document.createElement("img");

    image.className = "language-image";
    image.src = `assets/images/${language.image}`;
    image.alt = "";
    image.width = 44;
    image.height = 44;
    image.loading = "lazy";

    // Display a placeholder if the image is missing.
    image.addEventListener("error", () => {
        const placeholder = document.createElement("span");

        placeholder.className = "image-placeholder";
        placeholder.textContent = "RW";
        placeholder.setAttribute("aria-hidden", "true");

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

    info.append(name, native);

    // Show status only when the page is not ready.
    if (!language.page) {
        const status = document.createElement("span");

        status.className = "language-status";
        status.textContent = "Coming soon";

        info.append(status);
    }

    card.append(image, info);

    return card;
}

function renderLanguages(languageList) {
    languageGrid.replaceChildren();

    languageList.forEach((language) => {
        languageGrid.appendChild(createLanguageCard(language));
    });

    languageCount.textContent =
        `${languageList.length} ${languageList.length === 1 ? "language" : "languages"}`;

    emptyMessage.hidden = languageList.length !== 0;
}


// ========================================
// 3. A–Z FILTER
// Matches the existing CSS class names.
// ========================================

const alphabetFilter = document.getElementById("alphabet-filter");

const alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");

function createAlphabetFilter() {
    alphabetFilter.replaceChildren();

    // ALL BUTTON
    const allButton = document.createElement("button");

    allButton.type = "button";
    allButton.className = "letter-button all-button";
    allButton.textContent = "All";
    allButton.dataset.letter = "all";
    allButton.setAttribute("aria-pressed", "true");

    allButton.addEventListener("click", () => {
        updateFilter("all");
    });

    alphabetFilter.appendChild(allButton);

    // A–Z BUTTONS
    alphabet.forEach((letter) => {
        const button = document.createElement("button");

        button.type = "button";
        button.className = "letter-button";
        button.textContent = letter;
        button.dataset.letter = letter;
        button.setAttribute("aria-pressed", "false");

        const hasLanguage = languages.some((language) =>
            language.name.toUpperCase().startsWith(letter)
        );

        button.disabled = !hasLanguage;

        button.addEventListener("click", () => {
            updateFilter(letter);
        });

        alphabetFilter.appendChild(button);
    });
}

function updateFilter(letter) {
    const filteredLanguages = letter === "all"
        ? languages
        : languages.filter((language) =>
            language.name.toUpperCase().startsWith(letter)
        );

    renderLanguages(filteredLanguages);

    const buttons = alphabetFilter.querySelectorAll(".letter-button");

    buttons.forEach((button) => {
        const isActive = button.dataset.letter === letter;

        button.classList.toggle("active", isActive);
        button.setAttribute("aria-pressed", String(isActive));
    });
}


// ========================================
// 4. ABOUT DIALOG
// ========================================

const aboutOpen = document.getElementById("about-open");
const aboutDialog = document.getElementById("about-dialog");
const aboutClose = document.getElementById("about-close");

if (aboutOpen && aboutDialog && aboutClose) {
    aboutOpen.addEventListener("click", () => {
        aboutDialog.showModal();
    });

    aboutClose.addEventListener("click", () => {
        aboutDialog.close();
    });

    aboutDialog.addEventListener("click", (event) => {
        if (event.target === aboutDialog) {
            aboutDialog.close();
        }
    });
}


// ========================================
// 5. MEMORY DIALOG
// ========================================

const memoryOpen = document.getElementById("memory-open");
const memoryDialog = document.getElementById("memory-dialog");
const memoryClose = document.getElementById("memory-close");

if (memoryOpen && memoryDialog && memoryClose) {
    memoryOpen.addEventListener("click", () => {
        memoryDialog.showModal();
    });

    memoryClose.addEventListener("click", () => {
        memoryDialog.close();
    });

    memoryDialog.addEventListener("click", (event) => {
        if (event.target === memoryDialog) {
            memoryDialog.close();
        }
    });
}


// ========================================
// 6. INITIALIZE HOMEPAGE
// ========================================

createAlphabetFilter();
renderLanguages(languages);