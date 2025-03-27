
<HTML>
<HEAD>

<SCRIPT>
<!--

function validate()
{
	if (isFirstName() && isLastName() && isEmail() && isAddress() && isState() && isZip() && isPhone())
 	{ 

		if (confirm('Your E-mail address is '+document.forms[0].email.value))
		{
			document.forms[0].submit()
		}
 		else
		{
			document.forms[0].email.focus()
		};
 	}
}

function isFirstName()
{
	if (document.forms[0].firstName.value!="") {return true;}
	else
	{ 
		alert("\nYou must enter your first name to win")
		return false;
	}
}

function isLastName()
{
	if (document.forms[0].lastName.value!="") {return true;}
	else
	{ 
		alert("\nYou must enter your last name to win")
		return false;
	}
}

function isAddress()
{
	if (document.forms[0].address.value!="") {return true;}
	else
	{ 
		alert("\nYou must enter your address to win")
		return false;
	}
}

function isZip()
{
	if (document.forms[0].zip.value!="") {return true;}
	else
	{ 
		alert("\nYou must enter your zip code to win")
		return false;
	}
}

function isPhone()
{
	if (document.forms[0].phone.value!="") {return true;}
	else
	{ 
		alert("\nYou must enter your phone number to win")
		return false;
	}
}

function isState()
{
	if (document.forms[0].state.selectedIndex!=0) {return true;}
	else
	{ 
		alert("\nYou must enter your state to win")
		return false;
	}
}

function isEmail(elem)
{
	ligne = document.forms[0].email.value;
        if (ligne != "")
        {
                b = 0
                c = 0
                for (var c = 0; c < ligne.length; c++)
                {
                        var leCh=ligne.substring(c,c+1);
                        if ((leCh < "a" || "z" < leCh) && (leCh < "A" || "Z" < leCh) && (leCh < "0" || "9" < leCh ) && (leCh != "-")
 && (leCh != "_") && (leCh != "@") && (leCh != "."))
                        {
                                alert("You are using an invalid character in your email")
                                return false;
                        }
                }
                c = 0
                while (c < ligne.length)
                {
                        var leCh=ligne.substring(c,c+1);
                        if (b == 0)
                        {
                                if (leCh != "@")
                                        {
                                        b = 1
                                        }
                        }
                        else if (b == 1)
                        {
                                if (leCh == "@")
                                        {
                                        b = 2
                                        }
                        }
                        else if (b == 2)
                        {
                                if (leCh != ".")
                                        {
                                        b = 3
                                        }
                        }
                        else if (b == 3)
                        {
                                if (leCh == ".")
                                        {
                                        b = 4
                                        }
                        }
                        else if (b == 4)
                        {
                                if (leCh != "")
                                        {
                                        b = 5
                                        }
                        }
                c++
                }
                if (b == 5) {return true;}
                else
                {
                        alert("You must follow this format when you enter your email. ex: yourname@ubisoft.com.");
                        return false;
                }
        }
        else
        {
                alert("You must enter your e-mail to win");
                return false;
        }
}

function openDownload()
{	
	top.frames[1].location.href="";

}

//-->
</SCRIPT>

</HEAD>
<BODY bgcolor=000099 text=FFFFFF link=FFFFFF vlink=FFFFFF alink=FFFFFF


>

