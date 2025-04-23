
/*Resize iframe height based on the content*/
function resizeIframe(iframe, goToTop) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight +10+ "px";

    if(goToTop){
      document.body.scrollTop = document.documentElement.scrollTop = 0;
    }
}

/* Change content of the iframe */
function changeFrameContent(page) {
    var iframe_index = document.getElementById("index_iframe_id");

    //If function is called from within the iFrame
    if(iframe_index===null){
      iframe_index = window.parent.document.getElementById("index_iframe_id");

      //change the iFrame src:
      iframe_index.src= page;

      //Reset menu height to top.
      var scroll_buttons_div = window.parent.document.getElementById('scroll_buttons_div_id');
      scroll_buttons_div.style.top = "500px";

      }else{ //If function is called from parent
      //change the iFrame src:
      iframe_index.src= page;

      //Reset menu height to top.
      var scroll_buttons_div = document.getElementById('scroll_buttons_div_id');
      scroll_buttons_div.style.top = "500px";
    }
    
}



/*SCROLL TO TOP AND BOTTOM */
function goToTop(){
    //Scroll to the top of the page from index:
    window.scrollTo({top: 0, behavior: 'smooth'});
}

function goToBottom(){
  //Scroll to the bottom of the page from iframe:
  window.parent.scrollTo({top: window.parent.document.body.scrollHeight, behavior: 'smooth'});
}



/* MOVE ELEMENT ON SCROLL */
function scrollElement(element_id, original_top_pos, min_top_pos, max_top_pos){
  var vertical_position = 0;
    if (pageYOffset)//usual
      vertical_position = pageYOffset;
    else if (document.documentElement.clientHeight)//ie
      vertical_position = document.documentElement.scrollTop;
    else if (document.body)//ie quirks
      vertical_position = document.body.scrollTop;
  
    var page_heigth = document.body.scrollHeight;
    var element = document.getElementById(element_id);

    if(vertical_position < min_top_pos){
        element.style.top = original_top_pos + 'px';
    }
    
    if( vertical_position >= min_top_pos && vertical_position < (page_heigth - max_top_pos) ){
        element.style.top = (vertical_position + 200) + 'px';

    }    
}

//Move menu on scroll
window.onscroll = function() {scrollElement('scroll_buttons_div_id', 500, 300, 1000)};

//Increase menu div width when mouse on over
function increaseDivWidth(){
    var div = document.getElementById('scroll_buttons_div_id');
    div.style.width = "105px";
}

//Reset menu div width when mouse out
function diminishDivWidth(){
  var div = document.getElementById('scroll_buttons_div_id');
  div.style.width = "fit-content";
}



/*  WINDOW RESIZE */
//Change elements style when resizing window.
function changeOnResizing(){
  var iframe_index = document.getElementById("index_iframe_id");

  if(iframe_index!=null){

    var menu_scroll= document.getElementById('scroll_buttons_div_id');
    var title_image= document.getElementById('title_image_id');

    resizeIframe(iframe_index, false); //adjust iFrame height based on content.

    //When screen width is:
    if(window.innerWidth <= 1600){ //100% and above
      title_image.style.width = "53%";
    }
    if(window.innerWidth <= 1700 && window.innerWidth > 1600){ //90%
      title_image.style.width = "48%";
    }
    if(window.innerWidth <= 1900 && window.innerWidth > 1800){ //80%
      menu_scroll.style.left= "89%";
      title_image.style.width = "43%";
    }
    if(window.innerWidth > 1900 && window.innerWidth <= 2000){ //75%
      menu_scroll.style.left= "89.2%";
      title_image.style.width = "40%";
    }
    if(window.innerWidth > 2000 && window.innerWidth <= 2500){ //67%
      menu_scroll.style.left= "89.3%";
      title_image.style.width = "36%";
    }
    if(window.innerWidth > 2500 && window.innerWidth <= 3000){ //50%
      menu_scroll.style.left= "89.5%";
      title_image.style.width = "27%";
    }
    if(window.innerWidth > 3000 && window.innerWidth <= 4485){ // 33%
      menu_scroll.style.left= "89.8%";
      title_image.style.width = "24%";
    }
    if(window.innerWidth > 4485 ){ // 25%
      menu_scroll.style.left= "89.8%";
      title_image.style.width = "19%";
    }
  }
}

