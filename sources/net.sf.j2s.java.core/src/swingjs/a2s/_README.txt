The swingjs/a2s/* AWT/Swingjs adapter classes were moved 
from a2s/* on 10/23/2018.

The swingjs/a2s package provides a method of using non-Swing AWT
components (Button, TextField, etc.) even though SwingJS requires
Swing components (JButton, JTextField, etc.). This is necessary because
SwingJS does not implement "mixed-mode" containers -- JPanels that have
AWT Buttons, for example. This possibility was clearly a nightmare for
Swing developers, and the code backing this capability was just way too
complex to even consider converting.

There is probably a reason this was never done before, but I have not
discovered it yet. That is to say, this works.

The intent is to provide a means of taking a project that is not 
a Swing application or does not fully use Swing components and make it work
in SwingJS with no special handling. In Java, a reference to "java.awt.Button"
is just that. In JavaScript, that call is to a javax.swing.JButton via 
the intermediary swingjs.a2s.Button. 

It is still recommended to convert a non-Swing application or applet prior to 
working with SwingJS, because it is not guaranteed that this implementation is 
complete. 

But, that said, this does work. Older AWT mouse events are passed on to the 
component as before, even though they are also passed on by the listener 
mechanism introduced in Swing.

Bob Hanson
2018.10.23
