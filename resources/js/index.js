let  createAccordion=(title,id)=>{
  return `<div class="accordion-item">
  <h2 class="accordion-header" id="headingOne${id}">
    <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne${id}" aria-expanded="true" aria-controls="collapseOne">
     ${title}
    </button>
  </h2>
  <div id="collapseOne${id}" class="accordion-collapse collapse" aria-labelledby="headingOne" data-bs-parent="#accordionExample${id}">
  </div>
  </div>
  `
}
let createCarousel=(id,innerid)=>{
  return `
  <div id="carouselExampleIndicators${id}" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner" id=carousel-inner${innerid}>
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators${id}" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators${id}" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>`
}

async function fetchData(items)
{  try{
    const response=await fetch(`https://api.rss2json.com/v1/api.json?rss_url=${items}`);
    const result=await response.json();
    return result; }
    catch{
      return null;
    }
}

async function addItems()
{ for(let i=0;i<magazines.length;i++)
   {
       const  data=await fetchData(magazines[i]);
       console.log(data);
       console.log(data.feed.title);
       let accordionId=`items${i}`;
       let accordion=createAccordion(data.feed.title,accordionId)
       document.getElementById("accordionId").innerHTML+=accordion
       if(i == 0){
         document.getElementById(`collapseOne${accordionId}`).classList.add("show")
       }
    let carouselId=`items${i}`
    let carouselInnerId=`items${i}`
    let carousel=createCarousel(carouselId,carouselInnerId) 
    document.getElementById(`collapseOne${accordionId}`).innerHTML=carousel
    
    data.items.forEach((value,index) => {
      var div=document.createElement("div");
      if(index===0)
      {
          div.classList.add("carousel-item","active");
      }
      else{
          div.classList.add("carousel-item");
      }
      const date=new Date(value.pubDate);
      
      div.innerHTML=`
      <a href=${value.link}
      <div class="card">
      <img src=${value.enclosure.link} class="d-block w-100 card-img-top">
     <div class="card-body">
     <h5 class="card-title ">${value.title}</h5>
     <h6>${value.author} • ${date.toLocaleDateString()}</h6>
     <p class="card-text">${value.content}</p>
  
      </div>
      </div></a>`
      document.getElementById(`carousel-inner${carouselInnerId}`).append(div);
      
    });
  
  }

}
addItems();