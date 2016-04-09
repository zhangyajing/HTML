var canvas = document.getElementById("canvas");
var cxt = canvas.getContext('2d');

//获取工具按钮元素
var Brush = document.getElementById("means_brush");
var Eraser = document.getElementById("means_eraser");
var Paint = document.getElementById("means_paint");
var Straw = document.getElementById("means_straw");
var Text = document.getElementById("means_text");
var Magnifier = document.getElementById("means_magnifier");

//获取形状按钮元素
var Line = document.getElementById("shape_line");
var Arc = document.getElementById("shape_arc");
var Rect = document.getElementById("shape_rect");
var Poly = document.getElementById("shape_poly");
var ArcFill = document.getElementById("shape_arcfill");
var RectFill = document.getElementById("shape_rectfill");

//获取线宽按钮元素
var Line_1 = document.getElementById("width_1");
var Line_3 = document.getElementById("width_3");
var Line_5 = document.getElementById("width_5");
var Line_8 = document.getElementById("width_8");

//获取颜色按钮元素
var ColorRed = document.getElementById("red");
var ColorGreen = document.getElementById("green");
var ColorBlue = document.getElementById("blue");
var ColorYellow = document.getElementById("yellow");
var ColorWhite = document.getElementById("white");
var ColorBlack = document.getElementById("black");
var ColorPink = document.getElementById("pink");
var ColorPurple = document.getElementById("purple");
var ColorCyan = document.getElementById("cyan");
var ColorOrange = document.getElementById("orange");

var actions = [Brush,Eraser,Paint,Straw,Text,Magnifier,Line,Arc,Rect,Poly,ArcFill,RectFill];
var widths = [Line_1,Line_3,Line_5,Line_8];
var colors = [ColorRed,ColorGreen,ColorBlue,ColorYellow,ColorWhite,ColorBlack,
              ColorPink,ColorPurple,ColorCyan,ColorOrange];

drawBrush(0);
setColor(ColorRed,0);
setLineWidth(0);

