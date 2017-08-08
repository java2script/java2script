The java directory contains only .js files that for whatever reason must be
hand-crafted and used directly, not created at build time.

Most of the java files used by SwingJS come from the /j2s/java project directory
and were created by the Java2Script project. Those that are here are replacements
to those files to fix issues of one sort or another. 

Note that all files in the java package will be moved to j2s/java as well, as
the build script will drop the "js" from all references to "java". 

