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
import java.util.HashMap;
import java.util.Hashtable;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Stack;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
import org.eclipse.jdt.core.dom.AnonymousClassDeclaration;
import org.eclipse.jdt.core.dom.ArrayAccess;
import org.eclipse.jdt.core.dom.ArrayCreation;
import org.eclipse.jdt.core.dom.ArrayInitializer;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.Assignment;
import org.eclipse.jdt.core.dom.BooleanLiteral;
import org.eclipse.jdt.core.dom.CastExpression;
import org.eclipse.jdt.core.dom.CatchClause;
import org.eclipse.jdt.core.dom.CharacterLiteral;
import org.eclipse.jdt.core.dom.ClassInstanceCreation;
import org.eclipse.jdt.core.dom.ConditionalExpression;
import org.eclipse.jdt.core.dom.Expression;
import org.eclipse.jdt.core.dom.FieldAccess;
import org.eclipse.jdt.core.dom.IBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
//import org.eclipse.jdt.core.dom.IPackageBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.InstanceofExpression;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NullLiteral;
import org.eclipse.jdt.core.dom.NumberLiteral;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PostfixExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.PrimitiveType.Code;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SimpleType;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.Type;
import org.eclipse.jdt.core.dom.TypeLiteral;
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;

import net.sf.j2s.core.astvisitors.adapters.Bindings;
//import net.sf.j2s.core.astvisitors.adapters.ExtendedAdapter;
import net.sf.j2s.core.astvisitors.adapters.FieldAdapter;
import net.sf.j2s.core.astvisitors.adapters.FinalVariable;
import net.sf.j2s.core.astvisitors.adapters.J2SMapAdapter;
import net.sf.j2s.core.astvisitors.adapters.TypeAdapter;
import net.sf.j2s.core.astvisitors.adapters.VariableAdapter;

//BH 11/18/2017 -- adds full name-qualified support for generics, including generic methods   
//BH 9/10/2017 -- adds full byte, short, and int distinction using class-level local fields $b$, $s$, and $i$, which are IntXArray[1].

/**
 * This class will traverse most of the common keyword and common expression,
 * processing all interconversion among primitive types byte char short int, and
 * long as well as all boxing and unboxing of Character/char, Integer/int, etc.
 * 
 * @author zhou renjian
 * @author Bob Hanson
 *
 */
public class ASTKeywordVisitor extends ASTJ2SDocVisitor {

	private final static String CHARCODEAT0 = ".$c()";

	private final static String defaultNonQualified = "javajs.api.js;swingjs.api.js;swingjs.JSToolkit;";

	private static String[] nonQualifiedPackages;

	private final static String[] nonQualifiedClasses = new String[] {
			// these classes need no qualification
			"java.lang.Boolean", "java.lang.Byte", "java.lang.Character", "java.lang.Double", "java.lang.Float",
			"java.lang.Integer", "java.lang.Long", "java.lang.Math", "java.lang.Number", "java.lang.reflect.Array",
			"java.lang.Short", "java.lang.System", "java.lang.String", "java.lang.Void",

			// I have no idea why these are here
			"java.util.Date", // TODO _- really???
			"java.util.EventListenerProxy", "java.util.EventObject" 
		};

	private static final String primitiveTypeEquivalents = "Boolean,Byte,Character,Short,Integer,Long,Float,Double,Void,";

	private static final String getPrimitiveTYPE(String name) {
		int pt = primitiveTypeEquivalents.indexOf(name.substring(1)) - 1;
		String type = primitiveTypeEquivalents.substring(pt);
		return type.substring(0, type.indexOf(",")) + ".TYPE";
	}

	private boolean isArray = false;
	protected int blockLevel = 0;
	protected int currentBlockForVisit = -1;

	public String parentClassName;


	/**
	 * used in case we are applying a private outer class method
	 * 
	 */
	protected String b$name;
	
	
	protected Stack<String> methodDeclareNameStack = new Stack<String>();

	/**
	 * holds all static field definitions for insertion at the end of the class
	 * def and allows setting of local typed integer arrays for fast processing
	 * of bytes
	 * 
	 */
	protected TrailingBuffer trailingBuffer = new TrailingBuffer();

	/**
	 * TrailingBuffer holds definitions that need to come after all methods are
	 * defined, with blocks defined just once for any given class.
	 * 
	 * The buffer also provides a very efficient way to do byte, short, and int
	 * operation processing by using the trick that if we have defined
	 * 
	 * var $b$ = new Int8Array(1)
	 * 
	 * then we can use that to "filter" a (necessarily) 32-bit integer
	 * JavaScript variable to reproduce the effect of being a byte or short or
	 * int. This is done as follows:
	 * 
	 * Java:
	 * 
	 * byte b = (byte) 300;
	 * 
	 * JavaScript:
	 * 
	 * var b = ($b$[0] = 300, $b$[0]);
	 * 
	 * This works because Int8Arrays really are bytes, and they can only hold
	 * bytes. So
	 * 
	 * $b$[0] = 300
	 * 
	 * sets $b$[0] to be 44, and ($b$[0] = 300, $b$[0]) then passes that value
	 * on to the receiving variable b (which itself is a 32-bit integer,
	 * actually).
	 * 
	 * It was a surprise to me that the "(..., $b$[0])" business was necessary.
	 * However, it turns out that
	 * 
	 * b = $b$[0] = 300;
	 * 
	 * is really short for the two (undesired) independent processes:
	 * 
	 * b = 300; $b$[0] = 300;
	 *
	 * not the (desired) sequential pair
	 * 
	 * $b$[0] = 300; b = $b$[0];
	 * 
	 * But
	 * 
	 * var b = ($b$[0] = 300, $b$[0]);
	 * 
	 * is precisely this second meaning.
	 * 
	 * 
	 * We turn this action off using the field isArray so that these don't get
	 * nested.
	 * 
	 * @author Bob Hanson
	 *
	 */
	class TrailingBuffer {
		private StringBuffer buf;
		private String added = "";

		boolean hasAssert;

		TrailingBuffer() {
			buf = new StringBuffer();
		}

		TrailingBuffer append(String s) {
			buf.append(s);
			return this;
		}

		String getAssertString() {
			return (hasAssert ? "C$.$_ASSERT_ENABLED_ = ClassLoader.$getClassAssertionStatus(C$);\r\n" : "");
		}

		public String toString() {
			return getAssertString() + added + buf;
		}

		protected void addType(String name) {
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
			case 'i': // $i$ // abandoned - using |0
				added += " = new Int32Array(1)";
				break;
			default:
			case 'p': // $p$
				break;
			}
			added += ";\r\n";
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
			buffer.append(clazzArray(binding, 0));
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
		buffer.append(clazzArray(node.resolveTypeBinding(), -1));
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
		IVariableBinding toBinding = getLeftVariableBinding(left, leftTypeBinding);
		String op = node.getOperator().toString();
		String opType = (op.length() == 1 ? null : op.substring(0, op.length() - 1));
		boolean needParenthesis = false;
		if (checkStaticBinding(toBinding)) {
			// Static def new Test_Static().y++;
			ASTNode parent = node.getParent();
			needParenthesis = (!haveDirectStaticAccess(left)) && !(parent instanceof Statement);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
		} else {
			toBinding = null;
		}

		// take care of "=" first

