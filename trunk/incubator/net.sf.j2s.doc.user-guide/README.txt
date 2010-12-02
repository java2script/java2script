Java2Script user guide

This project is an eclipse plugin that contains the sources of the guide, and 
also the eclipse help extension that "publish" the guide in eclipse help system.

The guide is written in Docbook. With support for eclipse help format, 
toc.xml automatic generation from docbook. See j2s-user-guide/build.xml

= Render the document in html or pdf =
execute j2s-user-guide/make-all.sh

= Creating htmls, toc.xml and plugin.xml for eclipse help plugin ==
For this plugin to work you will have to generate eclipse html help. Html files nd toc.xml
are automatically generated from docbook sources and so are not included in this plugin sources.
For generating eclipse files :

1) unzip docbook-xml-4.5.zip and docbook-xsl.zip. (these are common docbook dtd and 
stylesheets for eclipse, and are not part of this plugin sources. Because of this we distribute only the zips. )
2) execute ant create-eclipse-help ant task of j2s-user-guide/build.xml ***using the same JRE as the workspace***. 

That should generate html/ directory with lots of html documets and images, and the file toc.xml.


@author: Sebastián Gurin.