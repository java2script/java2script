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
package j2s.jmol.common;

import java.util.Iterator;
import java.util.List;
import java.util.Stack;
import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ArrayAccess;
import org.eclipse.jdt.core.dom.ArrayCreation;
import org.eclipse.jdt.core.dom.ArrayInitializer;
import org.eclipse.jdt.core.dom.ArrayType;
import org.eclipse.jdt.core.dom.AssertStatement;
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
import org.eclipse.jdt.core.dom.FieldDeclaration;
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
import org.eclipse.jdt.core.dom.VariableDeclarationExpression;
import org.eclipse.jdt.core.dom.VariableDeclarationFragment;
import org.eclipse.jdt.core.dom.VariableDeclarationStatement;
import org.eclipse.jdt.core.dom.WhileStatement;

/**
 * This class will traverse most of the common keyword and
 * common expression.
 * 
 * This class will not deal with binding.
 * 
 * @author zhou renjian
 *
 */
public class ASTKeywordVisitor extends ASTEmptyVisitor {
	
	protected int blockLevel = 0;
	
	protected Stack methodDeclareStack = new Stack();
	
	protected int currentBlockForVisit = -1;
	
	/**
	 * this was for allowing vwr.isJS where vwr is not a class name and isJS is static
	 */
	public boolean supportsObjectStaticFields = false;
	
//	public boolean isSupportsObjectStaticFields() {
//		return supportsObjectStaticFields;
//	}
//
//	public void setSupportsObjectStaticFields(boolean supportsObjectStaticFields) {
//		this.supportsObjectStaticFields = supportsObjectStaticFields;
//	}
//
	protected void boxingNode(ASTNode element) {
		((ASTTigerVisitor) getAdaptable(ASTTigerVisitor.class)).boxingNode(element);
	}
	
