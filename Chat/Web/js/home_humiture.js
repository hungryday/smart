var g_home_humiture_timer;
var g_temp_max;
var g_temp_min;
var g_hum_max;
var g_hum_min;


function Alarm(times, interval)
{
	var xmlhttp_object = createXHR();
	var URL = "/cgi-bin/alarm.cgi?";
	URL += "T";
	URL += times;
	URL += "I";
	URL += interval;

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


function display_data(data)
{
	var tmp_index1 = data.indexOf('T', 0);
	var tmp_index2 = data.indexOf('H', 0);

	var cur_temp = parseFloat(data.substr(tmp_index1+1, tmp_index2-tmp_index1-1));
	var cur_hum = parseFloat(data.substring(tmp_index2+1));

	document.getElementById("temp_data").innerHTML = cur_temp+".C";
	document.getElementById("hum_data").innerHTML = cur_hum+"%";

	if((cur_temp > g_temp_max) || (cur_temp < g_temp_min) || (cur_hum > g_hum_max) || (cur_hum < g_hum_min))
	{
		Alarm(3, 300);
	}
	
}



function get_current_humiture()
{
	var xmlhttp_object = createXHR();
	var URL = "/cgi-bin/get_humiture.cgi";
	
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
						display_data(xmlhttp_object.responseText);
					}
					else
					{
						;//display_data("TN/AHN/A");
					}
				}
				else
				{
					;//display_data("TN/AHN/A");
				}
			}
			else
			{
				;//display_data("TN/AHN/A");
			}
		}
		xmlhttp_object.send();
	}
	else
	{
		alert('please check the Bowser!');
	}

}


function display_humiture_setting(data)
{
	//alert(data);
	
	var temp_max,temp_min,hum_max, hum_min;
	var index1 = 0;
	var index2 = 0;
	index1 = data.indexOf('T', 0);
	index2 = data.indexOf('t', 0);
	temp_max = data.substr(index1+1,index2-index1-1);
	g_temp_max = parseFloat(temp_max);
	//alert(temp_max);
	document.getElementById("temp_max").value=temp_max;
	index1 = data.indexOf('t', 0);
	index2 = data.indexOf('H', 0);
	temp_min = data.substr(index1+1,index2-index1-1);
	g_temp_min = parseFloat(temp_min);
	//alert(temp_min);
	document.getElementById("temp_min").value=temp_min;
	index1 = data.indexOf('H', 0);
	index2 = data.indexOf('h', 0);
	hum_max = data.substr(index1+1,index2-index1-1);
	g_hum_max = parseFloat(hum_max);
	//alert(hum_max);
	document.getElementById("hum_max").value=hum_max;
	index1 = data.indexOf('h', 0);
	hum_min = data.substring(index1+1);
	g_hum_min = parseFloat(hum_min);
	//alert(hum_min);
	document.getElementById("hum_min").value=hum_min;

	if(data.indexOf('O', 0)==0 && data.indexOf('K', 0)==1)
	{
		alert("Setting Successfully!");
	}

}


function humiture_setting(action, send_data)
{
	var xmlhttp_object = createXHR();
	if(0 == action)
		var URL = "/cgi-bin/humiture_setting.cgi?get";
	else if(1 == action)
		var URL = "/cgi-bin/humiture_setting.cgi?set"+send_data;

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
						display_humiture_setting(xmlhttp_object.responseText);
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




function Home_Humiture_Onload()
{
	all_check();
	humiture_setting(0);
	g_home_humiture_timer=setInterval("get_current_humiture()", 500);

}

/*function submit_temp()
{
	var temp_max = document.getElementById("temp_max").value;
	var temp_min = document.getElementById("temp_min").value;
	var send_data = "T"+temp_max+"t"+temp_min;
	alert(send_data);

	humiture_setting(1, send_data);



}*/

function submit_humiture()
{
	var temp_max = document.getElementById("temp_max").value;
	var temp_min = document.getElementById("temp_min").value;
	var hum_max = document.getElementById("hum_max").value;
	var hum_min = document.getElementById("hum_min").value;
	var send_data = "T"+temp_max+"t"+temp_min+"H"+hum_max+"h"+hum_min;

	humiture_setting(1, send_data);
}

