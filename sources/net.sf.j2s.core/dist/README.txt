SwingJS distribution README.txt  

3/15/2018  Bob Hanson hansonr@stolaf.edu

SwingJS has been successfully tested in Eclipse Neon and Oxygen on Mac and Windows platforms.
(No reason to believe it would not also work for Linux; just haven't tried that recently.)
 
INSTALLATION INSTRUCTIONS

Eclipse Neon or higher is necessary.

1. net.sf.j2s.core.jar should be copied from 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.core/dist/dropins/net.sf.j2s.core.jar?raw=true

to your eclipse/dropins directory.

Do not use net.sf.j2s.core_x.x.x.jar for this, as, if you do that, some versions of Eclipse will have to be 
entirely reinstalled every time you change versions. We do not know why this is necessary, 
but it appears to be. If you leave the version in the name, Eclipse will not be able to replace it with a 
newer version later. From what we can tell. So just always use dist/dropins/net.sf.j2s.core.jar. 

On Mac systems, the Eclipse directory is

/Applications/Eclipse.app/Contents/Eclipse/dropins

2. restart Eclipse and check for the presence of the plug-in at
   help...about Eclipse...installation details...Plug-ins...(wait several seconds for tabulation)
   
search for "j2s" to find j2s.sourceforge.net Java2Script Core

If that is not there, you don't have net.sf.j2s.core.jar in the proper directory.

3. Create an Eclipse Java project for your work, if you have not done so already.
If your source code is not all already in src/, navigate to the project...properties...Java Build Path...source
and add all the source directories you need.

4. Create in the Eclipse project the file:

.j2s

containing simply:

j2s.compiler.status=enable

5. Modify the .project file to indicate the j2s transpiler is to be used, 
changing the buildSpec buildCommand from

org.eclipse.jdt.core.javabuilder

to 

net.sf.j2s.core.java2scriptbuilder

6. All of the JavaScript produced will be in the project site/ directory. 
You must prepopulate this site with all the JavaScript required by the 
JavaScript version of the JVM. The most recent version of site/ is at

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.java.core/SwingJS-site.zip?raw=true

Occasional additions to the java.* classes are made to the above-mentioned zip file.

If you find you are missing a class, please contact me (Bob Hanson) at hansonr@stolaf.edu.
You can try adding these yourself by **temporarily** adding one or more of the 
Java classes found at http://grepcode.com to the proper package. If you do that, be sure
to use the OpenJDK version. Most of the code in the SwingJS project started with Java 6-b14 or 6-b27.
Build your project, then delete these Java files, because you do not necessarily want your Java
code using that version, just JavaScript.    

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
 