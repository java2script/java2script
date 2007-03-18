package net.sf.j2s.core.astvisitors;

/**
 * FinalVariable that is used to record variable state, which will provide
 * information for compiler to decide the generated name in *.js. 
 * 
 * @author zhou renjian
 *
 * 2006-12-6
 */
public class ASTFinalVariable {

	/**
	 * Level of the block
	 */
	int blockLevel;
	
	/**
	 * Final variable may be in a very deep anonymous class 
	 */
	String methodScope;
	
	/**
	 * Variable name that is defined in Java sources
	 */
	String variableName;
	
	/**
	 * Variable name that is to be generated in the compiled *.js
	 */
	String toVariableName;
	
	public ASTFinalVariable(int blockLevel, String variableName, String methodScope) {
		super();
		this.blockLevel = blockLevel;
		this.variableName = variableName;
		this.methodScope = methodScope;
	}
	
	public String toString() {
		return variableName + ":" + variableName;
	}
}