fetch('/api').then((response) => {
    return response.json();
}).then((data) => { 
    const eventData = data.eventData;
    addContentToIndex(eventData);
});

function addContentToIndex(eventData) {

    eventData.forEach(event => {
        const article = document.createElement('article');
        const date = document.createElement('time');
        const location = document.createElement('address');
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        const posts = document.getElementById("posts");
        
        date.textContent = event.date;
        location.textContent = event.location;
        link.href = event.link;
        link.textContent = event.title; 
        
        article.appendChild(date);
        article.appendChild(heading);
        article.appendChild(location);
        heading.appendChild(link);
        posts.appendChild(article);
        
        article.style.backgroundColor = getRandomColor();
        article.style.transform = getRandomRotation();
        
        article.addEventListener("click", function() {
            handleClick(link);
        });

        article.addEventListener("mouseenter", function() {
            article.style.transform = "scale(1.2)";
        });
        article.addEventListener("mouseleave", function() {
            article.style.transform = getRandomRotation();
        });
        
    });
}