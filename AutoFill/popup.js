﻿var p_0=[];window.onload=function(){var p_3=document.getElementsByClassName("user-name");if(p_3.length>0x0)return;$.ajax({type:"GET",success:function(p_4,p_5,p_6){var p_7=new Date(p_6.getResponseHeader("Date"));p_2(p_7)},error:function(){console.log("\u65e0\u6cd5\u83b7\u53d6\u7f51\u7edc\u65f6\u95f4")}})};function p_2(p_3){if(!p_3){console.log("\u7f51\u7edc\u6545\u969c");return};var p_4=Date.parse(p_3)/0x3e8;chrome.extension.sendRequest({method:"getSucks",fwqtime:p_4},function(p_5){p_0=p_5.info;if(!p_0||p_0==""){console.log("\u6ca1\u6709\u7528\u6237\u540d\u5bc6\u7801");return};var p_6=p_0[0x0];var p_7=p_0[0x1];if(p_6){document.getElementById("username").value=p_6};if(p_7){document.getElementById("password").value=CryptoJS.MD5(p_7)};var p_8=document.getElementsByName("submit")[0x0];var p_9=document.createElement("input");p_9.setAttribute("type","submit");p_9.setAttribute("name","submit");p_9.setAttribute("value","");p_9.setAttribute("class","login-btn login-active");p_9.onclick=p_a;p_8.parentNode.replaceChild(p_9,p_8);function p_a(){var p_i=document.getElementById("password").value;if(p_i.length>=0x20){p_i=p_i.substring(0x20,p_i.length);p_i=p_7+p_i;document.getElementById("password").value=p_i}};var p_b=document.getElementById("zuobiao_1").innerHTML;var p_c=document.getElementById("zuobiao_2").innerHTML;var p_d=document.getElementById("zuobiao_3").innerHTML;var p_e=getVal(p_b.charAt(0x0),p_b.charAt(0x1));var p_f=getVal(p_c.charAt(0x0),p_c.charAt(0x1));var p_g=getVal(p_d.charAt(0x0),p_d.charAt(0x1));var p_h=p_e+p_f+p_g;if(p_h)document.getElementById("zuo_val").value=p_h;else document.getElementById("zuo_val").value=""})};getVal=function(p_3,p_4){var p_5=p_3.charCodeAt()-0x3f;if(p_5){var p_6=p_0[p_5];if(p_6){var p_7=p_6.charAt(0x2*(p_4-0x1));var p_8=p_6.charAt(0x2*(p_4-0x1)+0x1);if(p_7&&p_8)return p_7+p_8;else alert("\u5bc6\u4fdd\u5361\u6570\u636e\u957f\u5ea6\u6709\u8bef")}}}