This directory:

- preserves files that need to be present in site/ as swingjs2.js
- stores the files that build_core_applet.xml needs to create swingjs/j2s/core/ and swingjs/swingjs2.js files


It contains:

js/*.js  a set of files needed for all SwingJS pages

js/core/  a folder used by build_core_applet.xml to create Google closure-compiled swingjs/j2s/core files.

php/jsmol.php   a serverside PHP script that can be run to load resources that cannot be loaded by AJAX directly

DO NOT CHANGE SWINGJS2.JS -- it is recreated by build-SwingJS-site.xml  