		if (opType == null) {
			left.accept(this);
			buffer.append(" = ");
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
				addPrimitiveTypedExpression(left, toBinding, leftName, opType, right, rightName, null, true);
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
						buffer.append(VariableAdapter.getConstantValue(right));
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
			String constValue = VariableAdapter.getConstantValue(right);
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

	public boolean visit(BooleanLiteral node) {
		buffer.append(node.booleanValue());
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
				addPrimitiveTypedExpression(null, null, nameTO, null, expression, nameFROM, null, false);
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
		// tricky part here is that the overall expression should have a target,
		// not the individual ones.
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
			// e.g. i += 3 + y + ++(new >>Test_Static<<().y);
			buffer.append('(');
		} else {
			varBinding = null;
		}

		expression.accept(this);

		if (varBinding != null) {
			buffer.append(", ");
			addQualifiedNameFromBinding(varBinding);
			buffer.append(')');
		}
		buffer.append(".");
		node.getName().accept(this);
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

		String constValue = VariableAdapter.getConstantValue(node);
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
			addPrimitiveTypedExpression(left, null, leftName, operator, right, rightName, extendedOperands, false);
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

	public boolean visit(InstanceofExpression node) {
		Type right = node.getRightOperand();
		ITypeBinding binding = right.resolveBinding();
		if (binding == null)
			return false;
		buffer.append("Clazz.instanceOf(");
		node.getLeftOperand().accept(this);
		buffer.append(", ");
		if (right instanceof ArrayType) {
			buffer.append(clazzArray(binding, 1));
		} else {
			buffer.append("\"" + removeBrackets(binding.getQualifiedName()) + "\"");
			// right.accept(this);
		}
		buffer.append(")");
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

	public boolean visit(ParenthesizedExpression node) {
		buffer.append("(");
		node.getExpression().accept(this);
		buffer.append(")");
		return false;
	}

	/**
	 * Postfix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * PostfixOperator:
	 *    <b><code>++</code></b>  <code>INCREMENT</code>
	 *    <b><code>--</code></b>  <code>DECREMENT</code>
	 * </pre>
	 */
	public boolean visit(PostfixExpression node) {
		return addPrePost(node, node.getOperand(), node.getOperator().toString(), true);
	}

	/**
	 * Prefix operators (typesafe enumeration).
	 * 
	 * <pre>
	 * PrefixOperator:
	 *    <b><code>++</code></b>  <code>INCREMENT</code>
	 *    <b><code>--</code></b>  <code>DECREMENT</code>
	 *    <b><code>+</code></b>  <code>PLUS</code>
	 *    <b><code>-</code></b>  <code>MINUS</code>
	 *    <b><code>~</code></b>  <code>COMPLEMENT</code>
	 *    <b><code>!</code></b>  <code>NOT</code>
	 * </pre>
	 */
	public boolean visit(PrefixExpression node) {
		// Q: Can you really have a constant here?
		String constValue = VariableAdapter.getConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}
		String op = node.getOperator().toString();
		if ("~".equals(op)) {
			buffer.append(op);
			return super.visit(node);
		}
		return addPrePost(node, node.getOperand(), node.getOperator().toString(), false);
	}

	public boolean visit(QualifiedName node) {
		// page.x =...
		if (FieldAdapter.isSimpleQualified(node)) {
			String constValue = VariableAdapter.getConstantValue(node);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}
		}
		IBinding nameBinding = node.resolveBinding();
		IVariableBinding varBinding = (nameBinding instanceof IVariableBinding ? (IVariableBinding) nameBinding : null);
		ASTNode parent = node.getParent();
		Name qualifier = node.getQualifier();
		if (!checkStaticBinding(varBinding) || qualifier.resolveBinding() instanceof ITypeBinding)
			varBinding = null;
		boolean skipQualifier = false;// (allowExtensions &&
										// ExtendedAdapter.isHTMLClass(qualifier.toString(),
										// true));
		String className = null;
		if (!skipQualifier && parent != null && !(parent instanceof QualifiedName)) {
			while (qualifier instanceof QualifiedName) {
				IBinding binding = qualifier.resolveBinding();
				if (binding != null && !(binding instanceof IVariableBinding)) {
					Name xqualifier = ((QualifiedName) qualifier).getQualifier();
					if (xqualifier instanceof QualifiedName) {
						IBinding xbinding = xqualifier.resolveBinding();
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
					className = typeBinding.getQualifiedName();
					// if (allowExtensions)
					// className = ExtendedAdapter.trimName(className, false);
					// // ??
					// probably
					// should
					// be
					// true
					if (className.indexOf("java.lang.") == 0) {
						className = className.substring(10);
					}
					if (isStatic(nameBinding)) {
						className = getQualifiedStaticName(null, className, true, true, false);
					}
				}
			}
		}

		if (!skipQualifier) {
			if (varBinding != null) {
				if (qualifier instanceof SimpleName) {
					addQualifiedNameFromBinding(varBinding);
					// buffer.append("<qsn<");
				} else {
					buffer.append('(');
					if (className == null)
						qualifier.accept(this);
					else
						buffer.append(className);
					buffer.append(", ");
					addQualifiedNameFromBinding(varBinding);
					buffer.append(')');
				}
			} else if (className == null) {
				node.getQualifier().accept(this);
			} else {
				buffer.append(className);
			}
			buffer.append('.');
		}
		node.getName().accept(this);
		return false;
	}

	public boolean visit(SimpleName node) {
		// var x = ...
		// this.pages ....
		buffer.append(getQualifiedSimpleName(node));
		return false;
	}

	/**
	 * also sets b$name
	 * 
	 * @param node
	 * @return
	 */
	protected String getQualifiedSimpleName(SimpleName node) {
		// xxx.yyy.zzz...
		String constValue = VariableAdapter.getConstantValue(node);
		if (constValue != null) {
			return constValue;
		}
		IBinding binding = node.resolveBinding();
		// if (allowExtensions && binding instanceof ITypeBinding
		// && ExtendedAdapter.isHTMLClass(((ITypeBinding)
		// binding).getQualifiedName(), false)) {
		// return node.getIdentifier();
		// }
		ASTNode xparent = node.getParent();
		if (xparent == null) {
			return node.toString();
		}
		char leadingChar = (buffer.length() == 0 ? '\0' : buffer.charAt(buffer.length() - 1));
		boolean isQualified = (leadingChar == '.');
		// looking for "." or '"' here.
		if (isQualified && xparent instanceof QualifiedName) {
			if (!(binding instanceof IVariableBinding))
				return node.toString();
			IVariableBinding varBinding = (IVariableBinding) binding;
			ITypeBinding declaringClass = varBinding.getVariableDeclaration().getDeclaringClass();
			return getCheckedFieldName(J2SMapAdapter.getJ2SName(node), declaringClass);
		}
		if (xparent instanceof ClassInstanceCreation && !(binding instanceof IVariableBinding)) {
			String name = (binding == null ? J2SMapAdapter.getJ2SName(node)
					: node.resolveTypeBinding().getQualifiedName());
			return assureQualifiedName(name);
		}
		if (binding == null) {
			String name = getShortenedQualifiedName(J2SMapAdapter.getJ2SName(node));
			return getValidFieldName$Qualifier(name, true);
		}
		if (binding instanceof IVariableBinding)
			return simpleNameInVarBinding(node, leadingChar, (IVariableBinding) binding);
		if (binding instanceof IMethodBinding)
			return simpleNameInMethodBinding(node, isQualified, (IMethodBinding) binding);

		ITypeBinding typeBinding = node.resolveTypeBinding();
		// >>Math<<.max
		return getValidFieldName$Qualifier(typeBinding == null ? node.getFullyQualifiedName()
				: assureQualifiedName(typeBinding.getQualifiedName()), true);
	}

	protected String getCheckedFieldName(String fieldName, ITypeBinding classBinding) {
		String name = getValidFieldName$Qualifier(fieldName, false);
		if (classBinding != null) {
			if (J2SMapAdapter.checkInheritedMethodNameCollision(classBinding, fieldName)) {
				name += "$";
			}
			if (isInheritedFieldName(classBinding, fieldName))
				fieldName = J2SMapAdapter.getFieldName$Appended(classBinding, fieldName);
		}
		return name + fieldName;
	}

	/**
	 * TODO: This complicated method needs documenting
	 * 
	 * @param node
	 * @param isQualified
	 * @param mBinding
	 * @return
	 */
	private String simpleNameInMethodBinding(SimpleName node, boolean isQualified, IMethodBinding mBinding) {
		String name = getShortenedQualifiedName(J2SMapAdapter.getJ2SName(node));
		String ret = "";
		if (isStatic(mBinding)) {
			IMethodBinding variableDeclaration = mBinding.getMethodDeclaration();
			ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
			boolean isClassString = false;
			if (declaringClass != null) {
				isClassString = "java.lang.String".equals(declaringClass.getQualifiedName());
				ASTNode parent = node.getParent();
				if (parent instanceof MethodInvocation) {
					MethodInvocation mthInv = (MethodInvocation) parent;
					if (mthInv.getExpression() == null) {
						String cname = declaringClass.getQualifiedName();
						cname = assureQualifiedName(cname);
						if (cname.length() > 0)
							ret = cname + ".";
					}
				}
			}
			if (isClassString && "$valueOf".equals(name))
				name = "valueOf";
		} else {
			ASTNode parent = node.getParent();
			boolean checkNameViolation = false;
			if (parent != null && !(parent instanceof FieldAccess)) {
				IMethodBinding methodDeclaration = mBinding.getMethodDeclaration();
				ITypeBinding declaringClass = methodDeclaration.getDeclaringClass();
				if (!isQualified && declaringClass != null && getUnqualifiedClassName() != null) {
					String className = declaringClass.getQualifiedName();
					checkNameViolation = !("java.lang.String".equals(className) && "valueOf".equals(name));
					ret = getClassNameAndDot(parent, declaringClass, Modifier.isPrivate(mBinding.getModifiers()));
				}
			}
			if (checkNameViolation)
				ret += getValidFieldName$Qualifier(name, false);
		}
		return ret + name;
	}

	/**
	 * TODO: This complex method needs documenting
	 * 
	 * @param node
	 * @param ch
	 * @param varBinding
	 * @return
	 */
	private String simpleNameInVarBinding(SimpleName node, char ch, IVariableBinding varBinding) {
		String name = null;
		String ret = "";
		IVariableBinding variableDeclaration = varBinding.getVariableDeclaration();
		ITypeBinding declaringClass = variableDeclaration.getDeclaringClass();
		if (isStatic(varBinding)) {
			if (ch != '.' && ch != '"' && ch != '\'' && declaringClass != null) {
				name = declaringClass.getQualifiedName();
				if ((name == null || name.length() == 0) && declaringClass.isAnonymous()) {
					name = declaringClass.getBinaryName();
				}
				name = assureQualifiedName(name);
				if (name.length() != 0) {
					ret = getQualifiedStaticName(null, name, true, true, false) + ".";
					//ch = '.';
				}
			}
		} else {
			ASTNode parent = node.getParent();
			if (parent != null && !(parent instanceof FieldAccess)) {
				if (declaringClass != null && getUnqualifiedClassName() != null && ch != '.') {
					ret = getClassNameAndDot(parent, declaringClass, false);
					//ch = '.';
				}
			}
			String fieldVar = null;
			if (isAnonymousClass() && Modifier.isFinal(varBinding.getModifiers())
					&& varBinding.getDeclaringMethod() != null) {
				String key = varBinding.getDeclaringMethod().getKey();
				if (methodDeclareNameStack.size() == 0 || !key.equals(methodDeclareNameStack.peek())) {
					buffer.append("this.$finals.");
					if (currentBlockForVisit != -1) {
						List<FinalVariable> finalVars = getVariableList('f');
						List<FinalVariable> visitedVars = getVariableList('v');
						int size = finalVars.size();
						for (int i = 0; i < size; i++) {
							FinalVariable vv = finalVars.get(size - i - 1);
							if (vv.variableName.equals(varBinding.getName()) && vv.blockLevel <= currentBlockForVisit) {
								if (!visitedVars.contains(vv)) {
									visitedVars.add(vv);
								}
								fieldVar = vv.toVariableName;
							}
						}
					}
				}
			}
			if (declaringClass == null)
				name = (fieldVar == null ? getNormalVariableName(node.getIdentifier()) : fieldVar);
		}
		if (declaringClass != null)
			name = J2SMapAdapter.getJ2SName(node);
		ret += getCheckedFieldName(name, declaringClass);//, ch != '.');
		return ret;
	}

	public boolean visit(SimpleType node) {
		ITypeBinding binding = node.resolveBinding();
		buffer.append(binding == null ? node : assureQualifiedName(binding.getQualifiedName()));
		return false;
	}

	public boolean visit(StringLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	/**
	 *  SuperFieldAccess:
     *
     *[ ClassName . ] super . Identifier
     *
	 */
	public boolean visit(SuperFieldAccess node) {
		ITypeBinding classBinding = resolveAbstractOrAnonymousBinding(node);
		String fieldName = J2SMapAdapter.getJ2SName(node.getName());
		buffer.append("this.");
		if (isInheritedFieldName(classBinding, fieldName)) {
			if (classBinding != null) {
				IVariableBinding[] declaredFields = classBinding.getDeclaredFields();
				for (int i = 0; i < declaredFields.length; i++) {
					String superFieldName = J2SMapAdapter.getJ2SName(declaredFields[i]);
					if (fieldName.equals(superFieldName)) {
						buffer.append(getValidFieldName$Qualifier(fieldName, false));
						buffer.append(J2SMapAdapter.getFieldName$Appended(classBinding.getSuperclass(), fieldName));
						return false;
					}
				}
			}
		}
		buffer.append(getValidFieldName$Qualifier(fieldName, true));
		return false;
	}

	/**
	 *   this or ClassName.this   
	 * 
	 */
	public boolean visit(ThisExpression node) {
		Name className = node.getQualifier();
		if (className != null) {
			ASTNode classNode = getAbstractOrAnonymousParentForNode(node);
			if (classNode != null && classNode.getParent() != null // CompilationUnit
					&& classNode.getParent().getParent() != null) {
				// just checking for top level? 
				buffer.append(getSyntheticReference(node.resolveTypeBinding().getQualifiedName()));
				return false;
			}
		}
		buffer.append("this");
		return false;
	}


	public boolean visit(TypeLiteral node) {
		// Class x = Foo.class
		Type type = node.getType();
		ITypeBinding binding = type.resolveBinding();
		if (type.isPrimitiveType()) {
			// adds Integer.TYPE, Float.TYPE, etc.
			buffer.append(getPrimitiveTYPE(binding.getName()));
		} else if (type instanceof ArrayType) {
			// int[][].class --> Clazz.array(Integer.TYPE, -2);
			buffer.append(clazzArray(binding, 1));
		} else {
			// BH we are creating a new Class object around this class
			// if it is an interface, then we explicitly add .$methodList$
			buffer.append("Clazz.getClass(" + getQualifiedStaticName(null,
					ensureNameIfLocal(binding.getQualifiedName(), binding, node.getParent()), true, true, false));
			if (binding.isInterface())
				addInterfaceMethodListForLiteral(binding);
			buffer.append(")");
		}
		return false;
	}

	private void addInterfaceMethodListForLiteral(ITypeBinding binding) {
		//System.err.println("interface literal -- adding methods for " + binding.getQualifiedName());
		buffer.append(",[");
		IMethodBinding[] methods = binding.getDeclaredMethods();
		for (int i = 0; i < methods.length; i++) {
			if (i > 0)
				buffer.append(",");
			String name = getJ2SQualifiedName(methods[i].getName(), null, methods[i], null, true);
			buffer.append("'").append(name).append("'");
		}
		buffer.append("]");
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
		FinalVariable f = new FinalVariable(blockLevel, identifier,
				methodDeclareNameStack.size() == 0 ? null : (String) methodDeclareNameStack.peek());
		addVariable(f, identifier, binding);
		name.accept(this);
		Expression right = node.getInitializer();
		ITypeBinding rightBinding = (right == null ? null : right.resolveTypeBinding());
		if (rightBinding == null)
			return false;
		buffer.append(" = ");
		addExpressionAsTargetType(right, name.resolveTypeBinding(), "v", null);
		return false;
	}

	////////// END visit/endVisit ///////////

	private boolean addPrePost(Expression node, Expression left, String op, boolean isPost) {
		ASTNode parent = node.getParent();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		IVariableBinding varBinding = getLeftVariableBinding(left, leftTypeBinding);
		boolean isChar = (leftTypeBinding != null && leftTypeBinding.isPrimitive()
				&& "char".equals(leftTypeBinding.getName()));
		String term = "";
		if (checkStaticBinding(varBinding)) {
			if ((isChar || !haveDirectStaticAccess(left))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression)) {
				buffer.append("(");
				term = ")";
			}
			addLeftSidePrefixName(left);
		} else {
			varBinding = null;
		}

		if (isPost) {
			if (isChar) {
				addCharacterPrePostFix(left, parent, varBinding, op, false);
			} else {
				addFieldName(left, varBinding);
				buffer.append(op);
			}
		} else {
			if (isChar) {
				if (varBinding == null)
					buffer.append("(");
				addCharacterPrePostFix(left, (varBinding == null ? parent : null), varBinding, op, true);
				if (varBinding == null)
					buffer.append(")");
			} else {
				buffer.append(op);
				addFieldName(left, varBinding);
			}

		}
		buffer.append(term);
		return false;
	}

	private static boolean isBoxTyped(Expression exp) {
		return exp.resolveBoxing() || exp.resolveUnboxing();
	}

	protected final static boolean isMethodQualified(String className, String methodName) {
		for (int i = nonQualifiedClasses.length; --i >= 0;) {
			String s = nonQualifiedClasses[i];
			if (className.equals(s)) {
				// leave selected String methods the same
				return (className.equals("java.lang.String")
						&& "charAt,codePointAt,format,getBytes,substring,indexOf,lastIndexOf,toUpperCase,toLowerCase,trim,valueOf"
								.indexOf(methodName) < 0);
			}
		}
		return true;
	}

	protected static boolean isNumericType(String type) {
		return (type != null && type.length() > 1 && "int long byte short".indexOf(type) >= 0);
	}

	/**
	 * Check to see if this class is in a package for which we exclude parameter
	 * qualification
	 * 
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
	 *
	 * @param type
	 * @param dimFlag
	 *            -1 : initialized depth; n > 0 uninitialized depth; 0: not
	 *            necessary
	 * @return JavaScript for array creation
	 */
	private String clazzArray(ITypeBinding type, int dimFlag) {
		ITypeBinding ebinding = type.getElementType();
		String params = (ebinding.isPrimitive() ? getPrimitiveTYPE(ebinding.getName())
				: getQualifiedStaticName(null, ebinding.getQualifiedName(), true, true, false))
				+ (dimFlag == 0 ? "" : ", " + Math.abs(dimFlag) * type.getDimensions() * -1);
		return "Clazz.array(" + params + (dimFlag > 0 ? ")" : "");
	}

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

	////////////////////////////////

	/**
	 * 
	 * @param left
	 * @param parent
	 *            null for prefix
	 * @param varBinding
	 * @param op
	 * @param b
	 */
	private void addCharacterPrePostFix(Expression left, ASTNode parent, IVariableBinding varBinding, String op,
			boolean isPrefix) {
		boolean addAnonymousWrapper = !isPrefix && !(parent instanceof Statement);
		if (addAnonymousWrapper) {
			buffer.append("($p$ = ");
			addFieldName(left, varBinding);
			buffer.append(", ");
			trailingBuffer.addType("p");
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

	/**
	 * check to change charAt to charCodeAt
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

	/**
	 * Append an expression, coercing to primitive numeric types of the target
	 * parameter if needed. Used for Method arguments and return values, as well
	 * as variable declaration fragments, where we know the target type and no
	 * operator is involved.
	 * 
	 * 
	 * @param exp
	 * @param targetType
	 *            ITypeBinding or TYPE or string
	 * @param op
	 *            just an identifier of the context: = for assignment, r for
	 *            return statement, v for variable declaration fragment, p for
	 *            method parameter, q for first parameter of indexOf or
	 *            lastIndexOf, which are officially ints
	 */
	protected void addExpressionAsTargetType(Expression exp, Object targetType, String op, List<?> extendedOperands) {
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
			String rightName = expTypeBinding.getName();
			if (rightName.equals("char") && op == "q") {
				boxingNode(exp, false);
				return;
			}
			String paramName = (exp.resolveTypeBinding().isArray() ? ";"
					: targetType instanceof ITypeBinding ? ((ITypeBinding) targetType).getName()
							: targetType.toString());
			boolean isNumeric = isNumericType(paramName);
			if ((isNumeric || paramName.equals("char")) && !isBoxTyped(exp)) {
				// using operator "m" to limit int application of $i$

				addPrimitiveTypedExpression(null, null, paramName, op, exp, rightName, extendedOperands, false);
			} else {
				// char f() { return Character }
				// Character f() { return char }
				// int f() { return Character }
				boxingNode(exp, isNumeric);
			}
		}
	}

	private void addExtendedOperands(List<?> extendedOperands, String operator, char pre, char post,
			boolean isToString) {
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

	private void addFieldName(Expression left, IVariableBinding qualifier) {
		if (qualifier != null) {
			addQualifiedNameFromBinding(qualifier);
			buffer.append('.');
			left = (left instanceof QualifiedName ? ((QualifiedName) left).getName()
					: left instanceof FieldAccess ? ((FieldAccess) left).getName() : left);
		}
		boxingNode(left, false);
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

	@SuppressWarnings("null")
	protected void addMethodArguments(ITypeBinding[] parameterTypes, boolean methodIsVarArgs, List<?> arguments,
			boolean isIndexOf) {
		String post = ", ";
		int nparam = parameterTypes.length;
		int argCount = arguments.size();
		for (int i = 0; i < nparam; i++) {
			ITypeBinding paramType = parameterTypes[i];
			Expression arg = (i < argCount ? (Expression) arguments.get(i) : null);
			String op = (isIndexOf && i == 0 ? "q" : "p");
			if (i == nparam - 1) {
				// BH: can't just check for an array; it has to be an array with
				// the right number of dimensions
				if (nparam != argCount || methodIsVarArgs && paramType.isArray()
						&& arg.resolveTypeBinding().getDimensions() != paramType.getDimensions()
						&& !(arg instanceof NullLiteral)) {
					buffer.append("[");
					for (int j = i; j < argCount; j++) {
						addExpressionAsTargetType((Expression) arguments.get(j), paramType, op, null);
						if (j != argCount - 1) {
							buffer.append(", ");
						}
					}
					buffer.append("]");
					break;
				}
				post = "";
			}
			addExpressionAsTargetType(arg, paramType, op, null);
			buffer.append(post);
		}
	}

	/**
	 * Do not allow char or Character in a switch or array; instead use int
	 * 
	 * @param exp
	 */
	protected void addNonCharacter(Expression exp) {
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
		// oddly enough, 'c' is considered a simple
		if (exp instanceof CharacterLiteral) {
			buffer.append(0 + ((CharacterLiteral) exp).charValue());
		} else if (exp instanceof SimpleName || exp instanceof QualifiedName) {
			int pt = buffer.length();
			boxingNode(exp, false);
			if (pt == buffer.length() - 3 && buffer.charAt(pt) == '\'') {
				char c = buffer.charAt(pt + 1);
				buffer.setLength(pt);
				buffer.append((int) c);
			} else {
				buffer.append(CHARCODEAT0);
			}
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

	/**
	 * fix the buffer for number/char issue when generating simple this.foo =
	 * <constantValue>
	 * 
	 * @param code
	 */
	protected void fixPrimitiveRightSide(Code code) {
		if (code != PrimitiveType.BOOLEAN) {
			boolean isCharConst = (buffer.charAt(buffer.length() - 1) == '\'');
			if (isCharConst != (getPrimitiveDefault(code).charAt(0) == '\'')) {
				if (!isCharConst) {
					// char c = 33;
					buffer.insert(buffer.lastIndexOf(" ") + 1, "String.fromCharCode(");
					buffer.append(")");
				} else if (code == PrimitiveType.BYTE) {
					// byte b = 'c'
					buffer.insert(buffer.lastIndexOf(" ") + 1, "($b$[0] = ");
					buffer.append(".$c(), $b$[0])");
					trailingBuffer.addType("b");
				} else {
					// int b = 'c'
					buffer.append(".$c()");
				}
			}
		}
	}

	protected String getPrimitiveDefault(Code code) {
		return (code == PrimitiveType.BOOLEAN ? "false" : code == PrimitiveType.CHAR ? "'\\0'" : "0");
	}

	/**
	 * A general method to handle implicit casting.
	 * 
	 * @param left
	 * @param assignmentBinding
	 * @param leftName
	 * @param op
	 * @param right
	 * @param rightName
	 */
	private void addPrimitiveTypedExpression(Expression left, IVariableBinding assignmentBinding, String leftName,
			String op, Expression right, String rightName, List<?> extendedOperands, boolean isAssignment) {
		// byte|short|int|long /= ...
		// convert to proper number of bits

		// byte a |= right

		// becomes

		// a = ($b$[0] = a | right, $b$[0])

		String classIntArray = null;
		String more = null;
		boolean fromChar = ("char".equals(rightName));
		boolean fromIntType = ("long int short byte".indexOf(rightName) >= 0);
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
			// double, float
			break;
		case "long":
			if (!fromIntType || isDiv) {
				more = "|0)";
				addParens = true;
			}
			break;
		case "int":
			if (op != null && (!isDiv && fromIntType) || fromChar || rightName.equals("short") || right.equals("byte"))
				break;
			more = "|0)";
			addParens = true;
			break;
		case "short":
			if (right.equals("byte") && !isDiv)
				break;
			//$FALL-THROUGH$
		case "byte":
			if (isArray) {
				more = "|0)";
				addParens = true;
			} else {
				classIntArray = "$" + leftName.charAt(0) + "$[0]"; // $i$, etc.
				trailingBuffer.addType(leftName);
			}
			break;
		}
		boolean wasArray = isArray;
		if (classIntArray != null) {
			if (addParens)
				buffer.append("(");
			buffer.append(classIntArray).append(" = ");
			isArray = true;
		} else if (more == "|0)") {
			buffer.append("(");
		}
		if (left != null) {
			// a += b
			addFieldName(left, assignmentBinding);
			buffer.append(op);
			if (isAssignment)
				buffer.append("(");
		}
		if (!boxingNode(right, fromChar) && fromChar && !toChar) {
			buffer.append(CHARCODEAT0);
		}
		if (extendedOperands != null) {
			addExtendedOperands(extendedOperands, op, ' ', ' ', false);
		}
		if (left != null && isAssignment) {
			buffer.append(")");
		}
		if (classIntArray != null) {
			// this is necessary because in JavaScript, (a=3.5) will be 3.5, not
			// a:
			// a = new Int8Array(1)
			// (a[0]=3.4, a[0])
			// 3
			// (a[0]=3.4)
			// 3.4
			buffer.append(", ").append(classIntArray);
			if (addParens)
				buffer.append(")");
			isArray = wasArray;
		} else if (more != null)
			buffer.append(more);
	}

	/**
	 * for example: new Test_Static().y++
	 * 
	 * @param varBinding
	 */
	private void addQualifiedNameFromBinding(IVariableBinding varBinding) {
		appendShortenedQualifiedName(global_PackageName, varBinding.getDeclaringClass().getQualifiedName(),
				isStatic(varBinding), true);
	}

	protected void addVariable(FinalVariable f, String identifier, IBinding binding) {
		List<FinalVariable> finalVars = getVariableList('f');
		List<FinalVariable> normalVars = getVariableList('n');
		f.toVariableName = getIndexedVarName(identifier, normalVars.size());
		normalVars.add(f);
		if (Modifier.isFinal(binding.getModifiers()))
			finalVars.add(f);
	}

	/**
	 * Determine the qualifier for a method or variable. 
	 * 
	 * In the case of private methods, this is "p$.";
	 * for general fields, this will be "this."; for fields in outer classes, we need a synthetic 
	 * references, this.b$[className] that points to the outer object, which may be one or more levels
	 * higher than this one. 
	 * 
	 * Anonymous inner classes may reference either a superclass method/field or one in its declaring class
	 * stack.   
	 *  
	 * @param node either a method or field or local variable
	 * @param declaringClass the class that declares this variable
	 * @param isPrivate
	 * @return qualifier for method or variable
	 */
	protected String getClassNameAndDot(ASTNode node, ITypeBinding declaringClass, boolean isPrivate) {
		
		String name = declaringClass.getQualifiedName();
		String ret = "";
		int superLevel = 0;
		boolean isThis = false;
		
		// Search parents of this node for an anonymous or abstract class declaration
		while (node != null) {
			boolean isAnonymous = (node instanceof AnonymousClassDeclaration);
			ITypeBinding typeBinding = (isAnonymous ? ((AnonymousClassDeclaration) node).resolveBinding()
					: node instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) node).resolveBinding()
							: null);
			if (typeBinding != null) {
				superLevel++;
				if (Bindings.isSuperType(declaringClass, typeBinding)) {
					if (superLevel == 1) {
						ret = (isPrivate ? "p$." : "this.");
						isThis = true;
					}
					name = typeBinding.getQualifiedName();
					if (isAnonymous)
						name = ensureNameIfLocal(name, typeBinding, node);
					break;
				}
			}
			node = node.getParent();
		}
		return (isThis ? ret : getSyntheticReference(name) + ".");
	}

	private String ensureNameIfLocal(String name, ITypeBinding typeBinding, ASTNode parent) {
		if ((name == null || name.length() == 0) && typeBinding.isLocal()) {
			name = typeBinding.getBinaryName();
			int idx0 = name.lastIndexOf(".");
			if (idx0 == -1) {
				idx0 = 0;
			}
			int idx1 = name.indexOf('$', idx0);
			if (idx1 != -1) {
				int idx2 = name.indexOf('$', idx1 + 1);
				String parentAnon = "";
				if (idx2 == -1) { // maybe the name is already
									// "$1$2..." for Java5.0+ in
									// Eclipse 3.2+
					parent = parent.getParent();
					while (parent != null) {
						if (parent instanceof AbstractTypeDeclaration) {
							break;
						} else if (parent instanceof AnonymousClassDeclaration) {
							AnonymousClassDeclaration atype = (AnonymousClassDeclaration) parent;
							ITypeBinding aTypeBinding = atype.resolveBinding();
							String aName = aTypeBinding.getBinaryName();
							parentAnon = aName.substring(aName.indexOf('$')) + parentAnon;
						}
						parent = parent.getParent();
					}
					name = name.substring(0, idx1) + parentAnon + name.substring(idx1);
				}
			}
		}
		return name;
	}

	/**
	 * Append a shortened qualified name, possibly using Clazz.load for dynamic
	 * loading
	 * 
	 * @param packageName
	 * @param name
	 * @param isStatic
	 * @param doCache
	 */
	protected void appendShortenedQualifiedName(String packageName, String name, boolean isStatic, boolean doCache) {
		name = removeBrackets(name);
		String shortName = (doCache ? assureQualifiedName(name) : assureQualifiedNameNoC$(packageName, name));
		if (isStatic && (shortName.length() < 2 || shortName.charAt(1) != '$')) {
			if (!doCache || isClassKnown(name))
				name = shortName;
			getQualifiedStaticName(null, name, true, doCache, true);
		} else {
			buffer.append(shortName);
		}
	}

	protected String getSyntheticReference(String className) {
		b$name = (className.equals(parentClassName) ? ".this$0" : ".b$['" + assureQualifiedNameNoC$(null, className) + "']");
		return "this" + b$name;
	}

	/**
	 * box or unbox as necessary
	 * 
	 * @param element
	 * @param toCharCode
	 *            true to append .c$(), not .valueOf();
	 * @return true if boxing or unboxing
	 */
	protected boolean boxingNode(ASTNode element, boolean toCharCode) {
		// Double > x will be unboxed
		// Character == 'c' will be unboxed
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
					getBuffer().append(toCharCode && name == "char" ? ")" + CHARCODEAT0 : ")." + name + "Value()");
					return true;
				}
			}
			String constValue = VariableAdapter.getConstantValue(exp);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}

		}
		element.accept(this);
		return false;
	}