function setStatus(Arr,num,type){
	for(var i=0;i<Arr.length;i++){
		if (i==num) {
			if(type==1){
				Arr[i].style.background="yellow";
			}else{
				Arr[i].style.border="1px solid #fff";
			}
		}else{
			if(type==1){
				Arr[i].style.background="#ccc";
			}else{
				Arr[i].style.border="1px solid #000";
			}
		}
	}
}
function saveimg(){
	var imgdata=canvas.toDataURL();
	var b64=imgdata.substring(22);
	var data=document.getElementById('data');
	data.value=b64;
	var form=document.getElementById('myform');
	myform.submit();
}
function clearimg(){
	cxt.clearRect(0,0,880,400);
}
function drawBrush(num){
	setStatus(actions,num,1);
	var flag = 0;

	canvas.onmousedown = function(evt){
		evt = window.event||evt;
		var startX = evt.pageX - this.offsetLeft;
		var startY = evt.pageY - this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX,startY);
		flag = 1;
	}
	canvas.onmousemove = function(evt){
		evt = window.event||evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		if(flag){
			cxt.lineTo(endX,endY);
			cxt.stroke();
		}
	}
	canvas.onmouseup = function(){
		flag=0;
	}
	canvas.onmouseout = function(){
		flag=0;
	}
}
var eraserFlag = 0;
function drawEraser(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		eraserFlag = 1;
	}
	canvas.onmousemove=function(evt){
		evt=window.event||evt;
		var eraserX=evt.pageX-this.offsetLeft;
		var eraserY=evt.pageY-this.offsetTop;
		if(eraserFlag){
			cxt.clearRect(eraserX-cxt.lineWidth,eraserY-cxt.lineWidth,cxt.lineWidth*2,cxt.lineWidth*2);
		}	
	}
	canvas.onmouseout=function(){
		eraserFlag = 0;
	}
	canvas.onmouseup=function(){
		eraserFlag = 0;
	}
}
function drawPaint(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		cxt.fillRect(0,0,880,400);
	}
	canvas.onmouseup=null;
	canvas.onmousemove=null;
	canvas.onmouseout=null;
}
function drawStraw(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt=window.event||evt;
		var strawX = evt.pageX - this.offsetLeft;
		var strawY = evt.pageY - this.offsetTop;
		var obj=cxt.getImageData(strawX,strawY,1,1);
		var color='rgb('+obj.data[0]+','+obj.data[1]+','+obj.data[2]+')';
		cxt.strokeStyle=color;
		cxt.fillStyle=color;
		drawBrush(0);
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
function drawText(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(){
		evt=window.event||evt;
		var textX = evt.pageX - this.offsetLeft;
		var textY = evt.pageY - this.offsetTop;
		var userVal = window.prompt('请在这里输入文字','');
		if (userVal!=null) {
			cxt.fillText(userVal,textX,textYs);
		};
	}
	canvas.onmousemove=null;
	canvas.onmouseup=null;
	canvas.onmouseout=null;
}
function drawMagnifier(num){
	setStatus(actions,num,1);
	var scale=window.prompt('请输入要放大的百分比','100');
	var scaleW=880*scale/100;
	var scaleH=400*scale/100;
	canvas.style.width=parseInt(scaleW)+'px';
	canvas.style.height=parseInt(scaleH)+'px';
}
function drawLine(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt = window.event||evt;
		var startX = evt.pageX - this.offsetLeft;
		var startY = evt.pageY - this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(startX,startY);
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup=function(evt){
		evt = window.event||evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		cxt.lineTo(endX,endY);
		cxt.closePath();
		cxt.stroke();
	}
}
var arcX=0;
var arcY=0;
function drawArc(num){
	setStatus(actions,num,1); 
	canvas.onmousedown=function(evt){
		evt = window.event||evt;
		arcX = evt.pageX - this.offsetLeft;
		arcY = evt.pageY - this.offsetTop;
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup=function(evt){
		evt = window.event||evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		var a = endX - arcX;
		var b = endY - arcY;
		var radius = Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(arcX,arcY,radius,0,360,false);
		cxt.closePath();
		cxt.stroke();
	}
}
var arcX=0;
var arcY=0;
function drawRect(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt = window.event||evt;
		arcX = evt.pageX - this.offsetLeft;
		arcY = evt.pageY - this.offsetTop;
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup=function(evt){
		evt = window.event||evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		var a = endX - arcX;
		var b = endY - arcY;
		cxt.beginPath();
		cxt.rect(arcX,arcY,a,b);
		cxt.closePath();
		cxt.stroke();
	}
}
var polyX = 0;
var polyY = 0;
function drawPoly(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt = window.event||evt;
		polyX = evt.pageX - this.offsetLeft;
		polyY = evt.pageY - this.offsetTop;
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup=function(evt){
		evt = window.event||evt;
		endX = evt.pageX - this.offsetLeft;
		endY = evt.pageY - this.offsetTop;
		cxt.beginPath();
		cxt.moveTo(endX,endY);
		var lbX = 2*polyX - endX;
		var lbY = endY;
		cxt.lineTo(lbX,lbY);
		var tmpC = 2*(endX-polyX);
		var tmpA = endX - polyX;
		var tmpB = Math.sqrt(tmpC*tmpC-tmpA*tmpA);
		cxt.lineTo(polyX,endY-tmpB);
		cxt.closePath();
		cxt.stroke();
	}
}
var rectX = 0;
var rectY = 0;
function drawArcFill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt = window.event||evt;
		rectX = evt.pageX - this.offsetLeft;
		rectY = evt.pageY - this.offsetTop;
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup=function(evt){
		evt = window.event||evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		var a = endX - rectX;
		var b = endY - rectY;
		var radius = Math.sqrt(a*a+b*b);
		cxt.beginPath();
		cxt.arc(rectX,rectY,radius,0,360,false);
		cxt.closePath();
		cxt.fill();
	}
}
function drawRectFill(num){
	setStatus(actions,num,1);
	canvas.onmousedown=function(evt){
		evt = window.event||evt;
		arcX = evt.pageX - this.offsetLeft;
		arcY = evt.pageY - this.offsetTop;
	}
	canvas.onmousemove = null;
	canvas.onmouseout = null;
	canvas.onmouseup=function(evt){
		evt = window.event||evt;
		var endX = evt.pageX - this.offsetLeft;
		var endY = evt.pageY - this.offsetTop;
		var a = endX - arcX;
		var b = endY - arcY;
		cxt.beginPath();
		cxt.rect(arcX,arcY,a,b);
		cxt.closePath();
		cxt.fill();
	}
}
function setLineWidth(num){
	setStatus(widths,num,1);
	switch(num){
		case 0:
			cxt.lineWidth=1;
			break;
		case 1:
			cxt.lineWidth=3;
			break;
		case 2:
			cxt.lineWidth=5;
			break;
		case 3:
			cxt.lineWidth=8;
			break;
		default:
			cxt.lineWidth=1;
	}
}
function setColor(obj,num){
	setStatus(colors,num,0);
	cxt.strokeStyle = obj.id;
	cxt.fillStyle = obj.id;
}

