var g_send_message_timer;


function createXHR()//此JS函数即为创建XML对象，并兼容IE，firefox等浏览器
{
	//alert('in createXHR');
	var xmlhttp = null;
	
	if(window.XMLHttpRequest)
		xmlhttp = new XMLHttpRequest();
	else if(window.ActiveXObject)
		xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
	else
		xmlhttp = new ActiveXObject('Msxml2.XMLHTTP');
			
	if(xmlhttp)
	{
		;//alert('create xmlhttp success!');
	}
	else
		alert('create xmlhttp error!');
	return xmlhttp;
}




function Check_Key_Status()
{
	var xmlhttp_object = createXHR();
	var URL = "/cgi-bin/check_key.cgi";
	//alert(URL);
	
	var xmlhttp_status;
	
	if(xmlhttp_object)
	{
		xmlhttp_object.open("GET",URL,true);
		xmlhttp_object.setRequestHeader("Content-Type','application/x-www-form-urlencoded");
		xmlhttp_object.setRequestHeader("If-Modified-Since", "0");

		xmlhttp_object.onreadystatechange=function()
		{
			if (xmlhttp_object.readyState == 4)
			{
				if (xmlhttp_object.status == 200)
				{	
					var returnValue = xmlhttp_object.responseText;
					if(returnValue != null && returnValue.length > 0)
					{
						alert(xmlhttp_object.responseText);
					}
					else
					{
						;
					}
				}
				else
				{
					;
				}
			}
			else
			{
				;
			}
		}
		xmlhttp_object.send();
	}
	else
	{
		alert('please check the Bowser!');
	}


}











function Send_Message_Onload()
{
	all_check();
	g_send_message_timer=setInterval("Check_Key_Status()", 500);
}





function check_tel_number(phone){   
   var flag = false;   
   var reg0 =  /^(([0\+]\d{2,3}-)?(0\d{2,3})-)?(\d{7,8})(-(\d{3,}))?$/;   //判断 固话   
   var reg1 =/^((\(\d{2,3}\))|(\d{3}\-))?(13|15|18)\d{9}$/;               //判断 手机   
   if (reg0.test(phone)) flag=true;    
   if (reg1.test(phone)) flag=true;    
   return flag;
  }

function len(s) { 
var l = 0; 
var a = s.split(""); 
for (var i=0;i<a.length;i++) { 
if (a[i].charCodeAt(0)<299) { 
l++; 
} else { 
l+=2; 
} 
} 
return l; 
} 

  
function send_message()
{
	var tmp_tel_number = document.getElementById('tel_number_text').value;
	var tmp_send_text = document.getElementById('message_text_area').value;
	var xmlhttp_object = createXHR();
	var URL = "/cgi-bin/send_message.cgi";
	var xmlhttp_status;
	var cmd1 = '&';
	
	if('' == tmp_tel_number)
	{
		alert('no telephone number! please input');
		return;
	}
	if(!check_tel_number(tmp_tel_number))
	{
		alert('invalid telephone number! please check and input again');
		document.getElementById('tel_number_text').value = '';
		return;
	}
	if('' == tmp_send_text)
	{
		alert('no messages! please input');
		return;
	}
	else
	{
		//alert(len(tmp_send_text));
		if(len(tmp_send_text) > 70)
		{
			alert('messages is too long! please input less than 70 characters');
			return;
		}
	}
	//alert('6');
	
	document.getElementById('send_bt').disabled = true;
	document.getElementById('gprs_status').innerHTML = 'sending...';
	cmd1 += tmp_tel_number;
	cmd1 += '&';
	cmd1 += tmp_send_text;
	cmd1 += '&';
	//alert(cmd1);
	
	if(xmlhttp_object)
	{
		//cmd1=encodeURI(cmd1);
		//cmd1=encodeURI(cmd1);
		xmlhttp_object.open("POST",URL,false);//false:synchronous;true:asynchronous
		xmlhttp_object.setRequestHeader("If-Modified-Since", "0");
		//xmlhttp_object.setRequestHeader("contentType","text/html;charset=GB2312")//
		xmlhttp_object.send(cmd1);
		if(4 == xmlhttp_object.readyState)
		{
			if(200 == xmlhttp_object.status)
			{
				if(xmlhttp_object.responseText=="error")
				{
					alert('send error! please check the connection and SIM card.');
					document.getElementById('gprs_status').innerHTML = 'try again...';
					document.getElementById('send_bt').disabled = false;
				}
				else if(xmlhttp_object.responseText=="ok")
				{
					alert('send successfully!');
					document.getElementById('gprs_status').innerHTML = 'send success!';
					document.getElementById('send_bt').disabled = false;
				}	
				else
					alert('please check the network connection!');
			}
		}
		xmlhttp_object = null;
	}
	else
	{
		alert('please check the Bowser!');
	}
	
}