window.onresize = function() {changeOnResizing()};




/* ENLARGE IMAGE */
function enlargeImg(img, orientation) {
  
  var enlarged_div= window.parent.document.getElementById("enlargedImg_div_id");
  var enlarged_img= window.parent.document.getElementById("enlargedImg_id");
  var caption= window.parent.document.getElementById("caption_image_id");
  var close= window.parent.document.getElementById("close_image_id");
  
  //Display div enlarged image
  enlarged_div.style.display="flex";
  enlarged_div.position="sticky";

  //enlarge img
  enlarged_img.src= img.src;
  enlarged_img.style.transform = "scale(2)";
  enlarged_img.style.transition = "transform 0.25s ease";
  enlarged_img.setAttribute('data-title', img.getAttribute('data-title'));
  enlarged_img.alt= img.alt;

  //Change aspect ratio depending on if the image is horizontal or vertical.
  if(orientation==='h'){  //horizontal pics
    enlarged_img.style.width="400px";
    enlarged_img.style.height="300px";

    //position of close and caption texts.
    close.style.marginBottom="25%";
    caption.style.marginTop="17%";
    
  }else if( orientation==='v'){ //vertical pics
    enlarged_img.style.width="300px";
    enlarged_img.style.height="400px";

    //position of close and caption texts.
    close.style.marginBottom="50%";
    caption.style.marginTop="-4%";
    
  }else if( orientation==='s'){ //square pics
    enlarged_img.style.width="300px";
    enlarged_img.style.height="300px";

    //position of close and caption texts.
    close.style.marginBottom="25%";
    caption.style.marginTop="17%";
    
  }else if(orientation==='l'){ //landscape pics
    enlarged_img.style.width="400px";
    enlarged_img.style.height="200px";

    //position of close and caption texts.
    close.style.marginBottom="25%";
    caption.style.marginTop="17%";
  }

  //Set caption
  caption.innerText= img.getAttribute('data-title');  
}

// Hide enlarged image
function reduceImg(img){
  var enlarged_div= document.getElementById("enlargedImg_div_id");
  enlarged_div.style.display="none";

  img.style.transform = "scale(0)";
  img.style.transition = "transform 0.25s ease";
  img.src= "";
}

// Show next/previous image
function changeImg(next){

  let iframe= document.getElementById("index_iframe_id");
  var innerDoc = iframe.contentDocument || iframe.contentWindow.document;

  let last_element = innerDoc.getElementById('last_image_element');

  let image= document.getElementById("enlargedImg_id");
  let i= parseInt(image.alt);
  let other_img;
  let orientation;

  //Check if show next/previous image
  if(next){
    other_img= innerDoc.querySelector('[alt="'+(i+1)+'"]');
  }else{
    other_img= innerDoc.querySelector('[alt="'+(i-1)+'"]');
  }

  //Check if it's the last or first image of the album
  if(other_img==null){
    if(next){
      other_img= innerDoc.querySelector('[alt="0"]');
    }else{
      other_img= innerDoc.querySelector('[alt="'+last_element.innerText+'"]');
    }
    
  } 

  //Get the pic orientation from its onclick attribute  
  orientation=other_img.getAttribute("onclick").split("'")[1];
  

  enlargeImg(other_img, orientation);

}

//Show Caption and Close-Text, hide back/next buttons, when hovering an enlarged image.
function showCaption(show){
  var caption= document.getElementById("caption_image_id");
  var close= document.getElementById("close_image_id");
  var backArrow= document.getElementById("backArrow_id");
  var nextArrow= document.getElementById("nextArrow_id");

  if(show){
    caption.style.display="block";
    close.style.display="block";
    backArrow.style.display="none";
    nextArrow.style.display="none";
  }else{
    caption.style.display="none";
    close.style.display="none";
    backArrow.style.display="block";
    nextArrow.style.display="block";
  }
}





