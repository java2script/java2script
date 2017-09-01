The SwingJS directory is the primary directory for the SwingJS project.
It contains a substantial number of files, most of which were created by
hand and all of which have very specific JavaScript/HTML5-only "native"
code references. They provide all of the interfaces to window.J2S and 
related page JavaScript that creates and manages an embedded JApplet
or a Java application being run from main(). 

These classes should never be referenced by a Java project directly outside of
the jsjava, jsjavax, or jssun packages. They are not intended to ever be
run in Java, only in JavaScript.

Specific packages in swingjs include:

swingjs/api     Interfaces for referring to these classes without referencing them directly.
				Also includes interfaces to all calls from this code
				to actual JavaScript functions. For example, DOMNode is an 
				abstract class that represents an HTML5 element DOM node 
				constructed but not necessarily on the page itself. Similarly,
				HTML5AudioContext and HTML5CanvasContext2D allow calls that look
				like (and most importantly are searchable in Eclipse as) Java calls to
				actually get information directly from a page Audio or Canvas. 

swingjs/jquery  jQuery and jQueryUI files for JMenu and JSlider.

swingjs/jzlib   ZIP-file related classes from org.jcraft.zlib 
                specially adapted for JavaScript handling.
                
swingjs/plaf    The key GUI classes for implementing Swing components in HTML5.
                All the magic happens here.
                
                  