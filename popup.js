const testUrl = "https://www.google.com";

const cards = document.querySelectorAll('.ChoiceCard');

for (let card of cards) {
    card.addEventListener('click', (e) => {
        e.stopPropagation();
        chrome.tabs.create({ url: testUrl });
    });
}