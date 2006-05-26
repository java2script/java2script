/*******************************************************************************
 * Copyright (c) 2005 ognize.com and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     ognize.com - initial API and implementation
 *******************************************************************************/
package net.sf.j2s.core.astvisitors;

import java.util.ArrayList;
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
import org.eclipse.jdt.core.dom.Comment;
import org.eclipse.jdt.core.dom.CompilationUnit;
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
import org.eclipse.jdt.core.dom.IPackageBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IVariableBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.ImportDeclaration;
import org.eclipse.jdt.core.dom.InfixExpression;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.InstanceofExpression;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.LabeledStatement;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.MethodInvocation;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.Name;
import org.eclipse.jdt.core.dom.NumberLiteral;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.ParenthesizedExpression;
import org.eclipse.jdt.core.dom.PostfixExpression;
import org.eclipse.jdt.core.dom.PrefixExpression;
import org.eclipse.jdt.core.dom.PrimitiveType;
import org.eclipse.jdt.core.dom.QualifiedName;
import org.eclipse.jdt.core.dom.ReturnStatement;
import org.eclipse.jdt.core.dom.SimpleName;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.StringLiteral;
import org.eclipse.jdt.core.dom.SuperFieldAccess;
import org.eclipse.jdt.core.dom.SuperMethodInvocation;
import org.eclipse.jdt.core.dom.SwitchCase;
import org.eclipse.jdt.core.dom.SwitchStatement;
import org.eclipse.jdt.core.dom.SynchronizedStatement;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
import org.eclipse.jdt.core.dom.ThisExpression;
import org.eclipse.jdt.core.dom.ThrowStatement;
import org.eclipse.jdt.core.dom.TryStatement;
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
 * @author josson smith
 *
 */
public class ASTKeywordParser extends ASTEmptyParser {

	protected StringBuffer buffer = new StringBuffer();
	
	protected String thisPackageName = "";

	protected int blockLevel = 0;
	
	protected Stack methodDeclareStack = new Stack();
	
	protected List finalVars = new ArrayList();
	
	protected boolean isFinalSensible = true;

	protected int currentBlockForVisit = -1;
	
	protected List visitedVars = new ArrayList();
	
	private Javadoc[] nativeJavadoc = null;
	
	private ASTNode javadocRoot = null;

	private boolean isDebugging = false;
	
	public ASTKeywordParser() {
		super();
	}

	public ASTKeywordParser(boolean visitDocTags) {
		super(visitDocTags);
	}

	
	public boolean isDebugging() {
		return isDebugging;
	}

	public void setDebugging(boolean isDebugging) {
		this.isDebugging = isDebugging;
	}

	public StringBuffer getBuffer() {
		return buffer;
	}

	public void setBuffer(StringBuffer buffer) {
		this.buffer = buffer;
	}

	public String getPackageName() {
		return thisPackageName;
	}

