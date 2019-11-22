https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/README.txt

Last updated 2018.09.13 by Bob Hanson hansonr@stolaf.edu

This is the main README file for the Java2Script/SwingJS distribution.
Everything you need to get started with a SwingJS project or start learning
what Java2Script/SwingJS involves is here.

-----------------------
Java2Script and SwingJS 
-----------------------

Java2Script/SwingJS, as its name suggests, has two components:

--- The Java2Script compiler (sources\net.sf.j2s.core)

The Java2Script compiler is net.sf.j2s.core.jar. It sits in the eclipse/dropins
folder and rides along with the Eclipse Java compiler as a "CompilationParticipant" 

https://help.eclipse.org/photon/index.jsp?topic=/org.eclipse.jdt.doc.isv/reference/api/org/eclipse/jdt/core/compiler/CompilationParticipant.html

listening for updates to the source files and converting them on the fly to .js files
that match the standard .class files created by the Eclipse Java compiler itself.
Note that both Java .class files (in bin/) and JavaScript .js files (in site/swingjs/j2s) are
created automatically any time you do any building of your project. 

--- The SwingJS JavaScript runtime library (sources\net.sf.j2s.java.core) is, effectively, 
the Java Virtual Machine in JavaScript. Its two main JavaScript objects are 

  Clazz (methods that emulate core java.lang methods) and 
  J2S (methods that provide an interface to the HTML5 document model) 

Raw JavaScript files are in site/swingjs/js, These files are concatenated into
site/swingjs/swingjs2.js, which your web page needs to call. For example:

	<!DOCTYPE html>
	<html><title>...</title>
	<head><meta charset="utf-8" />
	<script src="swingjs/swingjs2.js"></script>
	...

Besides that, all the java, javax, swingjs, and various other classes can be found
in the site/swingjs/j2s directory. They are loaded "just-in-time", only on demand.

jQuery is used extensively, and a slightly enhanced version of jQuery (see site/swingjs/js/j2sJQueryExt)
adds synchronous binary file transfer as well as "jQuery outside events".

The SwingJS runtime is distributed as SwingJS-site.zip, which you can unzip yourself into 
your project site/ directory or let build-site.xml do that for you. It contains about 3000 files.

-------------------------
INSTALLATION INSTRUCTIONS
-------------------------

Eclipse Photon or higher is necessary.

	----------------------------------------------------------
	Important note to users using 3.1.1 and upgrading to 3.2.x 
	----------------------------------------------------------
	
	net.sf.j2s.core_3.2.1.jar replaces net.sf.j2s.core_3.1.1.jar
	 
	
	These versions differ only in their internal workings relative to Eclipse (and new bug fixes).
	
	Most importantly, the requirement that the .project file be changed to 
	indicate a customized Java builder is dropped in version 3.2.1, which just uses
	the standard Eclipse java builder, org.eclipse.jdt.core.javabuilder. 
	
	If you are updating to 3.2.x from 3.1.1, be sure to open your .project file and change the 
	builder name from net.sf.j2s.core.java2scriptbuilder back to org.eclipse.jdt.core.javabuilder
	or your project will no longer compile.

---------------------------------------------------------
Installing the Java2Script compiler as an Eclipse plug-in
---------------------------------------------------------

The easiest thing to do is to copy the contents of the dist/ directory 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist

into your project directory. It contains the following directories:

swingjs/
 -- contains the necessary Eclipse drop-in as well as the run-time
 -- ver/ subfolder holds older versions
tools/
 -- contains ant-contrib.jar, used by build-site.xml
libjs/
 -- empty; reserved for foo.zip equivalents of dependency foo.jar files
 -- these will be unzipped into site/ by build-site.xml
resources/
 -- empty; reserved for non-java resources your program might need
 -- these will go into site/swingjs/j2s by build-site.xml

and files:

.j2s           -- a starter j2s configuration file
build-site.xml -- run this to build the site/ directory before or after you 
                  update your Java code. 

