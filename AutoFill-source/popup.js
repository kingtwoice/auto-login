var res = [];
window.onload = function(){
var userspan = document.getElementsByClassName("user-name");
if(userspan.length>0 )
return;
$.ajax({
      type: "GET",
      success: function(result, status, xhr) {
      var date = new Date( xhr.getResponseHeader("Date"));
	   taskgoon(date);
      },
      error:function(){
       console.log("\u65e0\u6cd5\u83b7\u53d6\u7f51\u7edc\u65f6\u95f4");
      }
});
};

function taskgoon(date){
	if(!date){
		console.log("\u7f51\u7edc\u6545\u969c");
		return;
	}
var ftime = Date.parse(date) / 1000;
chrome.extension.sendRequest({method: "getSucks",fwqtime:ftime}, function(response) {
  res = response.info;
if(!res || res==""){
	console.log("\u6ca1\u6709\u7528\u6237\u540d\u5bc6\u7801");
	return ;
}
var zh = res[0];
var mm = res[1];
if(zh){
//zh = window.atob(zh);
document.getElementById("username").value=zh;
}
if(mm){
//mm = window.atob(mm);
//document.getElementById("password").value=mm;
document.getElementById("password").value=CryptoJS.MD5(mm);
}

var dest = document.getElementsByName("submit")[0];
var rep = document.createElement("input"); 
rep.setAttribute("type","submit");
rep.setAttribute("name","submit");
rep.setAttribute("value","");
rep.setAttribute("class","login-btn login-active");
rep.onclick=flush;
dest.parentNode.replaceChild(rep,dest); 
function flush(){
	var tempval = document.getElementById("password").value;
	if(tempval.length>=32){
		tempval = tempval.substring(32,tempval.length);
		tempval = mm+tempval;
		document.getElementById("password").value = tempval;
	}
	
}
var v1 = document.getElementById("zuobiao_1").innerHTML;
var v2 = document.getElementById("zuobiao_2").innerHTML;
var v3 = document.getElementById("zuobiao_3").innerHTML;
var s1 = getVal(v1.charAt(0),v1.charAt(1));
var s2 = getVal(v2.charAt(0),v2.charAt(1));
var s3 = getVal(v3.charAt(0),v3.charAt(1));
var s4 = s1+s2+s3;
if(s4)
document.getElementById("zuo_val").value = s4;
else
document.getElementById("zuo_val").value = "";
});

}


getVal = function(x,y){
		var num = x.charCodeAt()-63;
	if(num){
	var vv =res[num];
	if(vv){
	//var vv = window.atob(localv);
	var s1 = vv.charAt(2*(y-1));
	var s2 = vv.charAt(2*(y-1)+1);
	if(s1&&s2)
		return s1+s2;
	else
		alert("\u5bc6\u4fdd\u5361\u6570\u636e\u957f\u5ea6\u6709\u8bef");
	}
	}
}