	protected void visitList(List list, String seperator) {
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			ASTNode element = (ASTNode) iter.next();
			element.accept(this);
			if (iter.hasNext()) {
				buffer.append(seperator);
			}
		}
	}
	
	protected static String listToString(List list, String seperator, String scope) {
		if (list.size() == 0) {
			return "null";
		}
		StringBuffer buf = new StringBuffer();
		buf.append("Clazz.cloneFinals (");
		//Set set = new HashSet();
		for (Iterator iter = list.iterator(); iter.hasNext();) {
			FinalVariable fv = (FinalVariable) iter.next();
			String name = fv.getVariableName();
			//if (!set.contains(name)) {
//				if (buf.length() >= 2) {
//					buf.append(seperator);
//				}
				//set.add(name);
				buf.append("\"");
				buf.append(name);
				buf.append("\", ");
				String methodScope = fv.getMethodScope();
				if (methodScope == null && scope == null) {
					buf.append(name);
				} else if (methodScope == null || scope == null) {
//					System.out.println(methodScope);
//					System.out.println(scope);
//					System.out.println("--==--");
					buf.append("this.$finals." + name);
				} else if (methodScope.equals(scope)) {
					buf.append(name);
				} else {
//					System.out.println(methodScope);
//					System.out.println(scope);
//					System.out.println("------");
					buf.append("this.$finals." + name);
				}
				if (iter.hasNext()) {
					buf.append(seperator);
				}
			//}
		}
		buf.append(")");
		return buf.toString();
	}
	
	public void postVisit(ASTNode node) {
		super.postVisit(node);
	}

	public void preVisit(ASTNode node) {
		super.preVisit(node);
	}

	public void endVisit(ArrayAccess node) {
		super.endVisit(node);
	}

	public boolean visit(ArrayAccess node) {
		node.getArray().accept(this);
		buffer.append('[');
		Expression index = node.getIndex();
		index.accept(this);
		ITypeBinding rightTypeBinding = index.resolveTypeBinding();
		if ("char".equals(rightTypeBinding.getName())) {
			buffer.append(".charCodeAt (0)");
		}
		buffer.append(']');
		return false;
	}

	public void endVisit(ArrayCreation node) {
		super.endVisit(node);
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
//			if (dim != null && dim.size() == 1) {
//				ASTNode element = (ASTNode) dim.get(0);
//				element.accept(this);
//			}
			ITypeBinding binding = node.getType().resolveBinding();
			ITypeBinding elementType = binding.getElementType();
			if (elementType.isPrimitive()) {
				String typeCode = elementType.getName();
				if ("int".equals(typeCode)
						|| "float".equals(typeCode)
						|| "double".equals(typeCode)
						|| "byte".equals(typeCode)
						|| "long".equals(typeCode)
						|| "short".equals(typeCode)) {
					buffer.append(" Clazz.newArray (");
					visitList(dim, ", ");
					buffer.append(", 0)");
				} else if ("char".equals(typeCode)) {
					buffer.append(" Clazz.newArray (");
					visitList(dim, ", ");
					buffer.append(", '\\0')");
				} else if ("boolean".equals(typeCode)) {
					buffer.append(" Clazz.newArray (");
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
//			buffer.append(" new Array (");
//			List dim = node.dimensions();
//			if (dim != null && dim.size() == 1) {
//				ASTNode element = (ASTNode) dim.get(0);
//				element.accept(this);
//			}
//			buffer.append(")");
		}
		return false;
	}

	public void endVisit(ArrayInitializer node) {
		super.endVisit(node);
	}

	public boolean visit(ArrayInitializer node) {
		/*
		 * TODO: should be tested
		 */
		buffer.append("[");
		List list = node.expressions();
		visitList(list, ", ");
		buffer.append("]");
		return false;
	}

	public void endVisit(ArrayType node) {
		super.endVisit(node);
	}

	public boolean visit(ArrayType node) {
//		buffer.append("var ");
		return super.visit(node);
	}

	public void endVisit(AssertStatement node) {
		super.endVisit(node);
	}

	public boolean visit(AssertStatement node) {
		/*
		 * TODO: should be implemented
		 */
		return super.visit(node);
	}

	public void endVisit(Assignment node) {
		super.endVisit(node);
	}

	public boolean visit(Assignment node) {
		Expression left = node.getLeftHandSide();
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
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& varBinding.getDeclaringClass() != null 
				&& !varBinding.getDeclaringClass().getQualifiedName().startsWith("org.eclipse.swt.internal.xhtml")) {
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append("(((");
			} else {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression/* 
						|| leftAccess.getExpression() instanceof SimpleName*/)) { 
					leftAccess.getExpression().accept(this);
				}
