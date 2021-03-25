function fetchRSSData(){
    // `forwardCORS` is a CORS proxy set up by ehilst515. See README for more info.
    const forwardCORS = `https://ancient-fjord-92634.herokuapp.com/`;
    const RSS_URL = `http://rss.careerjet.com/rss?s=junior%20software%20developer%20engineer&l=USA&lid=55&psz=30&snl=500`;
    // Fetch data from RSS stream
    fetch(forwardCORS + RSS_URL)
      .then(response => response.text())
      .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
      .then(data => {
        // Select `<item>` element from XML data
        const items = data.querySelectorAll("item");

        let html =``;
        let jobIDArray = [];
        let jobData = [];

        items.forEach(item =>{
          // Select item element children
          let title = item.querySelector("title").innerHTML;
          let link = item.querySelector("link").innerHTML;
          let description = item.querySelector("description").innerHTML;
          let jobID = item.querySelector("guid").innerHTML;
          // Prevent duplicates
          if(jobIDArray.includes(jobID)){
            return;
          }
          jobIDArray.push(jobID);
          // Filter out non-junior roles
          let t = title.toLowerCase();
          let isSenior = 
          t.includes("sr ") || t.includes("sr. ") || t.includes("senior ") || 
          t.includes("principal ") || t.includes("lead ")  || t.includes("manager ");
          if(isSenior){
           return;
          }
          // Construct Job object
          var job = new Job(title, link, description, jobID);
          jobData.push(job);

          // Write to HTML document
          // html +=`
          // <article>
          //   <h2><a href="${link}">${title}</a></h2>
          //   <p>${description} </p>
          // </article>
          // </br>`;

          
        }) //close forEach

        const json =`
        <h2>Found ${jobData.length} jobs!</h2>
          <article>
            ${JSON.stringify(jobData)}
          </article>
          </br>`;

          document.body.insertAdjacentHTML("beforeend", json);

      })
      .catch(e => console.log(e.message));
}

/**
 * All params are strings pulled from RSS data.
 * @param {string} title 
 * @param {string} link 
 * @param {string} description 
 * @param {string} jobID 
 */
function Job(title, link, description, jobID){
  this.title = title;
  this.link = link;
  this.description = description;
  this.jobID = jobID;
}

/**  
 Example:

  <title>Junior Java Developer</title>
  <link>http://jobviewtrack.com/en-us/job-1c4d4167580a060155546a021e004e230056110406034f593f674c120e4e63115606040e1e0217223e1d071a45591d6948120a02480445116a2b1b090c4f064823125c4a3f674c120e6f154612525b/6e56dedd445e815154162168c7a85284.html</link>
  <guid isPermaLink="false">6e56dedd445e815154162168c7a85284</guid>
  <pubDate>Thu, 25 Mar 2021 08:46:14 GMT</pubDate>
  <description>Amdocs - Herndon, VA -  is being used in amazing new ways every single day. In one sentence As a Software Engineer..., you will join the growing R &amp; D team to develop modern software systems using cutting edge technologies...</description> 
  
  */