	protected String assureQualifiedName(String name) {
		return ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).assureQualifiedName(name);
	}
	
	protected String shortenQualifiedName(String name) {
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

	protected boolean isFieldNeedPreparation(FieldDeclaration node) {
		return ((ASTFieldVisitor) getAdaptable(ASTFieldVisitor.class)).isFieldNeedPreparation(node);
	}
	
	protected String getIndexedVarName(String name, int i) {
		return ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).getIndexedVarName(name, i);
	}

	protected void visitList(List list, String seperator) {
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			boxingNode(element);
			if (iter.hasNext()) {
				buffer.append(seperator);
			}
		}
	}

	protected void visitList(List list, String seperator, int begin, int end) {
		for (int i = begin; i < end; i++) {
			ASTNode element = (ASTNode) list.get(i);
			boxingNode(element);
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
				buffer.append(".charCodeAt (0)");
			}
		}
		buffer.append(']');
		return false;
	}

	public boolean visit(ArrayCreation node) {
		/*
		 * TODO: multi-dimension Array creation
		 */
		ArrayInitializer initializer = node.getInitializer();
		if (initializer != null) {
			initializer.accept(this);
		} else {
			List dim = node.dimensions();
			ITypeBinding elementType = node.getType().getElementType().resolveBinding();
			if (elementType != null){
				if (elementType.isPrimitive()) {
					String typeCode = elementType.getName();
					if ("int".equals(typeCode)
							|| "float".equals(typeCode)
							|| "double".equals(typeCode)
							|| "byte".equals(typeCode)
							|| "long".equals(typeCode)
							|| "short".equals(typeCode)) {
						//buffer.append(" Clazz.newArray (");
						buffer.append(" Clazz.new");
						buffer.append(typeCode.substring(0, 1).toUpperCase());
						buffer.append(typeCode.substring(1));
						buffer.append("Array (");
						visitList(dim, ", ");
						buffer.append(", 0)");
					} else if ("char".equals(typeCode)) {
						//buffer.append(" Clazz.newArray (");
						buffer.append(" Clazz.newCharArray (");
						visitList(dim, ", ");
						buffer.append(", '\\0')");
					} else if ("boolean".equals(typeCode)) {
						//buffer.append(" Clazz.newArray (");
						buffer.append(" Clazz.newBooleanArray (");
						visitList(dim, ", ");
						buffer.append(", false)");
					} else {
						if (dim != null && dim.size() > 1) {
							buffer.append(" Clazz.newArray (");
							visitList(dim, ", ");
							buffer.append(", null)");
						} else {
							buffer.append(" new Array (");
							visitList(dim, "");
							buffer.append(")");
						}
					}
				} else {
					if (dim != null && dim.size() > 1) {
						buffer.append(" Clazz.newArray (");
						visitList(dim, ", ");
						buffer.append(", null)");
					} else {
						buffer.append(" new Array (");
						visitList(dim, "");
						buffer.append(")");
					}
				}
			}
		}
		return false;
	}

	public boolean visit(ArrayInitializer node) {
		List expressions = node.expressions();
		ITypeBinding arrType = node.resolveTypeBinding();
		ITypeBinding elementType = null;
		if (arrType != null) {
			elementType = arrType.getComponentType();
		}
		if (elementType == null) {
			buffer.append("[");
			visitList(expressions, ", ");
			buffer.append("]");
			return false;
		}
		if (elementType.isPrimitive()) {
			String typeCode = elementType.getName();
			if ("int".equals(typeCode)
					|| "float".equals(typeCode)
					|| "double".equals(typeCode)
					|| "byte".equals(typeCode)
					|| "long".equals(typeCode)
					|| "short".equals(typeCode)) {
				//buffer.append(" Clazz.newArray (");
				buffer.append(" Clazz.new");
				buffer.append(typeCode.substring(0, 1).toUpperCase());
				buffer.append(typeCode.substring(1));
				buffer.append("Array (-1, ");
				buffer.append("[");
				visitList(expressions, ", ");
				buffer.append("])");
			} else if ("char".equals(typeCode)) {
				//buffer.append(" Clazz.newArray (");
				buffer.append(" Clazz.newCharArray (-1, ");
				buffer.append("[");
				visitList(expressions, ", ");
				buffer.append("])");
			} else if ("boolean".equals(typeCode)) {
				//buffer.append(" Clazz.newArray (");
				buffer.append(" Clazz.newBooleanArray (-1, ");
				buffer.append("[");
				visitList(expressions, ", ");
				buffer.append("])");
			} else {
				buffer.append(" Clazz.newArray (-1, ");
				buffer.append("[");
				visitList(expressions, ", ");
				buffer.append("])");
			}
		} else {
			buffer.append(" Clazz.newArray (-1, ");
			buffer.append("[");
			visitList(expressions, ", ");
			buffer.append("])");
		}
		return false;
	}

	public boolean visit(AssertStatement node) {
		/*
		 * TODO: should be implemented
		 */
		//return super.visit(node);
		/*
		 * The assert statement should be passed when debugging in
		 * native Java application mode. No need for JavaScript to
		 * throws errors.
		 */
		return false;
	}

	public boolean visit(Assignment node) {
		Expression left = node.getLeftHandSide();
		Expression right = node.getRightHandSide();
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		String op = node.getOperator().toString();
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			boolean directStaticAccess = left instanceof SimpleName
					|| (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression);
			ASTNode parent = node.getParent();
			boolean needParenthesis = (supportsObjectStaticFields || !directStaticAccess) && !(parent instanceof Statement);
			if (needParenthesis) {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
					buffer.append(", ");
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression)) { 
					leftAccess.getExpression().accept(this);
					buffer.append(", ");
				}
			}
			if (supportsObjectStaticFields) {
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append(".prototype.");
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(" = ");
			}
			
			buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
			buffer.append('.');
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				leftName.getName().accept(this);
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				leftAccess.getName().accept(this);
			} else {
				Name leftName = (Name) left;
				leftName.accept(this);
			}
			buffer.append(' ');
			boolean isMixedOp = op.trim().length() > 1;
			ITypeBinding leftTypeBinding = left.resolveTypeBinding();
			if (leftTypeBinding != null && "char".equals(leftTypeBinding.getName())) {
				ITypeBinding rightTypeBinding = right.resolveTypeBinding();
				if (!isMixedOp) { // =
					buffer.append(op);
					buffer.append(' ');
					if (rightTypeBinding != null && "char".equals(rightTypeBinding.getName())) {
						boxingNode(right);
					} else {
						buffer.append("String.fromCharCode (");
						boxingNode(right);
						buffer.append(')');
					}
				} else {
					buffer.append("= String.fromCharCode (");
					buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
					buffer.append('.');
					if (left instanceof QualifiedName) {
						QualifiedName leftName = (QualifiedName) left;
						leftName.getName().accept(this);
					} else if (left instanceof FieldAccess) {
						FieldAccess leftAccess = (FieldAccess) left;
						leftAccess.getName().accept(this);
					} else {
						Name leftName = (Name) left;
						leftName.accept(this);
					}
					buffer.append(".charCodeAt (0) ");
					buffer.append(op.charAt(0));
					buffer.append(' ');
					if (rightTypeBinding != null && "char".equals(rightTypeBinding.getName())) {
						Object constValue = right.resolveConstantExpressionValue();
						if (constValue != null && constValue instanceof Character) {
							buffer.append(((Character) constValue).charValue() + 0);
						} else {
							boxingNode(right);
							buffer.append(".charCodeAt (0)");
						}
					} else {
						boxingNode(right);
					}
					buffer.append(")");
				}
			} else {
				buffer.append(op);
				buffer.append(' ');
				boxingNode(right);
			}

			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}
		ITypeBinding typeBinding = left.resolveTypeBinding();
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("boolean".equals(typeBinding.getName())) {
				if (op.startsWith("^")
						|| op.startsWith("|")
						|| op.startsWith("&")
						/*|| op.startsWith("!")*/) {
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
			} else if (typeBinding != null &&  "char".equals(typeBinding.getName())) {
				boolean isMixedOp = op.trim().length() > 1;
				if (!isMixedOp) {
					if (right instanceof Name || right instanceof CharacterLiteral
							|| right instanceof ArrayAccess
							|| right instanceof FieldAccess
							|| right instanceof MethodInvocation
							|| right instanceof ParenthesizedExpression
							|| right instanceof SuperFieldAccess
							|| right instanceof SuperMethodInvocation
							|| right instanceof ThisExpression
							|| right instanceof CastExpression) {
						left.accept(this);
						buffer.append(" = ");
						right.accept(this);
						return false;
					}
				}
				ITypeBinding rightTypeBinding = right.resolveTypeBinding();
				/*
				 * FIXME: Bug here!: 
				 * v[count++] += 'a';
				 * v[count++] = String.fromCharCode ((v[count++]).charCodeAt (0) + 97);
				 */
				left.accept(this);
				if (rightTypeBinding != null && "char".equals(rightTypeBinding.getName()) && !isMixedOp) {
					buffer.append(' ');
					buffer.append(op);
					buffer.append(' ');
					right.accept(this);
				} else {
					buffer.append(" = String.fromCharCode (");
					if (isMixedOp) {
						if (left instanceof SimpleName || left instanceof QualifiedName) {
							left.accept(this);
						} else {
							buffer.append("(");
							left.accept(this);
							buffer.append(")");
						}
						buffer.append(".charCodeAt (0) ");
						buffer.append(op.charAt(0));
					}
					buffer.append(' ');
					if (right instanceof InfixExpression) {
						String constValue = checkConstantValue(right);
						if (constValue != null) {
							buffer.append(constValue);
						} else {
							buffer.append("(");
							right.accept(this);
							buffer.append(")");
						}
						if ("char".equals(rightTypeBinding.getName())) {
							buffer.append(".charCodeAt (0)");
						}
					} else {
						if ("char".equals(rightTypeBinding.getName())) {
							Object constValue = right.resolveConstantExpressionValue();
							if (constValue != null && constValue instanceof Character) {
								buffer.append(((Character) constValue).charValue() + 0);
							} else {
								boolean needParenthesis = !(right instanceof ParenthesizedExpression || right instanceof PrefixExpression || right instanceof PostfixExpression);
								if (needParenthesis) {
									buffer.append("(");
								}
								right.accept(this);
								if (needParenthesis) {
									buffer.append(")");
								}
								buffer.append(".charCodeAt (0)");
							}
						} else {
							right.accept(this);
						}
					}
					buffer.append(')');
				}
				return false;
			}
		}
		left.accept(this);
		buffer.append(' ');
		buffer.append(op);
		buffer.append(' ');
		ITypeBinding binding = right.resolveTypeBinding();
		if (binding != null && "char".equals(binding.getName())) {
			String typeBindingName = (typeBinding != null) ? typeBinding.getName() : null;
			if (right instanceof CharacterLiteral) {
				CharacterLiteral cl = (CharacterLiteral) right;
				if ("char".equals(typeBindingName) || typeBindingName.indexOf("String") != -1) {
					String constValue = checkConstantValue(right);
					buffer.append(constValue);
				} else {
					buffer.append(0 + cl.charValue());
				}
			} else {
				if (typeBindingName != null && ("char".equals(typeBindingName) || typeBindingName.indexOf("String") != -1)) {
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
								newMethodBuffer.append(".charCodeAt ");
								newMethodBuffer.append(buffer.substring(idx2 + 8, length - 1));
								buffer.delete(idx1, length);
								buffer.append(newMethodBuffer.toString());
								appendingCode = false;
							}
						}
					}
					if (appendingCode) {
						buffer.append(".charCodeAt (0)");
					}
				}
			}
		} else {
			boxingNode(right);
		}
		return false;
	}

	public void endVisit(Block node) {
		buffer.append("}");
		List finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
		List normalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).normalVars;
		for (int i = finalVars.size() - 1; i >= 0; i--) {
			ASTFinalVariable var = (ASTFinalVariable) finalVars.get(i);
			if (var.blockLevel >= blockLevel) {
				finalVars.remove(i);
			}
		}
		for (int i = normalVars.size() - 1; i >= 0; i--) {
			ASTFinalVariable var = (ASTFinalVariable) normalVars.get(i);
			if (var.blockLevel >= blockLevel) {
				normalVars.remove(i);
			}
		}
		blockLevel--;
		super.endVisit(node);
	}

	public void endVisit(MethodDeclaration node) {
		List finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
		List visitedVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).visitedVars;
		List normalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).normalVars;
		List parameters = node.parameters();
		String methodSig = null;
		IMethodBinding resolveBinding = node.resolveBinding();
		if (resolveBinding != null) {
			methodSig = resolveBinding.getKey();
		}
		for (int i = parameters.size() - 1; i >= 0; i--) {
			SingleVariableDeclaration varDecl = (SingleVariableDeclaration) parameters.get(i);
			
			SimpleName name = varDecl.getName();
			IBinding binding = name.resolveBinding();
			if (binding != null) {
				String identifier = name.getIdentifier();
				ASTFinalVariable f = new ASTFinalVariable(blockLevel + 1, identifier, methodSig);
				f.toVariableName = getIndexedVarName(identifier, normalVars.size());
				normalVars.remove(f);
				if ((binding.getModifiers() & Modifier.FINAL) != 0) {
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
		/*
		 * TODO: verify that the label is not supported!
		 */
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
		/*
		 * TODO: verify that label is not supported!
		 */
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
		//name.accept(this);
		buffer.append(", $");
		buffer.append(varName);
		//name.accept(this);
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
			//name.accept(this);
			buffer.append(".hasNext () && ((");
			buffer.append(varName);
			//name.accept(this);
			buffer.append(" = $");
			buffer.append(varName);
			//name.accept(this);
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
		 * }
		 * should converted to 
		 * if(x.booleanValue()){
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
			buffer.append("Clazz.instanceOf (");
			node.getLeftOperand().accept(this);
			buffer.append(", ");
			if (right instanceof ArrayType) {
				buffer.append("Array");
			} else {
				right.accept(this);
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
			if (token.endsWith("F") || token.endsWith("f")
					|| token.endsWith("D") || token.endsWith("d")) {
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
		/*
		 * TODO: Clazz.castNullAs should be used instead
		 */
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
		buffer.append ("Clazz.declarePackage (\"");
		node.getName().accept(this);
		buffer.append ("\");\r\n");
		return false;
	}

	public boolean visit(ParenthesizedExpression node) {
		buffer.append("(");
		node.getExpression().accept(this);
		buffer.append(")");
		return false;
	}

	public void endVisit(PostfixExpression node) {
		Expression left = node.getOperand();
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			return ;
		}
		ITypeBinding typeBinding = node.getOperand().resolveTypeBinding();
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				return ;
			}
		}
		buffer.append(node.getOperator());
		super.endVisit(node);
	}

	public boolean visit(PostfixExpression node) {
		Expression left = node.getOperand();
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		ITypeBinding typeBinding = left.resolveTypeBinding();
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			boolean directStaticAccess = left instanceof SimpleName
					|| (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression);
			ASTNode parent = node.getParent();
			boolean staticCharType = typeBinding.isPrimitive() && "char".equals(typeBinding.getName());
			boolean needParenthesis = (supportsObjectStaticFields || !directStaticAccess
					|| (typeBinding != null && staticCharType))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
					buffer.append(", ");
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression)) { 
					leftAccess.getExpression().accept(this);
					buffer.append(", ");
				}
			}
			if ((supportsObjectStaticFields || staticCharType) && !(parent instanceof Statement)) {
				buffer.append("$t$ = ");
			}
			String op = node.getOperator().toString();
			if (staticCharType) {
				if (!(parent instanceof Statement)) {
					buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
					buffer.append('.');
					if (left instanceof QualifiedName) {
						QualifiedName leftName = (QualifiedName) left;
						leftName.getName().accept(this);
					} else if (left instanceof FieldAccess) {
						FieldAccess leftAccess = (FieldAccess) left;
						leftAccess.getName().accept(this);
					} else {
						Name leftName = (Name) left;
						leftName.accept(this);
					}
					buffer.append(", ");
				}
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(" = String.fromCharCode (");
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				if ("++".equals(op)) {
					buffer.append(".charCodeAt (0) + 1)");
				} else {
					buffer.append(".charCodeAt (0) - 1)");
				}
			} else {
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				//buffer.append(' ');
				buffer.append(op);
			}
			
			if (supportsObjectStaticFields) {
				buffer.append(", ");
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append(".prototype.");
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(" = ");
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
			}
			if ((supportsObjectStaticFields || staticCharType) && !(parent instanceof Statement)) {
				buffer.append(", $t$");
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				ASTNode parent = node.getParent();
				if (!(parent instanceof Statement)) {
					if (!(parent instanceof ParenthesizedExpression)) {
						buffer.append("(");
					}
					buffer.append("$c$ = ");
					left.accept(this);
					buffer.append(", ");
				}
				left.accept(this);
				buffer.append(" = String.fromCharCode (");
				left.accept(this);
				String op = node.getOperator().toString();
				if ("++".equals(op)) {
					buffer.append(".charCodeAt (0) + 1)");
				} else {
					buffer.append(".charCodeAt (0) - 1)");
				}
				if (!(parent instanceof Statement)) {
					buffer.append(", $c$");
					if (!(parent instanceof ParenthesizedExpression)) {
						buffer.append(")");
					}
				}
				return false;
			}
		}
		boxingNode(left);
		return false;
		//return super.visit(node);
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
		IVariableBinding varBinding = null;
		if (left instanceof Name) {
			Name leftName = (Name) left;
			IBinding nameBinding = leftName.resolveBinding();
			if (nameBinding instanceof IVariableBinding) {
				varBinding = (IVariableBinding) nameBinding;
			}
		} else if (left instanceof FieldAccess) {
			FieldAccess leftAccess = (FieldAccess) left;
			varBinding = leftAccess.resolveFieldBinding();
		}
		ITypeBinding typeBinding = left.resolveTypeBinding();
		ITypeBinding declaring = null;
		String qName = null;
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qName.startsWith("net.sf.j2s.html.")) {
			boolean directStaticAccess = left instanceof SimpleName
					|| (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression);
			ASTNode parent = node.getParent();
			boolean needParenthesis = (supportsObjectStaticFields || !directStaticAccess
					|| (typeBinding != null && typeBinding.isPrimitive() && "char".equals(typeBinding.getName())))
					&& !(parent instanceof Statement || parent instanceof ParenthesizedExpression);
			if (needParenthesis) {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
					buffer.append(", ");
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression/* 
						|| leftAccess.getExpression() instanceof SimpleName*/)) { 
					leftAccess.getExpression().accept(this);
					buffer.append(", ");
				}
			}
			if (supportsObjectStaticFields) {
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append(".prototype.");
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(" = ");
			}
			if (typeBinding.isPrimitive() && "char".equals(typeBinding.getName())) {
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				buffer.append(" = String.fromCharCode (");
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
				if ("++".equals(op)) {
					buffer.append(".charCodeAt (0) + 1)");
				} else {
					buffer.append(".charCodeAt (0) - 1)");
				}
			} else {
				buffer.append(op);
				//buffer.append(' ');
				buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				buffer.append('.');
				if (left instanceof QualifiedName) {
					QualifiedName leftName = (QualifiedName) left;
					leftName.getName().accept(this);
				} else if (left instanceof FieldAccess) {
					FieldAccess leftAccess = (FieldAccess) left;
					leftAccess.getName().accept(this);
				} else {
					Name leftName = (Name) left;
					leftName.accept(this);
				}
			}
			if (needParenthesis) {
				buffer.append(")");
			}
			return false;
		}
		if (typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				ASTNode parent = node.getParent();
				if (!(parent instanceof Statement || parent instanceof ParenthesizedExpression)) {
					buffer.append("(");
				}
				left.accept(this);
				buffer.append(" = String.fromCharCode (");
				left.accept(this);
				if ("++".equals(op)) {
					buffer.append(".charCodeAt (0) + 1)");
				} else {
					buffer.append(".charCodeAt (0) - 1)");
				}
				if (!(parent instanceof Statement || parent instanceof ParenthesizedExpression)) {
					buffer.append(")");
				}
				return false;
			}
		}
		buffer.append(node.getOperator());
		boxingNode(left);
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
		boolean staticFields = false;
		IVariableBinding varBinding = null;
		IBinding nameBinding = node.resolveBinding();
		if (nameBinding instanceof IVariableBinding) {
			varBinding = (IVariableBinding) nameBinding;
		}
		ITypeBinding declaring = null;
		String qdName = null;
		if (!supportsObjectStaticFields && varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& (declaring = varBinding.getDeclaringClass()) != null 
				&& !(qdName = declaring.getQualifiedName()).startsWith("org.eclipse.swt.internal.xhtml.")
				&& !qdName.startsWith("net.sf.j2s.html.")) {
			IBinding qBinding = node.getQualifier().resolveBinding();
			if (!(qBinding != null && qBinding instanceof ITypeBinding)) {
				staticFields = true;
			}
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
			if (binding != null) {
				if (!(binding instanceof IVariableBinding)) {
					ITypeBinding typeBinding = qualifier.resolveTypeBinding();
					if (typeBinding != null) {
						// Compiling inner Class or enum type, like:
						// RadiusData.EnumType e = RadiusData.EnumType.THREE;
						// avoid generate duplicated RadiusData
						String name = typeBinding.getQualifiedName();
//						ITypeBinding declaringClass = typeBinding.getDeclaringClass();
//						if (declaringClass != null) {
//							name = declaringClass.getQualifiedName();
//						} else {
//							IPackageBinding pkg = typeBinding.getPackage();
//							if (pkg != null) {
//								name = pkg.getName();
//							} else {
//								name = "";
//							}
//						}
						String xhtml = "net.sf.j2s.html.";
						if (name.indexOf(xhtml) == 0) {
							name = name.substring(xhtml.length());
						}
						if (name.indexOf("java.lang.") == 0) {
							name = name.substring(10);
						}
						if (name.length() != 0) {
							if (staticFields) {
								if (qualifier instanceof SimpleName) {
									buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
								} else {
									buffer.append('(');
									buffer.append(name);
									buffer.append(", ");
									buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
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
		}
		Name qName = node.getQualifier();
		String nodeStr = qName.toString();
		if (nodeStr.equals("net.sf.j2s.html")
				|| nodeStr.equals("org.eclipse.swt.internal.xhtml")) {
			node.getName().accept(this);
			return false;
		}
		if (!qualifierVisited) {
			if (staticFields) {
				if (qName instanceof SimpleName) {
					buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
				} else {
					buffer.append('(');
					qName.accept(this);
					buffer.append(", ");
					buffer.append(assureQualifiedName(shortenQualifiedName(varBinding.getDeclaringClass().getQualifiedName())));
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

	public boolean visit(ReturnStatement node) {
		buffer.append("return");
		Expression expression = node.getExpression();
		if (expression != null) {
			buffer.append(' ');
			boolean needCharWrapping = false;
			ASTNode parent = node.getParent();
			while (parent != null && !(parent instanceof MethodDeclaration)) {
				parent = parent.getParent();
			}
			if (parent != null) {
				MethodDeclaration m = (MethodDeclaration) parent;
				IMethodBinding binding = m.resolveBinding();
				if (binding != null) {
					ITypeBinding returnType = binding.getReturnType();
					if (returnType != null && "char".equals(returnType.getName())) {
						needCharWrapping = true;
					}
				}
			}
			if (needCharWrapping) {
				ITypeBinding tBinding = expression.resolveTypeBinding();
				if (tBinding != null && !("char".equals(tBinding.getName()))) {
					buffer.append("String.fromCharCode (");
					expression.accept(this);
					buffer.append(")");
				} else {
					expression.accept(this);
				}
			} else {
				expression.accept(this);
			}
		}
		buffer.append(";\r\n");
		return false;
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

	public boolean visit(SwitchStatement node) {
		buffer.append("switch (");
		node.getExpression().accept(this);
		buffer.append(") {\r\n");
		visitList(node.statements(), "");
		buffer.append("}\r\n");
		return false;
	}

	public boolean visit(SynchronizedStatement node) {
		/*
		 * TODO: synchronized keyword should be implemented in JS
		 */
		node.getBody().accept(this);
		return false;
	}

	public boolean visit(ThrowStatement node) {
		buffer.append("throw ");
		node.getExpression().accept(this);
		buffer.append(";\r\n");
		return false;
	}

	public boolean visit(TryStatement node) {
		buffer.append("try ");
		node.getBody().accept(this);
		List catchClauses = node.catchClauses();
		int size = catchClauses.size();
		if (size > 0) {
			String catchEName = "e$$";
			if (size == 1) {
				CatchClause element = (CatchClause) catchClauses.get(0);
				SimpleName exName = element.getException().getName();
				catchEName = exName.getIdentifier();
			}
			buffer.append(" catch (" + catchEName + ") ");
			boolean scopeAdded = false;
			boolean endedWithThrowable = false;
			for (Iterator iter = catchClauses.iterator(); iter.hasNext();) {
				CatchClause element = (CatchClause) iter.next();
				Type type = element.getException().getType();
				String typeName = type.toString();
				if (!"Throwable".equals(typeName) && !"java.lang.Throwable".equals(typeName)) {
					if (!scopeAdded) {
						buffer.append("{\r\n");
						scopeAdded = true;
					}
					buffer.append("if (Clazz.exceptionOf (" + catchEName + ", ");//sgurin : isExceptionOf compiler support.
					//old code was: buffer.append("if (Clazz.instanceOf (" + catchEName + ", ");
					type.accept(this);
					buffer.append(")) ");
				} else {
					endedWithThrowable = true;
				}
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

	public boolean visit(VariableDeclarationExpression node) {
		/*
		 * TODO: Confirm that whether "var" is necessary or not
		 */
		buffer.append("var ");
		visitList(node.fragments(), ", ");
		return false;
	}
	
	public boolean visit(VariableDeclarationFragment node) {
		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			String identifier = name.getIdentifier();
			ASTFinalVariable f = null;
			if (methodDeclareStack.size() == 0) {
				f = new ASTFinalVariable(blockLevel, identifier, null);
			} else {
				String methodSig = (String) methodDeclareStack.peek();
				f = new ASTFinalVariable(blockLevel, identifier, methodSig);
			}
			List finalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).finalVars;
			List normalVars = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).normalVars;
			f.toVariableName = getIndexedVarName(identifier, normalVars.size());
			normalVars.add(f);
			if ((binding.getModifiers() & Modifier.FINAL) != 0) {
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
						buffer.append(0 + cl.charValue());
					}
					return false;
				} else {
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
							buffer.append(".charCodeAt (0)");
						}
						return false;
					}
				}
			}
			ITypeBinding nameTypeBinding = name.resolveTypeBinding();
			if (nameTypeBinding != null) {
				String nameType = nameTypeBinding.getName();
				if ("char".equals(nameType)) {
					if (typeBinding != null && !"char".equals(typeBinding.getName())) {
						buffer.append("String.fromCharCode (");
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
		List fragments = node.fragments();
		for (Iterator iter = fragments.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			buffer.append("var ");
			element.accept(this);
			buffer.append(";\r\n");
		}
		return false;
	}

	public boolean visit(WhileStatement node) {
		buffer.append("while (");
		node.getExpression().accept(this);
		buffer.append(") ");
		node.getBody().accept(this);
		buffer.append("\r\n");
		return false;
	}

}