The following instructions include instructions for doing some of this manually:

1. Copy net.sf.j2s.core.jar from 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/swingjs

specifically:

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/swingjs/net.sf.j2s.core.jar?raw=true

into your eclipse/dropins directory.

Also provided in that directory is a ver/ directory with previous core files. 
These files have names that are purposely unversioned because some versions of Eclipse 
will have to be entirely reinstalled every time you change versions if the names are different
from version to version. We do not know why this is necessary, but it appears to be. 
This is an Eclipse bug. So just always use dist/swingjs/net.sf.j2s.core.jar. 

On Mac systems, the Eclipse directory is generally

/Applications/Eclipse.app/Contents/Eclipse/dropins

2. Restart Eclipse and check for the presence of the plug-in at
   help...about Eclipse...installation details...Plug-ins...(wait several seconds for tabulation)

Search for "j2s" to find j2s.sourceforge.net Java2Script Core

If that is not there, you don't have net.sf.j2s.core.jar in the proper directory.

   Note relating to updating to 3.2.x from 3.1.1 version of Java2Script:

      If the version on this readout does not match the version that is 
      reported at the end of each .js file created:

         //Created 2018-07-15 04:35:10 net.sf.j2s.core.jar v. 3.2.1

      then there is no real problem, but you can correct that by restarting 
      Eclipse once with the -clean flag. 

-------------------------------------------------------
Updating the Java2Script compiler or SwingJS run-time
-------------------------------------------------------

If the Java2Script compiler is updated on GitHub, just update the swingjs/ directory from
GitHub, replace the eclipse/dropins/net.sf.j2s.core.jar file with the new one, and
restart Eclipse. Note that if you change the filename of that file in dropins, you will
need to restart Eclipse with the -clean option in order for it to recognize the new transpiler.

If the SwingJS runtime is updated on GitHub, update the swingjs/ directory from GitHub
and run build-site.xml.
  
----------------------------------
Creating a new J2S/SwingJS project
----------------------------------

Creating a new J2S/SwingJS project is very simple. 

First create an Eclipse Java project for your work, if you have not done so already.
If your source code is not all already in src/, navigate to the project...properties...
Java Build Path...source and add all the source directories you need.

Note that your project must not include any Jar file-based dependencies. 
All source code must be available. (Source code from decompiling .class files will work,
but it is not automatic, and we have not explored that option yet.)

---------------------------------------------------------------------
Installing the SwingJS JavaScript version of the Java Virtual Machine 
---------------------------------------------------------------------

Chrome users should consider using WebServer for Chrome to serve local files. 

https://chrome.google.com/webstore/detail/web-server-for-chrome/ofhbbkphhbklhfoeikjpcbhemlocgigb?hl=en

It is very simple to set up. 

Firefox users need only set the about:config flag: 

	security.fileuri.strict_origin_policy

to "false".

All of the JavaScript produced will be in the project site/ directory. 
You must prepopulate this site with all the JavaScript required by the 
SwingJS JavaScript version of the JVM. The most recent version of site/ is at

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/swingjs/SwingJS-site.zip?raw=true

Occasional additions to the java.* classes are made to the above-mentioned zip file.

Simply download and unzip that file into your project, creating a top-level site/ directory.
Build-site.xml does this for you as well.

-----------------------------------------
Enabling the Java2Script/SwingJS compiler
-----------------------------------------

1. Create in your Eclipse project the empty file:

.j2s

The next time you build the project, the compiler will see that and 
add to it:

j2s.compiler.status=enable
j2s.site.directory=site

along with several other commented-out options. If you want, you can 
add these two yourself before you run the compiler.

--------------------
Building the project
--------------------

Build your project as you normally would. Java class files will be created as usual in the bin/ directory.
JavaScript equivalents of these files will be created in the site/swingjs/j2s directory. You might have to 
do a project refresh to see these site files. If you open one in Eclipse, notice that each time you build
the project (for example by saving a changed Java file with Project...Save Automatically set), Eclipse
will prompt you to reload this file with changes.

