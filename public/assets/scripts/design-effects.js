/****** Fyll nav med färg vid scroll ******/

window.onscroll = function() {
    const top_nav = document.querySelector("nav");
    const header = document.querySelector("header");

    if (window.scrollY > 10) {
        top_nav.classList.add("bg");
    } else {
        top_nav.classList.remove("bg");
    }
};

/****** Fyll articles med olika bakgrundsfärger ******/

const articles = document.querySelectorAll('article');

function getRandomColor() {
  const letters = '6789ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 10)];
  }
  return color;
}

function getRandomRotation() {
  let min = -5;
  let max = 5;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return "rotate(" + random + "deg)";
}

// articles.forEach(article => {
//   article.style.backgroundColor = getRandomColor();
//   article.style.transform = getRandomRotation();
// });


/****** accessibly linked articles ******/

function handleClick(link) {
  const noTextSelected = !window.getSelection().toString();
  if (noTextSelected) {
      link.click();
  }
}
