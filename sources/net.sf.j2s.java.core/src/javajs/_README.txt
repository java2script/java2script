The javajs directory contains a variety of Java files that you are 
encouraged to use in your project. It is self-contained, and the 
classes and methods all work in Java as well as JavaScript. 

These classes perform functions not standard in Java or provide
classes that are particularly optimized for JavaScript (fewer overloaded 
methods, especially). 

-- creating (minimal) PDF files
-- decoding and encoding image files
-- working with binary, compound document, JSON, and zip data
-- providing very efficient classes for vectors, matrices, and quaternions
-- providing a java.lang.Thread subclass (JSThread) that can be used
   wherever a thread is necessary; note that JSThread cannot sleep(), but
   it provides a means of managing setTimeout callbacks that is very easy
   to implement.

