/////

// lessons: 
// 0.5,0.5 translation is only ever for ctx.fill()
// simple drawing of lines and boxes using moveTo and lineTo are exactly equivalent to fill. 

// BEST mix of fill and stroke -- same as above -- good

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();


// not necessary
hfline = function(x1,x2,y) {
if (x1 < x2){
 var t = x1;
 x1 = x2;
 x2 = t;
}
ctx.translate(-.5,-.5)
ctx.beginPath();
ctx.moveTo(x1,y);
ctx.lineTo(x1,y+1);
ctx.lineTo(x2,y+1);
ctx.lineTo(x2,y);
ctx.closePath();
ctx.fill();
ctx.translate(.5,.5)
}

// not necessary
vfline = function(x,y1,y2) {
if (y2 < y1){
 var t = y1;
 y1 = y2;
 y2 = t;
}
ctx.translate(-.5,-.5)
ctx.beginPath();
ctx.moveTo(x,y1);
ctx.lineTo(x+1,y1);
ctx.lineTo(x+1,y2);
ctx.lineTo(x,y2);
ctx.closePath();
ctx.fill();
ctx.translate(.5,.5)
}

hsline = function(x1,x2,y) {
ctx.beginPath();
ctx.moveTo(x1,y);
ctx.lineTo(x2,y);
ctx.closePath();
ctx.stroke();
}

vsline = function(x,y1,y2) {
ctx.beginPath();
ctx.moveTo(x,y1);
ctx.lineTo(x,y2);
ctx.closePath();
ctx.stroke();
}

drawbox = function(x1,y1,x2,y2) {
ctx.beginPath();
ctx.rect(x1,y1,x2-x1,y2-y1);
ctx.closePath();
ctx.stroke();
}

// not necessary; doesn't complete
drawfbox = function(x1,y1,x2,y2) {
hfline(x1,x2,y1)
vfline(x2,y1,y2)
hfline(x1,x2,y2)
vfline(x1,y1,y2)
}

drawsbox = function(x1,y1,x2,y2) {
hsline(x1,x2,y1)
vsline(x2,y1,y2)
hsline(x1,x2,y2)
vsline(x1,y1,y2)
}

// either one looks the same

ctx.fillStyle="black";
ctx.strokeStyle="black";
hfline(20,300,300)
hfline(300,20,200)
vsline(20,20,300)
vsline(200,300,20)

// opposites erase perfectly fine

ctx.fillStyle="white";
ctx.strokeStyle="white";
hsline(20,300,300)
hsline(300,20,200)
vfline(20,20,300)
vfline(200,300,20)


ctx.strokeStyle="red";
drawsbox(20,200,200,300)

ctx.strokeStyle="white";
drawsbox(20,200,200,300)

ctx.strokeStyle="red";
drawsbox(30,30,80,80)

ctx.fillStyle="white";
drawfbox(30,30,80,80)

ctx.strokeStyle="red";
drawsbox(30,30,80,80)

ctx.strokeStyle="red";
drawbox(35,35,85,85)

ctx.strokeStyle="white";
drawbox(30,30,80,80)

ctx.strokeStyle="white";
drawsbox(35,35,85,85)

ctx.strokeStyle="white";
drawsbox(20,20,200,300)

ctx.strokeStyle="white";
drawsbox(200,200,300,300)

// screen should be blank



////////////////////
//diagonals
////////////////////

// does not erase

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.translate(0.5,0.5)
ctx.save();
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.strokeStyle="black";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(20,300);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,300);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,30);
ctx.stroke();
ctx.restore();

for(var i = 0; i < 12; i++) {
ctx.strokeStyle="white";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(20,300);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,20);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,300);
ctx.stroke();
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(200,30);
ctx.stroke();
}


//////////////////////////
circles
/////////////////////////


// fill only, with translation -- leaves faint line

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.fillStyle="white";
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 1 * Math.PI);
ctx.fill();



// fill only, with no translation -- leave faint line

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
//ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.fill();

ctx.fillStyle="white";
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 1 * Math.PI);
ctx.fill();



// fill only, with translation leaves curve, but only very faint with 10x cover

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="black";
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 2 * Math.PI);
ctx.fill();

for (var i = 0; i < 10; i++) {
ctx.fillStyle="white";
ctx.beginPath();
ctx.arc(100, 75, 50, 0, 1 * Math.PI);
ctx.fill();
}













----------------------------------------------------
$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();


// good with no translation, white erases

ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="black";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(21,20);
ctx.lineTo(21,300);
ctx.lineTo(20,300);
ctx.closePath();
ctx.fill();

ctx.fillStyle="white";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(21,20);
ctx.lineTo(21,150);
ctx.lineTo(20,150);
ctx.closePath();
ctx.fill();




// no good -- too wide lines with 0.5 0.5; white does not erase

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();


ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="black";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(21,20);
ctx.lineTo(21,300);
ctx.lineTo(20,300);
ctx.closePath();
ctx.fill();

ctx.fillStyle="white";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(21,20);
ctx.lineTo(21,300);
ctx.lineTo(20,300);
ctx.closePath();
ctx.fill();



// untranslating: 

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();


ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.translate(-.5,-0.5)
ctx.fillStyle="black";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(21,20);
ctx.lineTo(21,300);
ctx.lineTo(20,300);
ctx.closePath();
ctx.fill();
ctx.translate(.5,.5)

ctx.translate(-.5,-0.5)
ctx.fillStyle="white";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(21,20);
ctx.lineTo(21,150);
ctx.lineTo(20,150);
ctx.closePath();
ctx.fill();
ctx.translate(.5,.5)









// now with translation and back-translation for boxes - good


$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="black";
ctx.beginPath();
ctx.moveTo(19.5,20);
ctx.lineTo(20.5,20);
ctx.lineTo(20.5,300);
ctx.lineTo(19.5,300);
ctx.closePath();
ctx.fill();

ctx.fillStyle="white";
ctx.beginPath();
ctx.moveTo(19.5,20);
ctx.lineTo(20.5,20);
ctx.lineTo(20.5,150);
ctx.lineTo(19.5,150);
ctx.closePath();
ctx.fill();

////////


// now moveTo/lineTo stroke -- clean erase - identical to the above

$("body").html('<canvas style="width: 100%; height: 100%; z-index: 9002;" width="850" height="550" id="c"></canvas>')
ctx = $("#c")[0].getContext("2d")
ctx.save();
ctx.translate(0.5,0.5)
ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.fillStyle="white";
ctx.rect(10, 10, 350, 300);
ctx.fill();

ctx.strokeStyle="black";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(20,300);
ctx.closePath();
ctx.stroke();

ctx.strokeStyle="white";
ctx.beginPath();
ctx.moveTo(20,20);
ctx.lineTo(20,150);
ctx.closePath();
ctx.stroke();
