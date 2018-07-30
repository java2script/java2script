/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/

package net.sf.j2s.core.astvisitors;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 
 * @author zhou renjian
 *
 * 2006-12-3
 */
class VariableAdapter extends VisitorAdapter {
	
	/**
	 * FinalVariable that is used to record variable state, which will provide
	 * information for compiler to decide the generated name in *.js. 
	 * 
	 * @author zhou renjian
	 *
	 * 2006-12-6
	 */
	static class FinalVariable {

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

		/**
		 * $name, if required
		 * 
		 */
	    String prefixedName;
		
		FinalVariable(int blockLevel, String variableName, String methodScope) {
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
			if (obj == null || getClass() != obj.getClass())
				return false;
			final FinalVariable other = (FinalVariable) obj;
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
	
	/**
	 * Final variables only make senses (need "this.$finals[...]") inside anonymous
	 * class.
	 */
	boolean isAnonymousClass = true;

	/**
	 * List of variables that are declared as final.
	 */
	List<FinalVariable> finalVars = new ArrayList<FinalVariable>();
	
	/**
	 * Normal (non-final) variables may be affected by final variable names.
	 */
	List<FinalVariable> normalVars = new ArrayList<FinalVariable>();

	/**
	 * Only those final variables that are referenced inside anonymous class
	 * need to be passed into anonymous class.
	 */
	List<FinalVariable> visitedVars = new ArrayList<FinalVariable>();
	
	List<FinalVariable> getVariableList(char fvn) {
		switch (fvn) {
		case 'f':
			return finalVars;
		case 'v':
			return visitedVars;
		default:
		case 'n':
			return normalVars;
		}
	}	

	String getNormalVariableName(String name) {
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			String var =  normalVars.get(i).variableName;
			if (name.equals(var))
				return var;
		}
		return name;
	}

}
