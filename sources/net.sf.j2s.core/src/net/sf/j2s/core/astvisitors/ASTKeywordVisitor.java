/*******************************************************************************
 * Copyright (c) 2007 java2script.org and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Zhou Renjian - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.Iterator;
import java.util.List;
import java.util.Stack;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ArrayAccess;
import org.eclipse.jdt.core.dom.ArrayCreation;
import org.eclipse.jdt.core.dom.ArrayInitializer;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.Assignment;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BooleanLiteral;
import org.eclipse.jdt.core.dom.BreakStatement;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.CatchClause;
import org.eclipse.jdt.core.dom.CharacterLiteral;
import org.eclipse.jdt.core.dom.ConditionalExpression;
import org.eclipse.jdt.core.dom.ContinueStatement;
import org.eclipse.jdt.core.dom.DoStatement;
import org.eclipse.jdt.core.dom.EmptyStatement;
import org.eclipse.jdt.core.dom.EnhancedForStatement;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.ExpressionStatement;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.ForStatement;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
//import org.eclipse.jdt.core.dom.IPackageBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.InstanceofExpression;
import org.eclipse.jdt.core.dom.LabeledStatement;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.NumberLiteral;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PostfixExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.SwitchCase;
import org.eclipse.jdt.core.dom.SwitchStatement;
import org.eclipse.jdt.core.dom.SynchronizedStatement;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.ThrowStatement;
import org.eclipse.jdt.core.dom.TryStatement;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.UnionType;
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;

//BH 9/10/2017 -- adds full byte, short, and int distinction using class-level local fields $b$, $s$, and $i$, which are IntXArray[1].
// 

// TODO

// fix String.fromCharCode('c'.$c())

/**
 * This class will traverse most of the common keyword and common expression,
 * processing all interconversion among primitive types byte char short int, and long
 * as well as all boxing and unboxing of Character/char, Integer/int, etc.
 * 
 * @author zhou renjian
 * @author Bob Hanson
 *
 */
public class ASTKeywordVisitor extends ASTEmptyVisitor {

	
	private boolean isArray = false;
	
	private final static String CHARCODEAT0 = ".$c()";
	/**
	 * holds all static field definitions for insertion at the end of the class def
	 * and allows setting of local typed integer arrays for fast processing of bytes  
	 * 
	 */
	protected StaticBuffer staticFieldDefBuffer = new StaticBuffer();
	
	/**
	 * StaticBuffer holds definitions that need to come after all methods are defined, with blocks defined just
	 * once for any given class. 
	 * 
	 * The buffer also provides a very efficient way to do byte, short, and int operation processing by using
	 * the trick that if we have defined  
	 * 
	 * var $b$ = new Int8Array(1)
	 * 
	 * then we can use that to "filter" a (necessarily) 32-bit integer JavaScript variable to reproduce the effect of 
	 * being a byte or short or int. This is done as follows:
	 * 
	 * Java: 
	 * 
	 *   byte b = (byte) 300;
	 *   
	 * JavaScript:
	 * 
	 *   var b = ($b$[0] = 300, $b$[0]);
	 *   
	 * This works because Int8Arrays really are bytes, and they can only hold bytes. So 
	 * 
	 *   $b$[0] = 300
	 * 
	 * sets $b$[0] to be 44, and ($b$[0] = 300, $b$[0]) then passes that value on to the 
	 * receiving variable b (which itself is a 32-bit integer, actually).
	 * 
	 * It was a surprise to me that the "(..., $b$[0])" business was necessary. 
	 * However, it turns out that
	 * 
	 *   b = $b$[0] = 300;
	 *   
	 * is really short for the two (undesired) independent processes: 
	 * 
	 *   b = 300;
	 *   $b$[0] = 300;
	 *
	 * not the (desired) sequential pair
	 * 
	 *   $b$[0] = 300;
	 *   b = $b$[0];
	 *   
	 * But
	 *  
	 *   var b = ($b$[0] = 300, $b$[0]);
	 * 	
	 * is precisely this second meaning.
	 * 
	 * 
	 * We turn this action off using the field isArray so that these don't get nested.
	 * 
	 * @author Bob Hanson
	 *
	 */
	class StaticBuffer {
		private StringBuffer buf;
		private String added = "";
		public StaticBuffer() {
			buf = new StringBuffer();
		}
		public StaticBuffer append(String s) {
			buf.append(s);
			return this;
		}
		public String toString() {
			return added + buf;
		}
		public void addType(String name) {
			char a = name.charAt(0);
			// note that this character may not be in the phrase "new Int Array"
			if (added.indexOf(a) >= 0)
				return;
			added += "var $" + a + "$";
			switch (a) {
			case 'b': // $b$
				added += " = new Int8Array(1)";
				break;
			case 's': // $s$
				added += " = new Int16Array(1)";
				break;
			case 'i': // $i$
				added += " = new Int32Array(1)";
				break;
			default:
			case 'p': // $p$
				break;
			}
			added += ";\r\n";
		}
	}

	protected int blockLevel = 0;

	protected HashSet<String> definedPackageNames;

	protected Stack<String> methodDeclareNameStack = new Stack<String>();

	protected int currentBlockForVisit = -1;

//	/**
//	 * This will be false unless j2s.compiler.static.quirks
//	 */
//	protected boolean supportsObjectStaticFields = false;
//
//	public boolean isSupportsObjectStaticFields() {
//		return supportsObjectStaticFields;
//	}
//
//	public void setSupportsObjectStaticFields(boolean supportsObjectStaticFields) {
//		this.supportsObjectStaticFields = supportsObjectStaticFields;
//	}

