# Note


These notes are for Java developers who want to convert their Java applets or Java applications to 
JavaScript, allowing continued one-source development of both Java and JavaScript. 

Developers of java2script/SwingJS itself should read README-developers.md

Bob Hanson (hansonr@stolaf.edu)


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

Current development "Version 3.0 development master" involving a completely rewritten transpiler (2017) that nearly perfectly emulates the Java Virtual Machine, including Swing, modal and nonmodel dialogs, audio, jpdf, the AWT event thread, and many other added packages.


Examples include:

Physlets (https://github.com/BobHanson/Physlets-SwingJS) conversion to JavaScript by Wolfgang Christian (wochristian@davidson.edu) and Bob Hanson (in progress). 

Jmol-SwingJS  https://github.com/BobHanson/Jmol-SwingJS (code only)

Varna https://github.com/BobHanson/VARNA and https://chemapps.stolaf.edu/swingjs/varna 



https://github.com/java2script/java2script (stable master)

Ported from SourceForge by Zhou Renjian, developed further by Zhou Renjian and Udo Borkowski as "Version 2.0". 

Extensively used by Bob Hanson in 2012-2017 for the conversion of Jmol/java to JSmol/javascript (http://jmol.sourceforge.net/), leading to extensive distribution and widespread use on the web. As of 3/2018, still the
only known widely-available java2sript application. 

Developed further in 2016 by zhou Renjian, Udo Borkowski, Bob Hanson, Andrew Raduege, Nadia El Mouldi, and Paul Falstad (http://www.falstad.com) for the first round of post-JSmol application of java2script, adding javax.swing classes and
dubbed "SwingJS". Used by Bob Hanson during 11/2016 for conversion of the PhET gas applications applets.

Currently synchronized with https://github.com/BobHanson/java2script as the stable master version.

Examples can be found at https://chemapps.stolaf.edu/swingjs/phet/site/swingjs/examples
and https://chemapps.stolaf.edu/jmol/jsmol
  

https://sourceforge.net/projects/j2s (last updated 6/2010)

Initially developed by Josson Smith (email?) and Zhou Renjian (zhourenjian@gmail.com, 2005-2017),
Soheil Hassas Yeganeh (soheil.h.y@gmail.com, 2006), Sal Ferro (svferro@gmail.com, 2006), Sebastian Gurin (sgurin@softpoint.org, 2008), 
and others. The project was a "proof-in-concept" that saw limited actual application.

