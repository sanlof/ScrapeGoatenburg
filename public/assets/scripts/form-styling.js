
/****** Lägg till dagens datum i datumfälten ******/

const dates = document.querySelectorAll('input[type="date"]');

// Hämta dagens datum
const today = new Date();
const year = today.getFullYear();
const month = String(today.getMonth() + 1).padStart(2, '0');
const day = String(today.getDate()).padStart(2, '0');

// Formatera datumet som yyyy-mm-dd
const formattedDate = `${year}-${month}-${day}`;

// Sätt datumet som värde i input-fälten
dates.forEach(date => {
    date.value = formattedDate;
});


/****** Animerade sökord i quick-form ******/

const category = document.getElementById('category');
const keywords = ['bio', 'teater', 'fotboll', 'museum', 'koncert'];
let currentIndex = 0; // Track the current keyword
let charIndex = 0; // Track the current character being typed
let typingInterval;

function typeAndErase() {
const keyword = keywords[currentIndex];

// Typing phase
function type() {
    if (charIndex < keyword.length) {
    category.placeholder += keyword[charIndex];
    charIndex++;
    } else {
    clearInterval(typingInterval);
    setTimeout(() => {
        // Start erasing after a short pause
        typingInterval = setInterval(erase, 100);
    }, 1000); // Pause before erasing
    }
}

// Erasing phase
function erase() {
    if (charIndex > 0) {
    charIndex--;
    category.placeholder = keyword.slice(0, charIndex);
    } else {
    clearInterval(typingInterval);
    // Move to the next word
    currentIndex = (currentIndex + 1) % keywords.length;
    setTimeout(() => {
        typeAndErase(); // Start typing the next word
    }, 500); // Pause before typing the next word
    }
}

// Start typing
typingInterval = setInterval(type, 100);
}

// Start the animation
typeAndErase();