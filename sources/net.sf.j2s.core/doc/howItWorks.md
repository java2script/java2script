***Java2Script: How It Works***

**java2script/Jmol**

Jmol was adapted for JavaScript between 2013 and 2015, before SwingJS was conceptualized. 
As such, it use the "legacy" version of the transpiler created and formerly maintained 
solely by Zhou Renjien. This code was the basis for SwingJS, and by careful adapting Jmol
to fit it, we could make it work with this somewhat quirky code. (For example, there is no
support for boxing and unboxing numbers -- int i = Integer.valueOf(3) is not properly turned
into just the number 3.) I got around this in those early days by just going through all 
(and I mean ALL) of the Jmol code, making sure there were no implicit boxing or unboxing. 

The primary issue with this transpiler is that it does not "qualify" method names. 
Thus, BufferedWriter.write(char) and BufferedWriter.write(int) both run through the
same method in JavaScript, and a (very complex and time-expensive) algorithm then
sorts out based on the JavaScript parameter type what is the MOST LIKELY intended
method target. I did a huge amount of refactoring in Jmol to ensure that it almost
never calls overloaded methods like this. 

And various other issues. IT SHOULD NOT BE USED FOR ANY OTHER PURPOSE.

This transpiler is enabled using .j2sjmol configuration file.

**java2script transpiler**

[Note: Changes in java2script should be necessary only when core Java syntax changes or is supplemented in the core Java. For example, Java 8 allows switch cases that are String constants, while Java 6 does not. When we went to Java 8, we had to modify Java2ScriptVisitor.java to account for that. If ever there is a need to fix something that the java2script compiler is doing wrong or to adapt to new Java syntax, as for Java 11, look in j2s.swingjs.Java2ScriptVisitor.]

A compiler converts code in one computer language to another. Typically this is from a higher-level language to a lower-level "machine code" language. In the case of the Java compiler, this is from written Java code (*.java) to "Java byte code" (*.class). In the case of  of java2script, this is from Java to JavaScript. There are two basic requirements of a compiler: reading and writing. The reading process involves converting the written Java code to an <i>abstract syntax tree</i> [https://en.wikipedia.org/wiki/Abstract_syntax_tree]. The writing process involves scanning that tree, creating one or more output files from the original input file. 

java2script is technically a "CompilationParticipant". [https://help.eclipse.org/neon/index.jsp?topic=%2Forg.eclipse.jdt.doc.isv%2Freference%2Fapi%2Forg%2Feclipse%2Fjdt%2Fcore%2Fcompiler%2FCompilationParticipant.html] It gets a notification that a certain set of files has been changed by the user or otherwise need compiling, just after the Java compiler has completed its work, it gets that same file list. It creates an instance of the Eclipse abstract syntax tree parser, org.eclipse.jdt.core.dom.ASTParser and initializes it with just a few statements (these from net.sf.j2s.core.Java2ScriptCompiler.java):

		astParser.setSource(createdUnit);
		astParser.setResolveBindings(true); 
		CompilationUnit root = (CompilationUnit) astParser.createAST(null);
		
  
Its primarily work is via a subclass of "ASTVisitor" [https://help.eclipse.org/luna/index.jsp?topic=%2Forg.eclipse.jdt.doc.isv%2Freference%2Fapi%2Forg%2Feclipse%2Fjdt%2Fcore%2Fdom%2FASTVisitor.html]
	
		Java2ScriptVisitor visitor = new Java2ScriptVisitor().setProject(project, testing);
		root.accept(visitor);


So this is pretty straightforward. All the output that is ultimately saved in *.js files is created in that last call to ASTVisitor.accept(ASTVisitor). This call initiates a full scan of the abstract syntax tree in the form of calls to a series of heavily overloaded visit(...) methods, such as:

   
	public boolean visit(DoStatement node)
	public boolean visit(SingleVariableDeclaration node)
	

etc. 

[Note that a big difference between Java and JavaScript is that JavaScript functions cannot be "overloaded", meaning the two calls in JavaScript:

    write(b)
    write(b, 2, 3)

will both point to the same function. A major task of the java2script SwingJS transpiler is to sort this out before it becomes an issue at runtime. It does this by creating signature-specific function names in JavaScript, such as write$B and write$B$I$I.]


**java2script/SwingJS**

The full java2script/SwingJS operation involves two parts: Creating the JavaScript from the abstract syntax tree (java2script), and running that within the browser (SwingJS). Both are discussed below.

The code for these two parts are well-separated:

net.sf.j2s.core       java2script transpiler

net.sf.j2s.java.core  SwingJS runtime


**Creating a New Transpiler**

The transpiler is created in Eclipse by checking out the net.sf.j2s.core project from GitHub as a standard Java project and adjusting the code as necessary. The 
parts that make this happen include:

META-INF/MANIFEST.MF
build.properties
plugin.xml


[note: 
-bootclasspath not supported at compliance level 9 and above

was fixed by adding

Bundle-RequiredExecutionEnvironment: JavaSE-1.8

to MANIFEST.MF

thank you https://bugs.eclipse.org/bugs/show_bug.cgi?id=525280

]


When it is desired to create the transpiler (j2s.core.jar):

1) Use File...Export...Deployable plug-ins and fragments
  (if you do not see this option, check that you are using Eclipse 
    Enterprise)
2) Choose j2s.core.jar (Version x.x.x), indicate the output directory,
   and press finish.
3) Copy this file to the dropins directory, restart Eclipse, 
   and test.
