function fetchRSSData(){
    const forwardCORS = `https://ancient-fjord-92634.herokuapp.com/`
    const RSS_URL = `http://rss.careerjet.com/rss?s=junior%20software%20developer%20engineer&l=USA&lid=55&psz=30&snl=100`;

    fetch(forwardCORS + RSS_URL)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        console.log(items[0].innerHTML);

        return JSON.stringify(items[0].innerHTML);
      })
      
      .catch(e => console.log(e.message))
}

