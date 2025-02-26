/****** fill articles with different background colours ******/

const articles = document.querySelectorAll('article');

// A thought from the demo; I was under the impression that the color of the events was connected to what type of event. Random colors may be nice, but can also be a bit misleading.

function getRandomColor() {
  const letters = '89ABCDEF';
  let color = '#';
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 8)];
  }
  return color;
}

function getRandomRotation() {
  let min = -5;
  let max = 5;
  let random = Math.floor(Math.random() * (max - min + 1)) + min;
  return "rotate(" + random + "deg)";
}

/****** accessibly linked articles ******/

function handleClick(link) {
  const noTextSelected = !window.getSelection().toString();
  if (noTextSelected) {
      link.click();
  }
}
