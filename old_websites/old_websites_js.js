// Makes the element go full screen.
function requestFullScreen(element) {               

	if(element!=undefined){
		// Supports most browsers and their versions.
		var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

		if (requestMethod) { // Native full screen.
			requestMethod.call(element);
		} else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
			var wscript = new ActiveXObject("WScript.Shell");
			if (wscript !== null) {
				wscript.SendKeys("{F11}");
			}
		}
	}
}

var elem = document.iframe; // Make the body go full screen.
requestFullScreen(elem); 





function changeFrameWebsite(site) {
	// get a reference to the iframe element, home button and downlaod button:
	var iframeScreen = document.getElementById("main_frame_id");

	//change the iFrame screen, the old button's link and the download link, based on the site:
	switch (site){
		case "laura_EN":
			iframeScreen.src ="./Laura_web_EN/index.html";
			setButtonsLinks(site);
			break;
		
		case "hype_noflash":
			iframeScreen.src ="./Hype_web/noflash.html";
			setButtonsLinks(site);
			break;

		case "hype_EN":
			iframeScreen.src ="./Hype_web/flash/flash_hype.html";
			setButtonsLinks(site);
			break;

		case "alex_EN":
			iframeScreen.src ="./Alex_web_EN/index.html";
			setButtonsLinks(site);
			break;

		case "alex_FR":
			iframeScreen.src ="./Alex_web_FR/index.html";
			setButtonsLinks(site);
			break;

		case "hype_SW":
			iframeScreen.src ="./Hype_web/flashSW/flash_hype.html";
			setButtonsLinks(site);
			break;

		case "hype_DK":
			iframeScreen.src ="./Hype_web/flashDK/flash_hype.html";
			setButtonsLinks(site);
			break;

		default:
			iframeScreen.src="";
			setButtonsLinks("");
			break;
	}

	// update the elements:
	
	iframeScreen.style= "border: 2px solid gray;";
	iframeScreen.style.backgroundColor = "white";
	
}

function setButtonsLinks(site){
	var home_button_fun= document.getElementById("home_button");
	var link_old_button = document.getElementById("link_old");
	var link_downl_button = document.getElementById("link_download");


	switch (site){
		case "laura_EN":
			home_button_fun.onclick= function() {window.open("./Laura_web_EN/index.html", "main_frame_name")};
			link_old_button.href="https://web.archive.org/web/20031226171009/http://laura.ubi.com/";
			link_downl_button.href="https://github.com/playmo90strilogy/Laura_Happy_Adventures_US_Old_Website/archive/refs/heads/main.zip"
			break;
		
		case "hype_noflash":
			home_button_fun.onclick= function() {window.open("./Hype_web/noflash.html", "main_frame_name")};
			link_old_button.href="https://web.archive.org/web/20040328210845/http://hype.ubi.com/";
			link_downl_button.href="https://github.com/playmo90strilogy/Hype_The_Time_Quest_Old_Website/archive/refs/heads/main.zip";
			break;

		case "hype_EN":
			home_button_fun.onclick= function() {window.open("./Hype_web/flash/flash_hype.html", "main_frame_name")};
			link_old_button.href="https://web.archive.org/web/20041021105428/http://hype.ubi.com:80/flash/hype.swf";
			link_downl_button.href="https://github.com/playmo90strilogy/Hype_The_Time_Quest_Old_Website/archive/refs/heads/main.zip";
			break;

		case "alex_EN":
			home_button_fun.onclick= function() {window.open("./Alex_web_EN/index.html", "main_frame_name")};
			link_old_button.href="https://web.archive.org/web/20041012112956/http://www.playmobil-interactive.com/alex/"; 
			link_downl_button.href="https://github.com/playmo90strilogy/Alex_Builds_His_Farm_US_Old_Website/archive/refs/heads/main.zip";   
			break;

		case "alex_FR":
			home_button_fun.onclick= function() {window.open("./Alex_web_FR/index.html", "main_frame_name")};
			link_old_button.href="https://web.archive.org/web/20041016055812/http://sites.ubisoft.fr/alex/";
			link_downl_button.href="https://github.com/playmo90strilogy/Alex_Builds_His_Farm_FR_Old_Website/archive/refs/heads/main.zip";
			break;

		case "hype_SW":
			home_button_fun.onclick= function() {window.open("./Hype_web/flashSW/flash_hype.html", "main_frame_name")};
			link_old_button.href="https://web.archive.org/web/20050816193919/http://www.playmobil-interactive.com:80/hype/sw/flash/hypeswd.swf";
			link_downl_button.href="https://github.com/playmo90strilogy/Hype_The_Time_Quest_Old_Website/archive/refs/heads/main.zip";
			break;

		case "hype_DK":
			home_button_fun.onclick= function() {window.open("./Hype_web/flashDK/flash_hype.html", "main_frame_name")};
			link_old_button.href="https://web.archive.org/web/20050516085906/http://www.playmobil-interactive.com:80/hype/dk/flash/hypedk.swf";
			link_downl_button.href="https://github.com/playmo90strilogy/Hype_The_Time_Quest_Old_Website/archive/refs/heads/main.zip";
			break;

		default:
			home_button_fun.onclick= "";
			link_old_button.href="";
			link_downl_button.href="";
			break;
	}

}


