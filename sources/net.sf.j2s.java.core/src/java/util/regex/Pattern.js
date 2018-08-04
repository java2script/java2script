// BH 9/24/2017 4:21:05 PM new syntax for decorateAsClass
(function() {
Clazz.newPackage("java.util.regex");

var C$=Clazz.newClass(java.util.regex,"Pattern",function(){
  Clazz.newInstance(this,arguments);
});

C$.$clinit$ = function() {delete C$.$clinit$;Clazz.load(C$, 1);}

Clazz.newMeth(C$,"$init$", function(){
  this.$flags=0;
  this.regexp=null;
}, 1);

Clazz.newMeth(C$,"$c", function(){
  C$.$init$.apply(this);
}, 1);

Clazz.newMeth(C$,"matcher$CharSequence", function(cs){
  return Clazz.new_(Clazz.load("java.util.regex.Matcher").c$$java_util_regex_Pattern$CharSequence, [this, cs]);
});

Clazz.newMeth(C$,"split$CharSequence$I", function(input,limit){
  var res=Clazz.array(String);
  var mat=this.matcher$CharSequence(input);
  var index=0;
  var curPos=0;
  if(input.length$()==0){
    return[""];
  }else{
    while(mat.find()&&(index+1<limit||limit<=0)){
      res[res.length]=input.subSequence$I$I(curPos,mat.start()).toString();
      curPos=mat.end();
      index++;
    }
    res[res.length]=input.subSequence$I$I(curPos,input.length$()).toString();
    index++;
    if(limit==0){
      while(--index>=0&&res[index].toString().length==0){
        res.length--;
      }
    }
  }
  return res;
});

Clazz.newMeth(C$,"split$CharSequence", function(input){
  return this.split$CharSequence$I(input,0);
});

Clazz.newMeth(C$,"pattern$", function(){
  return this.regexp.source;
});

Clazz.newMeth(C$,"toString", function(){
  return this.pattern$();
});

Clazz.newMeth(C$,"flags$", function(){
  return this.$flags;
});

Clazz.newMeth(C$,"compile$S",function(pattern){
  return java.util.regex.Pattern.compile$S$I(pattern,0);
}, 1);

Clazz.newMeth(C$,"compile$S$I",function(regex,flags){
  if((flags!=0)&&((flags|239)!=239)){
    throw new IllegalArgumentException("Illegal flags");
  }
  var flagStr="g";
  if((flags&8)!=0){
    flagStr+="m";
  }
  if((flags&2)!=0){
    flagStr+="i";
  }
  var pattern=new java.util.regex.Pattern();
  pattern.regexp=new RegExp(regex,flagStr);
  return pattern;
}, 1);

Clazz.newMeth(C$,"matches$S$CharSequence",function(regex,input){
  return java.util.regex.Pattern.compile(regex).matcher(input).matches();
}, 1);

Clazz.newMeth(C$,"quote$S",function(s){
  var sb=new StringBuffer().append("\\Q");
  var apos=0;
  var k;
  while((k=s.indexOf("\\E",apos))>=0){
    sb.append$S(s.substring(apos,k+2)).append("\\\\E\\Q");
    apos=k+2;
  }
  return sb.append$S(s.substring(apos)).append("\\E").toString();
}, 1);

})();