//			} else {
//				buffer.append("true");
			}
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append(") || true) ? ($t$ = ");
			} else {
				buffer.append("$t$ = ");
			}
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			String op = node.getOperator().toString();
			buffer.append(op);
			Expression right = node.getRightHandSide();
			buffer.append(' ');
			right.accept(this);
			
			buffer.append(", ");
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append(", $t$) : 0)");
			} else {
				buffer.append(", $t$)");
			}
			return false;
		}
		ITypeBinding typeBinding = left.resolveTypeBinding();
		String op = node.getOperator().toString();
		Expression right = node.getRightHandSide();
		if (typeBinding.isPrimitive()) {
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
					return false;
				}
			} else if ("char".equals(typeBinding.getName())) {
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
				 * FIXME: Bug here!: v[count++] = 'a';
				 */
				left.accept(this);
				buffer.append(" = String.fromCharCode (");
				if (isMixedOp) {
					buffer.append ("(");
					left.accept(this);
					buffer.append(").charCodeAt (0) ");
					buffer.append(op.charAt(0));
				}
				if (right instanceof InfixExpression) {
					buffer.append(" (");
					right.accept(this);
					buffer.append(')');
					if ("char".equals(rightTypeBinding.getName())) {
						buffer.append(".charCodeAt (0)");
					}
				} else {
					buffer.append(' ');
					if ("char".equals(rightTypeBinding.getName())) {
						buffer.append(" (");
						right.accept(this);
						buffer.append(").charCodeAt (0)");
					} else {
						right.accept(this);
					}
				}
				buffer.append(')');
				return false;
			}
		}
		left.accept(this);
		buffer.append(' ');
		buffer.append(op);
		buffer.append(' ');
		if ("char".equals(right.resolveTypeBinding().getName())) {
			buffer.append('(');
			right.accept(this);
			buffer.append(").charCodeAt (0)");
		} else {
			right.accept(this);
		}
		return false;
	}

	public void endVisit(Block node) {
		buffer.append("}");
		for (int i = finalVars.size() - 1; i >= 0; i--) {
			FinalVariable var = (FinalVariable) finalVars.get(i);
			if (var.getBlockLevel() >= blockLevel) {
				finalVars.remove(i);
			}
		}
		blockLevel--;
		super.endVisit(node);
	}

	public boolean visit(Block node) {
		blockLevel++;
		buffer.append("{\r\n");
		ASTNode parent = node.getParent();
		if (parent instanceof MethodDeclaration) {
			MethodDeclaration method = (MethodDeclaration) parent;
			Javadoc javadoc = method.getJavadoc();
			/*
			 * if comment contains "@j2sNative", then output the given native 
			 * JavaScript codes directly. 
			 */
			if (visitNativeJavadoc(javadoc, node, true) == false) {
				return false;
			}
			IMethodBinding methodBinding = method.resolveBinding();
			ITypeBinding superclass = methodBinding.getDeclaringClass().getSuperclass();
			boolean containsSuperPrivateMethod = false; 
			while (superclass != null) {
				IMethodBinding[] methods = superclass.getDeclaredMethods();
				for (int i = 0; i < methods.length; i++) {
					if (methods[i].getName().equals(methodBinding.getName())
							&& (methods[i].getModifiers() & Modifier.PRIVATE) != 0) {
						containsSuperPrivateMethod = true;
						break;
					}
				}
				if (containsSuperPrivateMethod) {
					break;
				}
				superclass = superclass.getSuperclass();
			}
			if (containsSuperPrivateMethod) {
				buffer.append("var $private = Clazz.checkPrivateMethod (arguments);\r\n");
				buffer.append("if ($private != null) {\r\n");
				buffer.append("return $private.apply (this, arguments);\r\n");
				buffer.append("}\r\n");
			}
		} else if (parent instanceof Initializer) {
			Initializer initializer = (Initializer) parent;
			Javadoc javadoc = initializer.getJavadoc();
			/*
			 * if comment contains "@j2sNative", then output the given native 
			 * JavaScript codes directly. 
			 */
			if (visitNativeJavadoc(javadoc, node, true) == false) {
				return false;
			}
		}
		int blockStart = node.getStartPosition();
		int previousStart = getPreviousStartPosition(node);
		ASTNode root = node.getRoot();
		checkJavadocs(root);
		//for (int i = 0; i < nativeJavadoc.length; i++) {
		for (int i = nativeJavadoc.length - 1; i >= 0; i--) {
			Javadoc javadoc = nativeJavadoc[i];
			int commentStart = javadoc.getStartPosition();
			if (commentStart > previousStart && commentStart < blockStart) {
				/*
				 * if the block's leading comment contains "@j2sNative", 
				 * then output the given native JavaScript codes directly. 
				 */
				if (visitNativeJavadoc(javadoc, node, true) == false) {
					return false;
				}
			}
		}
		return super.visit(node);
	}
	
	boolean visitNativeJavadoc(Javadoc javadoc, Block node, boolean superVisit) {
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sIgnore".equals(tagEl.getTagName())) {
						if (superVisit) super.visit(node);
						return false;
					}
				}
				if (isDebugging) {
					for (Iterator iter = tags.iterator(); iter.hasNext();) {
						TagElement tagEl = (TagElement) iter.next();
						if ("@j2sDebug".equals(tagEl.getTagName())) {
							if (superVisit) super.visit(node);
							List fragments = tagEl.fragments();
							boolean isFirstLine = true;
							for (Iterator iterator = fragments.iterator(); iterator
									.hasNext();) {
								TextElement commentEl = (TextElement) iterator.next();
								String text = commentEl.getText().trim();
								if (isFirstLine) {
									if (text.length() == 0) {
										continue;
									}
								}
								buffer.append(text);
								buffer.append("\r\n");
							}
							return false;
						}
					}
				}
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sNative".equals(tagEl.getTagName())) {
						if (superVisit) super.visit(node);
						List fragments = tagEl.fragments();
						boolean isFirstLine = true;
						for (Iterator iterator = fragments.iterator(); iterator
								.hasNext();) {
							TextElement commentEl = (TextElement) iterator.next();
							String text = commentEl.getText().trim();
							if (isFirstLine) {
								if (text.length() == 0) {
									continue;
								}
							}
							buffer.append(text);
							buffer.append("\r\n");
						}
						return false;
					}
				}
			}
		}
		return true;
	}


	private void checkJavadocs(ASTNode root) {
		if (root != javadocRoot) {
			nativeJavadoc = null;
			javadocRoot = root;
		}
		if (nativeJavadoc == null) {
			nativeJavadoc = new Javadoc[0];
			if (root instanceof CompilationUnit) {
				CompilationUnit unit = (CompilationUnit) root;
				List commentList = unit.getCommentList();
				ArrayList list = new ArrayList();
				for (Iterator iter = commentList.iterator(); iter.hasNext();) {
					Comment comment = (Comment) iter.next();
					if (comment instanceof Javadoc) {
						Javadoc javadoc = (Javadoc) comment;
						List tags = javadoc.tags();
						if (tags.size() != 0) {
							for (Iterator itr = tags.iterator(); itr.hasNext();) {
								TagElement tagEl = (TagElement) itr.next();
								String tagName = tagEl.getTagName();
								if ("@j2sIgnore".equals(tagName)
										|| "@j2sDebug".equals(tagName)
										|| "@j2sNative".equals(tagName)) {
									list.add(comment);
								}
							}
						}
					}
				}
				nativeJavadoc = (Javadoc[]) list.toArray(nativeJavadoc);
			}
		}
	}

	private int getPreviousStartPosition(Block node) {
		int previousStart = 0;
		ASTNode blockParent = node.getParent();
		if (blockParent != null) {
			if (blockParent instanceof Statement) {
				Statement sttmt = (Statement) blockParent;
				previousStart = sttmt.getStartPosition();
				if (sttmt instanceof Block) {
					Block parentBlock = (Block) sttmt;
					for (Iterator iter = parentBlock.statements().iterator(); iter.hasNext();) {
						Statement element = (Statement) iter.next();
						if (element == node) {
							break;
						}
						previousStart = element.getStartPosition() + element.getLength();
					}
				} else if (sttmt instanceof IfStatement) {
					IfStatement ifSttmt = (IfStatement) sttmt;
					if (ifSttmt.getElseStatement() == node) {
						Statement thenSttmt = ifSttmt.getThenStatement();
						previousStart = thenSttmt.getStartPosition() + thenSttmt.getLength();
					}
				}
			} else if (blockParent instanceof MethodDeclaration) {
				MethodDeclaration method = (MethodDeclaration) blockParent;
				previousStart = method.getStartPosition();
			} else if (blockParent instanceof Initializer) {
				Initializer initializer = (Initializer) blockParent;
				previousStart = initializer.getStartPosition();
			}
		}
		return previousStart;
	}
	
	public void endVisit(BooleanLiteral node) {
		super.endVisit(node);
	}

	public boolean visit(BooleanLiteral node) {
		buffer.append(node.booleanValue());
		return false;
	}

	public void endVisit(BreakStatement node) {
		super.endVisit(node);
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

	public void endVisit(CatchClause node) {
		super.endVisit(node);
	}

	public boolean visit(CatchClause node) {
		buffer.append(" catch (");
		node.getException().accept(this);
		buffer.append(") ");
		node.getBody().accept(this);
		return false;
	}

	public void endVisit(CharacterLiteral node) {
		super.endVisit(node);
	}

	public boolean visit(CharacterLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	public void endVisit(ConditionalExpression node) {
		super.endVisit(node);
	}

	public boolean visit(ConditionalExpression node) {
		node.getExpression().accept(this);
		buffer.append(" ? ");
		node.getThenExpression().accept(this);
		buffer.append(" : ");
		node.getElseExpression().accept(this);
		return false;
	}

	public void endVisit(ContinueStatement node) {
		super.endVisit(node);
	}

	public boolean visit(ContinueStatement node) {
		buffer.append("continue ");
		/*
		 * TODO: verify that label is not supported!
		 */
		SimpleName label = node.getLabel();
		if (label != null) {
			label.accept(this);
		}
		buffer.append(";");
		return false;
	}

	public void endVisit(DoStatement node) {
		super.endVisit(node);
	}

	public boolean visit(DoStatement node) {
		buffer.append("do ");
		node.getBody().accept(this);
		buffer.append(" while (");
		node.getExpression().accept(this);
		buffer.append(");\r\n");
		return false;
	}

	public void endVisit(EmptyStatement node) {
		super.endVisit(node);
	}

	public boolean visit(EmptyStatement node) {
		buffer.append(";");
		return false;
	}

	public void endVisit(EnhancedForStatement node) {
		// TODO Auto-generated method stub
		super.endVisit(node);
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

	public boolean visit(ExpressionStatement node) {
		return super.visit(node);
	}

	public void endVisit(ForStatement node) {
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

	public void endVisit(IfStatement node) {
		super.endVisit(node);
	}

	public boolean visit(IfStatement node) {
		buffer.append("if (");
		node.getExpression().accept(this);
		buffer.append(") ");
		node.getThenStatement().accept(this);
		if (node.getElseStatement() != null) {
			buffer.append(" else ");
			node.getElseStatement().accept(this);
		}
		return false;
	}

	public void endVisit(ImportDeclaration node) {
		super.endVisit(node);
	}

	public boolean visit(ImportDeclaration node) {
		return false;
	}

	public void endVisit(InfixExpression node) {
		super.endVisit(node);
	}

	private boolean checkSimpleBooleanOperator(String op) {
		if (op.equals("^")
				|| op.equals("|")
				|| op.equals("&")) {
			return true;
		}
		return false;
	}
	
	private boolean checkInfixOperator(InfixExpression node) {
		if (checkSimpleBooleanOperator(node.getOperator().toString())) {
			return true;
		}
		Expression left = node.getLeftOperand();
		if (left instanceof InfixExpression) {
			if (checkInfixOperator((InfixExpression) left)) {
				return true;
			}
		}
		Expression right = node.getRightOperand();
		if (right instanceof InfixExpression) {
			if (checkInfixOperator((InfixExpression) right)) {
				return true;
			}
		}
		return false;
	}
	
	private void charVisit(ASTNode node, boolean beCare) {
		if (!beCare || !(node instanceof Expression)) {
			node.accept(this);
			return ;
		}
		ITypeBinding binding = ((Expression) node).resolveTypeBinding();
		if (binding.isPrimitive() && "char".equals(binding.getName())) {
			buffer.append("(");
			node.accept(this);
			buffer.append(").charCodeAt (0)");
		} else {
			node.accept(this);
		}
	}
	
	public boolean visit(InfixExpression node) {
		ITypeBinding expTypeBinding = node.resolveTypeBinding();
		boolean beCare = false;
		if (expTypeBinding != null 
				&& expTypeBinding.getName().indexOf("String") == -1) {
			beCare = true;
		}
		String operator = node.getOperator().toString();
		Expression left = node.getLeftOperand();
		ITypeBinding typeBinding = left.resolveTypeBinding();
		if ("/".equals(operator)) {
			if (typeBinding != null && typeBinding.isPrimitive()) {
				if (OperatorTypeUtil.isIntegerType(typeBinding.getName())) {
					Expression right = node.getRightOperand();
					ITypeBinding rightTypeBinding = right.resolveTypeBinding();
					if (OperatorTypeUtil.isIntegerType(rightTypeBinding.getName())) {
						StringBuffer tmpBuffer = buffer;
						buffer = new StringBuffer();
						
						buffer.append("Math.floor (");
						charVisit(left, beCare);
						//left.accept(this);
						buffer.append(' ');
						buffer.append(operator);
						buffer.append(' ');
						charVisit(right, beCare);
						//right.accept(this);
						buffer.append(')');
						List extendedOperands = node.extendedOperands();
						if (extendedOperands.size() > 0) {
							for (Iterator iter = extendedOperands.iterator(); iter.hasNext();) {
								ASTNode element = (ASTNode) iter.next();
								boolean is2Floor = false;
								if (element instanceof Expression) {
									Expression exp = (Expression) element;
									ITypeBinding expBinding = exp.resolveTypeBinding();
									if (OperatorTypeUtil.isIntegerType(expBinding.getName())) {
										buffer.insert(0, "Math.floor (");
										is2Floor = true;
									}
								}
								buffer.append(' ');
								buffer.append(operator);
								buffer.append(' ');
								charVisit(element, beCare);
								//element.accept(this);
								if (is2Floor) {
									buffer.append(')');
								}
							}
						}

						tmpBuffer.append(buffer);
						buffer = tmpBuffer;
						tmpBuffer = null;
						
						return false;
					}
				}
			}
		}
		boolean simple = false; 
		if (typeBinding != null && typeBinding.isPrimitive()) {
			if ("boolean".equals(typeBinding.getName())) {
				if (checkInfixOperator(node)) {
					buffer.append(" new Boolean (");
					simple = true;
				}
			}
		}

		charVisit(node.getLeftOperand(), beCare);
		//node.getLeftOperand().accept(this);
		buffer.append(' ');
		buffer.append(operator);
		buffer.append(' ');
		charVisit(node.getRightOperand(), beCare);
		//node.getRightOperand().accept(this);
		List extendedOperands = node.extendedOperands();
		if (extendedOperands.size() > 0) {
			for (Iterator iter = extendedOperands.iterator(); iter.hasNext();) {
				buffer.append(' ');
				buffer.append(operator);
				buffer.append(' ');
				ASTNode element = (ASTNode) iter.next();
				charVisit(element, beCare);
				//element.accept(this);
			}
		}
		if (simple) {
			buffer.append(')');
		}
		return false;
	}

	public void endVisit(Initializer node) {
		super.endVisit(node);
	}

	public boolean visit(Initializer node) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sIgnore".equals(tagEl.getTagName())) {
						return false;
					}
				}
			}
		}
		//visitList(node.getBody().statements(), "\r\n");
		node.getBody().accept(this);
		return false;
	}

	public void endVisit(InstanceofExpression node) {
		super.endVisit(node);
	}

	public boolean visit(InstanceofExpression node) {
		buffer.append("Clazz.instanceOf (");
		node.getLeftOperand().accept(this);
		buffer.append(", ");
		node.getRightOperand().accept(this);
		buffer.append(")");
		return false;
	}

	public void endVisit(LabeledStatement node) {
		super.endVisit(node);
	}

	public boolean visit(LabeledStatement node) {
		buffer.append(node.getLabel());
		buffer.append(" : ");
		node.getBody().accept(this);
		return false;
	}

	public void endVisit(Modifier node) {
		super.endVisit(node);
	}

	public boolean visit(Modifier node) {
		return false;
	}

	public void endVisit(NumberLiteral node) {
		super.endVisit(node);
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

	public void endVisit(PackageDeclaration node) {
		super.endVisit(node);
	}

	public boolean visit(PackageDeclaration node) {
		thisPackageName = "" + node.getName();
		String[] swtInnerPackages = skipDeclarePackages();
		/*
		 * All the SWT package will be declared manually.
		 */
		for (int i = 0; i < swtInnerPackages.length; i++) {
			if (thisPackageName.equals(swtInnerPackages[i])) {
				return false;
			}
		}
		buffer.append ("Clazz.declarePackage (\"");
		node.getName().accept(this);
		buffer.append ("\");\r\n");
		return false;
	}

	protected String[] skipDeclarePackages() {
		return new String[] {"java.lang"};
	}

	public void endVisit(ParenthesizedExpression node) {
		super.endVisit(node);
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
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& varBinding.getDeclaringClass() != null 
				&& !varBinding.getDeclaringClass().getQualifiedName().startsWith("org.eclipse.swt.internal.xhtml")) {
			return ;
		}
		ITypeBinding typeBinding = node.getOperand().resolveTypeBinding();
		if (typeBinding.isPrimitive()) {
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
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& varBinding.getDeclaringClass() != null 
				&& !varBinding.getDeclaringClass().getQualifiedName().startsWith("org.eclipse.swt.internal.xhtml")) {
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append("(((");
			} else {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression/* 
						|| leftAccess.getExpression() instanceof SimpleName*/)) { 
					leftAccess.getExpression().accept(this);
				}