4) Copy this file to the project dist/swingjs folder and also
   to the swingjs/ver/x.x.x folder (or appropriate). 



I do this with a DOS batch file, which also adds a timestamp. 
   
That's it. 

The dist directory includes SwingJS-site.zip, created from the net.sf.j2s.core.java project.


**SwingJS runtime maintenance**

[Note: As of 10/2019, SwingJS is still a collection of Java code from a variety of sources. There is some original Apache Java code from before 2016, and there is code that is a mix of Java6 and Java8. Some of the core java.lang classes are created in j2sClazz.js directly, disregarding the class files in src. I realize this makes maintenance challenging, but that is the way it is. It's a volunteer operation....]

As Java evolves, new packages, classes, and methods are added. Some classes are deprecated and perhaps even removed. For example, the java.util.stream package was added in Java 8, and along with that, several core java.lang classes and interfaces (such as java.lang.String) were augmented to include stream-based methods. There have also been a number of cases where generic classes have been converted to typed classes. For example, staring in Java 7, javax.swing.JComboBox became javax.swing.JComboBox<E>. To date, this has not been an issue. (Particularly in the area of generics, java2script uses an aliasing scheme to refer to the same method by different names so that code from different Java versions still runs appropriately. -- For example, java.util.Calendar.compareTo is aliased as

compareTo$java\_util\_Calendar, compareTo$, and compareTo$TT

Java 11 makes a huge leap in the handling of String and char. SwingJS will have to be maintained to keep up with these changes. 

The important thing here is to maintain backward compatibility at all times. It is critical that any changes to SwingJS do not break the running of code from older versions of Java. We do not have the luxury in SwingJS of packaging code with its own JRE (other than the obvious fact that you can put whatever you want into site/swingjs/j2s on your own web site). 

So, basically, you can add to or modify any of the several thousand classes in j2s.net.sf.java.core/src. Just be careful to allow for what is already there to still run. Adding a new class can be a challenge. Note that we have not implemented serialization or accessibility. This was a design decision based on need. We needed applet code to run, and these two features added far too much complexity to the task. So we ignored them. (Serialization, in particular, is probably not ever going to work in JavaScript, because the java2script transpiler does not preserve enough information about variable types to make that work properly.)


Bob Hanson 2019.10.13, 2023.11.13