<div align="center">
  <table width="600" border="0" cellpadding="0" cellspacing="0" vspace="0" hspace="0">
    <tr bgcolor="#000000"> 
      <td width="238"><img src="../images/ubisoft.gif"></td>
      <td width="57"><b><font face="Arial, Helvetica, sans-serif" size="3"><a href="../" style=text-decoration:none target=_top>Home</a></font></b></td>
      <td width="113"><b><font face="Arial, Helvetica, sans-serif" size="3"><a href="../products/" style=text-decoration:none target=_top>Ubi 
        Products</a></font></b></td>
      <td width="88"><b><font face="Arial, Helvetica, sans-serif" size="3"><a href="https://shop.ubisoft.com/cgi-bin/ubishop.storefront" style=text-decoration:none target=_top>Ubi 
        Shop</a></font></b></td>
      <td width="104"><b><font face="Arial, Helvetica, sans-serif" size="3"><a href="../support/" style=text-decoration:none target=_top>Ubi 
        Support</a></font></b></td>
    </tr>
  </table>
  <br>


  <b><font face="Arial, Helvetica, sans-serif" size=4>Hype - The Time Quest newsletter</font><font face="Arial, Helvetica, sans-serif"><br>
  </font></b> </div>
  
<form action=save.php3>
  <center>
    <table width="525" border="0" cellspacing="0" cellpadding="5">
      <tr> 
        <td width="225" valign="top" align="center"> 
          <table width="225" border="0" cellspacing="0" cellpadding="2">
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"> 
                <b>First&nbsp;Name<br>
                </b></font></td>
              <td width="150" align=left valign=top> 
                <input type=text name=firstName size=25>
              </td>
            </tr>
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"><b>Last&nbsp;Name</b> 
                </font></td>
              <td width="150" align=left valign=top> 
                <input type=text name=lastName size=25>
              </td>
            </tr>
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"><b>E-mail</b> 
                </font></td>
              <td width="150" align=left valign=top> 
                <input type=text name=email size=25>
              </td>
            </tr>
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"><b>Address 
                </b></font></td>
              <td width="150" align=left valign=top> 
                <input type=text name=address size=25>
              </td>
            </tr>
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"><b>State</b> 
                </font></td>
              <td width="150" align=left valign=top> 
                <SELECT NAME="state">
                  <OPTION VALUE="" selected></OPTION>
                  <OPTION VALUE="Alabama">Alabama</OPTION>
                  <OPTION VALUE="Alaska">Alaska</OPTION>
                  <OPTION VALUE="Arizona">Arizona</OPTION>
                  <OPTION VALUE="Arkansas">Arkansas</OPTION>
                  <OPTION VALUE="California">California</OPTION>
                  <OPTION VALUE="Colorado">Colorado</OPTION>
                  <OPTION VALUE="Connecticut">Connecticut</OPTION>
                  <OPTION VALUE="Delaware">Delaware</OPTION>
                  <OPTION VALUE="Florida">Florida</OPTION>
                  <OPTION VALUE="Georgia">Georgia</OPTION>
                  <OPTION VALUE="Hawaii">Hawaii</OPTION>
                  <OPTION VALUE="Idaho">Idaho</OPTION>
                  <OPTION VALUE="Illinois">Illinois</OPTION>
                  <OPTION VALUE="Indiana">Indiana</OPTION>
                  <OPTION VALUE="Iowa">Iowa</OPTION>
                  <OPTION VALUE="Kansas">Kansas</OPTION>
                  <OPTION VALUE="Kentucky">Kentucky</OPTION>
                  <OPTION VALUE="Louisiana">Louisiana</OPTION>
                  <OPTION VALUE="Maine">Maine</OPTION>
                  <OPTION VALUE="Maryland">Maryland</OPTION>
                  <OPTION VALUE="Massachusetts">Massachusetts</OPTION>
                  <OPTION VALUE="Michigan">Michigan</OPTION>
                  <OPTION VALUE="Minnesota">Minnesota</OPTION>
                  <OPTION VALUE="Mississippi">Mississippi</OPTION>
                  <OPTION VALUE="Missouri">Missouri</OPTION>
                  <OPTION VALUE="Montana">Montana</OPTION>
                  <OPTION VALUE="Nebraska">Nebraska</OPTION>
                  <OPTION VALUE="Nevada">Nevada</OPTION>
                  <OPTION VALUE="New+Hampshire">New Hampshire</OPTION>
                  <OPTION VALUE="New+Jersey">New Jersey</OPTION>
                  <OPTION VALUE="New+Mexico">New Mexico</OPTION>
                  <OPTION VALUE="New+York">New York</OPTION>
                  <OPTION VALUE="North+Carolina">North Carolina</OPTION>
                  <OPTION VALUE="North+Dakota">North Dakota</OPTION>
                  <OPTION VALUE="Ohio">Ohio</OPTION>
                  <OPTION VALUE="Oklahoma">Oklahoma</OPTION>
                  <OPTION VALUE="Oregon">Oregon</OPTION>
                  <OPTION VALUE="Pennsylvania">Pennsylvania</OPTION>
                  <OPTION VALUE="Rhode+Island">Rhode Island</OPTION>
                  <OPTION VALUE="South+Carolina">South Carolina</OPTION>
                  <OPTION VALUE="South+Dakota">South Dakota</OPTION>
                  <OPTION VALUE="Tennessee">Tennessee</OPTION>
                  <OPTION VALUE="Texas">Texas</OPTION>
                  <OPTION VALUE="Utah">Utah</OPTION>
                  <OPTION VALUE="Vermont">Vermont</OPTION>
                  <OPTION VALUE="Virginia">Virginia</OPTION>
                  <OPTION VALUE="Washington.DC">Washington.DC</OPTION>
                  <OPTION VALUE="Washington">Washington</OPTION>
                  <OPTION VALUE="West+Virginia">West Virginia</OPTION>
                  <OPTION VALUE="Wisconsin">Wisconsin</OPTION>
                  <OPTION VALUE="Wyoming">Wyoming</OPTION>
                </SELECT>
              </td>
            </tr>
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"><b>Country</b> 
                </font></td>
              <td width="150" align=left valign=top> <font size="2" face="Arial, Helvetica, sans-serif"><B>United 
                States</B></font></td>
            </tr>
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"><b>Zip&nbsp;Code</b> 
                </font></td>
              <td width="150" align=left valign=top> 
                <input type=text name=zip size=5>
              </td>
            </tr>
            <tr> 
              <td width="75" align="right"><font size="2" face="Arial, Helvetica, sans-serif"><b>Phone</b> 
                </font></td>
              <td width="150" align=left valign=top> 
                <input type=text name=phone size=15>
              </td>
            </tr>
          </table>
        </td>
        <td width="300" valign="top" align="left"> <font size="4" face="Arial, Helvetica, sans-serif"><b> 
          You could win :</b></font><font size="2" face="Arial, Helvetica, sans-serif"><br>
          <BR>
          <B><B>One Hype - The Time Quest Game<br>
          <br>
          <img src="images/demo_hype.gif" width="100" height="143"> </b></b></font> 
      </tr>
    </table>
    <table width="525" border="0" cellspacing="0" cellpadding="5">
      <tr> 
        <td width="75" align="right">&nbsp;</td>
        <td width="450" align=left valign=top>
          <input type=checkbox name=opt3 checked>
          <font size="2" face="Arial, Helvetica, sans-serif">I wish to receive 
          information about Hype, The Time Quest<br>
          <input type=checkbox name=opt1 checked>
          <font size="2" face="Arial, Helvetica, sans-serif">I wish to receive 
          information about Ubi Soft games<br>
          <input type=checkbox name=opt2 checked>
          I wish to receive information about promos and special offers</font> 
        </td>
      </tr>
      <tr> 
        <td width="75" align="right">&nbsp;</td>
        <td width="450" align=left valign=top><A HREF=javascript:validate()><font size="3" face="Arial, Helvetica, sans-serif"><b>SUBMIT</b></font></A></td>
      </tr>
    </TABLE>
    <br>
  </center>
</form>
<p align="center"><a href="./index.html"><font face="Arial, Helvetica, sans-serif" size="3" style=text-decoration:none target=_top><b>Back 
  to Hype, The Time Quest website</b></font></a></p>
</BODY>
</HTML>