//			} else {
//				buffer.append("true");
			}
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append(") || true) ? ($t$ = ");
			} else {
				buffer.append("$t$ = ");
			}
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			String op = node.getOperator().toString();
			buffer.append(op);
			
			buffer.append(", ");
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append(", $t$) : 0)");
			} else {
				buffer.append(", $t$)");
			}
			return false;
		}
		ITypeBinding typeBinding = node.getOperand().resolveTypeBinding();
		if (typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				buffer.append("(");
				node.getOperand().accept(this);
				buffer.append(" = String.fromCharCode (($c$ = ");
				node.getOperand().accept(this);
				String op = node.getOperator().toString();
				if ("++".equals(op)) {
					buffer.append(").charCodeAt (0) + 1)");
				} else {
					buffer.append(").charCodeAt (0) - 1)");
				}
				buffer.append(", $c$)");
				return false;
			}
		}
		return super.visit(node);
	}

	public void endVisit(PrefixExpression node) {
		super.endVisit(node);
	}

	public boolean visit(PrefixExpression node) {
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
		if (varBinding != null 
				&& (varBinding.getModifiers() & Modifier.STATIC) != 0
				&& varBinding.getDeclaringClass() != null 
				&& !varBinding.getDeclaringClass().getQualifiedName().startsWith("org.eclipse.swt.internal.xhtml")) {
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append("(((");
			} else {
				buffer.append("(");
			}
			if (left instanceof QualifiedName) {
				QualifiedName leftName = (QualifiedName) left;
				if (!(leftName.getQualifier() instanceof SimpleName)) {
					leftName.getQualifier().accept(this);
				}
			} else if (left instanceof FieldAccess) {
				FieldAccess leftAccess = (FieldAccess) left;
				if (!(leftAccess.getExpression() instanceof ThisExpression/* 
						|| leftAccess.getExpression() instanceof SimpleName*/)) { 
					leftAccess.getExpression().accept(this);
				}
//			} else {
//				buffer.append("true");
			}
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append(") || true) ? ($t$ = ");
			} else {
				buffer.append("$t$ = ");
			}
			String op = node.getOperator().toString();
			buffer.append(op);
			buffer.append(' ');
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			buffer.append(JavaLangUtil.ripJavaLang(varBinding.getDeclaringClass().getQualifiedName()));
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
			if (!(left instanceof SimpleName || (left instanceof QualifiedName && ((QualifiedName) left).getQualifier() instanceof SimpleName)
					|| (left instanceof FieldAccess && ((FieldAccess) left).getExpression() instanceof ThisExpression))) {
				buffer.append(", $t$) : 0)");
			} else {
				buffer.append(", $t$)");
			}
			return false;
		}
		ITypeBinding typeBinding = node.getOperand().resolveTypeBinding();
		if (typeBinding.isPrimitive()) {
			if ("char".equals(typeBinding.getName())) {
				buffer.append("(");
				node.getOperand().accept(this);
				buffer.append(" = String.fromCharCode ((");
				node.getOperand().accept(this);
				String op = node.getOperator().toString();
				if ("++".equals(op)) {
					buffer.append(").charCodeAt (0) + 1)");
				} else {
					buffer.append(").charCodeAt (0) - 1)");
				}
				buffer.append(")");
				return false;
			}
		}
		buffer.append(node.getOperator());
		return super.visit(node);
	}

	public void endVisit(PrimitiveType node) {
		super.endVisit(node);
	}

	public boolean visit(PrimitiveType node) {
		/*
		 * TODO: primitive type should be precisely mapped to JS types 
		 */
		//buffer.append("var ");
		return super.visit(node);
	}

	public void endVisit(QualifiedName node) {
		super.endVisit(node);
	}

	protected boolean isSimpleQualified(QualifiedName node) {
		Name qualifier = node.getQualifier();
		if (qualifier instanceof SimpleName) {
			return true;
		} else if (qualifier instanceof QualifiedName) {
			return isSimpleQualified((QualifiedName) qualifier);
		}
		return false;
	}
	public boolean visit(QualifiedName node) {
//		IBinding nodeBinding = node.resolveBinding();
//		if (nodeBinding instanceof IVariableBinding) {
//			IVariableBinding varBinding = (IVariableBinding) nodeBinding;
//			if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
//				ASTNode parent = node.getParent();
//				if (parent != null && !(parent instanceof QualifiedName)) {
//					System.out.println("....");
//					buffer.append("(((");
//					node.getQualifier().accept(this);
//					buffer.append(") || true) ? ");
//					buffer.append(varBinding.getDeclaringClass().getQualifiedName());
//					buffer.append('.');
//					node.getName().accept(this);
//					buffer.append(" : 0)");
//					return false;
//				}
//			}
//		}
		Object constValue = node.resolveConstantExpressionValue();
		if (constValue != null && (constValue instanceof Number
				|| constValue instanceof Boolean)
				&& isSimpleQualified(node)) {
			buffer.append(constValue);
			return false;
		}
		ASTNode parent = node.getParent();
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
						String name = null;
						ITypeBinding declaringClass = typeBinding.getDeclaringClass();
						if (declaringClass != null) {
							name = declaringClass.getQualifiedName();
						} else {
							IPackageBinding pkg = typeBinding.getPackage();
							if (pkg != null) {
								name = pkg.getName();
							} else {
								name = "";
							}
						}
						if (name.indexOf("java.lang") != -1) {
							name = name.substring(9);
						}
						if (name.length() != 0) {
							buffer.append(name);
							buffer.append('.');
						}
					}
