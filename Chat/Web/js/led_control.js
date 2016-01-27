var g_led_flag = 0x00;
var g_allled_flag = 0x00;


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

function display_change(tmp)
{
	if(tmp & 0x01)
		document.getElementById('led1').src = './img/led_on.png';
	else
		document.getElementById('led1').src = './img/led_off.png';

	if(tmp & 0x02)
		document.getElementById('led2').src = './img/led_on.png';
	else
		document.getElementById('led2').src = './img/led_off.png';

	if(tmp & 0x04)
		document.getElementById('led3').src = './img/led_on.png';
	else
		document.getElementById('led3').src = './img/led_off.png';

	if(0x07 == tmp)
	{
		document.getElementById('ledall').src = './img/allon.png';
		g_allled_flag = 1;
	}
	else
	{
		document.getElementById('ledall').src = './img/alloff.png';
		g_allled_flag = 0;
	}
}
	


function get_led_status()
{
	all_check();
	var xmlhttp_object = createXHR();
	var URL = "/cgi-bin/get_led_status.cgi";
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
			if(xmlhttp_object.responseText.indexOf('&', 0) == 0)
			{
				g_led_flag = parseInt(xmlhttp_object.responseText.substr(1, 1));
				display_change(g_led_flag);
			}
		}
		xmlhttp_object = null;
	}
	else
	{
		alert('please check the Bowser!');
	}
}




function switch_led(led_number)
{
	var xmlhttp_object = createXHR();
	var URL = "/cgi-bin/switch_led.cgi";
	var xmlhttp_status;
	var cmd1 = '&';

	switch(led_number)
	{
		case 1:
		{
			if(g_led_flag & 0x01)
			{
				g_led_flag &= 0x06;
			}
			else
			{
				g_led_flag |= 0x01;
			}
		}
		break;
		
		case 2:
		{
			if(g_led_flag & 0x02)
			{
				g_led_flag &= 0x05;
			}
			else
			{
				g_led_flag |= 0x02;
			}
		}
		break;
		
		case 3:
		{
			if(g_led_flag & 0x04)
			{
				g_led_flag &= 0x03;
			}
			else
			{
				g_led_flag |= 0x04;
			}
		}
		break;
		
		case 4:
		{
			if(g_allled_flag == 1)
			{
				g_led_flag = 0x00;
				g_allled_flag = 0;
			}
			else
			{
				g_led_flag = 0x07;
				g_allled_flag = 1;
			}			
		}
		break;
		
		default:
		{
			;
		}
		break;
	}

	display_change(g_led_flag);
	
	return 1;
	
	//cmd1 += g_led_flag;
	/*
	if(xmlhttp_object)
	{
		cmd1=encodeURI(cmd1);
		cmd1=encodeURI(cmd1);
		xmlhttp_object.open("POST",URL,false);//false:synchronous;true:asynchronous
		xmlhttp_object.setRequestHeader("If-Modified-Since", "0");
		//alert('cmd1 = ' + cmd1);
		xmlhttp_object.send(cmd1);
		if(4 == xmlhttp_object.readyState)
		{
			if(200 == xmlhttp_object.status)
			{
				//alert(xmlhttp_object.responseText);
				get_led_status();
			}
		}
		xmlhttp_object = null;
	}
	else
	{
		alert('please check the Bowser!');
	}
	*/
}