	private boolean checkSimpleBooleanOperator(String op) {
		return (op.equals("^") || op.equals("|") || op.equals("&"));
	}

	/**
	 * Check to see if we have a static variable.
	 * 
	 * @param varBinding
	 * @return
	 */
	protected boolean checkStaticBinding(IVariableBinding varBinding) {
		// ITypeBinding declaring;
		return (isStatic(varBinding) && varBinding.getDeclaringClass() != null
		// && (!allowExtensions ||
		// !ExtendedAdapter.isHTMLClass(declaring.getQualifiedName(), false))
		);
	}

	/**
	 * may return P$ if packageName is not null
	 * 
	 * @param packageName
	 * @param name
	 * @return
	 */
	protected String assureQualifiedNameNoC$(String packageName, String name) {
		if (name == null)
			return null;		
		if (name.startsWith("C$."))
			name = getQualifiedClassName() + name.substring(2);
		name = TypeAdapter.getShortenedName(null, name, false);
		return TypeAdapter.assureQualifiedName(packageName, name);
	}

	protected String assureQualifiedName(String name) {
		return (name == null ? null
				: TypeAdapter.assureQualifiedName(global_PackageName, getShortenedQualifiedName(name)));
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

	/**
	 * Proved access to C$.$clinit$ when a static method is called or a static
	 * field is accessed.
	 * 
	 * @param methodQualifier
	 *            SimpleName qualifier in qualifier.methodName() method
	 *            invocation
	 * @param className
	 * @param doEscape
	 *            set true except for static nonprivate field names
	 * @param doCache
	 *            generally true, but not for initial class definitions or for
	 *            some nonstatic references
	 * @param doAppend
	 *            true to use buffer.append;
	 * @return name wrapped if necessary by nested Class.load() calls
	 */
	protected String getQualifiedStaticName(Name methodQualifier, String className, boolean doEscape, boolean doCache,
			boolean doAppend) {
		// BH: The idea here is to load these on demand.
		// It will require synchronous loading,
		// but it will ensure that a class is only
		// loaded when it is really needed.
		className = removeBrackets(className);
		doEscape &= (className.indexOf(".") >= 0 && !isClassKnown(className));
		String s = null;
		if (!doEscape) {
			if (methodQualifier != null) {
				// a method invocation with a Name as qualifier expression
				methodQualifier.accept(this);
				return "";
			}
			s = className;
			doCache = false;
		}
		String myClassName = getQualifiedClassName();
		if (doCache && className.equals(myClassName)) {
				s = "C$"; // anonymous class will be like this
		} else if (s == null) {
		  s = getNestedClazzLoads(methodQualifier == null && !className.startsWith("C$.") ? className : assureQualifiedNameNoC$(null, className), doCache);
		}
		if (doAppend)
			buffer.append(s);
		return s;
	}

	private boolean haveDirectStaticAccess(Expression exp) {
		return exp instanceof SimpleName
				|| (exp instanceof QualifiedName && ((QualifiedName) exp).getQualifier() instanceof SimpleName)
				|| (exp instanceof FieldAccess && ((FieldAccess) exp).getExpression() instanceof ThisExpression);

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

	private static Map<String, Map<String, List<String[]>>> genericClassMap = new HashMap<String, Map<String, List<String[]>>>();
	private static Map<String, Map<String, String>> genericClassTypes = new HashMap<String, Map<String, String>>();

	/**
	 * Check a class, interface, or Enum binding for generics.
	 * 
	 * @param topBinding
	 *            -- the class being declared
	 * @param binding
	 * @return true if this class could have generic replacements
	 */
	protected static boolean checkGenericClass(ITypeBinding topBinding, ITypeBinding binding) {
		// debugListAllOverrides(binding);
		if (topBinding == binding)
			genericClassMap.put(binding.getKey(), null);
		// check all superclasses from most super to least super
		String classKey = binding.getKey();
		boolean hasGenerics = (binding.isRawType() || binding.getTypeArguments().length > 0);
		// System.err.println(hasGenerics + " " + binding.getBinaryName() + " "
		// + binding.getKey());
		if (hasSuperClass(binding)) {// &&
										// !genericClassMap.containsKey(superclass.getKey()))
										// {
			// System.err.println("--superclass--");
			hasGenerics = checkGenericClass(topBinding, binding.getSuperclass()) || hasGenerics;
		}
		// check all interfaces
		ITypeBinding[] interfaces = binding.getInterfaces();
		for (int i = interfaces.length; --i >= 0;) {
			// if (!genericClassMap.containsKey(interfaces[i].getKey())) {
			// System.err.println("--implements--");
			hasGenerics = checkGenericClass(topBinding, interfaces[i]) || hasGenerics;
		}
		if (hasGenerics) {
			// System.err.println(hasGenerics + " " + binding.getKey() +
			// "\n--class--\n" + binding.toString() + "\n--erasure--\n" +
			// binding.getErasure());
			// debugDumpClass(binding);
			checkMethodsWithGenericParams(topBinding.getKey(), binding);
		} else {
			genericClassMap.put(classKey, null);
		}
		return hasGenerics;
	}

	/**
	 * Tie class type parameters (T, V, etc.) to the bound implemented types for
	 * all methods that implement generics
	 * 
	 * @param topClassKey
	 * @param binding
	 */
	private static void checkMethodsWithGenericParams(String topClassKey, ITypeBinding binding) {
		Map<String, String> classTypes = getGenericClassTypes(binding);
		if (classTypes == null)
			return;
		String classKey = binding.getKey();
		IMethodBinding[] methods = binding.getErasure().getDeclaredMethods();
		for (int i = methods.length; --i >= 0;) {
			IMethodBinding m = methods[i];
			String methodName = m.getName();
			ITypeBinding[] params = m.getParameterTypes();
			if (params.length == 0)
				continue;
			String key = m.getKey();
			if (key.indexOf(";T") >= 0 || key.indexOf("(T") >= 0) {
				String[] list = new String[params.length];
				for (int j = list.length; --j >= 0;) {
					String name = params[j].getName();
					list[j] = name + "|" + classTypes.get(name) + ";";
				}
				addGenericClassMethod(classKey, methodName, list);
				addGenericClassMethod(topClassKey, methodName, list);
			}
		}

	}

	private static ASTNode getAbstractOrAnonymousParentForNode(ASTNode node) {
		ASTNode parent = node.getParent();
		while (parent != null && !(parent instanceof AbstractTypeDeclaration)
				&& !(parent instanceof AnonymousClassDeclaration)) {
			parent = parent.getParent();
		}
		return parent;
	}

	protected static ITypeBinding resolveAbstractOrAnonymousBinding(ASTNode node) {
		node = getAbstractOrAnonymousParentForNode(node);
		return (node instanceof AbstractTypeDeclaration ? ((AbstractTypeDeclaration) node).resolveBinding()
				: node instanceof AnonymousClassDeclaration ? ((AnonymousClassDeclaration) node).resolveBinding()
						: null);
	}
	
	/**
	 * Create a map of the class type arguments for an implemented generic class
	 * 
	 * @param type
	 * @return a map {T:"java.lang.String",K:"java.lang.Object"}
	 */
	private static Map<String, String> getGenericClassTypes(ITypeBinding type) {
		String classKey = type.getKey();
		Map<String, String> classTypes = genericClassTypes.get(classKey);
		if (classTypes != null)
			return classTypes;
		ITypeBinding[] typeArgs = type.getTypeArguments();
		ITypeBinding[] typeParams = type.getTypeParameters();
		boolean isGeneric = (typeParams.length > 0);
		boolean isExtended = (typeArgs.length > 0 || type.isRawType());
		// System.err.println("getgenclasstypes " + type.getKey() + " " +
		// isGeneric + " " + isExtended);
		if (!isGeneric && !isExtended) {
			if (hasSuperClass(type))
				genericClassTypes.put(classKey, classTypes = genericClassTypes.get(type.getSuperclass().getKey()));
			return classTypes;
		}
		ITypeBinding[] types = (isGeneric ? typeParams : typeArgs);
		classTypes = new Hashtable<String, String>();
		// We have to parse this by hand, because I cannot seem to get access to
		// the
		// typeParameters of a superclass. Java seems to have erased all that.
		String erasure = type.getErasure().toString();
		// abstract class test.Test_GenericExt_T<T extends Map<T,K>, K>
		erasure = erasure.substring(erasure.indexOf("<") + 1);
		StringBuffer sb = new StringBuffer(erasure.substring(0, erasure.indexOf(">\n")));
		for (int n = 0, i = sb.length(); --i >= 0;) {
			switch (sb.charAt(i)) {
			case '>':
				n++;
				sb.setCharAt(i, ' ');
				break;
			case '<':
				n--;
				sb.setCharAt(i, ' ');
				break;
			case ',':
				if (n != 0)
					sb.setCharAt(i, ' ');
				break;
			default:
				break;
			}
		}

		String[] tokens = sb.toString().split(",");
		// System.err.println("erasure=" + sb + " " + tokens.length);
		for (int i = tokens.length; --i >= 0;) {
			String key = tokens[i].trim();
			key = key.substring(0, (key + " ").indexOf(" "));
			String value = (i < types.length ? types[i].getQualifiedName() : "java.lang.Object");
			// System.err.println("classTypes key value|" + key + "|" + value +
			// "|");
			classTypes.put(key, value);
		}
		return classTypes;
	}

	/**
	 * Retrieve a list of generic types such as { ["T|java.lang.String",
	 * "V|java.lang.Object"], ["M|java.lang.String", "N|java.lang.Object"] } if
	 * it exists
	 * 
	 * @param methodClass
	 * @param methodName
	 * @return list of generic types for methods with this name
	 */
	private static List<String[]> getGenericMethodList(ITypeBinding methodClass, String methodName) {
		Map<String, List<String[]>> methodList = genericClassMap.get(methodClass.getKey());
		return (methodList == null ? null : methodList.get(methodName));
	}

	/**
	 * add a generic class method to the genericClassMap under the class and
	 * method
	 * 
	 * @param classKey
	 * @param methodName
	 * @param list
	 */
	private static void addGenericClassMethod(String classKey, String methodName, String[] list) {

		//System.err.println("Adding class method " + methodName + " " + list.length + list[0] + " in " + classKey);
		Map<String, List<String[]>> classMap = genericClassMap.get(classKey);
		if (classMap == null)
			genericClassMap.put(classKey, classMap = new Hashtable<String, List<String[]>>());
		List<String[]> methodList = classMap.get(methodName);
		if (methodList == null)
			classMap.put(methodName, methodList = new ArrayList<String[]>());
		methodList.add(list);
	}

	/**
	 * 
	 * @param node
	 * @param mBinding
	 * @param isConstructor
	 * @return j2s-qualified name or an array of j2s-qualified names
	 */
	protected String getMethodNameOrArrayForDeclaration(MethodDeclaration node, IMethodBinding mBinding,
			boolean isConstructor) {
		SimpleName nodeName = node.getName();
		String methodName = (isConstructor ? "c$" : J2SMapAdapter.getJ2SName(nodeName));
		String name = getJ2SQualifiedName(methodName, null, mBinding, null, false);
		ITypeBinding methodClass = mBinding.getDeclaringClass();
		List<String> names = null;
		// System.err.println("checking methodList for " + nodeName.toString() +
		// " in " + methodClass.getKey());
		List<String[]> methodList = getGenericMethodList(methodClass, nodeName.toString());

		if (methodList != null) {
			// System.err.println("have methodList for " + nodeName + " " +
			// methodList.size());
			names = new ArrayList<String>();
			for (int i = methodList.size(); --i >= 0;) {
				String pname = getJ2SQualifiedName(methodName, null, mBinding, methodList.get(i), false);
				// System.err.println("params = " + pname + "
				// "+methodList.get(i).length + "==?==" +
				// mBinding.getParameterTypes().length + " " +
				// methodList.get(i)[0]);
				if (pname != null)
					names.add(pname);
			}
		}
		if (names == null || names.size() == 0)
			return "'" + name + "'";
		name = ",'" + name + "'";
		for (int i = names.size(); --i >= 0;) {
			String next = ",'" + names.get(i) + "'";
			if (name.indexOf(next) < 0)
				name += next;
		}
		return "[" + name.substring(1) + "]";
	}

	/**
	 * Determine the qualified parameter suffix for method names, including
	 * constructors.
	 * 
	 * @param nodeName
	 * @param binding
	 * @param genericTypes
	 * @param isMethodInvoc
	 * 
	 * @return a fully j2s-qualified method name
	 */
	protected String getJ2SQualifiedName(String j2sName, String nodeName, IMethodBinding binding, String[] genericTypes,
			boolean isMethodInvoc) {
		// The problem is that System.out and System.err are PrintStreams, and
		// we
		// do not intend to change those. So in the case that we just wrote
		// "System....", we use that instead and do not qualify the name
		// Note: binding can be null if we have errors in the Java and we are
		// compiling
		if (binding == null || nodeName != null && nodeName.startsWith("System."))
			return j2sName;
		String methodName = binding.getName();
		String className = binding.getDeclaringClass().getQualifiedName();
		if (!isPackageQualified(className) || !isMethodQualified(className, methodName))
			return j2sName;
		ITypeBinding[] paramTypes = binding.getMethodDeclaration().getParameterTypes();

		// BH: Note that Map.put$K$V is translated to actual values
		// if .getMethodDeclaration() is not used.
		// Without that, it uses the bound parameters such as
		// String, Object instead of the declared ones, such as $TK$TV

		int nParams = paramTypes.length;
		if (genericTypes != null && genericTypes.length != nParams)
			return null;

		if (nParams == 0 && methodName.equals("length"))
			return j2sName + "$"; // so that String implements CharSequence

		String s = getParamsAsString(nParams, genericTypes, paramTypes, false);
		// exception for special case: setting static main(String[] args) to
		// "main", and "main()" to "main$"
		if ("main".equals(methodName) && isStatic(binding)) {
			if (s.length() == 0) {
				s = "$";
			} else if (s.equals("$SA")) {
				s = "";
			}
		} else if (isMethodInvoc && s.indexOf("$T") >= 0 && isJava(className) && !isJava(getQualifiedClassName())) {
			// also add the $O version
			String generic = getParamsAsString(nParams, genericTypes, paramTypes, true);
			if (generic != null) {
				trailingBuffer.addType("o");
				return j2sName + s + " || $o$." + j2sName.substring(j2sName.lastIndexOf(".") + 1) + generic;
			}
			// this does not work for two reasons:
			// 1) sometimes the qualifier, so for t.foo$TA(o), "t." is outside
			// the scope of these parentheses.
			// 2) When selecting functions like this, one needs to use apply,
			// so: ((a$ = expression).foo$TA || a$.foo$O).apply(a$, [o])
			//
			// thus, this determination must be made very early.

		}
		return j2sName + s;
	}

	/**
	 * finish the generic foo || bar fix
	 * 
	 * @param pt
	 *            start of this method invocation in buffer
	 * @param qname
	 *            qualified name, containing " || "
	 * @param isPrivateAndNotStatic
	 *            switch $O$ to p$; already using .apply(this)
	 */
	protected void postFixGeneric$O(int pt, String qname, boolean isPrivateAndNotStatic) {
		// this is a Java8-compatibility hack. The class is accessing a
		// type-parameterized method which it might not be overriding
		// and might be nongeneric in Java 6.
		// this.adItem$TE(o) becomes (($o$=this).addItem$TE ||
		// $o$.addItem$O).apply($o$,[o]);
		if (isPrivateAndNotStatic) {
			buffer.insert(pt, "(");
			buffer.append(qname.replace("$o$", "p$")).append(")");
			return;
		}
		buffer.insert(pt, "(($o$=");
		buffer.append(qname).append(").apply($o$,[");
		buffer.insert(buffer.lastIndexOf(".", buffer.lastIndexOf("|")), ")");
		trailingBuffer.addType("o");
	}

	private boolean isJava(String className) {
		return className.length() > 5 && "java.javax".contains(className.substring(0, 5));
	}

	private static String getParamsAsString(int nParams, String[] genericTypes, ITypeBinding[] paramTypes,
			boolean toObject) {
		StringBuffer sbParams = new StringBuffer();
		// if this is a method invocation and has generics, then we alias that
		boolean haveGeneric = false;
		for (int i = 0; i < nParams; i++) {
			String type = j2sGetParamCode(paramTypes[i], true, toObject);
			if (genericTypes != null) {
				String genericType = genericTypes[i];
				if (genericType != null) {
					if (genericType.indexOf("|null") < 0) {
						// System.err.println("hoping that " + className + "." +
						// methodName + " " + i + " " + genericType + " works
						// for " + paramTypes[i].getQualifiedName() + " " +
						// paramTypes[i].getKey());
						if (genericType.indexOf("|" + paramTypes[i].getQualifiedName() + ";") < 0)
							return null;
						type = "T" + genericType.substring(0, genericType.indexOf("|")); // "O";//
						haveGeneric = true;
						// Originally I was substituting in the generic type
						// T,V,E,etc., but
						// this causes a problem when the user is working with a
						// later version of
						// Java and subclassing what was originally not a
						// generic class (JComboBox)
						// but which is now generic (JComboBox<E>). The new
						// version of Java will be
						// used by the transpiler working on the user's machine,
						// and then we will
						// have the problem that the code will have addItem$TE
						// inserted even though
						// the version of Java in the SwingJS distribution will
						// be only addItem$O.
						// Using Object here because that would be the default
						// for
						// JComboBox<>
						// and so match that earlier non-generic designation
						// (hopefully).
					}
				}
			}
			sbParams.append("$").append(type);
		}
		return (toObject && !haveGeneric ? null : sbParams.toString());
	}

	protected static String j2sGetParamCode(ITypeBinding binding, boolean addAAA, boolean asGenericObject) {
		String prefix = (removeBrackets(binding.getKey()).indexOf(":T") >= 0 ? "T" : null);
		String name = binding.getQualifiedName();
		String arrays = null;
		name = removeBrackets(name);
		int pt = name.indexOf("[");
		if (pt >= 0) {
			arrays = name.substring(pt + (name.indexOf("[L") >= 0 ? 1 : 0));
			name = name.substring(0, pt);
		}

		// NOTE: If any of these are changed, they must be changed in j2sSwingJS
		// as well.
		// NOTE: These are the same as standard Java Spec, with the exception of
		// Short, which is "H" instead of "S"

		switch (name) {
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
			if (prefix != null)
				name = (asGenericObject ? "O" : prefix + name); // "O";//

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

	public static String removeBrackets(String qName) {
		if (qName == null || qName.indexOf('<') < 0)
			return qName;
		StringBuffer buf = new StringBuffer();
		int ltCount = 0;
		char c;
		for (int i = 0, len = qName.length(); i < len; i++) {
			switch (c = qName.charAt(i)) {
			case '<':
				ltCount++;
				continue;
			case '>':
				ltCount--;
				continue;
			default:
				if (ltCount == 0)
					buf.append(c);
				continue;
			}
		}
		return buf.toString().trim();
	}

	///////////////// debugging //////////////////////////

	void debugDumpClass(ITypeBinding binding) {
		ITypeBinding[] lst = binding.getTypeParameters();

		// Check for <T,V> - these are for the generic class defs themselves
		for (int i = 0; i < lst.length; i++)
			System.err.println(binding.getKey() + "typeP " + i + lst[i].getName());

		// check for <String,Object> for the implemented classes
		lst = binding.getTypeArguments();
		for (int i = 0; i < lst.length; i++)
			System.err.println(binding.getKey() + "typeA " + i + lst[i].getName());

		IMethodBinding[] methods = binding.getDeclaredMethods();
		for (int i = methods.length; --i >= 0;) {
			IMethodBinding m = methods[i];
			System.err.println(getJ2SQualifiedName(m.getName(), null, m, null, false));
			ITypeBinding[] params = m.getParameterTypes();
			for (int j = 0; j < params.length; j++)
				System.err.println("\t" + params[j].getName());

		}
	}

	static void debugListAllOverrides(ITypeBinding binding) {
		IMethodBinding[] jmethods = binding.getDeclaredMethods();
		for (int j = jmethods.length; --j >= 0;) {
			IMethodBinding m = jmethods[j];
			ITypeBinding b = null;
			while ((b = (b == null ? m.getDeclaringClass() : b.getSuperclass())) != null) {
				IMethodBinding[] methods = b.getDeclaredMethods();
				for (int i = methods.length; --i >= 0;)
					if (m.overrides(methods[i]))
						System.err.println(">> " + m.getKey() + " overrides " + methods[i].getKey());
			}
		}
	}

	/**
	 * We need to check packages only for local "var" variables, as only those
	 * will be references as unqualified names. And the problem is only the same
	 * method.
	 * 
	 * For example,
	 * 
	 * var test = 3
	 * 
	 * x = test.Test_1.getX();
	 * 
	 * 
	 * 
	 * @param name
	 * @param addName
	 * @return
	 */
	protected String getValidFieldName$Qualifier(String name, boolean addName) {
		boolean isViolation = FieldAdapter.checkKeywordViolation(name);
		return (isViolation ? "$" : "") + (addName ? name : "");
	}

	protected static boolean hasSuperClass(ITypeBinding typeBinding) {
		ITypeBinding superclass = typeBinding.getSuperclass();
		return (superclass != null && !"java.lang.Object".equals(superclass.getQualifiedName()));
	}

}
