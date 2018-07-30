// BH 9/24/2017 4:21:05 PM new syntax for decorateAsClass
//Udo Borkowski 6/13/2016 12:39:12 AM "matches"
//BH 12/25/2016 7:28:07 AM fix for find() not updating this.leftBound
//BH fix for String not having .length() or .subSequence()
//BH fix for not reinitializing correctly
//BH note that start(groupIndex) is not implemented for groupIndex > 0
(function(){Clazz.newPackage("java.util.regex");

var C$=Clazz.newClass(java.util.regex,"Matcher",function(){
  Clazz.newInstance(this,arguments);
},null,"java.util.regex.MatchResult");


C$.$clinit$ = function() {
delete C$.$clinit$;
Clazz.load(C$, 1);
};

(function(){

  var C$=Clazz.newClass(java.util.regex,"Matcher$1",function(){
    Clazz.newInstance(this, arguments[0], true);
  });
  
  C$.$clinit$ = function() {delete C$.$clinit$;Clazz.load(C$, 1);}

  Clazz.newMeth(C$, "$init$", function() {
      this.grN=0;
  }, 1);
  Clazz.newMeth(C$,"toString", function(){
    return this.b$["java.util.regex.Matcher"].group$I(this.grN);
  });
})();

Clazz.newMeth(C$, 'c$$java_util_regex_Pattern$CharSequence', function(pat,cs){
  this.pat=pat;
  this.charSeq=cs;
  this.leftBound=0;
  this.rightBound=this.charSeq.length$();
}, 1);

Clazz.newMeth(C$,"reset$CharSequence",function(newSequence){
  if(newSequence==null){
    throw new NullPointerException("Empty new sequence!");
  }
  this.charSeq=newSequence;
  this.strString = null;
  return this.reset$();
});

Clazz.newMeth(C$,"reset$",function(){
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

Clazz.newMeth(C$,"find$",function(){
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

Clazz.newMeth(C$,"find$I",function(startIndex){
  var stringLength=this.charSeq.length$();
  if(startIndex<0||startIndex>stringLength)
    throw new IndexOutOfBoundsException$S("Out of bound "+startIndex);
  this.leftBound = startIndex;
  this.rightBound = stringLength;
  return this.find$();
});

Clazz.newMeth(C$,"start$",function(){
  return this.start$I(0);
});

Clazz.newMeth(C$,"start$I",  function(groupIndex){
  return this.startImpl$I(groupIndex);
});

Clazz.newMeth(C$,"startImpl$I",  function(groupIndex){
  // BH SAEM
  // NOTE: TODO groupIndex is not implemented!
  return this.pat.regexp.lastIndex - this.results[0].length;
});

Clazz.newMeth(C$,"end$",function(){
  return this.end$I(0);
});

Clazz.newMeth(C$,"end$I",function(groupIndex){
  return this.pat.regexp.lastIndex;
});


Clazz.newMeth(C$,"appendReplacement$StringBuffer$S",function(sb,replacement){
  this.processedRepl=this.processReplacement$S(replacement);
  sb.append$S(this.charSeq.subSequence$I$I(this.appendPos,this.start$()));
  sb.append$S(this.processedRepl);
  this.appendPos=this.end$();
  return this;
});

Clazz.newMeth(C$,"processReplacement$S",function(replacement){
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
            this.replacementParts=Clazz.array(String, 0);
          }
          try{
            var gr=Integer.parseInt$S(String.instantialize(repl,++index,1));
            if(replacementPos!=res.length$()){
              this.replacementParts[this.replacementParts.length]=res.subSequence$I$I(replacementPos,res.length$());
              replacementPos=res.length$();
            }
            this.replacementParts[this.replacementParts.length]= Clazz.new_(Clazz.load("java.util.regex.Matcher$1").c$,[this]);
            var group=this.group$I(gr);
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
      this.replacementParts[this.replacementParts.length]=res.subSequence$I$I(replacementPos,res.length$());
    }
    return res.toString();
  }
});


Clazz.newMeth(C$,"region$I$I",function(leftBound,rightBound){
  if(leftBound>rightBound||leftBound<0||rightBound<0||leftBound>this.charSeq.length$()||rightBound>this.charSeq.length$()){
    throw Clazz.new_(IndexOutOfBoundsException.c$, [leftBound+" is out of bound of "+rightBound]);
  }
  this.leftBound=leftBound;
  this.rightBound=rightBound;
  this.results=null;
  this.appendPos=0;
  this.replacement=null;
  return this;
});

Clazz.newMeth(C$,"appendTail$StringBuffer",function(sb){
  return sb.append$S(this.charSeq.subSequence$I$I(this.appendPos,this.charSeq.length$()));
},"StringBuffer");

Clazz.newMeth(C$,"replaceFirst$S",function(replacement){
  this.reset$();
  if(this.find$()){
    var sb=new StringBuffer();
    this.appendReplacement$StringBuffer$S(sb,replacement);
    return this.appendTail$StringBuffer(sb).toString();
  }
  return this.charSeq.toString();
});

Clazz.newMeth(C$,"replaceAll$S", function(replacement){
  var sb=new StringBuffer();
  this.reset$();
  while(this.find$()){
    this.appendReplacement$StringBuffer$S(sb,replacement);
  }
  return this.appendTail$StringBuffer(sb).toString();
});

Clazz.newMeth(C$,"pattern$",function(){
  return this.pat;
});

Clazz.newMeth(C$,"group$I",function(groupIndex){
  if(this.results==null||groupIndex<0||groupIndex>this.results.length){
    return null;
  }
  return this.results[groupIndex];
});

Clazz.newMeth(C$,"group$",function(){
  return this.group$I(0);
});

Clazz.newMeth(C$,"matches$",function(){
  // UB: the find must match the complete input and not modify the RE object
  var old_lastIndex = this.pat.regexp.lastIndex;
  try {
    this.find$();
    var r = this.results;
    return r && r.length > 0 && r[0].length === r.input.length;
  } finally {
    // Restore the old state of the RE object
    this.pat.regexp.lastIndex = old_lastIndex;
  }
});

Clazz.newMeth(C$,"quoteReplacement$S",function(string){
  if(string.indexOf('\\') < 0 && string.indexOf ('$')<0) ; // '))
    return string;
  var res= Clazz.new_(StringBuffer, [string.length*2]);
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

Clazz.newMeth(C$,"lookingAt$",function(){
  return false;
});

Clazz.newMeth(C$,"groupCount$",function(){
  return this.results==null?0:this.results.length;
});


Clazz.newMeth(C$,"toMatchResult$",function(){
  return this;
});

Clazz.newMeth(C$,"useAnchoringBounds$Z",function(value){
  return this;
});

Clazz.newMeth(C$,"hasAnchoringBounds$",function(){
  return false;
});

Clazz.newMeth(C$,"useTransparentBounds$Z",function(value){
  return this;
});

Clazz.newMeth(C$,"hasTransparentBounds$",function(){
  return false;
});

Clazz.newMeth(C$,"regionStart$",function(){
  return this.leftBound;
});

Clazz.newMeth(C$,"regionEnd$",function(){
  return this.rightBound;
});

Clazz.newMeth(C$,"requireEnd$",function(){
  return false;
});

Clazz.newMeth(C$,"hitEnd$",function(){
  return false;
});

Clazz.newMeth(C$,"usePattern$java.util_regex_Pattern",function(pat){
  if(pat==null){
    throw new IllegalArgumentException("Empty pattern!");
  }
  this.pat=pat;
  this.results=null;
  return this;
});

})();