/* FLICKR GALLERY */

// Creates Flickr Wall.
let fwitems = [];
function flickrWall() {

  if (fwitems) {
    //Get Flickr Wall
    let fwall = document.getElementById('fwall');

    //Check if there are more Albums linked in the page, and set the <p> last_element to know how many pictures there are in total.
    let index= checkIfMoreAlbums().i;
    let last_elem;
    if(checkIfMoreAlbums().exists){
      last_elem= document.getElementById('last_image_element');

    }else{
      last_elem= document.createElement('p');
      last_elem.setAttribute('id','last_image_element');
      last_elem.setAttribute('style','display:none;');
      fwall.appendChild(last_elem);
    }
    
    // For each that goes through Albums
    fwitems.forEach(function(album) {
      //For each that goes through Pictures
      album.forEach(function(item) {
        index++;
        last_elem.innerText=index; //Write down last index to an invisible element, to know number of images.
        
        let elem = document.createElement('li');
        let image = document.createElement('img');

        image.setAttribute('src', item.media.m.replace('_m.','.')); // Default photos in feed are 240px wide XXXX_m.jpg photos, but I want the 500px wide XXXX.jpg photos.
        image.setAttribute('data-title', '' + item.title + ''); // Image Caption
        image.setAttribute('alt', index);
        image.setAttribute('loading', 'lazy');
        image.setAttribute('class','gradient_border');

        //get image's width and height to know if it's an horizontal or vertical picture.
        getMeta(
          image.src, (width, height) => { 
            if(width>height){
            image.setAttribute('onclick',"javascript:enlargeImg(this, 'h')");
            }else if(width<height){
              image.setAttribute('onclick',"javascript:enlargeImg(this, 'v')");
            }else if(width==height){
              image.setAttribute('onclick',"javascript:enlargeImg(this, 's')");
            }
          
            if(width>(height*2)){
              image.setAttribute('onclick',"javascript:enlargeImg(this, 'l')");
            }}
        );
        
        elem.appendChild(image);
        fwall.appendChild(elem);
      });
      
    });
    fwall.appendChild(document.createElement('li')); // End with an empty item.
  } 
}

// Function to be called from JSONP feed (https://www.flickr.com/services/feeds/photoset.gne?nsid=10259776@N00&set=369431&lang=en-us&format=json&nojsoncallback=0)
function jsonFlickrFeed(photos) { 
  //fwitems = photos.items; //Shows only 20 pictures
  fwitems.push(photos.items); //Shows pictures from all the albums linked in the <script> tags in the html page.

  window.addEventListener('DOMContentLoaded', flickrWall, false);
}


//Get image width and height from url
function getMeta(url, callback) {
  const img = new Image();
  img.src = url;
  img.onload = function() { callback(this.width, this.height); }
}

// Checks if there are more than 1 Flickr Album linked to the page.
function checkIfMoreAlbums(){
  let p= document.getElementById('last_image_element');
  let i=-1;
  let exists=false;

  if(p!=null){
    i= parseInt(p.innerText);
    exists=true;
  }

  return {i, exists};
}
/* END FLICKR GALLERY */















/*
  //GET IMAGE POSITION IN THE PAGE
  //rect.top, rect.right, rect.bottom, rect.left
  var rect = img.getBoundingClientRect();

  //SCROLL TO POSITION FROM IFRAME, WITH SMOOTH ANIMATION
  window.parent.scrollTo({top: (rect.top+img.height), behavior: 'smooth'});

  function getScroll() {
  
  return {
    x: document.documentElement.scrollLeft || document.body.scrollLeft,
    y: document.documentElement.scrollTop || document.body.scrollTop

    
  };
}

*/