Do take a look at the .js files created. You will notice that they are all the methods and fields of your
Java project *except* final static constants. SwingJS does not recreate final static constants by name;
It just uses them. This means that the java.lang.reflect.Field methods will not indicate these names.

----------------------------------------------
Testing the JavaScript version of your project
----------------------------------------------

The J2S compiler will automatically set up for you in site/ a sample HTML page for any class 
that subclasses JApplet or contains a public void main(String[] args) method. You will want to 
associate those files with an external HTML browser. We recommend Firefox rather than Chrome, 
primarily because Chrome (as of 9/2018) blocks completely on simple alert messages, while Firefox
does not. This can be very annoying.

Do not change these files, as they will be recreated each time the compiler runs. If you want 
a different configuration -- a different width or height, or some additional "applet" parameters,
make a copy of this file and change within it the Info block:

Info = {
    code: _CODE_,
    main: _MAIN_,
	width: 850,
	height: 550,
    readyFunction: null,
	serverURL: 'https://chemapps.stolaf.edu/jmol/jsmol/php/jsmol.php',
	j2sPath: 'swingjs/j2s',
	console:'sysoutdiv',
	allowjavascript: true
}

You can add 

    core: "NONE",

to that to prevent the use of core/coreswingjs.z.js and make life easier for yourself
while debugging.

These Info key/value pairs are equivalent to Java applet parameters. Use Info.args for the main(args[])
parameters. For instance:

    args:["test","true"],
    
The serverURL reference allows for reading files in AJAX from servers that are not configured with

 access-control-origin: *

You can try removing that if you want to.
     
Since you will be running AJAX locally within your browser, you may need to enable local 
file reading in your browser. Instructions for doing that can be found at 
http://wiki.jmol.org/index.php/Troubleshooting/Local_Files 


------------------------
Adding more Java classes
------------------------

You may find that some Java classes you use are not supported yet. 

If you find you are missing a Java class, please contact me (Bob Hanson) at hansonr@stolaf.edu.
You can try adding these yourself by **temporarily** adding one or more of the Java classes
to the proper package in your project. If you do that, be sure to use the OpenJDK version. For example:

http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes

Build your project, then delete these Java files, because, should this file be added
to an updated version of SwingJS, you should probably use the one provided, not your own. Your choice.

Note: The original coding of Java2Script by Zhou Renjian utilized Apache Java code. 
Starting in 2012, we started adding code from OpenJDK Java 6-b14 or 6-b27. 
Starting in 2018, we started introducing Java8 classes. So it is a bit messy.
The goal is to move these all to Java8 OpenJDK versions and at least get rid
of all the Apache code. 

----------------
Working projects
----------------

Note that some of these sites use an older v. 3.1.1 compiler and runtime.

A full site with many examples mostly from 2016 is at https://chemapps.stolaf.edu/swingjs/site

Falstad applets are in https://github.com/BobHanson/SwingJS-Examples
and appear at https://chemapps.stolaf.edu/swingjs/site

VARNA development is at https://github.com/BobHanson/VARNA
working site is https://chemapps.stolaf.edu/swingjs/varna
 
Physlets development is at https://github.com/BobHanson/Physlets-SwingJS
working site is https://chemapps.stolaf.edu/swingjs/physlets

Phet applets have not been put on GitHub yet.


--------------------------------------------------------------------------------------------
Development updates
--------------------------------------------------------------------------------------------

9/23/2018 Bob Hanson hansonr@stolaf.edu

Java2Script 3.2.3.00 adds support for AWT applets and components w/o need for a2s.* class replacement in code

---------------------

9/13/2018 Bob Hanson hansonr@stolaf.edu

