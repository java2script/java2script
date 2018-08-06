SwingJS distribution 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/dropins/README.txt

8/6/2018 Bob Hanson hansonr@stolaf.edu

Java2Script 3.2.2.03 introduces and checks more Java 8 capabilities. 
Use

  eclipsec -clean  

to update to new versions of the transpiler. Otherwise although the transpiler is updated, it will
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

All projects compiled under 3.1.1 need to be recompiled using the Java2Script 3.2.1 transpiler, as
described below. Note that if you use /** @j2sNative */ calls to interface methods that are singlets,
you no longer need to add qualifications (such as $O) to them. It should be no problem to leave them
qualified, though, as the transpiler creates qualified and unqualified aliases. 

There are situations where this use of unqualified method names can run into problems. For example, in 
java.util.stream.ReferencePipeline, there are three different declarations of the functional interface
method "accept". They were just for erro reporting and have been removed. 
My guess that this is a rarity, but I am not sure.


SwingJS has been successfully tested in Eclipse version Neon-Photon on Mac and Windows platforms.
(No reason to believe it would not also work for Linux; just haven't tried that recently.)
Java 8 is the target Java version for transpilation. Please report any missing classes or strange
errors.

net.sf.j2s.core_3.2.1.jar replaces net.sf.j2s.core_3.1.1.jar
 
These versions differ only in their internal workings relative to Eclipse. 
Most importantly, the requirement that the .project file be changed to 
indicate a customized Java builder is dropped in version 3.2.1, which just uses
the standard Eclipse java builder, org.eclipse.jdt.core.javabuilder. 

For v. 3.2.1, to get started with SwingJS, all you need are:

1) the latest transpiler from 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/dropins

2) the latest JavaScript-site.zip from 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.java.core/dist

3) an empty .j2s file in your project directory. (The v.3.2.1 transpiler will fill this in with
a default .j2s configuration when it runs the first time.)


NOTE! If you are updating to 3.2.1 from 3.1.1, be sure to open your .project file and change the 
builder name from net.sf.j2s.core.java2scriptbuilder back to org.eclipse.jdt.core.javabuilder
or your project will no longer compile.

Comments below have been adjusted for these differences.

 
INSTALLATION INSTRUCTIONS

Eclipse Neon or higher is necessary.

-----------------------------------------------------------
Installing the Java2Script transpiler as an Eclipse plug-in
-----------------------------------------------------------

The Java2Script transpiler for SwingJS is net.sf.j2s.core.jar. It rides along with the 
Eclipse Java compiler as a "CompilationParticipant" 

https://help.eclipse.org/photon/index.jsp?topic=/org.eclipse.jdt.doc.isv/reference/api/org/eclipse/jdt/core/compiler/CompilationParticipant.html

listening for updates to the source files and converting them on the fly to .js files
that match the standard .class files created by the Eclipse Java compiler itself.

Note that both Java .class files (in bin/) and JavaScript .js files (in site/swingjs/j2s) are
created automatically anytime you do any building of your project. 


1. Copy net.sf.j2s.core.jar from 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/dropins

specifically:

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/dropins/net.sf.j2s.core.jar?raw=true

into your eclipse/dropins directory.

Also provided in that directory is a ver/ directory with previous core files. 
It is recommended that you not use them. If you do, be sure to remove their _x.x.x version
signature from their file name, or some versions of Eclipse will have to be 
entirely reinstalled every time you change versions. We do not know why this is necessary, 
but it appears to be. This is an Eclipse bug. So just always use dist/dropins/net.sf.j2s.core.jar. 

On Mac systems, the Eclipse directory is generally

/Applications/Eclipse.app/Contents/Eclipse/dropins

2. Restart Eclipse and check for the presence of the plug-in at
   help...about Eclipse...installation details...Plug-ins...(wait several seconds for tabulation)

Search for "j2s" to find j2s.sourceforge.net Java2Script Core

If that is not there, you don't have net.sf.j2s.core.jar in the proper directory.

   Note relating to updating to 3.2.1 from 3.1.1 version of Java2Script:

      If the version on this readout does not match the version that is 
      reported at the end of each .js file created:

         //Created 2018-07-15 04:35:10 net.sf.j2s.core.jar v. 3.2.1

      then there is no real problem, but you can correct that by restarting 
      Eclipse once with the -clean flag. 

   

----------------------------------
Creating a new J2S/SwingJS project
----------------------------------

Create an Eclipse Java project for your work, if you have not done so already.
If your source code is not all already in src/, navigate to the project...properties...
Java Build Path...source and add all the source directories you need.

Note that your project must not include any Jar file-based dependencies. 
All source code must be available. (Source code from decompiling .class files will work.)


---------------------------------------------------------------------
Installing the SwingJS JavaScript version of the Java Virtual Machine 
---------------------------------------------------------------------

All of the JavaScript produced will be in the project site/ directory. 
You must prepopulate this site with all the JavaScript required by the 
JavaScript version of the JVM. The most recent version of site/ is at

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.java.core/dist/SwingJS-site.zip?raw=true

Occasional additions to the java.* classes are made to the above-mentioned zip file.

Simply download and unzip that file into your project, creating a top-level site/ directory.


-------------------------------------------
Enabling the Java2Script/SwingJS transpiler
-------------------------------------------

1. Create in your Eclipse project the empty file:

.j2s

The next time you build the project, the transpiler will see that and 
add to it:

j2s.compiler.status=enable
j2s.site.directory=site

along with several other commented-out options. If you want, you can 
add these two yourself before you run the transpiler.

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

The J2S transpiler will automatically set up for you in site/ a sample HTML page for any class 
that subclasses JApplet or contains a public void main(String[] args) method. You will want to 
associate those files with  an external HTML browser. We recommend Firefox. 

Do not change these files, as they will be recreated each time the transpiler runs. If you want 
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

If you find you are missing a Java class, please contact me (Bob Hanson) at hansonr@stolaf.edu.
You can try adding these yourself by **temporarily** adding one or more of the Java classes found 
at http://grepcode.com to the proper package in your project. For example, java/awt. 

If you do that, be sure to use the OpenJDK version. For example:

http://hg.openjdk.java.net/jdk8/jdk8/jdk/file/687fd7c7986d/src/share/classes

Most of the code in the SwingJS project started with 
Java 6-b14 or 6-b27. Build your project, then delete these Java files, because, should this file be added
to an updated verison of SwingJS, you should probably use the one provided, not your own. Your choice.


----------------
Working projects
----------------

A full site with many examples is at https://chemapps.stolaf.edu/swingjs/site

Falstad applets are in https://github.com/BobHanson/SwingJS-Examples
and appear at https://chemapps.stolaf.edu/swingjs/site

VARNA development is at https://github.com/BobHanson/VARNA
working site is https://chemapps.stolaf.edu/swingjs/varna
 
Physlets development is at https://github.com/BobHanson/Physlets-SwingJS
working site is https://chemapps.stolaf.edu/swingjs/physlets

Phet applets have not been put on GitHub yet.

Note that these sites use an older v. 3.1.1 transpiler and runtime.

Feb. 17, 2018

We are actively converting a variety of functioning Java applets. 

The physlets Animator, Doppler, and Optics are working. 

Jan. 2, 2018

Efficient Google Closure Compiler compression is in place. 

Dec. 17, 2017

SwingJS is fully operational in its "version 2" format (still v. 3.1.1),
which includes fully qualified method, array, and number typing. 
 