	protected String assureQualifiedName(String name) {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).assureQualifiedName(name);
	}

	protected String removeJavaLang(String name) {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).shortenQualifiedName(name);
	}

	protected String shortenPackageName(String name) {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).shortenPackageName(name);
	}

	protected String getConstantValue(Expression exp) {
		return ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).getConstantValue(exp);
	}

	protected String[] skipDeclarePackages() {
		return ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).skipDeclarePackages();
	}

	protected boolean isSimpleQualified(QualifiedName node) {
		return ((ASTFieldVisitor) getAdaptable(ASTFieldVisitor.class)).isSimpleQualified(node);
	}

	protected String getFieldName(ITypeBinding binding, String name) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).getFieldName(binding, name);
	}

	protected boolean isInheritedFieldName(ITypeBinding binding, String name) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).isInheritedFieldName(binding, name);
	}

	protected boolean checkKeywordViolation(String name, boolean checkPackages) {
		return ASTFieldVisitor.checkKeywordViolation(name, checkPackages ? definedPackageNames : null);
	}

	protected boolean checkSameName(ITypeBinding binding, String name) {
		return ((ASTJ2SMapVisitor) getAdaptable(ASTJ2SMapVisitor.class)).checkSameName(binding, name);
	}

	// protected boolean isFieldNeedPreparation(FieldDeclaration node) {
	// return ((ASTFieldVisitor)
	// getAdaptable(ASTFieldVisitor.class)).isFieldNeedPreparation(node);
	// }

	protected String getIndexedVarName(String name, int i) {
		return ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).getIndexedVarName(name, i);
	}

	protected void visitList(List<ASTNode> list, String seperator) {
		for (Iterator<ASTNode> iter = list.iterator(); iter.hasNext();) {
			boxingNode(iter.next(), false);
			if (iter.hasNext()) {
				buffer.append(seperator);
			}
		}
	}

	protected void visitList(List<ASTNode> list, String seperator, int begin, int end) {
		for (int i = begin; i < end; i++) {
			boxingNode(list.get(i), false);
			if (i < end - 1) {
				buffer.append(seperator);
			}
		}
	}

	public boolean visit(ArrayAccess node) {
		node.getArray().accept(this);
		buffer.append('[');
		addNonCharacter(node.getIndex());
		buffer.append(']');
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(ArrayCreation node) {
		ArrayInitializer inode = node.getInitializer();
		ITypeBinding binding = node.resolveTypeBinding();
		if (inode == null) {
			buffer.append(ASTScriptVisitor.j2sGetArrayClass(binding, 0));
			buffer.append(", [");
			List<ASTNode> dim = node.dimensions();
			visitList(dim, ", ");
			for (int i = binding.getDimensions() - dim.size(); --i >= 0;)
				buffer.append(", null");
			buffer.append("])");
		} else {
			visit(inode);
		}
		return false;
	}

	public boolean visit(ArrayInitializer node) {
		// as in: public String[] d = {"1", "2"};
		//ITypeBinding binding = node.resolveTypeBinding();
		//int n = binding.getDimensions();
		buffer.append(ASTScriptVisitor.j2sGetArrayClass(node.resolveTypeBinding(), -1));
		buffer.append(", [");
		@SuppressWarnings("unchecked")
		List<ASTNode> expressions = node.expressions();
		visitList(expressions, ", ");
		buffer.append("])");
		return false;
	}

	public boolean visit(Assignment node) {

		// note that this is not
		// var x = .....
		//
		// includes: =
		// +=, -=, *=, /=, %=
		// &=, |=, ^=
		// <<=
		// >>=
		// >>>=

		Expression left = node.getLeftHandSide();
		Expression right = node.getRightHandSide();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		String rightName = (rightTypeBinding == null ? null : rightTypeBinding.getName());
		String leftName = (leftTypeBinding == null ? null : leftTypeBinding.getName());
		if (leftName == null || rightName == null)
			return false;
		boolean wasArray = isArray;
		isArray = (left instanceof ArrayAccess);
		IVariableBinding varBinding = getLeftVariableBinding(left, leftTypeBinding);
		String op = node.getOperator().toString();
		String opType = (op.length() == 1 ? null : op.substring(0, op.length() - 1));
		boolean needParenthesis = false;
		if (checkStaticBinding(varBinding)) {
			// Static def new Test_Static().y++;
			ASTNode parent = node.getParent();
			needParenthesis = (!haveDirectStaticAccess(left)) && !(parent instanceof Statement);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
		} else {
			varBinding = null;
		}

		// take care of "=" first

		if (opType == null) {
			left.accept(this);
			buffer.append(" = ");		
//			buffer.append(">>=>>" + leftName + "-" + rightName);
			addExpressionAsTargetType(right, leftTypeBinding, "=", null);
			if (needParenthesis) {
				buffer.append(")");
			}
			isArray = wasArray;
			return false;
		}

		if ("boolean".equals(leftName)) {
			// |=, &=, ^=
			left.accept(this);
			buffer.append(" = (");
			left.accept(this);
			switch (op) {
			case "|=":
				buffer.append("||");
				break;
			case "&=":
				buffer.append("&&");
				break;
			default:
			case "^=":
				buffer.append("!=");
				break;
			}
			if (right instanceof InfixExpression) {
				buffer.append(" (");
				right.accept(this);
				buffer.append(")");
			} else {
				right.accept(this);
			}
			buffer.append(")");
			isArray = wasArray;
			return false;

		}

		left.accept(this);

		if (!("char".equals(leftName))) {
			if (isNumericType(leftName)) {
				// byte|short|int|long += ...
				buffer.append(" = ");
				addNumericTypedExpression(left, varBinding, leftName, opType, right, rightName, null);
				isArray = wasArray;
				return false;
			}
			// not char x ....
			// not boolean x....
			// could be int, byte, short, long with =, ==, or !=
			// could be String x = .....

			buffer.append(' ');
			buffer.append(op);
			buffer.append(' ');
			boolean leftIsString = leftName.equals("String");
			if ("char".equals(rightName)) {
				if (right instanceof CharacterLiteral) {
					// ... = 'c'
					if (leftIsString) {
						buffer.append(getConstantValue(right));
					} else {
						buffer.append(0 + ((CharacterLiteral) right).charValue());
					}
				} else if (leftIsString) {
					// String x = (char)....
					right.accept(this);
				} else {
					// dump ( right ) and check for right being
					// String.charAt(...);
					int pt = buffer.length();
					buffer.append('(');
					right.accept(this);
					buffer.append(")");
					addCharCodeAt(right, pt);
				}
			} else {
				// just add the right operand
				addOperand(right, leftIsString);
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			isArray = wasArray;
			return false;
		}

		// char left op right where op is not just "="

		// could be +=, -=, *=, /=, >>=, etc

		buffer.append(" = String.fromCharCode(");
		if (left instanceof SimpleName || left instanceof QualifiedName) {
			left.accept(this);
		} else {
			buffer.append("(");
			left.accept(this);
			buffer.append(")");
		}
		buffer.append(CHARCODEAT0); // .charCodeAt(0)
		buffer.append(opType);
		buffer.append(' ');
		boolean needCharCode = false;
		if (right instanceof InfixExpression) {
			String constValue = getConstantValue(right);
			if (constValue == null) {
				buffer.append("(");
				boxingNode(right, true);
				buffer.append(")");
			} else {
				buffer.append(constValue);
				needCharCode = (constValue.startsWith("'") || constValue.startsWith("\""));
			}
		} else if ("char".equals(rightName)) {
			Object constValue = right.resolveConstantExpressionValue();
			if (constValue != null && constValue instanceof Character) {
				buffer.append(((Character) constValue).charValue() + 0);
			} else {
				needParenthesis = !(right instanceof ParenthesizedExpression || right instanceof PrefixExpression
						|| right instanceof PostfixExpression);
				if (needParenthesis) {
					buffer.append("(");
				}
				needCharCode = boxingNode(right, false);
				if (needParenthesis) {
					buffer.append(")");
				}
			}
		} else {
			boxingNode(right, true);
			needCharCode = false;
		}
		if (needCharCode)
			buffer.append(CHARCODEAT0);
		buffer.append(')');
		isArray = wasArray;
		return false;
	}

	/**
	 * Add the ".c$()" alias for ".charCodeAt(0)" to 
	 * char, Character, and String that need to be expressed as integer values. 
	 * 
	 * As a shortcut, we convert .charAt() to .c$() directly if that is what we have.
	 *  
	 * @param right
	 * @param pt
	 */
	private void addCharCodeAt(Expression right, int pt) {
		String charCodeAt0 = CHARCODEAT0;
		if (right instanceof MethodInvocation) {
			// if possible, just replace "charAt" with "charCodeAt"
			MethodInvocation m = (MethodInvocation) right;
			if ("charAt".equals(m.getName().toString())) {
				if ((pt = buffer.indexOf(".charAt", pt)) >= 0) {
					charCodeAt0 = "Code" + buffer.substring(pt + 5); // At....
					buffer.setLength(pt + 5);
				}
			}
		}
		buffer.append(charCodeAt0);
	}
	public void endVisit(Block node) {
		buffer.append("}");
		List<ASTFinalVariable> finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
		List<ASTFinalVariable> normalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).normalVars;
		for (int i = finalVars.size() - 1; i >= 0; i--) {
			ASTFinalVariable var = finalVars.get(i);
			if (var.blockLevel >= blockLevel) {
				finalVars.remove(i);
			}
		}
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			ASTFinalVariable var = normalVars.get(i);
			if (var.blockLevel >= blockLevel) {
				normalVars.remove(i);
			}
		}
		blockLevel--;
		super.endVisit(node);
	}

	public void endVisit(MethodDeclaration node) {
		List<ASTFinalVariable> finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
		List<ASTFinalVariable> visitedVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).visitedVars;
		List<ASTFinalVariable> normalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).normalVars;
		@SuppressWarnings("unchecked")
		List<SingleVariableDeclaration> parameters = node.parameters();
		String methodSig = null;
		IMethodBinding resolveBinding = node.resolveBinding();
		if (resolveBinding != null) {
			methodSig = resolveBinding.getKey();
		}
		for (int i = parameters.size() - 1; i >= 0; i--) {
			SingleVariableDeclaration varDecl = parameters.get(i);

			SimpleName name = varDecl.getName();
			IBinding binding = name.resolveBinding();
			if (binding != null) {
				String identifier = name.getIdentifier();
				ASTFinalVariable f = new ASTFinalVariable(blockLevel + 1, identifier, methodSig);
				f.toVariableName = getIndexedVarName(identifier, normalVars.size());
				normalVars.remove(f);
				if (Modifier.isFinal(binding.getModifiers())) {
					finalVars.remove(f);
				}
				visitedVars.remove(f);
			}
		}
		super.endVisit(node);
	}

	public boolean visit(BooleanLiteral node) {
		buffer.append(node.booleanValue());
		return false;
	}

	public boolean visit(BreakStatement node) {
		buffer.append("break");
		SimpleName label = node.getLabel();
		if (label != null) {
			buffer.append(' ');
			label.accept(this);
		}
		buffer.append(";\r\n");
		return false;
	}

	public boolean visit(CastExpression node) {
		Expression expression = node.getExpression();
		ITypeBinding expBinding = expression.resolveTypeBinding();
		Type typeTO = node.getType();
		String fromValue = "";
		String toValue = "";
		// assume that casting is intentional to adjust the integer type
		if (expBinding != null && typeTO.isPrimitiveType()) {
			String nameFROM = expBinding.getName();
			String nameTO = ((PrimitiveType) typeTO).getPrimitiveTypeCode().toString();
			if (!nameTO.equals(nameFROM)) {
				addNumericTypedExpression(null, null, nameTO, null, expression, nameFROM, null);
				return false;
			}
		}
		buffer.append(fromValue);
		expression.accept(this);
		buffer.append(toValue);
		return false;
	}

	public boolean visit(CatchClause node) {
		buffer.append(" catch (");
		node.getException().accept(this);
		buffer.append(") ");
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(CharacterLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	public boolean visit(ConditionalExpression node) {
		ITypeBinding binding = node.resolveTypeBinding();
		Expression expThen = node.getThenExpression();
		Expression expElse = node.getElseExpression();
		node.getExpression().accept(this);
		buffer.append(" ? ");
		addExpressionAsTargetType(expThen, binding, "e", null);
		buffer.append(" : ");
		addExpressionAsTargetType(expElse, binding, "e", null);
		return false;
	}

	public boolean visit(ContinueStatement node) {
		buffer.append("continue");
		SimpleName label = node.getLabel();
		if (label != null) {
			buffer.append(' ');
			label.accept(this);
		}
		buffer.append(";\r\n");
		return false;
	}

	public boolean visit(DoStatement node) {
		buffer.append("do ");
		node.getBody().accept(this);
		buffer.append(" while (");
		node.getExpression().accept(this);
		buffer.append(");\r\n");
		return false;
	}

	public boolean visit(EmptyStatement node) {
		buffer.append(";");
		return false;
	}

	public boolean visit(EnhancedForStatement node) {

		SimpleName name = node.getParameter().getName();
		String varName = name.getIdentifier();
		buffer.append("for (var ");
		buffer.append(varName);
		// name.accept(this);
		buffer.append(", $");
		buffer.append(varName);
		// name.accept(this);
		buffer.append(" = ");
		Expression exp = node.getExpression();
		ITypeBinding typeBinding = exp.resolveTypeBinding();
		if (typeBinding.isArray()) {
			buffer.append("0, $$");
			buffer.append(varName);
			buffer.append(" = ");
			exp.accept(this);
			buffer.append("; $");
			buffer.append(varName);
			buffer.append(" < $$");
			buffer.append(varName);
			buffer.append(".length && ((");
			buffer.append(varName);
			buffer.append(" = $$");
			buffer.append(varName);
			buffer.append("[$");
			buffer.append(varName);
			buffer.append("]) || true); $");
			buffer.append(varName);
			buffer.append("++");
		} else {
			exp.accept(this);
			buffer.append(".iterator (); $");
			buffer.append(varName);
			// name.accept(this);
			buffer.append(".hasNext () && ((");
			buffer.append(varName);
			// name.accept(this);
			buffer.append(" = $");
			buffer.append(varName);
			// name.accept(this);
			buffer.append(".next ()) || true);");
		}
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	public void endVisit(ExpressionStatement node) {
		buffer.append(";\r\n");
		super.endVisit(node);
	}

	@SuppressWarnings("unchecked")
	public boolean visit(ForStatement node) {
		buffer.append("for (");
		visitList(node.initializers(), ", ");
		buffer.append("; ");
		Expression expression = node.getExpression();
		if (expression != null) {
			expression.accept(this);
		}
		buffer.append("; ");
		visitList(node.updaters(), ", ");
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	public boolean visit(IfStatement node) {
		buffer.append("if (");
		/**
		 * Boolean x = Boolean.FALSE;
		 * 
		 * if( x ){
		 * 
		 * } should converted to if(x.booleanValue()){
		 * 
		 * }
		 */
		boxingNode(node.getExpression(), false);
		buffer.append(") ");
		node.getThenStatement().accept(this);
		if (node.getElseStatement() != null) {
			buffer.append(" else ");
			node.getElseStatement().accept(this);
		}
		return false;
	}

	public boolean visit(ImportDeclaration node) {
		return false;
	}

	public boolean visit(InstanceofExpression node) {
		Type right = node.getRightOperand();
		ITypeBinding binding = right.resolveBinding();
		if (binding  == null)
			return false;
		buffer.append("Clazz.instanceOf(");
		node.getLeftOperand().accept(this);
		buffer.append(", ");
		if (right instanceof ArrayType) {
			buffer.append(ASTScriptVisitor.j2sGetArrayClass(binding, 1));
		} else {
			buffer.append("\"" + Bindings.removeBrackets(binding.getQualifiedName()) + "\"");
			//right.accept(this);
		}
		buffer.append(")");
		return false;
	}

	public boolean visit(LabeledStatement node) {
		buffer.append(node.getLabel());
		buffer.append(" : ");
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(Modifier node) {
		return false;
	}

	public boolean visit(NumberLiteral node) {
		String token = node.getToken();
		if (token.endsWith("L") || token.endsWith("l")) {
			buffer.append(token.substring(0, token.length() - 1));
		} else if (!token.startsWith("0x") && !token.startsWith("0X")) {
			if (token.endsWith("F") || token.endsWith("f") || token.endsWith("D") || token.endsWith("d")) {
				buffer.append(token.substring(0, token.length() - 1));
			} else {
				buffer.append(token);
			}
		} else {
			buffer.append(token);
		}
		return false;
	}

	public boolean visit(NullLiteral node) {
		ITypeBinding binding = node.resolveTypeBinding();
		if (binding != null)
			buffer.append("null");
		return super.visit(node);
	}

	public boolean visit(PackageDeclaration node) {
		ASTPackageVisitor packageVisitor = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class));
		packageVisitor.setPackageName("" + node.getName());
		String[] swtInnerPackages = skipDeclarePackages();
		/*
		 * All the SWT package will be declared manually.
		 */
		for (int i = 0; i < swtInnerPackages.length; i++) {
			if (packageVisitor.getPackageName().equals(swtInnerPackages[i])) {
				return false;
			}
		}
		buffer.append("Clazz.declarePackage(\"");
		node.getName().accept(this);
		buffer.append("\");\r\n");
		return false;
	}

	public boolean visit(ParenthesizedExpression node) {
		buffer.append("(");
		node.getExpression().accept(this);
		buffer.append(")");
		return false;
	}


	/**
	 * Infix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * InfixOperator:<code>
	 *    <b>*</b>	TIMES
	 *    <b>/</b>  DIVIDE
	 *    <b>%</b>  REMAINDER
	 *    <b>+</b>  PLUS
	 *    <b>-</b>  MINUS
	 *    <b>&lt;&lt;</b>  LEFT_SHIFT
	 *    <b>&gt;&gt;</b>  RIGHT_SHIFT_SIGNED
	 *    <b>&gt;&gt;&gt;</b>  RIGHT_SHIFT_UNSIGNED
	 *    <b>&lt;</b>  LESS
	 *    <b>&gt;</b>  GREATER
	 *    <b>&lt;=</b>  LESS_EQUALS
	 *    <b>&gt;=</b>  GREATER_EQUALS
	 *    <b>==</b>  EQUALS
	 *    <b>!=</b>  NOT_EQUALS
	 *    <b>^</b>  XOR
	 *    <b>&amp;</b>  AND
	 *    <b>|</b>  OR
	 *    <b>&amp;&amp;</b>  CONDITIONAL_AND
	 *    <b>||</b>  CONDITIONAL_OR</code>
	 * </pre>
	 */

	public boolean visit(InfixExpression node) {
		// includes
		//
		// * / % + -
		// << >> >>>
		// < > <= >= == !=
		// ^ & |
		// && ||

		Expression left = node.getLeftOperand();
		Expression right = node.getRightOperand();
		List<?> extendedOperands = node.extendedOperands();

		// TODO: not convinced....
		String constValue = getConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}

		ITypeBinding expTypeBinding = node.resolveTypeBinding();
		if (expTypeBinding == null)
			return false;
		String expTypeName = expTypeBinding.getName();
		boolean isToString = (expTypeName.indexOf("String") >= 0);

		String operator = node.getOperator().toString();
		boolean isBitwise = isBitwiseBinaryOperator(node);
		boolean isComparison = (!isBitwise && "!==<=>=".indexOf(operator) >= 0);
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		if (leftTypeBinding == null || rightTypeBinding == null)
			return false;
		String leftName = leftTypeBinding.getName();
		String rightName = rightTypeBinding.getName();
		if ("/".equals(operator) && leftTypeBinding.isPrimitive() && isNumericType(leftName)
				&& isNumericType(rightName)) {
			// left and right are one of byte, short, int, or long
			// division must take care of this.
			addNumericTypedExpression(left, null, leftName, operator, right, rightName, extendedOperands);
			return false;
		}

		boolean toBoolean = "boolean".equals(expTypeName);

		char pre = ' ';
		char post = ' ';
		if (isBitwise && toBoolean) {
			pre = '(';
			post = ')';
			buffer.append("!!(");
		}

		boolean isDirect = isBitwise && !toBoolean;
		if (isDirect || isComparison) {

			// we do not have to do a full conversion
			// possibilities include
			// numeric op numeric
			// char/Character op char/Character
			// String op String
			//
			if (!isDirect)
				switch (leftName) {
				case "char":
				case "Character":
				case "String":
					switch (rightName) {
					case "char":
					case "Character":
					case "String":
						isDirect = true;
						break;
					default:
						break;
					}
					break;
				default:
					if (isNumericType(leftName) && isNumericType(rightName))
						isDirect = true;
					break;
				}

			if (isDirect) {
				boxingNode(left, false);
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				boxingNode(right, false);
				addExtendedOperands(extendedOperands, operator, pre, post, isToString);
				return false;
			}
		}

		// left
		addOperand(left, isToString);
		buffer.append(' ');
		// op
		buffer.append(operator);
		if (("==".equals(operator) || "!=".equals(operator)) && !leftTypeBinding.isPrimitive()
				&& !(left instanceof NullLiteral) && !(right instanceof NullLiteral)) {
			buffer.append('=');
		}
		buffer.append(' ');
		// right
		addOperand(right, isToString);

		// The extended operands is the preferred way of representing deeply
		// nested expressions of the form L op R op R2 op R3... where the same
		// operator appears between all the operands (the most common case being
		// lengthy string concatenation expressions). Using the extended
		// operands keeps the trees from getting too deep; this decreases the
		// risk is running out of thread stack space at runtime when traversing
		// such trees. ((a + b) + c) + d would be translated to: leftOperand: a
		// rightOperand: b extendedOperands: {c, d} operator: +

		addExtendedOperands(extendedOperands, operator, pre, post, isToString);
		if (toBoolean)
			buffer.append(post);
		return false;
	}

	private void addExtendedOperands(List<?> extendedOperands, String operator, char pre, char post, boolean isToString) {		
		if (extendedOperands.size() > 0) {
			buffer.append(' ');
			for (Iterator<?> iter = extendedOperands.iterator(); iter.hasNext();) {
				buffer.append(operator);
				buffer.append(pre);
				ASTNode element = (ASTNode) iter.next();
				addOperand((Expression) element, isToString);
				buffer.append(post);
			}
		}
	}

	/**
	 * The left operand is primitive boolean. Check to see if the operator is ^,
	 * |, or &, or if the left or right operand is such an expression. 
	 * 
	 * If so, we are going to box this all as a Boolean(....).valueOf()
	 * 
	 * @param node
	 * @return
	 */
	private boolean isBitwiseBinaryOperator(InfixExpression node) {
		if (checkSimpleBooleanOperator(node.getOperator().toString())) {
			return true;
		}
		Expression left = node.getLeftOperand();
		if (left instanceof InfixExpression) {
			if (isBitwiseBinaryOperator((InfixExpression) left)) {
				return true;
			}
		}
		Expression right = node.getRightOperand();
		if (right instanceof InfixExpression) {
			if (isBitwiseBinaryOperator((InfixExpression) right)) {
				return true;
			}
		}
		return false;
	}

	private boolean checkSimpleBooleanOperator(String op) {
		return (op.equals("^") || op.equals("|") || op.equals("&"));
	}

	public boolean visit(PrefixExpression node) {
		String constValue = getConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}
		String op = node.getOperator().toString();
		if ("~".equals(op) || "!".equals(op)) {
			buffer.append(op);
			return super.visit(node);
		}
		Expression left = node.getOperand();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		IVariableBinding varBinding = getLeftVariableBinding(left, leftTypeBinding);
		boolean isChar = (leftTypeBinding != null && leftTypeBinding.isPrimitive() && "char".equals(leftTypeBinding.getName()));
		boolean needParenthesis = false;
		ASTNode parent = node.getParent();
		if (checkStaticBinding(varBinding)) {
			needParenthesis = (isChar || !haveDirectStaticAccess(left))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
			parent = null;
		} else {
			varBinding = null;
		}
		if (isChar) {
			if (varBinding == null)
				buffer.append("(");
			addCharacterPrePostFix(left, parent, varBinding, op, true);
			if (varBinding == null)
				buffer.append(")");
		} else {
			buffer.append(op);
			addFieldName(left, varBinding);
		}
		if (needParenthesis) {
			buffer.append(")");
		}
		return false;
	}

	/**
	 * 
	 * @param left
	 * @param parent  null for prefix
	 * @param varBinding
	 * @param op
	 * @param b 
	 */
	private void addCharacterPrePostFix(Expression left, ASTNode parent,
			IVariableBinding varBinding, String op, boolean isPrefix) {		
		boolean addAnonymousWrapper = !isPrefix &&  !(parent instanceof Statement); 
		if (addAnonymousWrapper) {
			buffer.append("($p$ = ");
			addFieldName(left, varBinding);
			buffer.append(", ");
			staticFieldDefBuffer.addType("p");
		}
		
		addFieldName(left, varBinding);
		buffer.append(" = String.fromCharCode(");
		addFieldName(left, varBinding);
		buffer.append(CHARCODEAT0).append("++".equals(op) ? "+1" : "-1");
		buffer.append(")");
		if (addAnonymousWrapper) {
			buffer.append(", $p$)");
		}
	}

	public boolean visit(PostfixExpression node) {
		Expression left = node.getOperand();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		IVariableBinding varBinding = getLeftVariableBinding(left, leftTypeBinding);
		boolean isChar = (leftTypeBinding != null && leftTypeBinding.isPrimitive() && "char".equals(leftTypeBinding.getName()));
		boolean needParenthesis = false;
		ASTNode parent = node.getParent();
		if (checkStaticBinding(varBinding)) {
			needParenthesis = (isChar || !haveDirectStaticAccess(left))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
		} else {
			varBinding = null;
		}
			
		String op = node.getOperator().toString();
		if (isChar) {
			addCharacterPrePostFix(left, parent, varBinding, op, false);
		} else {
			addFieldName(left, varBinding);
			buffer.append(op);
		}
		if (needParenthesis) {
			buffer.append(")");
		}
		return false;
	}
	
	public boolean visit(QualifiedName node) {
		if (isSimpleQualified(node)) {
			String constValue = getConstantValue(node);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}
		}
		IBinding nameBinding = node.resolveBinding();
		IVariableBinding varBinding = (nameBinding instanceof IVariableBinding ? (IVariableBinding) nameBinding : null);
		ASTNode parent = node.getParent();
		Name qualifier = node.getQualifier();
		if (!checkStaticBinding(varBinding) ||qualifier.resolveBinding() instanceof ITypeBinding)
			varBinding = null;
		String nodeStr = qualifier.toString();
		boolean skipQualifier = (nodeStr.equals("net.sf.j2s.html") || nodeStr.equals("org.eclipse.swt.internal.xhtml"));
		String name = null;
		if (!skipQualifier && parent != null && !(parent instanceof QualifiedName)) {
			while (qualifier instanceof QualifiedName) {
				IBinding binding = qualifier.resolveBinding();
				if (binding != null && !(binding instanceof IVariableBinding)) {
					Name xqualifier = ((QualifiedName) qualifier).getQualifier();
					if (xqualifier instanceof QualifiedName) {
						IBinding xbinding = qualifier.resolveBinding();
						if (xbinding != null && !(xbinding instanceof IVariableBinding)) {
							qualifier = xqualifier;
							continue;
						}
					}
				}
				break;
			}
			IBinding binding = qualifier.resolveBinding();
			if (binding != null && !(binding instanceof IVariableBinding)) {
				ITypeBinding typeBinding = qualifier.resolveTypeBinding();
				if (typeBinding != null) {
					// Compiling inner Class or enum type, like:
					// RadiusData.EnumType e = RadiusData.EnumType.THREE;
					// avoid generate duplicated RadiusData
					name = typeBinding.getQualifiedName();
					if (name.indexOf("net.sf.j2s.html.") == 0) {
						name = name.substring(16);
					}
					if (name.indexOf("java.lang.") == 0) {
						name = name.substring(10);
					}
					if (name.length() == 0)
						skipQualifier = true;
				}
			}
		}
				
		if (!skipQualifier) {
			if (varBinding != null) {
				if (qualifier instanceof SimpleName) {
					addQualifiedName(varBinding);
				} else {
					buffer.append('(');
					if (name == null)
						qualifier.accept(this);
					else
						buffer.append(name);
					buffer.append(", ");
					addQualifiedName(varBinding);
					buffer.append(')');
				}
			} else if (name == null) {
				qualifier.accept(this);
			} else {
				buffer.append(name);
			}
			buffer.append('.');
		}
		node.getName().accept(this);
		return false;
	}

	public boolean visit(FieldAccess node) {
		// Field access expression AST node type.
		// FieldAccess:
		// Expression . Identifier
		//
		//
		// Note that there are several kinds of expressions that resemble field
		// access expressions: qualified names, this expressions, and super
		// field access expressions. The following guidelines help with correct
		// usage:
		// •An expression like "foo.this" can only be represented as a this
		// expression (ThisExpression) containing a simple name. "this" is a
		// keyword, and therefore invalid as an identifier.
		// •An expression like "this.foo" can only be represented as a field
		// access expression (FieldAccess) containing a this expression and a
		// simple name. Again, this is because "this" is a keyword, and
		// therefore invalid as an identifier.
		// •An expression with "super" can only be represented as a super field
		// access expression (SuperFieldAccess). "super" is a also keyword, and
		// therefore invalid as an identifier.
		// •An expression like "foo.bar" can be represented either as a
		// qualified name (QualifiedName) or as a field access expression
		// (FieldAccess) containing simple names. Either is acceptable, and
		// there is no way to choose between them without information about what
		// the names resolve to (ASTParser may return either).
		// •Other expressions ending in an identifier, such as "foo().bar" can
		// only be represented as field access expressions (FieldAccess).

		IVariableBinding varBinding = node.resolveFieldBinding();
		Expression expression = node.getExpression();
		if (checkStaticBinding(varBinding)) {
			// e.g.  i += 3 + y + ++(new >>Test_Static<<().y);
			buffer.append('(');
		} else {
			varBinding = null;
		}
		
		expression.accept(this);
		
		if (varBinding != null) {
			buffer.append(", ");
			addQualifiedName(varBinding);
			buffer.append(')');
		}
		buffer.append(".");
		node.getName().accept(this);
		return false;
	}

	private void addQualifiedName(IVariableBinding varBinding) {
		buffer.append(assureQualifiedName(removeJavaLang(varBinding.getDeclaringClass().getQualifiedName())));
	}

	public boolean visit(ReturnStatement node) {
		buffer.append("return");
		Expression expression = node.getExpression();
		if (expression == null)
			return false;
		buffer.append(' ');
		ASTNode parent = node.getParent();
		while (parent != null && !(parent instanceof MethodDeclaration)) {
			parent = parent.getParent();
		}
		IMethodBinding mBinding = (parent == null ? null : ((MethodDeclaration) parent).resolveBinding());
		ITypeBinding retType = (mBinding == null ? null : mBinding.getReturnType());
		addExpressionAsTargetType(expression, retType, "r", null);
		return false;
	}

	public void endVisit(ReturnStatement node) {
		buffer.append(";\r\n");
		super.endVisit(node);
	}

	public boolean visit(StringLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(SwitchStatement node) {
		buffer.append("switch (");
		addNonCharacter(node.getExpression());
		buffer.append(") {\r\n");
		visitList(node.statements(), "");
		buffer.append("}\r\n");
		return false;
	}

	public boolean visit(SwitchCase node) {
		if (node.isDefault()) {
			buffer.append("default");
		} else {
			buffer.append("case ");
			addNonCharacter(node.getExpression());
		}
		buffer.append(":\r\n");
		return false;
	}

	/**
	 * Do not allow char or Character in a switch or array; instead use int
	 * 
	 * @param exp
	 */
	private void addNonCharacter(Expression exp) {
		String name = exp.resolveTypeBinding().getName();
		switch (name) {
		case "char":
		case "Character":
			addOperand(exp, false);
			break;
		default:
		case "String":
			exp.accept(this);
			break;
		}
	}

	public boolean visit(SynchronizedStatement node) {
		// not implemented in JS, as there is only one thread
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(ThrowStatement node) {
		buffer.append("throw ");
		node.getExpression().accept(this);
		buffer.append(";\r\n");
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(TryStatement node) {
		buffer.append("try ");
		node.getBody().accept(this);
		List<CatchClause> catchClauses = node.catchClauses();
		int size = catchClauses.size();
		if (size > 0) {
			String catchEName = "e$$";
			if (size == 1) {
				CatchClause element = catchClauses.get(0);
				SimpleName exName = element.getException().getName();
				catchEName = exName.getIdentifier();
			}
			buffer.append(" catch (" + catchEName + ") ");
			boolean scopeAdded = false;
			boolean endedWithThrowable = false;
			for (Iterator<CatchClause> iter = catchClauses.iterator(); iter.hasNext();) {
				CatchClause element = iter.next();
				List<Type> types;
				Type type = element.getException().getType();
				if (type instanceof UnionType) {
					types = ((UnionType) type).types();
				} else {
					(types = new ArrayList<Type>()).add(type);
				}
				boolean haveType = false;
				for (int j = 0; j < types.size(); j++) {
					type = types.get(j);
					String typeName = type.toString();
					if ("Throwable".equals(typeName) || "java.lang.Throwable".equals(typeName)) {
						endedWithThrowable = true;
					} else {
						if (!scopeAdded) {
							buffer.append("{\r\n");
							scopeAdded = true;
						}
						buffer.append(haveType ? " || " : "if (");
						buffer.append("Clazz.exceptionOf(" + catchEName + ", ");
						type.accept(this);
						buffer.append(")");
						haveType = true;
					}
				}
				if (haveType)
					buffer.append(")");
				SimpleName exName = element.getException().getName();
				String eName = exName.getIdentifier();
				boolean notEName = false;
				if (!catchEName.equals(eName)) {
					buffer.append("{\r\n");
					buffer.append("var ");
					buffer.append(eName);
					buffer.append(" = " + catchEName + ";\r\n");
					notEName = true;
				}
				element.getBody().accept(this);
				if (notEName) {
					buffer.append("\r\n}");
				}
				if (iter.hasNext()) {
					buffer.append(" else ");
				}
			}
			if (!endedWithThrowable) {
				buffer.append(" else {\r\nthrow " + catchEName + ";\r\n}");
			}
			if (scopeAdded) {
				buffer.append("\r\n}");
			}
		}
		Block finallys = node.getFinally();
		if (finallys != null) {
			buffer.append(" finally ");
			finallys.accept(this);
		}
		buffer.append("\r\n");
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(VariableDeclarationExpression node) {
		buffer.append("var ");
		visitList(node.fragments(), ", ");
		return false;
	}

	public boolean visit(VariableDeclarationFragment node) {
		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding == null)
			return false;
		String identifier = name.getIdentifier();
		ASTFinalVariable f = new ASTFinalVariable(blockLevel, identifier,
				methodDeclareNameStack.size() == 0 ? null : (String) methodDeclareNameStack.peek());
		List<ASTFinalVariable> finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
		List<ASTFinalVariable> normalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).normalVars;
		f.toVariableName = getIndexedVarName(identifier, normalVars.size());
		normalVars.add(f);
		if (Modifier.isFinal(binding.getModifiers())) {
			finalVars.add(f);
		}
		name.accept(this);
		Expression right = node.getInitializer();
		ITypeBinding rightBinding = (right == null ? null : right.resolveTypeBinding());
		if (rightBinding == null)
			return false;
		buffer.append(" = ");
		addExpressionAsTargetType(right, name.resolveTypeBinding(), "v", null);
		return false;
	}

	public boolean visit(VariableDeclarationStatement node) {
		@SuppressWarnings("unchecked")
		List<ASTNode> fragments = node.fragments();
		for (Iterator<ASTNode> iter = fragments.iterator(); iter.hasNext();) {
			buffer.append("var ");
			iter.next().accept(this);
			buffer.append(";\r\n");
		}
		return false;
	}

	public boolean visit(WhileStatement node) {
		buffer.append("while (");
		node.getExpression().accept(this);
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

	/**
	 * box or unbox as necessary
	 * 
	 * @param element
	 * @param toCharCode TODO
	 * @return true if boxing or unboxing
	 */
	protected boolean boxingNode(ASTNode element, boolean toCharCode) {
		// Double > x  will be unboxed
		// Character == 'c' will be  unboxed
		// f$Integer(int) will be boxed 
		if (element instanceof Expression) {
			Expression exp = (Expression) element;
			if (exp.resolveBoxing()) {
				// expression is the site of a boxing conversion
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (typeBinding.isPrimitive()) {
					String name = typeBinding.getName();
					name = (name.equals("char") ? "Character"
							: name.equals("int") ? "Integer"
									: Character.toUpperCase(name.charAt(0)) + name.substring(1));
					getBuffer().append("new " + name + "(");
					element.accept(this);
					getBuffer().append(")");
					return true;
				}
			} else if (exp.resolveUnboxing()) {
				// expression is the site of an unboxing conversion
				ITypeBinding typeBinding = exp.resolveTypeBinding();
				if (!typeBinding.isPrimitive()) {
					String name = typeBinding.getQualifiedName();
					name = (name.indexOf("Integer") >= 0 ? "int"
							: name.indexOf("Character") >= 0 ? "char" : name.replace("java.lang.", "").toLowerCase());
					getBuffer().append("(");
					element.accept(this);
					getBuffer().append(toCharCode && name == "char" ? ").$c()" : ")." + name + "Value()");
					return true;
				}
			}
			String constValue = getConstantValue(exp);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}

		}
		element.accept(this);
		return false;
	}

	private final static String defaultNonQualified = 
			  "javajs.api.js;"
			+ "swingjs.api.js;"
			+ "swingjs.JSToolkit;";
	
	private static String[] nonQualifiedPackages;
	
	public static void setNoQualifiedNamePackages(String names) {
		names = defaultNonQualified + (names == null ? "" : names);
		nonQualifiedPackages = names.split(";");
		for (int i = nonQualifiedPackages.length; --i >= 0;) {
			String s = nonQualifiedPackages[i];
			if (s.startsWith("*."))
				nonQualifiedPackages[i] = s.substring(1);
			nonQualifiedPackages[i] = (s.endsWith("*") ? s.substring(0, s.length() - 1) : s + ".");
		}
	}
	
	private final static String[] nonQualifiedClasses = new String[] {
			// these classes are called from JavaScript or represent JavaScript functions
			"swingjs.JSAppletViewer",
			"swingjs.JSFrameViewer",
			"java.applet.AppletContext",
			"java.applet.AppletStub",
			
			// these classes need no qualification
			"java.lang.Boolean", 
			"java.lang.Byte", 
			"java.lang.Character", 
			"java.lang.Double",
			"java.lang.Float",
			"java.lang.Integer",
			"java.lang.Long", 
			"java.lang.Math", 
			"java.lang.Number",
			"java.lang.reflect.Array", 
			"java.lang.Short",
			"java.lang.System",
			"java.lang.String",
			
			// I have no idea why these are here
			"java.util.Date", // TODO _- really???
			"java.util.EventListenerProxy",
			"java.util.EventObject",
	};
	
	protected final static boolean isMethodQualified(String className, String methodName) {
		for (int i = nonQualifiedClasses.length; --i >= 0;) {
			String s = nonQualifiedClasses[i];
			if (className.equals(s)) {
				// leave selected String methods the same
				return (className.equals("java.lang.String") && "charAt,codePointAt,format,getBytes,substring,indexOf,lastIndexOf,toUpperCase,toLowerCase,trim,valueOf".indexOf(methodName) < 0);
			}
		}
		return true;
	}

	/**
	 * Check to see if this class is in a package for which we exclude parameter qualification
	 * @param className 
	 * @return
	 */
	public static boolean isPackageQualified(String className) {
		for (int i = nonQualifiedPackages.length; --i >= 0;) {
			String s = nonQualifiedPackages[i];
			if (s.length() > 0 && (s.startsWith(".") ? className.contains(s) : className.startsWith(s)))
				return false;
		}
		return true;
	}

	protected static boolean isStatic(IBinding b) {
		return b != null && Modifier.isStatic(b.getModifiers());
	}

	/**
	 * Check to see if we have a static variable. 
	 * 
	 * @param varBinding
	 * @return
	 */
	protected boolean checkStaticBinding(IVariableBinding varBinding) {
		ITypeBinding declaring;
		String qName;
		return isStatic(varBinding)
				&& (declaring = varBinding.getDeclaringClass()) != null
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.");
	}
	

	protected static boolean isNumericType(String type) {
		return (type != null  && "int long byte short".indexOf(type) >= 0);
	}

	protected void appendDefaultValue(Type type) {
		if (type.isPrimitiveType()) {
			PrimitiveType pType = (PrimitiveType) type;
			if (pType.getPrimitiveTypeCode() == PrimitiveType.BOOLEAN) {
				buffer.append("false");
			} else if (pType.getPrimitiveTypeCode() == PrimitiveType.CHAR) {
				buffer.append("'\\0'");
			} else {
				buffer.append("0");
			}
		} else {
			buffer.append("null");
		}
	}

	protected void appendInitializer(Expression initializer, Type fieldType) {
		if (initializer == null) {
			appendDefaultValue(fieldType);
		} else {
			String term = null;
			if (fieldType.isPrimitiveType()
					&& ((PrimitiveType) fieldType).getPrimitiveTypeCode() == PrimitiveType.CHAR) {
				ITypeBinding tBinding = initializer.resolveTypeBinding();
				if (tBinding != null && !("char".equals(tBinding.getName()))) {
					buffer.append("String.fromCharCode(");
					term = ")";
				}
			}
			initializer.accept(this);
			if (term != null)
				buffer.append(term);
		}
	}

	/**
	 * Determine the qualified parameter suffix for method names, including
	 * constructors. TODO: Something like this must be duplicated in Clazz as
	 * well in JavaScript
	 * 
	 * @param nodeName
	 * @param binding
	 * 
	 * @return
	 */
	protected String getJ2SParamQualifier(String nodeName, IMethodBinding binding) {
		// if (binding.getTypeParameters().length > 0) {
		// String key = binding.getKey();
		// int pt = key.indexOf("T:");
		// if (pt > key.indexOf("(")) {
		// String fullName = binding.getName();
		// // for put<K,V> we just allow this to be a single method.
		// // TODO: Q: Good assumption? Could register these to check for
		// // problems?
		// String name = discardGenericType(fullName);
		// Object other = htGenerics.get(name);
		// System.err.println(binding.getKey());
		// if (other == null) {
		// htGenerics.put(name, key);
		// } else if (other instanceof String) {
		// System.err.println("parameterization problem with " + key + "; dual
		// generic " + other);
		// htGenerics.put(name, Boolean.TRUE);
		// }
		// }
		// }

		// The problem is that System.out and System.err are PrintStreams, and
		// we
		// do not intend to change those. So in the case that we just wrote
		// "System....", we use that instead and do not qualify the name
		// Note: binding can be null if we have errors in the Java and we are compiling
		if (binding == null || nodeName != null && nodeName.startsWith("System."))
			return "";
		String methodName = binding.getName();
		String className = binding.getDeclaringClass().getQualifiedName();
		if (!isPackageQualified(className) || !isMethodQualified(className, methodName))
			return "";
		ITypeBinding[] paramTypes = binding.getMethodDeclaration().getParameterTypes();

		// BH: Note that Map.put$K$V is translated to actual values
		// if .getMethodDeclaration() is not used.
		// Without that, it uses the bound parameters such as
		// String, Object instead of the declared ones, such as $TK$TV

		StringBuffer sbParams = new StringBuffer();
		int nParams = paramTypes.length;
		if (nParams == 0 && methodName.equals("length"))
			return "$"; // so that String implements CharSequence
		for (int i = 0; i < nParams; i++)
			sbParams.append("$").append(j2sGetParamCode(paramTypes[i], true));
		String s = sbParams.toString();
		// exception for special case: setting static main(String[] args) to
		// "main", and "main()" to "main$"
		if ("main".equals(methodName) && isStatic(binding)) {
			if (s.length() == 0) {
				s = "$";
			} else if (s.equals("$SA")) {
				s = "";
			}
		}
		return s;
	}

	protected static String j2sGetParamCode(ITypeBinding binding, boolean addAAA) {
		String prefix = (binding.getKey().indexOf(":T") >= 0 ? "T" : null);
		String name = binding.getQualifiedName();
		String arrays = null;
			
		int pt = name.indexOf("[");
		if (pt >= 0) {
			arrays = name.substring(pt + (name.indexOf("[L") >= 0 ? 1 : 0));
			name = name.substring(0, pt);
		}
		// catching putAll$java_util_Map<? extends K,? extends V>
		// (java.util.AbstractMap.js)
		
		// NOTE: If any of these are changed, they must be changed in j2sSwingJS as well.
		// NOTE: These are the same as standard Java Spec, with the exception of Short, which is "H" instead of "S"
		
		switch (name = Bindings.removeBrackets(name)) {
		case "boolean":
			name = "Z";
			break;
		case "byte":
			name = "B";
			break;
		case "char":
			name = "C";
			break;
		case "double":
			name = "D";
			break;
		case "float":
			name = "F";
			break;
		case "int":
			name = "I";
			break;
		case "long":
			name = "J";
			break;
		case "short":
			name = "H"; // differs from Java Spec so we can use S for String
			break;
		case "java.lang.Object":
		case "Object":
			name = "O";
			break;
		case "java.lang.String":
			name = "S";
			break;
		default:
			if (name.length() == 1 && prefix != null)
				name = prefix + name; // (T,V) --> $TK$TV
			name = name.replace("java.lang.", "").replace('.', '_');
			break;
		}
		if (arrays != null) {
			if (addAAA) 
				arrays = arrays.replaceAll("\\[\\]", "A");
			name += arrays;
		}
		return name;
	}



	/**
	 * A general method to handle implicit casting.
	 * 
	 * @param left
	 * @param varBinding
	 * @param leftName
	 * @param op
	 * @param right
	 * @param rightName
	 */
	private void addNumericTypedExpression(Expression left, IVariableBinding varBinding, String leftName, String op,
			Expression right, String rightName, List<?> extendedOperands) {
		// byte|short|int|long /= ...
		// convert to proper number of bits

		// byte a |= right

		// becomes

		// a = ($b$[0] = a | right, $b$[0])

		//
		String classIntArray = null;
		String more = null;
		boolean fromChar = ("char".equals(rightName));
		boolean addParens = (op != "r" || fromChar);
		boolean isDiv = "/".equals(op);
		boolean toChar = false;
		switch (leftName) {
		case "char":
			if (!fromChar) {
				buffer.append("String.fromCharCode(");
				more = ")";
				addParens = false;
			}
			toChar = true;
			break;
		default:
		case "long":
			if ("long int short byte".indexOf(rightName) < 0 || isDiv)
				more = "|0";
			break;
		case "int":
			if (op != null && !isDiv || fromChar || rightName.equals("short")) {
				break;
			}
			//$FALL-THROUGH$
		case "short":
			if (right.equals("byte") && !isDiv)
				break;
			//$FALL-THROUGH$
		case "byte":
			if (!isArray) {
				classIntArray = "$" + leftName.charAt(0) + "$[0]";
				staticFieldDefBuffer.addType(leftName);
			}
			break;
		}
		boolean wasArray = isArray;
		if (classIntArray != null) {
			if (addParens)
				buffer.append("(");
			buffer.append(classIntArray).append(" = ");
			isArray = true;
		}
		if (left != null) {
			addFieldName(left, varBinding);
			buffer.append(op);
		}
		if (!boxingNode(right, fromChar) && fromChar && !toChar)
			buffer.append(CHARCODEAT0);
		if (extendedOperands != null) {
			addExtendedOperands(extendedOperands, op, ' ', ' ', false);
		}

		if (classIntArray != null) {
			buffer.append(", ").append(classIntArray);
			if (addParens)
				buffer.append(")");
			isArray = wasArray;
		}
		if (more != null)
			buffer.append(more);
	}


	/**
	 * Append an expression, coercing to primitive numeric types of the target
	 * parameter if needed. Used for Method arguments and return values, as well
	 * as variable declaration fragments, where we know the target type and 
	 * no operator is involved.
	 * 
	 * 
	 * @param exp
	 * @param targetType
	 * @param op just an identifier of the context: = for assignment, r for return statement, v for variable declaration fragment, p for method parameter
	 */
	protected void addExpressionAsTargetType(Expression exp, ITypeBinding targetType, String op, List<?> extendedOperands) {
		if (targetType == null
				|| exp instanceof CastExpression && ((CastExpression) exp).getExpression() instanceof NullLiteral) {
			buffer.append("null");
			return;
		}
		ITypeBinding expTypeBinding = exp.resolveTypeBinding();
		if (expTypeBinding != null) {
			// BH: Question: When does typeBinding == null?
			// A: when there is a compilation error, I think.
			// OK, now we have the same situation as any operand.
			String paramName = targetType.getName();
			if ((isNumericType(paramName) || paramName.equals("char")) && !isBoxTyped(exp)) {
				// using operator "m" to limit int application of $i$
				addNumericTypedExpression(null, null, paramName, op, exp, expTypeBinding.getName(), extendedOperands);
			} else {
				// char f() { return Character }
				// Character f() { return char }
				boxingNode(exp, false);
			}
		}
	}

	private static boolean isBoxTyped(Expression exp) {
		return exp.resolveBoxing() || exp.resolveUnboxing();
	}

	@SuppressWarnings("null")
	protected void addMethodArguments(ITypeBinding[] parameterTypes, boolean methodIsVarArgs, List<?> arguments) {
		String post = ", ";
		int nparam = parameterTypes.length;
		int argCount = arguments.size();
		for (int i = 0; i < nparam; i++) {
			ITypeBinding paramType = parameterTypes[i];
			Expression arg = (i < argCount ? (Expression) arguments.get(i) : null);
			if (i == nparam - 1) {
				// BH: can't just check for an array; it has to be an array with the right number of dimensions
				if (nparam != argCount || methodIsVarArgs && paramType.isArray()
						&& arg.resolveTypeBinding().getDimensions() != paramType.getDimensions() 
						&& !(arg instanceof NullLiteral)) {
					buffer.append("[");
					for (int j = i; j < argCount; j++) {
						addExpressionAsTargetType((Expression) arguments.get(j), paramType, "p", null);
						if (j != argCount - 1) {
							buffer.append(", ");
						}
					}
					buffer.append("]");
					break;
				}
				post = "";
			}
			addExpressionAsTargetType(arg, paramType, "p", null);
			buffer.append(post);
		}
	}

	
	/**
	 * add the operand, checking to see if it needs some adjustment:
	 * 
	 * (a) String + x where x is {double/float} requires boxing
	 * Double/Float(x).toString()
	 * 
	 * (b) String + x where x is {Double/Float} requires added .toString()
	 * 
	 * (c) Character and char to numeric requires addition of .$c()
	 * 
	 * 
	 * 
	 * @param exp
	 * @param isToString
	 */
	protected void addOperand(Expression exp, boolean isToString) {
		ITypeBinding binding = exp.resolveTypeBinding();
		String name = binding.getName();
		if (isToString) {
			String prefix = null, suffix = null;
			switch (name) {
			case "double":
				prefix = "new Double(";
				suffix = ")";
				break;
			case "float":
				prefix = "new Float(";
				suffix = ")";
				break;
			case "Double":
			case "Float":
				prefix = suffix = "";
				break;
			default:
				exp.accept(this);
				break;
			}
			if (prefix != null) {
				buffer.append(prefix);
				exp.accept(this);
				buffer.append(suffix);
				buffer.append(".toString()");
			}
			return;
		}
		if (!binding.isPrimitive() || !"char".equals(name)) {
			boxingNode(exp, !isToString);
			return;
		}
		// to numeric only
		if (exp instanceof CharacterLiteral) {
			buffer.append(0 + ((CharacterLiteral) exp).charValue());
		} else if (exp instanceof SimpleName || exp instanceof QualifiedName) {
			boxingNode(exp, false);
			buffer.append(CHARCODEAT0);
		} else if (exp instanceof PrefixExpression || exp instanceof PostfixExpression
				|| exp instanceof ParenthesizedExpression) {
			boxingNode(exp, false);
			buffer.append(CHARCODEAT0);
		} else {
			int pt = buffer.length();
			buffer.append("(");
			boxingNode(exp, false);
			buffer.append(")");
			addCharCodeAt(exp, pt);
		}
	}


	private void addFieldName(Expression left, IVariableBinding varBinding) {
		if (varBinding != null) {
			addQualifiedName(varBinding);
			buffer.append('.');
			left = (left instanceof QualifiedName ? ((QualifiedName) left).getName()
					: left instanceof FieldAccess ? ((FieldAccess) left).getName() : left);
		}
		boxingNode(left, false);
	}

	private boolean haveDirectStaticAccess(Expression exp) {
		return exp instanceof SimpleName
				|| (exp instanceof QualifiedName && ((QualifiedName) exp).getQualifier() instanceof SimpleName)
				|| (exp instanceof FieldAccess && ((FieldAccess) exp).getExpression() instanceof ThisExpression);

	}

	/**
	 * add a reference to the static field prior to defining it.
	 * 
	 * @param left
	 */
	private void addLeftSidePrefixName(Expression left) {
		if (left instanceof QualifiedName) {
			if ((left = ((QualifiedName) left).getQualifier()) instanceof SimpleName)
				return;
		} else if (left instanceof FieldAccess) {
			if ((left = ((FieldAccess) left).getExpression()) instanceof ThisExpression) 
				return;
		} else {
			return;
		}
		left.accept(this);
		buffer.append(", ");
	}

	private IVariableBinding getLeftVariableBinding(Expression left, IBinding leftTypeBinding) {
		if (left instanceof Name) {
			if (leftTypeBinding instanceof IVariableBinding) {
				return (IVariableBinding) leftTypeBinding;
			}
		} else if (left instanceof FieldAccess) {
			return ((FieldAccess) left).resolveFieldBinding();
		}
		return null;
	}

	
}
