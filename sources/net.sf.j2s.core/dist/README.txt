SwingJS distribution README.txt  

3/15/2018  Bob Hanson hansonr@stolaf.edu

SwingJS has been successfully tested in Eclipse Neon and Oxygen on Mac and Windows platforms.
(No reason to believe it would not also work for Linux; just haven't tried that recently.)
 
INSTALLATION INSTRUCTIONS

Eclipse Neon or higher is necessary.

-----------------------------------------------------------
Installing the Java2Script transpiler as an Eclipse plug-in
-----------------------------------------------------------

The Java2Script transpiler for SwingJS is in net.sf.j2s.core.jar. It parses the .java code and 
creates .js files that match the standard .class files created by the Eclipse Java compiler.

Note that both Java .class files (in bin/) and JavaScript .js files (in site/swingjs/j2s) are
created automatically anytime you do any building of your project. 


1. Copy net.sf.j2s.core.jar from 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/dropins/net.sf.j2s.core.jar?raw=true

into your eclipse/dropins directory.

Do not use net.sf.j2s.core_x.x.x.jar for this, as, if you do that, some versions of Eclipse will have to be 
entirely reinstalled every time you change versions. We do not know why this is necessary, 
but it appears to be. If you leave the version in the name, Eclipse will not be able to replace it with a 
newer version later. From what we can tell. So just always use dist/dropins/net.sf.j2s.core.jar. 

On Mac systems, the Eclipse directory is

/Applications/Eclipse.app/Contents/Eclipse/dropins

2. Restart Eclipse and check for the presence of the plug-in at
   help...about Eclipse...installation details...Plug-ins...(wait several seconds for tabulation)
   
search for "j2s" to find j2s.sourceforge.net Java2Script Core

If that is not there, you don't have net.sf.j2s.core.jar in the proper directory.


----------------------------------
Creating a new J2S/SwingJS project
----------------------------------

Create an Eclipse Java project for your work, if you have not done so already.
If your source code is not all already in src/, navigate to the project...properties...
Java Build Path...source and add all the source directories you need.

Note that your project must not include any Jar file based dependencies. 
All source code must be available. (Source code from decompiling .class files will work.)


---------------------------------------------------------------------
Installing the SwingJS JavaScript version of the Java Virtual Machine 
---------------------------------------------------------------------

All of the JavaScript produced will be in the project site/ directory. 
You must prepopulate this site with all the JavaScript required by the 
JavaScript version of the JVM. The most recent version of site/ is at

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.java.core/SwingJS-site.zip?raw=true

Occasional additions to the java.* classes are made to the above-mentioned zip file.

Simply download and unzip that file into your project, creating a top-level site/ directory.


-------------------------------------------
Enabling the Java2Script/SwingJS transpiler
-------------------------------------------

1. Create in your Eclipse project the file:

.j2s

containing simply:

j2s.compiler.status=enable

2. Edit the .project file to indicate that the j2s transpiler is to be used 
rather than the standard Java compiler by changing the buildSpec buildCommand from

	org.eclipse.jdt.core.javabuilder

to 

net.sf.j2s.core.java2scriptbuilder


--------------------
Building the project
--------------------

Build your project as you normally would. Java class files will be created as usual in the bin/ directory.
JavaScript equivalents of these files will be created in the site/swingjs/j2s directory. You might have to 
do a project refresh to see these site files. 

Do take a look at the .js files created. You will notice that they are all the methods and fields of your
Java project *except* final static constants. SwingJS does not recreate those by name; it just uses them. 
(The only thing this should affect is that java.lang.reflect.Field does not indicate these names.)


----------------------------------------------
Testing the JavaScript version of your project
----------------------------------------------

The J2S transpiler will automatically set up for you in site/ a sample HTML page for any class 
that subclasses JApplet or contains a public void main(String[] args) method. You will want to 
associate those files with  an external HTML browser. We recommend Firefox. 

Since you will be running AJAX locally within these browsers, you may need to enable local 
file reading in your browser. Instructions for doing that can be found at 
http://wiki.jmol.org/index.php/Troubleshooting/Local_Files 


------------------------
Adding more Java classes
------------------------

If you find you are missing a Java class, please contact me (Bob Hanson) at hansonr@stolaf.edu.
You can try adding these yourself by **temporarily** adding one or more of the 
Java classes found at http://grepcode.com to the proper package in your project. For example, java/awt. 
If you do that, be sure to use the OpenJDK version. Most of the code in the SwingJS project started with 
Java 6-b14 or 6-b27. Build your project, then delete these Java files, because you do not necessarily 
want your Java code using that version, just JavaScript.    

A full site with many examples is at https://chemapps.stolaf.edu/swingjs/site

VARNA development is at https://github.com/BobHanson/VARNA
working site is https://chemapps.stolaf.edu/swingjs/varna
 
Physlets development is at https://github.com/BobHanson/Physlets-SwingJS
working site is https://chemapps.stolaf.edu/swingjs/physlets

As of Feb. 17, 2018, we are actively converting a variety of functioning Java applets. 

The physlets Animator, Doppler, and Optics are working. 

As of Jan. 2, 2018, all known Java-to-JavaScript issues have been dealt with. 
Efficient Google Closure Compiler compression is in place. 

As of Dec. 17, 2017, SwingJS is fully operational in its "version 2" format,
which includes fully qualified method, array, and number typing. 
 