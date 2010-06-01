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

	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + blockLevel;
		result = prime * result
				+ ((methodScope == null) ? 0 : methodScope.hashCode());
		result = prime * result
				+ ((toVariableName == null) ? 0 : toVariableName.hashCode());
		result = prime * result
				+ ((variableName == null) ? 0 : variableName.hashCode());
		return result;
	}

	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		final ASTFinalVariable other = (ASTFinalVariable) obj;
		if (blockLevel != other.blockLevel)
			return false;
		if (methodScope == null) {
			if (other.methodScope != null)
				return false;
		} else if (!methodScope.equals(other.methodScope))
			return false;
		if (toVariableName == null) {
			if (other.toVariableName != null)
				return false;
		} else if (!toVariableName.equals(other.toVariableName))
			return false;
		if (variableName == null) {
			if (other.variableName != null)
				return false;
		} else if (!variableName.equals(other.variableName))
			return false;
		return true;
	}
	
}