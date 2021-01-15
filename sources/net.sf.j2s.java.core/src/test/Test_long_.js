self.Long || (Long = {});

// toLong2. Bob Hanson 2020.12.23
//
// A set of functions that allow storage and recall of 64-bit long numbers.

;(function() {
	
var RBITS = 16; 
var SPLIT = 2 << (RBITS - 1);
var RMASK = SPLIT - 1;
var MAXML = 2 << (31 - RBITS / 2); // 0x1000000;
var MAXMH = 2 << (31 - RBITS / 2); // 0x1000000;
var SIGNB = 0x800000;
var SIGNMB = SIGNB*MAXML;
var MAXM = MAXMH*MAXML;
var LMASK = MAXML - 1;
var HMASK = MAXMH - 1;
var TEN8 = 10**8; 
var MMAX_LONG = 140737488355327;
var MMIN_LONG = 140737488355328;
var DEBUGGING = false;

/**
 * A method to convert a Java String Long value to a two-value structure with
 * the low 16 bits (R for "remainder") separated off from the high 48 bits (M
 * for "multiplier"). This format can handle long integers up to
 * 
 * The java2script transpiler will deliver long literal strings like this.
 * 
 * Bob Hanson 2020.12.22
 */
Long.toLong2 = function(s0) {

// if no arguments, use the largest long number.

arguments.length == 0 && (s0 = '9223372036854775807');

var isNeg = (s0.indexOf("-") == 0);
var s = (isNeg ? s0.substring(1) : s0);

// 1) Split the string into two reasonably-sized numbers
// give l (low) the last 8 digits; h (high) can have the first 11.
// max l will be 27 bits; max h will be 37 bits.
// later we will add in up to 11 more bits into h.

var pt = s.length - 8;
var h = Number(pt <= 0 ? 0 : s.substring(0, pt));
var l = Number(pt <= 0 ? s : s.substring(pt));

// The task is to partition the number based on binary digits, not decimal.
// Starting with [l,h] we want [r,m].

// L = h * TEN8 + l == m*SPLIT + r

// 2) Split the low-digit part into an m part and an r part
// using integerrization |0 and modulus %.
// l = lm*SPLIT + lr

var lm = l/SPLIT|0;
var lr = l&RMASK;

// That was the easy part.

// For the high digits, consider that we must satisfy:
// h*TEN8 = hm*SPLIT + hr
// or
// h*(TEN8/SPLIT) = hm + hr/SPLIT
// notice that TEN8/SPLIT is a decimal with an
// integer part (ti) and a fractional part (tf):
// h*(ti + tf)
// so h*ti = hm and h*tf*SPLIT = hr
// except hr will overflow, so we need to add its high part to hm

var t0 = TEN8/SPLIT;
var ti = t0|0;
var tf = t0 - ti;

// to avoid integer overflow, we divide both sides by SPLIT.
// bringing in the fractional part of the high number along
// with the low part of the remainder digits.

var r0 = h * tf + lr/SPLIT;

// This is our remainder, except it has almost certainly overflowed.
// So we need to move its high part from r to m. We cannot
// use |0 here because this one could be over 31 bits now after
// adding in h * tf.

var rh = Math.floor(r0)
var r = (r0 - rh)*SPLIT;

// combining the integer high part h * ti with the overflow of the
// lower numbers (rh and lm):

var m = h * ti + rh + lm;

// That's i;, we have m, r and s.
 
var rms = [r,m, isNeg ? -1 : 1];

if (DEBUGGING) {

console.log("=== " + s0);

console.log(s0 + " = " + Long.toLongS(rms));

// check our answer with the hex value:


var N = Long.toLongHexS(rms)

// and with BigInt if we can:

if (window.BigInt) {
try {
    var B = BigInt("0x"+N);
    console.log("BigInt check: '" + s0 + "'\t" + B + "\t"
+ BigInt.asIntN(64,BigInt(isNeg ? -B : B)) + "\t" + N);
} catch (e) {
    alert(s0 + " " + N + " " + e);
}
}

var a = toLong3(rms);
console.log("toLong3 " + a);
console.log("fromLong3 " + fromLong3(a));
a = toLongMR(rms);
console.log("toLongMR " + a);
console.log("fromLongMR " + fromLongMR(a));

}

return rms;
}

/**
 * [r,m,s] to hex string
 */
Long.toLongHexS = function(rms) {
  checkLong(rms, 0);
  var fR = "0000000000000" + rms[0].toString(16);
  var R = fR.substring(fR.length-(RBITS/4));
  var M = rms[1].toString(16);
  return M + R;
}

/**
 * [r,m,s] to long string
 */
Long.toLongS = function(rms) {
  checkLong(rms, 0);
  var m = rms[1];
  var r = rms[0];
  var isNeg = (rms[2] == -1);
  var ml = m % TEN8;
  var mh = (m - ml)/TEN8;
  var ll = r + ml * SPLIT;
  var l = ll % TEN8;
  var lh = (ll - l)/TEN8;
  var h = mh * SPLIT + lh;
  var fl = (h == 0 ? "" : "00000000") + ll;
  return (isNeg ? "-" : "") + (h != 0 ? h + fl.substring(fl.length - 8) : ll);
}

Long.toBigS = function(rms) {
	// no check here -- for testing
	  var r = rms[0];
	  var m = rms[1];
	  var isNeg = (rms[2] == -1);
	  var ml = m % TEN8;
	  var mh = (m - ml)/TEN8;
	  var ll = r + ml * SPLIT;
	  var l = ll % TEN8;
	  var lh = (ll - l)/TEN8;
	  var h = mh * SPLIT + lh;
	  var fl = (h == 0 ? "" : "00000000") + ll;
	  return (isNeg ? "-" : "") + (h != 0 ? h + fl.substring(fl.length - 8) : ll);
	}

/**
 * [r,m,s] to [r,ml,mh,1] for binary operations - includes sign bit
 */
var toLong3 = function(rms) {
	var r = rms[0];
	var m = rms[1];
	if (m == 0 && r == 0) {
		return [0,0,0,1];
 }
 var isNeg = (rms[2] == -1);
 var rl = r;
 var ml = m&LMASK;
 var mh = (m - ml)/MAXML;
 if (isNeg) {
   r = (~r&RMASK) + 1;
   ml = (~ml&LMASK) + (r == SPLIT ? 1 : 0);   
   mh = (~mh&HMASK) + (ml == MAXML ? 1 : 0); 
   rl = r&RMASK;
   ml = ml&LMASK;
   mh = mh&HMASK;
 }
 return [rl,ml,mh,1];
}


/**
 * [r,ml,mh,1] to [r,m,s] after binary operations
 */
var fromLong3 = function(rlh) {
 m = rlh[2] * MAXML + rlh[1];
 r = rlh[0]; 
 if (m == 0 && r == 0) {
   return [0,0,0];
 }
 isNeg = (rlh[2] >= SIGNB);
 if (isNeg) {   
   r = (~r&RMASK) + 1;
   m = MAXMH * MAXML - m - (r == SPLIT ? 0 : 1);   
   r = r&RMASK;
 }
 return [r,m,isNeg ? -1 : 1];
}

/**
 * [m,r,s] to [m,r] for binary operations - includes sign bit; requires shifing
 * and unshifting
 */

var toLongMR = function(rms) {
 var m = rms[1];
 var r = rms[0];
 if (m == 0 && r == 0) {
   return [0,0,0];
 }
 var isNeg = (rms[2] == -1);
 if (isNeg) {
   r = (~r&RMASK) + 1;
   m = MAXM - m - (r == SPLIT ? 0 : 1);   
   r = r&RMASK;
 }
 return [r,m,-2];
}

/**
 * [m,r] to [m,r,s] after binary operations
 */
var fromLongMR = function(mr) {
 var m = mr[1];
 var r = mr[0]; 
 if (m == 0 && r == 0) {
   return [0,0,0];
 }
 var isNeg = (m >= SIGNMB);
 if (isNeg) {
   r = (~r&RMASK) + 1;
   m = MAXM - m - (r == SPLIT ? 0 : 1);   
   r = r&RMASK;
 }
 return [r,m,isNeg ? -1 : 1];
}

/**
 * Don't let M or R become negative. Intead, change the sign. Also at least
 * before printing, check for limits, including roll-over for Long.MAX_VALUE.
 * 
 */
var checkLong = function(rms, limit) {
 var r = rms[0];
 if (limit > 0 && (r >= -limit && r < limit))
	 return rms;
 var m = rms[1];
 if (r < 0) {
	if (m == 0) {
		rms[0] = -r;
		rms[2] = -rms[2];
	} else {
		var rl = r%SPLIT;
		var rh = (r - rl) / SPLIT;
		var n = m + rh;
		if (n < 1) {
			rms[0] = -rl;
			rms[1] = -n;
			rms[2] = -rms[2];
		} else {
			rms[0] = SPLIT + rl
			rms[1] = n - 1;
		}
	}					
 } else if (r >= SPLIT) {
	var rl = r%SPLIT;
	var rh = (r - rl) / SPLIT;
	rms[0] = rl
	rms[1] += rh;
 }
 if (rms[2] == 1 ? rms[1] > MMAX_LONG : rms[1] >= MMIN_LONG) {
	 rms[0] = SPLIT - rms[0];
	 rms[1]--;
	 rms[2] = -rms[2];
 } 
 return rms;
}
 

Long.$add = function(x,n) {
  (x[2] == -1 ? (x[0]-=n) : (x[0]+=n));
  checkLong(x, TEN8);
  return [x[0],x[1],x[2]];
}

Long.$inc = function(x,n,isPost) {
	  var ret;
	  !isPost && (ret = [x[0],x[1],x[2]]); 
	  (x[2] == -1 ? (x[0]-=n) : (x[0]+=n));
	  checkLong(x, TEN8);
	  return (isPost ? [x[0],x[1],x[2]] : ret);
	}

})();


