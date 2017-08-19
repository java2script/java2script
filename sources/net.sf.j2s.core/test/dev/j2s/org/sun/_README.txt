The jssun directory contains SwingJS versions of required java files.
As SwingJS is developed, more classes can be added here. The general 
procedure is:

1) Find the desired class and all dependencies at http://grepcode.com/
   being sure to use only Java 1.6 files (6-b27 or 6-b14), which are
   licensed under GPL with the classpath exception.
   
2) Copy those files to the appropriate jssun package.

3) Modify the files by adding a comment in the copyright comment indicating
   their source, who has done the modification, and when that was done.
   
4) Change their package root jssun. Imports generally do not have to be
   changed; that is optional.
      
You should never reference these files directly in your Java project -- just
use the standard Java library for that -- as these classes will never be 
used in Java, only in JavaScript. Note that this means they can only be
tested in JavaScript, as well.

Note that all files in the jssun package will be moved to j2s/sun, as
the build script will drop the "js" from all references to "jssun" anywhere
in the project.




