The net.sf.j2s.java.core Eclipse j2s project creates the run-time JavaScript "JVM" for SwingJS. 

You should only be working here if you are making new JavaScript files from Java 
or adapting/fixing the runtime JavaScript files.

Do not run any of the Java or compiled JavaScript here. This project just creates the 
files needed by other projects.

The src directory contains all the transpilable Java source for SwingJS.

The site directory contains all the transpiled JavaScript for SwingJS. 

The srcjs directory contains only the initial run-time files needed to get a page started.
These files need to be copied to the site/swingjs directory if they are changed.

The entire site directory is then copied to a j2s project as the starting point. 


See https://github.com/BobHanson/SwingJS-Examples for examples.

hansonr@stolaf.edu
  