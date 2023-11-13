The net.sf.j2s.core Eclipse project creates the Java2Script transpiler for 
SwingJS as well as a "legacy" transpiler for legacy Jmol. 

See the dist/dropins folder for the latest distribution and installation notes. 

The seed Eclipse project site/ directory for all SwingJS projects can be found at 

https://github.com/BobHanson/java2script/blob/master/sources/net.sf.j2s.java.core/SwingJS-site.zip?raw=true

this file is old. See dist/dropins/README.txt

Known issues: 2/2018

Background and drawing using g.fill

Drawing to a canvas and setting background color can be incompatible. It is recommended that
if the canvas is being painted using graphic calls, that the background color also be painted that way
rather than using setBackground