JSlider minimum and preferred sizes fixed  swingjs/plaf/JSSliderUI.java
JCheckBox vertical offset of check box fixed  swingjs/plaf/JSRadioButtonUI.java


8/14/2018 Bob Hanson hansonr@stolaf.edu

- allows for no-package applets and applications (which is quite common in the Java applet world).

- totally refactored, streamlined Java-to-JavaScript class name conversion, including the "j2s/_" (single underscore) package, which contains (originally) package-less applets and applications. All Java2ScriptVisitor  "getFinal..." methods return JavaScript-ready names that are intended for immediate appending to the output buffer. Prior to that moment, all class names are maintained as their Java values.

- more efficient anonymous class creation (including lambda methods, constructors, and expressions).

- full support for method-local named classes.

- full, efficient support for default interface methods.

- fully qualified methods [ excluding Math.* and *.toString() ], so no conflict with any standard JavaScript objects.

- bullet-proof "final or effectively final" variables.

- strongly anonymous-function scoped for "private" methods.

- corrects several issues with java.util.function.* and java.util.stream.*.

- adds ?j2sverbose option (former standard logging all class loading), with the default being "quiet" mode, which gives no indication of file loading. (Also settable as J2S._quiet = [true|false]

- adds hooks into Clazz object loading, allowing page intervention just after Clazz itself has been loaded, but the core files have not been loaded, and also just after core files have been loaded. This could be useful for customization of the loading process -- for example, dynamically settable core file configuration.

- adds System.getProperty("user.home"), which defaults to https://./ (which isn't a standard protocol, but is passed through the Java system and interpreted in JavaScript as the document base).

- reorganizes java2script project files for better version control.

- adds {project}/resources/ and {project}/libjs as standard places for non-Java resources and zip-equivalents of JAR files that are automatically copied into the {project}/site directory.


8/12/2018 Bob Hanson hansonr@stolaf.edu

The dist/dropins folder has been renamed dist/swingjs

  https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/swingjs

It holds the key files that are needed for a J2S project (see below).

Java2Script 3.2.2.03 introduces and checks more Java 8 capabilities. Use

  eclipsec -clean  

to update to new versions of the compiler. Otherwise although the compiler is updated, it will
report out an incorrect version number. This can be checked on the last line of every JS file created:

Clazz.setTVer('3.2.2.03');//Created 2018-08-06 17:25:47 Java2ScriptVisitor version 3.2.2.03 net.sf.j2s.core.jar version 3.2.2.03


7/20/2018 Bob Hanson hansonr@stolaf.edu

The base Java version is Java 6. However, many of the functionalities of Java 7 and Java 8 are included. 
This includes 

 the "::" operator
 lambda expressions
 java.util.function.*
 java.util.stream.*
 default methods in interfaces

All projects compiled under 3.1.1 need to be recompiled using the Java2Script 3.2.x compiler, as
described below. Note that if you use /** @j2sNative */ calls to interface methods that are singlets,
those methods all take just $ as a qualifier. It should be no problem to leave them
qualified, though, as the compiler creates qualified and unqualified aliases. 

There are occasional situations where this use of $-unqualified method names can run into problems. 
For example, in java.util.stream.ReferencePipeline, there are three different default declarations 
of the functional interface method "accept". They are just for error reporting and have been removed. 
My guess that this is a rarity, but I am not sure.

SwingJS has been successfully tested in Eclipse version Neon-Photon on Mac and Windows platforms.
(No reason to believe it would not also work for Linux; just haven't tried that recently.)
Java 8 is the target Java version for transpilation. Please report any missing classes or strange
errors.


Feb. 17, 2018

We are actively converting a variety of functioning Java applets. 

The physlets Animator, Doppler, and Optics are working. 

Jan. 2, 2018

Efficient Google Closure Compiler compression is in place. 

Dec. 17, 2017

SwingJS is fully operational in its "version 2" format (still v. 3.1.1),
which includes fully qualified method, array, and number typing. 
 