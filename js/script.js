
"use strict";

/* =========================
   1. LANGUAGE DATA
========================= */

const languages = [
    { name: "Arabic", native: "العربية", image: "arabic.webp" },
    { name: "Chinese (Mandarin)", native: "中文", image: "chinese.webp" },
    { name: "French", native: "Français", image: "french.webp" },
    { name: "German", native: "Deutsch", image: "german.webp" },
    { name: "Hindi", native: "हिन्दी", image: "hindi.webp" },
    { name: "Italian", native: "Italiano", image: "italian.webp" },
    { name: "Japanese", native: "日本語", image: "japanese.webp" },
    { name: "Korean", native: "한국어", image: "korean.webp" },
    { name: "Kurdish", native: "Kurdî · کوردی", image: "kurdish.webp" },
    { name: "Malay", native: "Bahasa Melayu", image: "malay.webp" },
    { name: "Portuguese", native: "Português", image: "portuguese.webp" },
    { name: "Russian", native: "Русский", image: "russian.webp" },
    { name: "Spanish", native: "Español", image: "spanish.webp" },
    { name: "Turkish", native: "Türkçe", image: "turkish.webp" },
    { name: "Vietnamese", native: "Tiếng Việt", image: "vietnamese.webp" }
];


/* =========================
   2. HTML ELEMENTS
========================= */

const languageGrid = document.querySelector("#language-grid");
const languageCount = document.querySelector("#language-count");
const emptyMessage = document.querySelector("#empty-message");
const alphabetFilter = document.querySelector("#alphabet-filter");

const aboutDialog = document.querySelector("#about-dialog");
const aboutOpen = document.querySelector("#about-open");
const aboutClose = document.querySelector("#about-close");


/* =========================
   3. CREATE LANGUAGE CARD
========================= */

function createLanguageCard(language) {
    const card = document.createElement("article");
    card.className = "language-card";

    // Thumbnail
    const image = document.createElement("img");
    image.className = "language-image";
    image.src = `assets/images/${language.image}`;
    image.alt = "";
    image.width = 44;
    image.height = 44;
    image.loading = "lazy";
    image.decoding = "async";

    // Placeholder if the image is unavailable
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
   5. CREATE A–Z FILTER
========================= */

let selectedLetter = "ALL";

function createFilterButton(label, value, disabled = false) {
    const button = document.createElement("button");

    button.type = "button";
    button.className = "letter-button";
    button.textContent = label;
    button.disabled = disabled;

    button.setAttribute(
        "aria-pressed",
        String(selectedLetter === value)
    );

    if (value === "ALL") {
        button.classList.add("all-button");
    }

    button.addEventListener("click", () => {
        selectedLetter = value;
        updateFilter();
    });

    return button;
}

function createAlphabetFilter() {
    const fragment = document.createDocumentFragment();

    // All languages button
    fragment.appendChild(
        createFilterButton("All", "ALL")
    );

    // Determine which letters have languages
    const availableLetters = new Set(
        languages.map((language) =>
            language.name.charAt(0).toUpperCase()
        )
    );

    // A through Z
    for (let code = 65; code <= 90; code++) {
        const letter = String.fromCharCode(code);

        fragment.appendChild(
            createFilterButton(
                letter,
                letter,
                !availableLetters.has(letter)
            )
        );
    }

    alphabetFilter.replaceChildren(fragment);
}


/* =========================
   6. UPDATE FILTER
========================= */

function updateFilter() {
    const filteredLanguages =
        selectedLetter === "ALL"
            ? languages
            : languages.filter((language) =>
                language.name
                    .toUpperCase()
                    .startsWith(selectedLetter)
            );

    renderLanguages(filteredLanguages);

    // Update the selected button's appearance
    const buttons = alphabetFilter.querySelectorAll("button");

    buttons.forEach((button) => {
        const value =
            button.textContent === "All"
                ? "ALL"
                : button.textContent;

        button.setAttribute(
            "aria-pressed",
            String(value === selectedLetter)
        );
    });
}


/* =========================
   7. ABOUT DIALOG
========================= */

aboutOpen.addEventListener("click", () => {
    aboutDialog.showModal();
});

aboutClose.addEventListener("click", () => {
    aboutDialog.close();
});

// Close when clicking the backdrop
aboutDialog.addEventListener("click", (event) => {
    if (event.target === aboutDialog) {
        aboutDialog.close();
    }
});



/* ========================================
   8. MEMORY DIALOG
======================================== */

const memoryOpen = document.getElementById("memory-open");
const memoryDialog = document.getElementById("memory-dialog");
const memoryClose = document.getElementById("memory-close");

if (memoryOpen && memoryDialog && memoryClose) {

    // Open the dialog
    memoryOpen.addEventListener("click", () => {
        memoryDialog.showModal();
    });

    // Close using the X button
    memoryClose.addEventListener("click", () => {
        memoryDialog.close();
    });

    // Close when clicking outside the dialog
    memoryDialog.addEventListener("click", (event) => {
        if (event.target === memoryDialog) {
            memoryDialog.close();
        }
    });

}



/* =========================
   9. START HOMEPAGE
========================= */

createAlphabetFilter();
renderLanguages(languages);