/*******************************************************************************
 * // run this test 20 times
 * 
 * for (var i = 0; i < 20;i++) { var s0 = ("" + Math.random()).substring(2); (s0 +
 * s0 + s0).substring(0,19); (Math.random()>0.5) && (s0 = "-" + s0); var rms =
 * Long.toLong2(s0); console.log(s0 + "\t" + rms + "\t" + Long.toLongS(rms)); }
 * 
 * 
 * Long.toLong2(); Long.toLong2("1"); Long.toLong2("0");
 * Long.toLong2(""+0xFFFF); Long.toLong2("7578746994539013"); ;
 * Long.toLong2("-1"); Long.toLong2("-2"); Long.toLong2("-7578746994539013");
 * Long.toLong2("-9223372036854775808");
 * 
 * 
 ******************************************************************************/

ret = [];
for (var t = 0; t < 10; t++) {
	var y;
	y = [0,1,2];
	

t0 = +new Date;

for (var i = 0; i < 10000000; i++) {

	var x = y;
}

ret.push((+new Date) - t0);

}
// 200ms/10000000c = 200000000ns/10000000c = 20ns/1c

alert( "createArray  " + ret);


xxxx






x = Long.toLong2(""+0x10000);
ret = [];

for (var t = 0; t < 10; t++) {
	

t0 = +new Date;

for (var i = 0; i < 10000000; i++) {
  x = Long.$add(x, 1);
}

ret.push((+new Date) - t0);

}
// 200ms/10000000c = 200000000ns/10000000c = 20ns/1c

alert(ret);



ret = [];

for (var t = 0; t < 10; t++) {
	

t0 = +new Date;

for (var i = 0; i < 10000000; i++) {
	  Long.$inc(x,1,1);
}

ret.push((+new Date) - t0);

}
// 200ms/10000000c = 200000000ns/10000000c = 20ns/1c

alert(ret);



// 200ms/10000000c = 200000000ns/10000000c = 20ns/1c

// alert((+new Date) - t0 + " ms");

x = Long.toLong2("9223372036854775807");
x = Long.$add(x,5);
console.log(Long.toLongS(x) + " = -9223372036854775804");
x = Long.toLong2("-9223372036854775808");
x = Long.$add(x,-5);
console.log(Long.toLongS(x) + " = 9223372036854775803");


alert("test complete " + " " + x + " " + Long.toLongS(x));

