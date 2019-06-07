Java2Script: How It Works


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

If ever there is a need to fix something that the java2script compiler is doing wrong or to adapt to new Java syntax, as for Java 11, look in net.sf.j2s.core.Java2ScriptVisitor. There is great documentation on all of these org.eclipse.jdt.core.dom.ASTNode subclasses.

Bob Hanson 2019.06.07.



