---
---
# History - 2017-today

[https://github.com/java2script/java2script](https://github.com/java2script/java2script)

Current development "Version 3" involving a completely rewritten transpiler (2017) that nearly perfectly emulates the Java Virtual Machine, including fully qualified methods, compile-time method binding, generic methods and classes, Java reflection for efficient modular just-in-time class loading, Java Swing components, modal and nonmodel dialogs, audio, jpdf, the AWT event thread, and many other added packages. Java applications and applets can both be run in JavaScript in a browser. 

Version 3 also implements real-time creation of HTML test files for immediate JavaScript testing of any changes made to the Java code. Basically, when the source file is saveed in Eclipse, the JavaScript updates automatically, and a reload of the page in the browser shows the changes directly. This makes for very easy side-by-side Java and JavaScript debugging. 

Unlike Version 2, Version 3 requires minimal reworking of Java classes - primarily just for performance and threading[1] reasons, maximizing JavaScript performance without compromising any Java performance and making Java-to-JavaScript conversion almost trivial. (Of course, we are still finding occasional bugs in the transpiler and run-time "JavaScript-JVM.") 

Examples include:

- [Physlets](https://github.com/BobHanson/Physlets-SwingJS) conversion to JavaScript by Wolfgang Christian (wochristian@davidson.edu) and Bob Hanson [https://github.com/BobHanson/Physlets-SwingJS](https://github.com/BobHanson/Physlets-SwingJS)) (in progress). 
- [Jmol-SwingJS](https://github.com/BobHanson/Jmol-SwingJS) - JavaScript-Based Molecular Viewer From Jmol ([https://github.com/BobHanson/Jmol-SwingJS](https://github.com/BobHanson/Jmol-SwingJS))  (code only) 
- [Varna](https://github.com/BobHanson/VARNA) - Visualization Application for RNA, JavaScript version ([https://github.com/BobHanson/VARNA](https://github.com/BobHanson/VARNA) and [https://chemapps.stolaf.edu/swingjs/varna](https://chemapps.stolaf.edu/swingjs/varna))

[1]: Note that java2script/java2script cannot not support Thread.wait(), Thread.notify(), or Thread.sleep(). Nonetheless, in all cases we have found simple state-based alternatives that essentially reproduce this behavior in JavaScript using javax.Swing.Timer. These methods work equally well in Java and JavaScript, requiring just a bit of redesign of Java methods.

# History - 2010-2016

[https://github.com/java2script/java2script](https://github.com/java2script/java2script)

Ported from SourceForge by Zhou Renjian, developed further by Zhou Renjian and Udo Borkowski (primariy) as "Version 2.0".
 
Extensively used by Bob Hanson in 2012-2016 for the conversion of Jmol/java to JSmol/javascript [http://jmol.sourceforge.net/](http://jmol.sourceforge.net/), leading to extensive distribution and widespread use on the web. As of 3/2018, still the
only known publicly widely-available java2script application. 

Developed further in 2016 by Zhou Renjian, Udo Borkowski, Bob Hanson, Andrew Raduege, Nadia El Mouldi, and Paul Falstad [http://www.falstad.com](http://www.falstad.com) for the first round of post-JSmol application of java2script, adding javax.swing classes and
dubbed "SwingJS". Used by Bob Hanson during 11/2016 for conversion of the PhET gas applications applets.

Version 2 allowed extensive development of JavaScript versions of Java applets, including JSmol, Falstad applets, and PhET applets.

However, this version did not produce "fully qualified" method signatures, resulting in error-prone and performance-reducing run-time binding of methods. Java class loading procedures were not consistent with the sequence of events used by the Java class loader, and parameter and array typing was minimal. Thus, while functional, Version 2 was not fully generalizable and required extensive reworking of Java code to be "java2script compliant." 

Synchronized with [https://github.com/BobHanson/java2script](https://github.com/BobHanson/java2script) as the stable master version in 2018.

Examples can be found at [https://chemapps.stolaf.edu/swingjs/phet/site/swingjs/examples](https://chemapps.stolaf.edu/swingjs/phet/site/swingjs/examples)
and [https://chemapps.stolaf.edu/jmol/jsmol](https://chemapps.stolaf.edu/jmol/jsmol).
  
# History - 2005-2010

[https://sourceforge.net/projects/j2s](https://sourceforge.net/projects/j2s) (last updated 6/2010)

Initially developed by Zhou Renjian (aka "Josson Smith", zhourenjian@gmail.com, 2005-2017), Soheil Hassas Yeganeh (soheil.h.y@gmail.com, 2006), Sal Ferro (svferro@gmail.com, 2006), Sebastian Gurin (sgurin@softpoint.org, 2008), 
and others. The project was a "proof-in-concept" that saw limited actual application.
