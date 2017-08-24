// BH 8/24/2017 12:11:13 AM newMethod$
//Udo Borkowski 6/13/2016 12:39:12 AM "matches"
//BH 12/25/2016 7:28:07 AM fix for find() not updating this.leftBound
//BH fix for String not having .length() or .subSequence()
//BH fix for not reinitializing correctly
//BH note that start(groupIndex) is not implemented for groupIndex > 0

Clazz.declarePackage("java.util.regex");
Clazz.load(["java.util.regex.MatchResult"],"java.util.regex.Matcher",["java.lang.IllegalArgumentException","$.IndexOutOfBoundsException","$.NullPointerException","$.StringBuffer"],function(){


var C$=Clazz.decorateAsClass(function(){
  java.util.regex.Matcher$1 || java.util.regex.Matcher.$Matcher$1$();
  
  Clazz.newInstance$(this,arguments);
},java.util.regex,"Matcher",null,java.util.regex.MatchResult);


C$.$Matcher$1$=function(){
  var C$=Clazz.decorateAsClass(function(){
    Clazz.newInstance$ (this, arguments[0], true);
  },java.util.regex,"Matcher$1");
  Clazz.newMethod$(C$, "$init$", function() {
      this.grN=0;
  }, 1);
  Clazz.newMethod$(C$,"toString", function(){
    return this.b$["java.util.regex.Matcher"].group(this.grN);
  });
};

Clazz.newMethod$(C$, 'construct$java_util_regex_Pattern$CharSequence', function(pat,cs){
  this.pat=pat;
  this.charSeq=cs;
  this.leftBound=0;
  this.rightBound=this.charSeq.length$();
}, 1);

Clazz.newMethod$(C$,"reset$CharSequence",function(newSequence){
  if(newSequence==null){
    throw new NullPointerException("Empty new sequence!");
  }
  this.charSeq=newSequence;
  this.strString = null;
  return this.reset();
});

Clazz.newMethod$(C$,"reset",function(){
  this.leftBound=0;
  this.rightBound=this.charSeq.length$();
  this.appendPos=0;
  this.replacement=null;
  {
    var flags=""+(this.pat.regexp.ignoreCase?"i":"")
    +(this.pat.regexp.global?"g":"")
    +(this.pat.regexp.multiline?"m":"");
    this.pat.regexp=new RegExp(this.pat.regexp.source,flags);
  }
  return this;
});

Clazz.newMethod$(C$,"find",function(){
  // 'find next'
  if (this.strString == null)
    this.strString = this.charSeq.toString();
  var s = (this.rightBound == this.strString.length ? this.strString : this.charSeq.subSequence$I$I(0,this.rightBound));
  this.pat.regexp.lastIndex = this.leftBound;
  {
  this.results=this.pat.regexp.exec(s);
  this.leftBound = this.pat.regexp.lastIndex;
  }
  return (this.results != null);
});

Clazz.newMethod$(C$,"find$I",function(startIndex){
  var stringLength=this.charSeq.length$();
  if(startIndex<0||startIndex>stringLength)
    throw new IndexOutOfBoundsException$S("Out of bound "+startIndex);
  this.leftBound = startIndex;
  this.rightBound = stringLength;
  return this.find();
});

Clazz.newMethod$(C$,"start",function(){
  return this.start$I(0);
});

Clazz.newMethod$(C$,"start$I",  function(groupIndex){
  return this.startImpl$I(groupIndex);
});

Clazz.newMethod$(C$,"startImpl$I",  function(groupIndex){
  // BH SAEM
  // NOTE: TODO groupIndex is not implemented!
  return this.pat.regexp.lastIndex - this.results[0].length;
});

Clazz.newMethod$(C$,"end",function(){
  return this.end$I(0);
});

Clazz.newMethod$(C$,"end$I",function(groupIndex){
  return this.pat.regexp.lastIndex;
});


Clazz.newMethod$(C$,"appendReplacement$StringBuffer$S",function(sb,replacement){
  this.processedRepl=this.processReplacement$S(replacement);
  sb.append$S(this.charSeq.subSequence$I$I(this.appendPos,this.start()));
  sb.append$S(this.processedRepl);
  this.appendPos=this.end();
  return this;
});

Clazz.newMethod$(C$,"processReplacement$S",function(replacement){
  if(this.replacement!=null&&this.replacement.equals$O(replacement)){
    if(this.replacementParts==null){
      return this.processedRepl;
    }else{
      var sb=new StringBuffer();
      for(var i=0;i<this.replacementParts.length;i++){
        sb.append$S(this.replacementParts[i]);
      }
      return sb.toString();
    }
  }else{
    this.replacement=replacement;
    var repl=replacement.toCharArray();
    var res=new StringBuffer();
    this.replacementParts=null;
    var index=0;
    var replacementPos=0;
    var nextBackSlashed=false;
    while(index<repl.length){
      if((repl[index]).charCodeAt(0)==('\\').charCodeAt(0)&&!nextBackSlashed){ //' )){ 
        nextBackSlashed=true;
        index++;
      }
      if(nextBackSlashed){
        res.append$(repl[index]);
        nextBackSlashed=false;
      }else{
        if((repl[index]).charCodeAt(0)==('$').charCodeAt(0)){
          if(this.replacementParts==null){
            this.replacementParts=Clazz.newArray$(String, 0);
          }
          try{
            var gr=Integer.parseInt$S(String.instantialize(repl,++index,1));
            if(replacementPos!=res.length$()){
              this.replacementParts[this.replacementParts.length]=res.subSequence$I$I(replacementPos,res.length$());
              replacementPos=res.length$();
            }
            this.replacementParts[this.replacementParts.length]= Clazz.$new(java.util.regex.Matcher$1.construct,[this]);
            var group=this.group(gr);
            replacementPos+=group.length;
            res.append$S(group);
          }catch(e$$){
            if(Clazz.instanceOf(e$$,IndexOutOfBoundsException)){
              var iob=e$$;
              {
              throw iob;
              }
            }else if(Clazz.instanceOf(e$$,Exception)){
              var e=e$$;
              {
              throw new IllegalArgumentException("Illegal regular expression format");
              }
            }else{
              throw e$$;
            }
          }
        }else{
          res.append$S(repl[index]);
        }
      }
      index++;
    }
    if(this.replacementParts!=null&&replacementPos!=res.length$()){
      this.replacementParts[this.replacementParts.length]=res.subSequence(replacementPos,res.length$());
    }
    return res.toString();
  }
});


Clazz.newMethod$(C$,"region$I$I",function(leftBound,rightBound){
  if(leftBound>rightBound||leftBound<0||rightBound<0||leftBound>this.charSeq.length$()||rightBound>this.charSeq.length$()){
    throw Clazz.$new(IndexOutOfBoundsException.construct$, [leftBound+" is out of bound of "+rightBound]);
  }
  this.leftBound=leftBound;
  this.rightBound=rightBound;
  this.results=null;
  this.appendPos=0;
  this.replacement=null;
  return this;
});

Clazz.newMethod$(C$,"appendTail$StringBuffer",function(sb){
  return sb.append$S(this.charSeq.subSequence(this.appendPos,this.charSeq.length$()));
},"StringBuffer");

Clazz.newMethod$(C$,"replaceFirst$S",function(replacement){
  this.reset();
  if(this.find()){
    var sb=new StringBuffer();
    this.appendReplacement$StringBuffer$S(sb,replacement);
    return this.appendTail$StringBuffer(sb).toString();
  }
  return this.charSeq.toString();
});

Clazz.newMethod$(C$,"replaceAll$S", function(replacement){
  var sb=new StringBuffer();
  this.reset();
  while(this.find()){
    this.appendReplacement(sb,replacement);
  }
  return this.appendTail$StringBuffer(sb).toString();
});

Clazz.newMethod$(C$,"pattern",function(){
  return this.pat;
});

Clazz.newMethod$(C$,"group$I",function(groupIndex){
  if(this.results==null||groupIndex<0||groupIndex>this.results.length){
    return null;
  }
  return this.results[groupIndex];
});

Clazz.newMethod$(C$,"group",function(){
  return this.group(0);
});

Clazz.newMethod$(C$,"matches",function(){
  // UB: the find must match the complete input and not modify the RE object
  var old_lastIndex = this.pat.regexp.lastIndex;
  try {
    this.find();
    var r = this.results;
    return r && r.length > 0 && r[0].length === r.input.length;
  } finally {
    // Restore the old state of the RE object
    this.pat.regexp.lastIndex = old_lastIndex;
  }
});

Clazz.newMethod$(C$,"quoteReplacement$S",function(string){
  if(string.indexOf('\\') < 0 && string.indexOf ('$')<0) ; // '))
    return string;
  var res= Clazz.$new(StringBuffer, [string.length*2]);
  var ch;
  var len=string.length;
  for(var i=0;i<len;i++){
    switch(ch=string.charAt(i)){
    case'$':
      res.append$S('\\'); // ');
      res.append$S('$');
      break;
    case'\\': // '
      res.append$S('\\'); // ')
      res.append$S('\\'); // ')
      break;
    default:
      res.append$S(ch);
    }
  }
  return res.toString();
}, 1);

Clazz.newMethod$(C$,"lookingAt",function(){
  return false;
});

Clazz.newMethod$(C$,"groupCount",function(){
  return this.results==null?0:this.results.length;
});


Clazz.newMethod$(C$,"toMatchResult",function(){
  return this;
});

Clazz.newMethod$(C$,"useAnchoringBounds$Z",function(value){
  return this;
});

Clazz.newMethod$(C$,"hasAnchoringBounds",function(){
  return false;
});

Clazz.newMethod$(C$,"useTransparentBounds$Z",function(value){
  return this;
});

Clazz.newMethod$(C$,"hasTransparentBounds",function(){
  return false;
});

Clazz.newMethod$(C$,"regionStart",function(){
  return this.leftBound;
});

Clazz.newMethod$(C$,"regionEnd",function(){
  return this.rightBound;
});

Clazz.newMethod$(C$,"requireEnd",function(){
  return false;
});

Clazz.newMethod$(C$,"hitEnd",function(){
  return false;
});

Clazz.newMethod$(C$,"usePattern$java.util_regex_Pattern",function(pat){
  if(pat==null){
    throw new IllegalArgumentException("Empty pattern!");
  }
  this.pat=pat;
  this.results=null;
  return this;
});

Clazz.defineStatics$(C$,["MODE_FIND",1,"MODE_MATCH",2]);

}); 
