aa = new Array("0x58","0x79","0x53","0x6d","0x4d","0x69");
kk = new Array("0x41","0x62","0x43","0x64","0x45","0x66","0x47","0x68");
bb =[];
dd=[];
window.onload=function(){
localStorage.setItem(Base64.encode(aa[aa.length-2]),"UajE2FLaXVybkdO");
localStorage.setItem(Base64.encode(aa[aa.length-1]),"Mx2oTIzNDU2Nzg5OTg3NjU0MzIx");
var drag = document.getElementById('drag');
drag.addEventListener('drop', dropHandler, false);
drag.addEventListener('dragover', dragOverHandler, false);

 if(window.localStorage){
	var onoff = document.getElementById("onoff");
	onoff.addEventListener("click",checkonoff);
	var flag = localStorage.getItem(Base64.encode(aa[2]));
	if(flag){
		flag = getRStr(flag);
		var val =  Base64.decode(flag);
		onoff.innerHTML = val == "\u5f00\u542f" ? "\u5173\u95ed":"\u5f00\u542f";
	}else{
		onoff.innerHTML = "\u5f00\u542f";
	} 
	 
	 
	var btn = document.getElementById("btn");
	for(var i=0;i<2;i++){
	bb[i] = document.getElementById(String.fromCharCode(aa[i]));
	var test = localStorage.getItem(Base64.encode(aa[i]));
	if(test){
	bb[i].value = i>0 ? test : Base64.decode(getRStr(test));
	dd[i] = new String(bb[i].value);
	}
	setReadOnly(bb[i],1);
	}
	
	
	btn.innerHTML = "\u4fee\u6539";
	btn.addEventListener("click",check);
	
	var btn_save = document.getElementById("btn_save");
	var sqm_input = document.getElementById(String.fromCharCode(aa[aa.length-3]));
	btn_save.addEventListener("click",checkSqm);
	var sqm = localStorage.getItem(Base64.encode(aa[aa.length-3]));
	if(sqm){
		sqm = getRStr(sqm);
		sqm_input.value =  Base64.decode(sqm);
		btn_save.innerHTML = "\u4fee\u6539";
		setReadOnly(sqm_input,1);
		validateSqm(sqm_input.value);
	}else{
		setReadOnly(sqm_input,0);
		btn_save.innerHTML = "\u4fdd\u5b58";
	}
	
}else{
 alert("\u6d4f\u89c8\u5668\u4e0d\u652f\u6301\u004c\u006f\u0063\u0061\u006c\u0053\u0074\u006f\u0072\u0061\u0067\u0065\u002c\u8bf7\u5347\u7ea7\u6216\u66f4\u6362\u0063\u0068\u0072\u006f\u006d\u0065\u6d4f\u89c8\u5668");
}
}
function getRStr(str){
	return str.substring(0,1)+str.substring(4,str.length);
}

function setReadOnly(obj,flag){
	obj.readOnly = flag==0?false:true;
}


function saveData(){

for(var x=0;x<bb.length;x++){
	if(bb[x].value==dd[x])
		continue;
	saveDatas(x,bb[x].value,aa);
	dd[x] = bb[x].value;
/* 	var rnd="";
	for(var t=0;t<3;t++)
	rnd += String.fromCharCode(Math.floor(Math.random()*25)+65);
	var bv = bb[x].value;
	if(bv){
	var inf = Base64.encode(bv);
	inf = inf.substring(0,1)+rnd+inf.substring(1,inf.length);
	localStorage.setItem(Base64.encode(aa[x]),inf);
	}
	else
	localStorage.setItem(Base64.encode(aa[x]),Base64.encode("")); */
}
}

function check(){
var a = document.getElementById("btn");
var v = a.innerHTML;
 if(v=="\u4fee\u6539"){
	setReadOnly(bb[0],0);
	setReadOnly(bb[1],0);
	a.innerHTML = "\u4fdd\u5b58";
}else{
	setReadOnly(bb[0],1);
	setReadOnly(bb[1],1);
	saveData();
	a.innerHTML = "\u4fee\u6539";
}
}

function checkonoff(){
var a = document.getElementById("onoff");
var v = a.innerHTML;
 if(v=="\u5f00\u542f"){
	a.innerHTML = "\u5173\u95ed";
}else{
	a.innerHTML = "\u5f00\u542f";
}
	saveDatas(2,v,aa);
}

