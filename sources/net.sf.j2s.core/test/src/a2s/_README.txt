The a2s package has nothing to do with JavaScript. 

It contains a set of minimal classes that behave like AWT
components (Button, TextField, etc.) but actually subclass Swing 
components such as JButton and JTextField. This is necessary because
SwingJS does not implement "mixed-mode" containers -- JPanels that have
AWT Buttons, for example. This possibility was clearly a nightmare for
Swing developers, and the code backing this capability was just way too
complex to even consider converting.

There is probably a reason this was never done before.

The intent is to provide a means of taking a project that is not 
a Swing application or does not fully use Swing components and make it work
in SwingJS by just tweaking its import statements.

However, in our experience, much can go wrong with this, and a much better
plan is to convert a non-Swing application or applet. 

These classes should be used with care. They are just very minimal implementations
that attempt to reproduce the API of an AWT component as a Swing component. 



 
 