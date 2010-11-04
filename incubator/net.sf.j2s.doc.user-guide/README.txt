Java2Script user guide

This project is an eclipse plugin that contains the sources of the guide, and 
also the eclipse help extension that "publish" the guide in eclipse help system.

Written in Docbook. With support for eclipse help format, 
toc.xml automatic generation from docbook. See j2s-user-guide/build.xml

= Render the document in html or pdf =
execute j2s-user-guide/make-all.sh

= Creating htmls and toc.xml for eclipse help format ==
1) unzip docbook-xml-4.5.zip and docbook-xsl.zip. (these are common docbook dtd and 
stylesheets for eclipse, and are not part of this plugin sources. Because of this we distribute only the zips. )
2) execute ant create-eclipse-help ant task of j2s-user-guide/build.xml using the same JRE as the workspace. 

@author: Sebastián Gurin.