//				} else {
//					IVariableBinding varBinding = (IVariableBinding) binding;
//					if ((varBinding.getModifiers() & Modifier.STATIC) != 0) {
//						
//					}
				}
			}
		}
		node.getQualifier().accept(this);
		buffer.append('.');
		node.getName().accept(this);
		return false;
	}

	public void endVisit(ReturnStatement node) {
		super.endVisit(node);
	}

	public boolean visit(ReturnStatement node) {
		buffer.append("return ");
		Expression expression = node.getExpression();
		if (expression != null) {
			expression.accept(this);
		}
		buffer.append(";\r\n");
		return false;
	}

	public void endVisit(StringLiteral node) {
		super.endVisit(node);
	}

	public boolean visit(StringLiteral node) {
		buffer.append(node.getEscapedValue());
		return false;
	}

	public void endVisit(SwitchCase node) {
		super.endVisit(node);
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

	public void endVisit(SwitchStatement node) {
		super.endVisit(node);
	}

	public boolean visit(SwitchStatement node) {
		buffer.append("switch (");
		node.getExpression().accept(this);
		buffer.append(") {\r\n");
		visitList(node.statements(), "");
		buffer.append("}\r\n");
		return false;
	}

	public void endVisit(SynchronizedStatement node) {
		super.endVisit(node);
	}

	public boolean visit(SynchronizedStatement node) {
		/*
		 * TODO: synchronized keyword should be implemented in JS
		 */
		node.getBody().accept(this);
		return false;
	}

	public void endVisit(ThrowStatement node) {
		super.endVisit(node);
	}

	public boolean visit(ThrowStatement node) {
		buffer.append("throw ");
		node.getExpression().accept(this);
		buffer.append(";\r\n");
		return false;
	}

	public void endVisit(TryStatement node) {
		super.endVisit(node);
	}

	public boolean visit(TryStatement node) {
		buffer.append("try ");
		node.getBody().accept(this);
		List catchClauses = node.catchClauses();
		if (catchClauses.size() > 0) {
			buffer.append(" catch (e) {\r\n");
			buffer.append("if (Clazz.instanceOf (e, ");
			for (Iterator iter = catchClauses.iterator(); iter.hasNext();) {
				CatchClause element = (CatchClause) iter.next();
				element.getException().getType().accept(this);
				//buffer.append(element.getException().getType());
				buffer.append(")) ");
				element.getBody().accept(this);
				if (iter.hasNext()) {
					buffer.append(" else if (Clazz.instanceOf (e, ");
				}
			}
			buffer.append(" else {\r\nthrow e;\r\n}\r\n}");
		}
		Block finallys = node.getFinally();
		if (finallys != null) {
			buffer.append(" finally ");
			finallys.accept(this);
		}
		buffer.append("\r\n");
		return false;
	}

	public void endVisit(VariableDeclarationExpression node) {
		super.endVisit(node);
	}

	public boolean visit(VariableDeclarationExpression node) {
		/*
		 * TODO: Confirm that whether "var" is necessary or not
		 */
		buffer.append("var ");
		visitList(node.fragments(), ", ");
		return false;
	}

	public void endVisit(VariableDeclarationFragment node) {
		super.endVisit(node);
	}

	public boolean visit(VariableDeclarationFragment node) {
		SimpleName name = node.getName();
		IBinding binding = name.resolveBinding();
		if (binding != null) {
			if ((binding.getModifiers() & Modifier.FINAL) != 0) {
				if (methodDeclareStack.size() == 0) {
					finalVars.add(new FinalVariable(blockLevel, name.getIdentifier(), null));
				} else {
					String methodSig = (String) methodDeclareStack.peek();
					finalVars.add(new FinalVariable(blockLevel, name.getIdentifier(), methodSig));
				}
			}
		}
		name.accept(this);
		Expression initializer = node.getInitializer();
		if (initializer != null) {
			buffer.append(" = ");
			ITypeBinding typeBinding = initializer.resolveTypeBinding();
			if (typeBinding != null && "char".equals(typeBinding.getName())) {
				//if ()
				ITypeBinding nameTypeBinding = name.resolveTypeBinding();
				String nameType = nameTypeBinding.getName();
				if (!"char".equals(nameType) && nameType.indexOf("String") == -1) {
					buffer.append("(");
					initializer.accept(this);
					buffer.append(").charCodeAt (0)");
					return false;
				}
			}
			ITypeBinding nameTypeBinding = name.resolveTypeBinding();
			if (nameTypeBinding != null) {
				String nameType = nameTypeBinding.getName();
				//System.out.println("...x");
				if ("char".equals(nameType)) {
					if (typeBinding != null && !"char".equals(typeBinding.getName())) {
						buffer.append("String.fromCharCode (");
						initializer.accept(this);
						buffer.append(")");
						return false;
					}
				}
			}
			initializer.accept(this);
		}
		return false;
	}

	public void endVisit(VariableDeclarationStatement node) {
		super.endVisit(node);
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

	public void endVisit(WhileStatement node) {
		super.endVisit(node);
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
