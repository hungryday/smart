var g_url_data;
var g_url;


function all_check()
{
	return;
	var url = window.location.href;
	var tmp_index = 0;
	tmp_index = url.indexOf('?', 0);
	var url_data = url.substring(tmp_index+1);
	//alert(url);
	var tmp_last_index = url.lastIndexOf("/");
	g_url = url.substr(0, tmp_last_index);
	//alert(g_url);
	g_url_data = url_data;
	var ret = check_user(0, 0, url_data, 1);

	if(2 != ret)
	{
		alert("please login in login page with correct username and password!");
		/*window.opener=null;
		window.open('','_self');
		window.close();*/
		jump_page(0xFF);
	}
	
}
















function jump_page(index)
{
	switch(index)
	{
		case 0:
		{
			window.location.href = "/home.html?"+g_url_data;
		}
		break;
	
		case 1:
		{
			window.location.href = "/index.php?"+g_url_data;
		}
		break;

		case 2:
		{
			window.location.href = "/send_message.html?"+g_url_data;
		}
		break;

		case 3:
		{
			window.location.href = "/home_humiture.html?"+g_url_data;
		}
		break;

		case 4:
		{
			//window.location.href = g_url+":8000?"+g_url_data;
		}
		break;

		case 0xFF:
		{
			window.location.href = g_url;
		}
		break;
		
		default:
		{
			;
		}
		break;
	}

}




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







function check_user(usrname, pwd, url_data, type)
{
	return 2;
	var xmlhttp_object = createXHR();
	if(0 == type)
		var URL = "/cgi-bin/login_check.cgi?"+"usrname="+usrname+"&pwd="+pwd;
	else if(1 == type)
		var URL = "/cgi-bin/login_check.cgi?"+url_data;
	
	var xmlhttp_status;
	
	if(xmlhttp_object)
	{
		xmlhttp_object.open("GET",URL,false);//false:synchronous;true:asynchronous
		xmlhttp_object.setRequestHeader("If-Modified-Since", "0");
		xmlhttp_object.send();
		xmlhttp_status = xmlhttp_object.status;
		if(200 == xmlhttp_status)
		{
			//alert(xmlhttp_object.responseText);
			return xmlhttp_object.responseText;
		}
		xmlhttp_object = null;
	}
	else
	{
		alert('please check the Bowser!');
	}
}

function login()
{
	var usrname = document.getElementById('UserName').value;
	var pwd	= document.getElementById('Password').value;
	
	if(usrname=='')
	{
		alert("no username!please input username.");
		return;
	}
	else
	{
		if(pwd=='')
		{
			alert("no password!please input password.");
			return;
		}
		else
		{
			var ret = check_user(usrname, pwd, 0, 0);
			//alert(ret);
			if(0 == ret)
			{
				alert("username input error, please input username again.");
				document.getElementById('UserName').value='';
				document.getElementById('Password').value='';
				return;
			}
			else if(1 == ret)
			{
				alert("Password input error, please input Password again.");
				document.getElementById('Password').value='';
				return;
			}
			else if(2 == ret)
			{
				alert("Congratulations to you, Welcome to SunPlusApp Smart Home System!");
				var url = "/home.html?"+"usrname="+usrname+"&pwd="+pwd;
				window.location.href = url;
			}
			else
			{	
				;//
				alert("please input valid username and password!");
			}
			
		}
	}
}


function exit()
{
	window.close();
}
