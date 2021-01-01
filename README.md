# Note

java2script/java2script is the overall master of the project. However, all active devlopment should be forked from BobHanson/java2script, as that is the current development fork. That said, pushing to java2script/java2script is done regularly, so BobHanson/java2script should not ever be too far ahead of java2script/java2script.

These notes are for Java developers who want to convert their Java applets or Java applications to 
JavaScript, allowing continued, simultaneous one-source development of both Java and JavaScript. 

Developers of java2script/SwingJS itself should read README-developers.md

Bob Hanson (hansonr@stolaf.edu)


# About java2script/SwingJS

java2script/SwingJS is not a one-time "port" to JavaScript. It is a system that allows real-time Java-to-JavaScript conversion
within Eclipse, with immediate JavaScript testing and debugging in a browser based on code development
in Java. Using the java2script/SwingJS Eclipse plug-in, both Java .class files and their equivalent .js files are created simultaneously. 


java2script/SwingJS includes an Eclipse plug-in (technically a "drop-in"), net.sf.j2s.core.zip
(see https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/swingjs), 
along with a JavaScript version of the Java Virtual Machine (SwingJS, https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.java.core/SwingJS-site.zip) 
to allow the rapid and
automated production of browser-ready JavaScript versions of Java applications and applets. 


# QuickStart

See https://github.com/BobHanson/java2script/tree/master/sources/net.sf.j2s.core/dist and the README file in that directory.

# Relationship to Alternatives

A number of alternative methods of using Java to create JavaScript have been proposed and developed to one extent or another. The following discussion compares java2script/SwingJS to these other methods, based on my own limited understanding of them as of Dec. 2019. 

## Google Web Toolkit ##

http://www.gwtproject.org/  "GWT is a development toolkit for building and optimizing complex browser-based applications. Its goal is to enable productive development of high-performance web applications without the developer having to be an expert in browser quirks, XMLHttpRequest, and JavaScript." 

