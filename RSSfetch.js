function fetchRSSData(){
    const forwardCORS = `https://ancient-fjord-92634.herokuapp.com/`
    const RSS_URL = `http://rss.careerjet.com/rss?s=junior%20software%20developer%20engineer&l=USA&lid=55&psz=30&snl=100`;

    fetch(forwardCORS + RSS_URL)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        const items = data.querySelectorAll("item");
        console.log(items[0].innerHTML);

        let html =``;

        items.forEach(item =>{
          let title = item.querySelector("title").innerHTML;
          let link = item.querySelector("link").innerHTML;
          let description = item.querySelector("description").innerHTML;

          let t = title.toLowerCase();
          let isSenior = 
          t.includes("sr ") || t.includes("sr. ") || t.includes("senior") || 
          t.includes("principal ") || t.includes("lead ");
          if(isSenior){
           return;
          }

          html +=`
          <article>
            <h2><a href="${link}">${title}</a></h2>
            <p>${description} </p>
          </article>
          </br>`;

          document.body.insertAdjacentHTML("beforeend", html);
        })
      })
      .catch(e => console.log(e.message));
}


/**  
 Example:

  <title>Junior Java Developer</title>
  <link>http://jobviewtrack.com/en-us/job-1c4d4167580a060155546a021e004e230056110406034f593f674c120e4e63115606040e1e0217223e1d071a45591d6948120a02480445116a2b1b090c4f064823125c4a3f674c120e6f154612525b/6e56dedd445e815154162168c7a85284.html</link>
  <guid isPermaLink="false">6e56dedd445e815154162168c7a85284</guid>
  <pubDate>Thu, 25 Mar 2021 08:46:14 GMT</pubDate>
  <description>Amdocs - Herndon, VA -  is being used in amazing new ways every single day. In one sentence As a Software Engineer..., you will join the growing R &amp; D team to develop modern software systems using cutting edge technologies...</description> 
  
  */
