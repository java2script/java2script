The javajs directory contains a variety of Java files that you are 
encouraged to use in your project. It is self-contained, and the 
classes and methods all work in Java as well as JavaScript. 

These classes perform functions not standard in Java or provide
classes that are particularly optimized for JavaScript (fewer overloaded 
methods, especially). 

-- creating (minimal) PDF files
-- decoding and encoding image files
-- working with binary, compound document, JSON, and zip data
-- providing very efficient classes for vectors, matricies, and quaternions
-- providing a java.lang.Thread subclass (JSThread) that can be used
   wherever a thread is necessary; note that JSThread cannot sleep(), but
   it provides a means of managing setTimeout callbacks that is very easy
   to implement.
-- providing two very important annotations:

  @J2SIgnoreImport    Indicates that this class will never be used in JavaScript
                      and thus does not need to be indicated as a dependency. In
                      some cases, this annotation is necessary just to break a 
                      cyclical dependency that Java somehow handles, but J2S does not.   
   
  @J2SRequireImport   Allows a SwingJS developer to work around J2S transpiler 
                      issues that for some reason it is not indicating the need for 
                      a dependent class. Typically this is because a static call
                      to a static method in a class. 
                      
                      In addition, though, @J2SRequireImport can be used to "inject"
                      JavaScript at a specific point in code loading. For example, 
                      swingjs.plaf.JSSlider uses the following annotation to load 
                      jQueryUI, fooling J2S to think that it is a "class" file. 
                      
                      @J2SRequireImport(swingjs.jquery.JQueryUI.class)
                      

All files in the javajs/util directory will be moved to j2s/JU by a build script.

