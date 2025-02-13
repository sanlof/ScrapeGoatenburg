function getData() {
    const url = '/api';
        fetch(url)
            .then((response) => {
                return response.json();
        }).then((data) => { 
            const eventResults = data.eventResultsData;
            console.log(eventResults[0].title)
             addContentToIndex(eventResults);

        })
}

getData();


function addContentToIndex(eventResults) {

    eventResults.forEach(eventResult => {
        const article = document.createElement('article');
        // const hgroup = document.createElement('hgroup');
        const date = document.createElement('time');
        const location = document.createElement('address');
        const heading = document.createElement('h2');
        const link = document.createElement('a');
        const posts = document.getElementById("posts");
        
        date.textContent = eventResult.date;
        // heading.textContent = eventResult.title;
        location.textContent = eventResult.location;
        link.href = eventResult.link;
        link.textContent = eventResult.title; // title with link instead
        
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