function checkSqm(){
var a = document.getElementById("btn_save");
var sqm_input = document.getElementById(String.fromCharCode(aa[aa.length-3]));
var v = a.innerHTML;
 if(v=="\u4fee\u6539"){
	setReadOnly(sqm_input,0);
	a.innerHTML = "\u4fdd\u5b58";
}else{
	setReadOnly(sqm_input,1);
	saveDatas(aa.length-3,sqm_input.value,aa);
	a.innerHTML = "\u4fee\u6539";
	validateSqm(sqm_input.value);
}
}

/*
function validateSqm(sqm){
	var time = checkTime(sqm);
	var showtime = document.getElementById(String.fromCharCode("0x54"));
	if(time<=0){
		showtime.innerHTML = time ==0 ? "\u6388\u6743\u7801\u8fc7\u671f":"\u6388\u6743\u7801\u65e0\u6548";
	}else{
		showtime.innerHTML = time+"\u5929";
	}
}
*/

function validateSqm(sqm){
	var showtime = document.getElementById(String.fromCharCode("0x54"));
	$.ajax({
        type          : 'get',
        async         : true,
        url           : 'https://sapi.k780.com/?app=life.time&appkey=28897&sign=a56ba49eb22cffee0f04b04877552420&format=json&jsoncallback=data',
        dataType      : 'jsonp',
        jsonp         : 'callback',
        jsonpCallback : 'data',
        success       : function(data){
            if(data.success!='1'){
                return;
            }
            var timestamp = data.result.timestamp;
			if(!timestamp)
				timestamp = Date.parse(new Date(data.result.datetime_1)) / 1000;
			
			var time = checkTime(sqm,timestamp);
			
			if(time<=0){
				showtime.innerHTML = time ==0 ? "\u6388\u6743\u7801\u8fc7\u671f":"\u6388\u6743\u7801\u65e0\u6548";
			}else{
				showtime.innerHTML = time+"\u5929";
			}
			
        },
        error:function(){
			showtime.innerHTML = "Network Fault";
            console('\u83b7\u53d6\u004e\u004f\u0057\u0041\u0050\u0049\u65f6\u95f4\u5931\u8d25');
        }
    });
}


function saveDatas(flag,data,arr){
if(typeof(data) == "undefined" ){
	localStorage.setItem(Base64.encode(arr[flag]),Base64.encode(""));
}else{
//var rnd="";
//for(var t=0;t<3;t++)
//rnd += String.fromCharCode(Math.floor(Math.random()*25)+65);
var md5=CryptoJS.MD5(data);
var start = data.length > 16 ? 16:data.length;
var rnd = getRnd(md5.toString(),start);

var inf = Base64.encode(data);
inf = inf.substring(0,1)+rnd+inf.substring(1,inf.length);
localStorage.setItem(Base64.encode(arr[flag]),inf);
}
}

function getRnd(str,s){
	return str.substring(s,s+3).toUpperCase();
}

function dropHandler(e) {
    e.stopPropagation();
    e.preventDefault();

    var file = e.dataTransfer.files[0];
    var reader = new FileReader();
        reader.onload = (function(file) {
            return function(e) {
		var strs = this.result.split("\r\n");
		for(var i=0;i<strs.length;i++){
		if(kk[i]){
			saveDatas(i,strs[i],kk);
		/* var rnd="";
		for(var t=0;t<3;t++)
		rnd += String.fromCharCode(Math.floor(Math.random()*25)+65);
		var inf = Base64.encode(strs[i]);
		inf = inf.substring(0,1)+rnd+inf.substring(1,inf.length);
		localStorage.setItem(Base64.encode(kk[i]),inf); */
}
		else
		break;
}
            };
        })();
 
 	reader.readAsText(file);
}
function dragOverHandler(e) {
    e.stopPropagation();
    e.preventDefault();
    e.dataTransfer.dragEffect = 'copy';
}

function checkTime(val,timestamp){
	var my = localStorage.getItem(Base64.encode(aa[aa.length-2]));
	var vi = localStorage.getItem(Base64.encode(aa[aa.length-1]));
	my = Base64.decode(getRStr(my));
	vi = Base64.decode(getRStr(vi)); 

	var res = CryptoJS.AES.decrypt(val.replace(/\s+/g,""),my,{iv: vi,mode:CryptoJS.mode.CBC}).toString(CryptoJS.enc.Utf8);
	if(res.length!=10)
	return -1;
	var test = res.replace(/\d{10}/,"");
	if(test.length>0)
	return -1;
	var len = res - timestamp;
	if(len <=0)
	return 0;
	len =  Math.ceil(len/86400);
	return len;
}



