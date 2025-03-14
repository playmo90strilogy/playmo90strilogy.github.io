function show_back_frame(url){
                var back_frame= backIframe_id;
                back_frame.src=url;
                back_frame.style.zIndex="1";

            }

//javascript:function show_bk_fr() {var back_frame= backIframe_id; back_frame.src=url; back_frame.style.zIndex="1";};
			
function hide_back_frame(){
	var back_frame=backIframe_id;
	back_frame.src="";
	back_frame.style.zIndex="0";
}