I know that GWT has been successfully employed for relatively simple application conversions from Java to JavaScript. It implements a reasonably large set of JRE classes [http://www.gwtproject.org/doc/latest/RefJreEmulation.html], but not really a sufficiently large number of classes to support developed Java projects. For example, Class.forName() is missing, so that means no dynamic class loading; File, FileInputStream, and FileOutputStream are missing, meaning no standard file i/o. Most significantly, java.awt and javax.swing are missing. This means that whatever user interface is built must be built from scratch with JavaScript only in mind. 

In contrast, java2script/SwingJS supports an HTML5-based "platform look and feel" (plaf) that leverages all the native features of HTML5 to match the Java AWT and Swing UI. For example, virtually all the Swing and AWT frame, window, panel, dialog, border, and layout classes have been implemented. There are no additional specialized classes that a developer needs to add to his or her project. Rather than using a working Java program as the basis for a JavaScript-specific application, as in GWT, java2script/SwingJS allows for parallel co-production of distributable Java and JavaScript _equivalent_ applications. 

## TeaVM ##

http://teavm.org/ "TeaVM is an ahead-of-time compiler for Java bytecode that emits JavaScript and WebAssembly that runs in a browser. Its close relative is the well-known GWT. The main difference is that TeaVM does not require source code, only compiled class files. Moreover, the source code is not required to be Java, so TeaVM successfully compiles Kotlin and Scala."

I can only find a very few examples of TeaVM use. But from what I can see, TeaVM is still at "concept" stage. It appears that they are hand writing "pseudo" Java as they go. For example, we see at

https://github.com/konsoletyper/teavm/tree/master/classlib/src/main/java/org/teavm/classlib

that "java.awt" contains three classes: TColor, TDimension, and TPoint. TColor has exactly four methods: getRed(), getGreen(), getBlue(), and getAlpha(). It appears to me that the developer has hand-written a decent collection of 800 files as org.teavm.classlib.java. Apparently, the idea is that you would take your Java project and swap in these pseudo-java classes. But this is not scalable. One can't expect a 100,000-line Java program to be retooled or limited to this small hand-crafted set of classes. 

In the author's own words, "There are Java APIs that are impossible to implement without generating inefficient JavaScript. Some of these APIs are: reflection, resources, class loaders, and JNI. TeaVM restricts usage of these APIs. Generally, you’ll have to manually rewrite your code to fit into TeaVM constraints." OK, but java2script/SwingJS implements reflection, does just-in-time class loading, uses property files and resource bundles, loads images, and much more. There are only minimal constraints that require modifying Java code. Yes, modal dialogs and Thread.sleep() do require refactoring a bit, but we have had no problem with this on over 500,000 lines of code in multiple projects. So it doesn't seem to be a major impediment. 

## CheerpJ ##

https://www.leaningtech.com/cheerpj/ "CheerpJ converts Java applications or libraries into JavaScript. Works on bytecode, does not require access to the source code. Compatible with 100% of Java including reflection and dynamic classes. Existing Java archives can be converted to Web applications effortlessly"

This sounds terrific. And truly it is. I am very impressed! Basically run the Java byte code in JavaScript. The Java Reporter demonstration at https://www.leaningtech.com/cheerpj/demos/ crashed both Firefox and Chrome for me, so I cannot really evaluate what I see here. But I have played with the JFiddle at https://javafiddle.leaningtech.com/, and it is pretty amazing. 

The primary differences between java2script/SwingJS and CheerpJ, to the best of my knowledge, include:

- fast start-up time. SwingJS applications generally start within a second or two, sometimes within 100 ms
- small downloads, anywhere from about 800K for a small non-GUI program to 10 MB for a full-blown Swing application (JSmol)
- class-level just-in-time dynamic class loading; no need to retrieve entire JAR files just for a few methods
- leveraging features of HTML5 and modern JavaScript rather than just painting a canvas the way Java does natively
- delivering an easily interpretable and debuggable JavaScript translation of Java classes, with little or no obscurification (unless that is desired)
- well-designed JavaScript-friendly Java core classes that leverage the considerable power of JavaScript
- open source and completely extensible

# History - 2019-

SwingJS is now more than just "Swing"+JavaScript. AWT applets and applications are now supported. A test suite of over 500 AWT applets has been used to refine the AWT runtime classes with great success. Many thanks to Karsten Blankenagel (University of Wuppertal) for access to this source code set.

Examples include:

MathePrisma (http://www.matheprisma.uni-wuppertal.de/) This site is still using the Java applets as of 2019.03.12; JavaScript versions still in development. 

# History - 2017-

https://github.com/BobHanson/java2script/tree/hanson1 (development branch)

https://github.com/BobHanson/java2script (master)

Current development "Version 3 development master" involves a completely rewritten transpiler (2017) “CompilationParticipant” that follows the Eclipse Java compiler. The implementation nearly perfectly emulates the Java Virtual Machine. It includes fully qualified methods, compile-time method binding, generic methods and classes, Java 8 lambda functions and streams, Java reflection and dynamic class loading for efficient modular just-in-time performance, Java Swing components, modal and nonmodel dialogs, audio, jpdf, the AWT event thread, and many other added packages. Java applications and applets can both be run in JavaScript in any browser. 

Version 3 also implements real-time creation of HTML test files for immediate JavaScript testing of any changes made to the Java code. Basically, when the source file is saved in Eclipse (Photon), the JavaScript updates automatically, and a reload of the page in the browser shows the changes immediately. This makes for very easy side-by-side Java and JavaScript debugging. 

Unlike Version 2, Version 3 requires minimal reworking of Java classes - primarily just for performance and threading* reasons, maximizing JavaScript performance without compromising any Java performance and making Java-to-JavaScript conversion almost trivial. (Of course, we are still finding occasional bugs in the transpiler and run-time "JavaScript-JVM.") 

*Note that java2script/SwingJS cannot support Thread.wait(), Thread.notify(), or Thread.sleep(). Nonetheless, in all cases we have found simple state-based alternatives that essentially reproduce this behavior in JavaScript using javax.Swing.Timer. These methods work equally well in Java and JavaScript, requiring just a bit of redesign of Java methods.

Examples include:

Physlets (https://github.com/BobHanson/Physlets-SwingJS) conversion to JavaScript by Wolfgang Christian (wochristian@davidson.edu) and Bob Hanson (in progress). 

Jmol-SwingJS  https://github.com/BobHanson/Jmol-SwingJS (code only)

Varna https://github.com/BobHanson/VARNA and https://chemapps.stolaf.edu/swingjs/varna 

# History - 2010-2016

https://github.com/java2script/java2script (stable master)

Ported from SourceForge by Zhou Renjian, developed further by Zhou Renjian and Udo Borkowski (primarily) as "Version 2.0".
 
Extensively used by Bob Hanson in 2012-2016 for the conversion of Jmol/java to JSmol/javascript (http://jmol.sourceforge.net/), leading to extensive distribution and widespread use on the web. As of 3/2018, still the
only known widely-available java2sript application. 

Developed further in 2016 by zhou Renjian, Udo Borkowski, Bob Hanson, Andrew Raduege, Nadia El Mouldi, and Paul Falstad (http://www.falstad.com) for the first round of post-JSmol application of java2script, adding javax.swing classes and
dubbed "SwingJS". Used by Bob Hanson during 11/2016 for conversion of the PhET gas applications applets.

Version 2 allowed extensive development of JavaScript versions of Java applets, including JSmol, Falstad applets, and PhET applets.
However, this version did not produce "fully qualified" method signatures, resulting in error-prone and performance-reducing run-time binding of methods. Java class loading procedures were not consistent with the sequence of events used by the Java class loader, and parameter and array typing was minimal. Thus, while functional, Version 2 was not fully generalizable and required extensive reworking of Java code to be "java2script compliant." 

Synchronized with https://github.com/BobHanson/java2script as the stable master version in 2018.

Examples include:

PhET, Falstad, and other tests https://chemapps.stolaf.edu/swingjs/phet/site/swingjs/examples  Initial SwingJS tests converting AWT to Swing in Java, then transpiling.

JSmol: https://chemapps.stolaf.edu/jmol/jsmol  Non-AWT, Non-Swing version, our initial application of Java2Script technology.
  
Falstad Math and Physics Applets (https://www.falstad.com/mathphysics.html) Source available.  
  
# History - 2005-2010

https://sourceforge.net/projects/j2s (last updated 6/2010)

Initially developed by Zhou Renjian (aka "Josson Smith", zhourenjian@gmail.com, 2005-2017),
Soheil Hassas Yeganeh (soheil.h.y@gmail.com, 2006), Sal Ferro (svferro@gmail.com, 2006), Sebastian Gurin (sgurin@softpoint.org, 2008), 
and others. The project was a "proof-in-concept" that saw limited actual application.

