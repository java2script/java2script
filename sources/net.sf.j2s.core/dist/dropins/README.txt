SwingJS distribution README.txt

As of Jan. 2, 2017, all known Java-to-JavaScript issues have been dealt with. 
Efficient Google Closure Compiler compression is in place. 


As of Dec. 17, 2017, SwingJS is fully operational in its "version 2" format,
which includes fully qualified method, array, and number typing. 

Eclipse Neon or higher is necessary.

net.sf.j2s.core_3.1.1.jar should be copied to the

eclipse/dropins

directory 

**AS**

net.sf.j2s.core.jar

**dropping the version info**

because otherwise Eclipse will not recognize an update. 

We do not know why this is necessary, but it appears to be. If you leave
the version in the name, Eclipse will not be able to replace it with a 
newer version later. From what we can tell.

You also need to install in the Eclipse project the simple file:


.j2s

containing simply:

j2s.compiler.status=enable



A full site with many examples is at https://chemapps.stolaf.edu/swingjs/site

VARNA development is at https://chemapps.stolaf.edu/swingjs/varna
 


 
