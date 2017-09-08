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
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.SingleVariableDeclaration;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
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

// BH 8/15/2017 12:18:46 PM adds support for Java 8 catch (Exception...|Excepion... e)
/**
 * This class will traverse most of the common keyword and common expression.
 * 
 * This class will not deal with binding.
 * 
 * @author zhou renjian
 *
 */
public class ASTKeywordVisitor extends ASTEmptyVisitor {

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

	protected String checkConstantValue(Expression node) {
		return ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).checkConstantValue(node);
	}

	protected String[] skipDeclarePackages() {
		return ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).skipDeclarePackages();
	}

	protected boolean isSimpleQualified(QualifiedName node) {
		return ((ASTFieldVisitor) getAdaptable(ASTFieldVisitor.class)).isSimpleQualified(node);
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
			boxingNode(iter.next());
			if (iter.hasNext()) {
				buffer.append(seperator);
			}
		}
	}

	protected void visitList(List<ASTNode> list, String seperator, int begin, int end) {
		for (int i = begin; i < end; i++) {
			boxingNode(list.get(i));
			if (i < end - 1) {
				buffer.append(seperator);
			}
		}
	}

	public boolean visit(ArrayAccess node) {
		node.getArray().accept(this);
		buffer.append('[');
		int idx1 = buffer.length();
		Expression index = node.getIndex();
		index.accept(this);
		ITypeBinding rightTypeBinding = index.resolveTypeBinding();
		if (rightTypeBinding != null && "char".equals(rightTypeBinding.getName())) {
			boolean appendingCode = true;
			int length = buffer.length();
			if (index instanceof MethodInvocation) {
				MethodInvocation m = (MethodInvocation) index;
				if ("charAt".equals(m.getName().toString())) {
					int idx2 = buffer.indexOf(".charAt ", idx1);
					if (idx2 != -1) {
						StringBuffer newMethodBuffer = new StringBuffer();
						newMethodBuffer.append(buffer.substring(idx1, idx2));
						newMethodBuffer.append(".charCodeAt ");
						newMethodBuffer.append(buffer.substring(idx2 + 8, length));
						buffer.delete(idx1, length);
						buffer.append(newMethodBuffer.toString());
						appendingCode = false;
					}
				}
			}
			if (appendingCode) {
				buffer.append(".charCodeAt(0)");
			}
		}
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

	@SuppressWarnings("null")
	public boolean visit(Assignment node) {
		Expression left = node.getLeftHandSide();
		Expression right = node.getRightHandSide();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		String rightName = (rightTypeBinding == null ? null : rightTypeBinding.getName());
		String leftName = (leftTypeBinding == null ? null : leftTypeBinding.getName());
		IVariableBinding varBinding = getLeftVariableBinding(left, leftTypeBinding);
		String op = node.getOperator().toString();
		boolean isMixedOp = (op.trim().length() > 1); // +=, -=, *=, /=, etc.

		// TODO BH Q: what does static have to do with anything?
		if (checkStaticBinding(varBinding)) {
			ASTNode parent = node.getParent();
			boolean needParenthesis = (!haveDirectStaticAccess(left)) && !(parent instanceof Statement);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
			addFieldName(left, varBinding);
			buffer.append(' ');
			if ("char".equals(leftName)) {
				if (isMixedOp) {
					// +=, -=
					buffer.append("= String.fromCharCode(");
					{
						boolean needCharCodeAt0 = "char".equals(rightName);
						addFieldName(left, varBinding);
						buffer.append(".charCodeAt(0) ");
						buffer.append(op.charAt(0));
						buffer.append(' ');
						if (needCharCodeAt0) {
							Object constValue = right.resolveConstantExpressionValue();
							if (constValue != null && constValue instanceof Character) {
								buffer.append(0 + ((Character) constValue).charValue());
								needCharCodeAt0 = false;
							} else {
								buffer.append('(');
								boxingNode(right);
								buffer.append(')');
							}
						} else {
							buffer.append('(');
							needCharCodeAt0 = boxingNode(right); // unboxed a
																	// Character
							buffer.append(')');
						}
						if (needCharCodeAt0)
							buffer.append(".charCodeAt(0)");
					}
					buffer.append(")");
				} else {
					// =
					buffer.append(op);
					buffer.append(' ');
					switch (rightName) {
					case "char":
					case "Character":
						boxingNode(right);
						break;
					default:
						buffer.append("String.fromCharCode(");
						boxingNode(right);
						buffer.append(')');
					}
				}
			} else if (isMixedOp && "/=*=+=-=&=|=^=".indexOf(op) >= 0 && isNumericType(leftName)) {
				// byte|short|int|long /= ...
				// convert to proper
				// number of bits
				// TODO -- what about when division leads to a LARGER number?
				buffer.append(" = (");
				addFieldName(left, varBinding);
				buffer.append(op.charAt(0));
				buffer.append('(');
				boxingNode(right);
				if ("char".equals(rightName))
					buffer.append(".charCodeAt(0)");
				buffer.append("))");
				if (!leftName.equals("int"))
					buffer.append(".").append(leftName).append("Value()");
			} else {
				// double|float /= ...
				buffer.append(op);
				buffer.append(' ');
				boxingNode(right);
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}

		// not a static variable

		boolean leftIsStringlike = ("char".equals(leftName) || leftName.equals("String"));

		if ("boolean".equals(leftName) && (op.startsWith("^") || op.startsWith("|") || op.startsWith("&"))
		/* || op.startsWith("!") */) {
			left.accept(this);
			buffer.append(" = new Boolean (");
			left.accept(this);
			buffer.append(' ');
			buffer.append(op.charAt(0));
			if (right instanceof InfixExpression) {
				buffer.append(" (");
				right.accept(this);
				buffer.append("))");
			} else {
				buffer.append(' ');
				right.accept(this);
				buffer.append(')');
			}
			buffer.append(".valueOf ()");
			return false;
		}
		if ("char".equals(leftName)) {
			if (!isMixedOp) {
				// =
				if (right instanceof Name || right instanceof CharacterLiteral || right instanceof ArrayAccess
						|| right instanceof FieldAccess || right instanceof MethodInvocation
						|| right instanceof ParenthesizedExpression || right instanceof SuperFieldAccess
						|| right instanceof SuperMethodInvocation || right instanceof ThisExpression
						|| right instanceof CastExpression || rightName.equals("Character")) {
					left.accept(this);
					buffer.append(" = ");
					boxingNode(right);
					return false;
				}
			}
			left.accept(this);
			if ("char".equals(rightName) && !isMixedOp) {
				buffer.append(' ');
				buffer.append(op);
				buffer.append(' ');
				boxingNode(right);
			} else {
				buffer.append(" = String.fromCharCode(");
				{
					if (isMixedOp) {
						if (left instanceof SimpleName || left instanceof QualifiedName) {
							left.accept(this);
						} else {
							buffer.append("(");
							left.accept(this);
							buffer.append(")");
						}
						buffer.append(".charCodeAt(0)");
						buffer.append(op.charAt(0));
					}
					buffer.append(' ');
					boolean needCharCode = false;
					if (right instanceof InfixExpression) {
						String constValue = checkConstantValue(right);
						if (constValue == null) {
							buffer.append("(");
							boxingNode(right);
							// TODO here
							buffer.append(")");
						} else {
							buffer.append(constValue);
							needCharCode = (constValue.startsWith("'") || constValue.startsWith("\""));
						}
					} else {
						if ("char".equals(rightName)) {
							Object constValue = right.resolveConstantExpressionValue();
							if (constValue != null && constValue instanceof Character) {
								buffer.append(((Character) constValue).charValue() + 0);
							} else {
								boolean needParenthesis = !(right instanceof ParenthesizedExpression
										|| right instanceof PrefixExpression || right instanceof PostfixExpression);
								if (needParenthesis) {
									buffer.append("(");
								}
								needCharCode = boxingNode(right);
								if (needParenthesis) {
									buffer.append(")");
								}
							}
						} else {
							needCharCode = boxingNode(right);
						}
					}
					if (needCharCode)
						buffer.append(".charCodeAt(0)");
				}
				buffer.append(')');
			}
			return false;
		}
		if (isMixedOp && "/=*=+=-=&=|=^=".indexOf(op) >= 0 && isNumericType(leftName)) {
			// byte|short|int|long /= ...
			// convert to proper number
			// of bits using .xxxxValue()
			left.accept(this);
			buffer.append(" = (");
			left.accept(this);
			buffer.append(op.charAt(0));
			right.accept(this);
			if ("char".equals(rightName))
				buffer.append(".charCodeAt(0)");
			buffer.append(")");
			if (!leftName.equals("int") || !rightName.equals("int") || op.equals("/="))
				buffer.append(".").append(leftName).append("Value()");
			return false;
		}
		left.accept(this);
		buffer.append(' ');
		buffer.append(op);
		buffer.append(' ');
		if ("char".equals(rightName)) {
			if (right instanceof CharacterLiteral) {
				CharacterLiteral cl = (CharacterLiteral) right;
				if (leftIsStringlike) {
					String constValue = checkConstantValue(right);
					buffer.append(constValue);
				} else {
					buffer.append(0 + cl.charValue());
				}
			} else if (leftIsStringlike) {
				right.accept(this);
			} else {
				int idx1 = buffer.length();
				buffer.append('(');
				right.accept(this);
				buffer.append(")");

				boolean appendingCode = true;
				int length = buffer.length();
				if (right instanceof MethodInvocation) {
					MethodInvocation m = (MethodInvocation) right;
					if ("charAt".equals(m.getName().toString())) {
						int idx2 = buffer.indexOf(".charAt ", idx1);
						if (idx2 != -1) {
							StringBuffer newMethodBuffer = new StringBuffer();
							newMethodBuffer.append(buffer.substring(idx1 + 1, idx2));
							newMethodBuffer.append(".charCodeAt");
							newMethodBuffer.append(buffer.substring(idx2 + 8, length - 1));
							buffer.delete(idx1, length);
							buffer.append(newMethodBuffer.toString());
							appendingCode = false;
						}
					}
				}
				if (appendingCode) {
					buffer.append(".charCodeAt(0)");
				}
			}
		} else {
			// note that conversion to String is NOT a boxing operation
			addOperand(right, leftIsStringlike);
		}
		return false;
	}

	private boolean haveDirectStaticAccess(Expression exp) {
		return exp instanceof SimpleName
				|| (exp instanceof QualifiedName && ((QualifiedName) exp).getQualifier() instanceof SimpleName)
				|| (exp instanceof FieldAccess && ((FieldAccess) exp).getExpression() instanceof ThisExpression);

	}

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

	private void addFieldName(Expression left, IVariableBinding varBinding) {
		if (varBinding != null) {
			addQualifiedName(varBinding);
			buffer.append('.');
			left = (left instanceof QualifiedName ? ((QualifiedName) left).getName()
					: left instanceof FieldAccess ? ((FieldAccess) left).getName() : left);
		}
		left.accept(this);
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
		node.getExpression().accept(this);
		buffer.append(" ? ");
		node.getThenExpression().accept(this);
		buffer.append(" : ");
		node.getElseExpression().accept(this);
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
		boxingNode(node.getExpression());
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


	public boolean visit(InfixExpression node) {
		// TODO check for String + Double/Float --> String + ... .toString()
		// and change to String + double/float --> String + new
		// Double/Float(...).toString()
		String constValue = checkConstantValue(node);
		if (constValue != null) {
			buffer.append(constValue);
			return false;
		}
		ITypeBinding expTypeBinding = node.resolveTypeBinding();
		if (expTypeBinding == null)
			return false;
		String expTypeName = expTypeBinding.getName();
		boolean toString = (expTypeName.indexOf("String") >= 0);
		String operator = node.getOperator().toString();
		Expression left = node.getLeftOperand();
		Expression right = node.getRightOperand();
		ITypeBinding leftTypeBinding = left.resolveTypeBinding();
		ITypeBinding rightTypeBinding = right.resolveTypeBinding();
		if (leftTypeBinding == null || rightTypeBinding == null)
			return false;
		String leftName = leftTypeBinding.getName();
		String rightName = rightTypeBinding.getName();
		if ("!==<=>=".indexOf(operator) >= 0) {
			// < > <= >= == !=
			switch (leftName) {
			case "char":
			case "Character":
				switch (rightName) {
				case "char":
				case "Character":
					boxingNode(left);
					buffer.append(' ');
					buffer.append(operator);
					buffer.append(' ');
					boxingNode(right);
					return false;
				default:
				}
				break;
			default:
				break;
			}
		} else if ("/".equals(operator)) {
			if (leftTypeBinding.isPrimitive() && isNumericType(leftName) && isNumericType(rightName)) {
				// left and right are some sort of primitive byte, short, int,
				// or, long
				// division must take care of this.
				// TODO more issues here...
				StringBuffer oldBuffer = buffer;
				buffer = new StringBuffer();
				buffer.append("(");
				{
					addOperand(left, toString);
					buffer.append(" / ");
					addOperand(right, toString);
				}
				buffer.append(").").append(expTypeName).append("Value()");
				List<?> extendedOperands = node.extendedOperands();
				if (extendedOperands.size() > 0) {
					for (Iterator<?> iter = extendedOperands.iterator(); iter.hasNext();) {
						ASTNode element = (ASTNode) iter.next();
						boolean is2Floor = false;
						if (element instanceof Expression) {
							Expression exp = (Expression) element;
							ITypeBinding expBinding = exp.resolveTypeBinding();
							if (isNumericType(expBinding.getName())) {
								buffer.insert(0, "("); 
								is2Floor = true;
							}
						}
						buffer.append(" / ");
						addOperand((Expression) element, toString);
						if (is2Floor) {
							buffer.append(").").append(expTypeName).append("Value()");
						}
					}
				}
				oldBuffer.append(buffer);
				buffer = oldBuffer;
				oldBuffer = null;
				return false;
			}
		}
		boolean toBoolean = false;
		if (leftTypeBinding.isPrimitive() && "boolean".equals(leftName) && isBitwiseBinaryOperator(node)) {
			// box this as Boolean(...).valueOf();
			buffer.append(" new Boolean (");
			toBoolean = true;
		}
		// left
		addOperand(left, toString);
		buffer.append(' ');
		// op
		buffer.append(operator);
		if (("==".equals(operator) || "!=".equals(operator)) && !leftTypeBinding.isPrimitive()
				&& !(left instanceof NullLiteral) && !(right instanceof NullLiteral)) {
			buffer.append('=');
		}
		buffer.append(' ');
		// right
		addOperand(right, toString);

		// ok, this is trouble
		// The extended operands is the preferred way of representing deeply
		// nested expressions of the form L op R op R2 op R3... where the same
		// operator appears between all the operands (the most common case being
		// lengthy string concatenation expressions). Using the extended
		// operands keeps the trees from getting too deep; this decreases the
		// risk is running out of thread stack space at runtime when traversing
		// such trees. ((a + b) + c) + d would be translated to: leftOperand: a
		// rightOperand: b extendedOperands: {c, d} operator: +

		List<?> extendedOperands = node.extendedOperands();
		if (extendedOperands.size() > 0) {
			for (Iterator<?> iter = extendedOperands.iterator(); iter.hasNext();) {
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				ASTNode element = (ASTNode) iter.next();
				addOperand((Expression) element, toString);
			}
		}
		if (toBoolean) {
			// unbox Boolean(...)
			buffer.append(").valueOf()");
		}
		return false;
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
		String constValue = checkConstantValue(node);
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
		ITypeBinding typeBinding = left.resolveTypeBinding();
		IVariableBinding varBinding = getLeftVariableBinding(left, typeBinding);
		boolean isChar = (typeBinding != null && typeBinding.isPrimitive() && "char".equals(typeBinding.getName()));
		if (checkStaticBinding(varBinding)) {
			ASTNode parent = node.getParent();
			boolean needParenthesis = (isChar || !haveDirectStaticAccess(left))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
			if (isChar) {
				addCharacterPrePostFix(left, null, varBinding, op, true);
			} else {
				buffer.append(op);
				addFieldName(left, varBinding);
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}
		if (isChar) {
			buffer.append("(");
			addCharacterPrePostFix(left, node.getParent(), null, op, true);
			buffer.append(")");
			return false;
		}
		buffer.append(op);
		boxingNode(left);
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
			buffer.append("(function() {var $t$ = ");
			addFieldName(left, varBinding);
			buffer.append("; ");
		}
		addFieldName(left, varBinding);
		buffer.append(" = String.fromCharCode(");
		addFieldName(left, varBinding);
		buffer.append(".charCodeAt(0)").append("++".equals(op) ? "+1" : "-1");
		buffer.append(")");
		if (addAnonymousWrapper) {
			buffer.append("; return $t$})()");
		}
	}

	public boolean visit(PostfixExpression node) {
		Expression left = node.getOperand();
		ITypeBinding typeBinding = left.resolveTypeBinding();
		IVariableBinding varBinding = getLeftVariableBinding(left, typeBinding);
		boolean isChar = (typeBinding != null && typeBinding.isPrimitive() && "char".equals(typeBinding.getName()));
		if (checkStaticBinding(varBinding)) {
			ASTNode parent = node.getParent();
			boolean needParenthesis = (isChar || !haveDirectStaticAccess(left))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			addLeftSidePrefixName(left);
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
		if (isChar) {
			addCharacterPrePostFix(left, node.getParent(), null, node.getOperator().toString(), false);
			return false;
		}
		boxingNode(left);
		buffer.append(node.getOperator());
		return false;
	}
	
	public boolean visit(QualifiedName node) {
		if (isSimpleQualified(node)) {
			String constValue = checkConstantValue(node);
			if (constValue != null) {
				buffer.append(constValue);
				return false;
			}
		}
		IBinding nameBinding = node.resolveBinding();
		IVariableBinding varBinding = (nameBinding instanceof IVariableBinding ? (IVariableBinding) nameBinding : null);
		boolean staticFields = false;
		if (checkStaticBinding(varBinding)) {
			IBinding qBinding = node.getQualifier().resolveBinding();
			staticFields = (qBinding == null || !(qBinding instanceof ITypeBinding));
		}
		ASTNode parent = node.getParent();
		boolean qualifierVisited = false;
		if (parent != null && !(parent instanceof QualifiedName)) {
			Name qualifier = node.getQualifier();
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
					String name = typeBinding.getQualifiedName();
					if (name.indexOf("net.sf.j2s.html.") == 0) {
						name = name.substring(16);
					}
					if (name.indexOf("java.lang.") == 0) {
						name = name.substring(10);
					}
					if (name.length() != 0) {
						if (staticFields) {
							if (qualifier instanceof SimpleName) {
								addQualifiedName(varBinding);
							} else {
								buffer.append('(');
								buffer.append(name);
								buffer.append(", ");
								addQualifiedName(varBinding);
								buffer.append(')');
							}
						} else {
							buffer.append(name);
						}
						buffer.append('.');
						qualifierVisited = true;
					}
				}
			}
		}
		Name qName = node.getQualifier();
		String nodeStr = qName.toString();
		if (nodeStr.equals("net.sf.j2s.html") || nodeStr.equals("org.eclipse.swt.internal.xhtml")) {
			node.getName().accept(this);
			return false;
		}
		if (!qualifierVisited) {
			if (staticFields) {
				if (qName instanceof SimpleName) {
					addQualifiedName(varBinding);
				} else {
					buffer.append('(');
					qName.accept(this);
					buffer.append(", ");
					addQualifiedName(varBinding);
					buffer.append(')');
				}
			} else {
				qName.accept(this);
			}
			buffer.append('.');
		}
		node.getName().accept(this);
		return false;
	}

	public boolean visit(FieldAccess node) {
		// Expression . Identifier
		// TODO: more complicated rules should be considered. read the JavaDoc
		IVariableBinding varBinding = node.resolveFieldBinding();
		Expression expression = node.getExpression();
		if (checkStaticBinding(varBinding)) {
			buffer.append('(');
			expression.accept(this);
			buffer.append(", ");
			addQualifiedName(varBinding);
			buffer.append(')');
		} else {
			expression.accept(this);
		}
		buffer.append(".");
		node.getName().accept(this);
		return false;
	}

	private void addQualifiedName(IVariableBinding varBinding) {
		buffer.append(assureQualifiedName(removeJavaLang(varBinding.getDeclaringClass().getQualifiedName())));
	}

	@SuppressWarnings("null")
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
		ITypeBinding expType = expression.resolveTypeBinding();
		IMethodBinding mBinding = (parent == null ? null : ((MethodDeclaration) parent).resolveBinding());
		ITypeBinding retType = (mBinding == null || expType == null ? null : mBinding.getReturnType());
		boolean done = false;
		if (expression.resolveUnboxing() || expression.resolveUnboxing()) {
			boxingNode(expression);
			done = true;
		}
		if (!done && retType != null && retType != expType) {
			String retName = retType.getName();
			String expName = expType.getName();
			//buffer.append("<<" + retName + " f(){return " + expName + " " + expression + "}");
			switch (retName) {
			case "char":
				// char f() { return ... }
				if (!("char".equals(expName))) {
					buffer.append("String.fromCharCode(");
					expression.accept(this);
					buffer.append(")");
					done = true;
				}
				break;
			case "String":
				break;
			default:
				if (("char".equals(expName))) {
					if ("Character".equals(retName)) {
						buffer.append("new Character(");
						expression.accept(this);
						buffer.append(")");
					} else {
						buffer.append("(");
						expression.accept(this);
						buffer.append(").charCodeAt(0)");
					}
					done = true;
				}
				break;
			}

		}
		if (!done) {
			expression.accept(this);
		}
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

	public boolean visit(SwitchCase node) {
		if (node.isDefault()) {
			buffer.append("default");
		} else {
			buffer.append("case ");
			node.getExpression().accept(this);
		}
		buffer.append(":\r\n");
		return false;
	}

	@SuppressWarnings("unchecked")
	public boolean visit(SwitchStatement node) {
		buffer.append("switch (");
		node.getExpression().accept(this);
		buffer.append(") {\r\n");
		visitList(node.statements(), "");
		buffer.append("}\r\n");
		return false;
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
		if (binding != null) {
			String identifier = name.getIdentifier();
			ASTFinalVariable f = new ASTFinalVariable(blockLevel, identifier,
					methodDeclareNameStack.size() == 0 ? null : (String) methodDeclareNameStack.peek());
			List<ASTFinalVariable> finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
			List<ASTFinalVariable> normalVars = ((ASTVariableVisitor) getAdaptable(
					ASTVariableVisitor.class)).normalVars;
			f.toVariableName = getIndexedVarName(identifier, normalVars.size());
			normalVars.add(f);
			if (Modifier.isFinal(binding.getModifiers())) {
				finalVars.add(f);
			}
		}
		name.accept(this);
		Expression initializer = node.getInitializer();
		if (initializer != null) {
			buffer.append(" = ");
			ITypeBinding typeBinding = initializer.resolveTypeBinding();
			if (typeBinding != null && "char".equals(typeBinding.getName())) {
				ITypeBinding nameTypeBinding = name.resolveTypeBinding();
				String nameType = nameTypeBinding.getName();
				if (initializer instanceof CharacterLiteral) {
					CharacterLiteral cl = (CharacterLiteral) initializer;
					if ("char".equals(nameType)) {
						String constValue = checkConstantValue(initializer);
						buffer.append(constValue);
					} else {
						// e.g.	  int di = 'c';
						buffer.append(0 + cl.charValue());
					}
					return false;
				}
				if (nameType != null && !"char".equals(nameType) && nameType.indexOf("String") == -1) {
					int idx1 = buffer.length();
					buffer.append("(");
					initializer.accept(this);
					buffer.append(")");
					boolean appendingCode = true;
					int length = buffer.length();
					if (initializer instanceof MethodInvocation) {
						MethodInvocation m = (MethodInvocation) initializer;
						if ("charAt".equals(m.getName().toString())) {
							int idx2 = buffer.indexOf(".charAt ", idx1);
							if (idx2 != -1) {
								StringBuffer newMethodBuffer = new StringBuffer();
								newMethodBuffer.append(buffer.substring(idx1 + 1, idx2));
								newMethodBuffer.append(".charCodeAt ");
								newMethodBuffer.append(buffer.substring(idx2 + 8, length - 1));
								buffer.delete(idx1, length);
								buffer.append(newMethodBuffer.toString());
								appendingCode = false;
							}
						}
					}
					if (appendingCode) {
						buffer.append(".charCodeAt(0)");
					}
					return false;
				}
			}
			ITypeBinding nameTypeBinding = name.resolveTypeBinding();
			if (nameTypeBinding != null) {
				String nameType = nameTypeBinding.getName();
				if ("char".equals(nameType)) {
					if (typeBinding != null && !"char".equals(typeBinding.getName())) {
						buffer.append("String.fromCharCode(");
						initializer.accept(this);
						buffer.append(")");
						return false;
					}
				}
			}
			boxingNode(initializer);
		}
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
	 * add the operand, checking to see if it needs some adjustment:
	 * 
	 * (a) String + x where x is {double/float} requires boxing Double/Float(x).toString() 
	 * 
	 * (b) String + x where x is {Double/Float} requires added .toString()
	 * 
	 * (c) 
	 * 
	 * @param node
	 * @param toString
	 */
	protected void addOperand(Expression node, boolean toString) {
		ITypeBinding binding = node.resolveTypeBinding();
		String name = binding.getName();
		if (toString) {
			// BH
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
				node.accept(this);
				break;
			}
			if (prefix != null) {
				buffer.append(prefix);
				node.accept(this);
				buffer.append(suffix);
				buffer.append(".toString()");
			}
			return;
		}
		if (!binding.isPrimitive() || !"char".equals(name)) {
			boolean isBoxed = boxingNode(node);
			if (isBoxed && "Character".equals(name))
				buffer.append(".charCodeAt(0)");
			return;
		}
		// to char only
		if (node instanceof CharacterLiteral) {
			CharacterLiteral cl = (CharacterLiteral) node;
			buffer.append(0 + cl.charValue());
		} else if (node instanceof SimpleName || node instanceof QualifiedName) {
			boxingNode(node);
			buffer.append(".charCodeAt (0)");
		} else {
			int idx1 = buffer.length();
			if (node instanceof PrefixExpression || node instanceof PostfixExpression
					|| node instanceof ParenthesizedExpression) {
				boxingNode(node);
			} else {
				buffer.append("(");
				boxingNode(node);
				buffer.append(")");
			}
			boolean addCharCodeAt0 = true;
			int length = buffer.length();
			if (node instanceof MethodInvocation) {
				MethodInvocation m = (MethodInvocation) node;
				if ("charAt".equals(m.getName().toString())) {
					int idx2 = buffer.indexOf(".charAt ", idx1);
					if (idx2 != -1) {
						StringBuffer newMethodBuffer = new StringBuffer();
						newMethodBuffer.append(buffer.substring(idx1 + 1, idx2));
						newMethodBuffer.append(".charCodeAt ");
						newMethodBuffer.append(buffer.substring(idx2 + 8, length - 1));
						buffer.delete(idx1, length);
						buffer.append(newMethodBuffer.toString());
						addCharCodeAt0 = false;
					}
				}
			}
			if (addCharCodeAt0) {
				buffer.append(".charCodeAt (0)");
			}
		}
	}

	/**
	 * box or unbox as necessary
	 * 
	 * @param element
	 * @return true if boxing or unboxing
	 */
	protected boolean boxingNode(ASTNode element) {
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
					getBuffer().append(")." + name + "Value ()");
					return true;
				}
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


}
