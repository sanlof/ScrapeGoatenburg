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
        const article = document.createElement('article')
        const hgroup = document.createElement('hgroup')
        const date = document.createElement('p')
        const location = document.createElement('p')
        const heading = document.createElement('h2')
        const link = document.createElement('a')
        const innerWrapper = document.getElementById("inner-wrapper")
        
        date.textContent = eventResult.date;
        heading.textContent = eventResult.title;
        location.textContent = eventResult.location;
        link.textContent = 'läs mer';
        link.href = eventResult.link;
        
        hgroup.appendChild(date)
        hgroup.appendChild(heading)
        article.appendChild(hgroup)
        
        article.appendChild(location)
        article.appendChild(link)
        
        innerWrapper.appendChild(article)
        
        })
}


/* <article>
<hgroup>
    <p>Fredag 17 januari</p>
    <h2>Sagostund på Stadsbiblioteket</h2>
</hgroup>
<p>Veritatis, quo quidem nisi architecto excepturi dolorum enim nostrum nam? Neque sint architecto adipisci vero tempore ducimus quaerat nobis corrupti quasi sed.</p>
<a href="" class="read-more">Läs mer</a>
</article> */