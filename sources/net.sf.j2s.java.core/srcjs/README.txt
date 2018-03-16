This directory:

- preserves files that need to be present in site/ as swingjs2.js
- stores the files that build_core_applet.xml needs to create swingjs/j2s/core/ and swingjs/swingjs2.js files


It contains:


js/*.js  a set of files needed for all SwingJS pages

js/make.bat  a script that concatenates the *.js files in the right order to make swingjs2.js

             It is here as a convenience only; when in site/js, a developer can run this script
             to test changes. It is not used by build_core_applet.xml, which uses ANT concat instead.

js/core/  a folder used by build_core_applet.xml to create Google closure-compiled swingjs/j2s/core files.
  

