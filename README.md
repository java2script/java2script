# Note


These notes are for Java developers who want to convert their Java applets or Java applications to 
JavaScript, allowing continued one-source development of both Java and JavaScript. 

Developers of java2script/SwingJS itself should read README-developers.md

# About java2script/SwingJS

java2script/SwingJS is not a one-time "port" to JavaScript. It is a system that allows real-time Java-to-JavaScript conversion
within Eclipse, with immediate JavaScript testing and debugging in a browser based on code development
in Java. Using the java2script/SwingJS Eclipse plug-in, both Java .class files and their equivalent .js files are created simultaneously. 


java2script/SwingJS includes an Eclipse plug-in (technically a "drop-in"), net.sf.j2s.core.zip, 
along with a JavaScript version of the Java Virtual Machine (SwingJS) to allow the rapid and
automated production of browser-ready JavaScript versions of Java applications and applets. 


# QuickStart

See https://github.com/BobHanson/java2script/tree/master/dist and the README file in that directory.

# History


https://github.com/BobHanson/java2script (development master)

Current development "Version 3.0 development master" involving a completely rewritten transpiler (2017/18) that nearly perfectly emulates the Java Virtual Machine, including Swing, audio, jpdf, and many other added packages.  

https://github.com/java2script/java2script (stable master)

Ported from SourceForge by Zhou Renjian, developed further by Zhou Renjian and Udo Borkowski as "Version 2.0". 
Used by Bob Hanson (hansonr@stolaf.edu) in 2012 for the initial conversion of Jmol/java to JSmol/javascript (http://jmol.sourceforge.net/), Falsad physics applets (http://www.falstad.com), and PhET gas applications applets.


Currently synchronized with https://github.com/BobHanson/java2script as the stable master version.

Examples can be found at https://chemapps.stolaf.edu/swingjs/phet/site/swingjs/examples
  

https://sourceforge.net/projects/j2s (last updated 6/2010)

Initially developed by Zhou Renjian (zhourenjian@gmail.com, 2005-2017),
Soheil Hassas Yeganeh (soheil.h.y@gmail.com, 2006), Sal Ferro (svferro@gmail.com, 2006), Sebastian Gurin (sgurin@softpoint.org, 2008).






