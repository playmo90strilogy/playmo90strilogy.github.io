
/*Resize iframe height based on the content*/
function resizeIframe(iframe) {
    iframe.height = iframe.contentWindow.document.body.scrollHeight +10+ "px";
}



function changeFrameContent(page) {
    var iframe_index = document.getElementById("index_iframe_id");
    //change the iFrame src:
    iframe_index.src= page;
    //adjust iFrame height based on content:
    resizeIframe(iframe_index);

    //Scrool to the top of the page:
    document.body.scrollTop = document.documentElement.scrollTop = 0;

    //Reset menu height to top.
    var scroll_buttons_div = document.getElementById('scroll_buttons_div_id');
    scroll_buttons_div.style.top = "500px";
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
window.onscroll = function() {scrollElement('scroll_buttons_div_id', 500, 300, 950)};
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


