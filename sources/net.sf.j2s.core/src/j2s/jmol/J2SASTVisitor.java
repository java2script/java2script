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
package j2s.jmol;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.CatchClause;
import org.eclipse.jdt.core.dom.Comment;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.IAnnotationBinding;
import org.eclipse.jdt.core.dom.IMemberValuePairBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.ITypeBinding;
import org.eclipse.jdt.core.dom.IfStatement;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.Modifier;
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;

/**
 * Superclass for J2SDependencyVisitor and Java2ScriptLegacyVisitor
 * 
 * @author zhou renjian
 */
abstract class J2SASTVisitor extends ASTVisitor {

	protected Javadoc[] nativeJavadoc = null;	
	protected ASTNode javadocRoot = null;
	

	/**
	 *  incremented to indicate block depth
	 */
	protected int blockLevel = 0;
	
	/**
	 * buffer for writing JavaScript; not used in Java2ScriptDependencyVisitor
	 */
	protected StringBuffer buffer;

	protected String thisPackageName = "";

	public String getPackageName() {
		return thisPackageName;
	}

	protected J2SASTVisitor(boolean isWriter) {
		super();
		if (isWriter)
			buffer = new StringBuffer();
	}

	protected String getFullDotClassName(String className) {
		return (thisPackageName == null || thisPackageName.length() == 0 ? className
				: thisPackageName + '.' + className);
	}

	public boolean visit(PackageDeclaration node) {
		thisPackageName = "" + node.getName();
		return false;
	}

	// JavaDoc processing

	public boolean visit(Block node) {
		blockLevel++;
		if (buffer != null) {
			buffer.append("{\r\n");
		}
		ASTNode parent = node.getParent();
		if (parent instanceof MethodDeclaration) {
			MethodDeclaration method = (MethodDeclaration) parent;
			Javadoc javadoc = method.getJavadoc();
			/*
			 * if comment contains "@j2sNative", then output the given native JavaScript
			 * codes directly.
			 */
			if (!processJ2STags(javadoc, node, true)) {
				return false;
			}
			if (buffer != null) {
				IMethodBinding methodBinding = method.resolveBinding();
				if (methodBinding != null) {
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
				}
			}
		} else if (parent instanceof Initializer) {
			Initializer initializer = (Initializer) parent;
			Javadoc javadoc = initializer.getJavadoc();
			// if comment contains "@j2sNative", then 
			// output the given native JavaScript codes directly.
			if (!processJ2STags(javadoc, node, true)) {
				return false;
			}
		}
		int blockStart = node.getStartPosition();
		int previousStart = getPreviousStartPosition(node);
		ASTNode root = node.getRoot();
		checkJavadocs(root);
		for (int i = nativeJavadoc.length - 1; i >= 0; i--) {
			Javadoc javadoc = nativeJavadoc[i];
			int commentStart = javadoc.getStartPosition();
			if (commentStart > previousStart && commentStart < blockStart) {
				// if comment contains "@j2sNative", then 
				// output the given native JavaScript codes directly.
				if (!processJ2STags(javadoc, node, true)) {
					return false;
				}
			}
		}
		return super.visit(node);
	}
	
	public void endVisit(Block node) {
		blockLevel--;
		super.endVisit(node);
	}

	private static int getPreviousStartPosition(Block node) {
		int previousStart = 0;
		ASTNode blockParent = node.getParent();
		if (blockParent != null) {
			if (blockParent instanceof Statement) {
				Statement sttmt = (Statement) blockParent;
				previousStart = sttmt.getStartPosition();
				if (sttmt instanceof Block) {
					Block parentBlock = (Block) sttmt;
					for (Iterator<?> iter = parentBlock.statements().iterator(); iter.hasNext();) {
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
			} else if (blockParent instanceof CatchClause) {
				CatchClause catchClause = (CatchClause) blockParent;
				previousStart = catchClause.getStartPosition();
			}
		}
		return previousStart;
	}
	
	protected void checkJavadocs(ASTNode root) {
		if (root != javadocRoot) {
			nativeJavadoc = null;
			javadocRoot = root;
		}
		if (nativeJavadoc == null) {
			nativeJavadoc = new Javadoc[0];
			if (root instanceof CompilationUnit) {
				CompilationUnit unit = (CompilationUnit) root;
				List<?> commentList = unit.getCommentList();
				ArrayList<Comment> list = new ArrayList<Comment>();
				for (Iterator<?> iter = commentList.iterator(); iter.hasNext();) {
					Comment comment = (Comment) iter.next();
					if (comment instanceof Javadoc) {
						Javadoc javadoc = (Javadoc) comment;
						List<?> tags = javadoc.tags();
						if (tags.size() != 0) {
							for (Iterator<?> itr = tags.iterator(); itr.hasNext();) {
								TagElement tagEl = (TagElement) itr.next();
								String tagName = tagEl.getTagName();
								if ("@j2sIgnore".equals(tagName)
										|| "@j2sNative".equals(tagName)) {
									list.add(comment);
								}
							}
						}
					}
				}
				nativeJavadoc = list.toArray(nativeJavadoc);
			}
		}
	}

	protected boolean processJ2STags(Javadoc javadoc, Block node, boolean superVisit) {
		if (javadoc != null) {
			List<?> tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sIgnore".equals(tagEl.getTagName())) {
						if (superVisit)
							super.visit(node);
						return false;
					}
				}
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sNative".equals(tagEl.getTagName())) {
						if (superVisit)
							super.visit(node);
						if (buffer != null)
							writeJavaScript(tagEl);
						return false;
					}
				}
			}
		}
		return true;
	}

	private void writeJavaScript(TagElement tagEl) {
		List<?> fragments = tagEl.fragments();
		boolean isFirstLine = true;
		StringBuffer buf = new StringBuffer();
		for (Iterator<?> iterator = fragments.iterator(); iterator
				.hasNext();) {
			TextElement commentEl = (TextElement) iterator.next();
			String text = commentEl.getText().trim();
			if (isFirstLine) {
				if (text.length() == 0) {
					continue;
				}
			}
			buf.append(text);
			buf.append("\r\n");
		}
		buffer.append(fixCommentBlock(buf.toString()));
	}
	
	private String fixCommentBlock(String text) {
		if (text == null || text.length() == 0) {
			return text;
		}
		return Pattern.compile("\\/-\\*(.*)\\*-\\/",
				Pattern.MULTILINE | Pattern.DOTALL)
				.matcher(text).replaceAll("/*$1*/");
	}
	
	/**
	 * Write JavaScript source from @j2sNative and @J2SIgnore
	 */
	protected boolean writeJ2SSources(BodyDeclaration node, String tagName, String prefix, String suffix, boolean both) {
		boolean existed = false;
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List<?> tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						List<?> fragments = tagEl.fragments();
						StringBuffer buf = new StringBuffer();
						boolean isFirstLine = true;
						for (Iterator<?> iterator = fragments.iterator(); iterator.hasNext();) {
							TextElement commentEl = (TextElement) iterator.next();
							String text = commentEl.getText().trim();
							if (isFirstLine) {
								if (text.length() == 0) {
									continue;
								}
							}
							buf.append(text);
							buf.append("\r\n");
						}
						String sources = buf.toString().trim();
						sources = sources.replaceAll("(\\/)-\\*|\\*-(\\/)", "$1*$2").replaceAll("<@>", "@");
						buffer.append(prefix + sources + suffix);
						existed = true;
					}
				}
			}
		}
		if (existed && !both) {
			return existed;
		}
		List<?> modifiers = node.modifiers();
		for (Iterator<?> iter = modifiers.iterator(); iter.hasNext();) {
			Object obj = iter.next();
			if (obj instanceof Annotation) {
				Annotation annotation = (Annotation) obj;
				String qName = annotation.getTypeName().getFullyQualifiedName();
				int index = qName.indexOf("J2S");
				if (index != -1) {
					String annName = qName.substring(index);
					annName = annName.replaceFirst("J2S", "@j2s");
					if (annName.startsWith(tagName)) {
						StringBuffer buf = new StringBuffer();
						IAnnotationBinding annotationBinding = annotation.resolveAnnotationBinding();
						if (annotationBinding != null) {
							IMemberValuePairBinding[] valuePairs = annotationBinding.getAllMemberValuePairs();
							if (valuePairs != null && valuePairs.length > 0) {
								for (int i = 0; i < valuePairs.length; i++) {
									Object value = valuePairs[i].getValue();
									if (value != null) {
										if (value instanceof Object[]) {
											Object[] lines = (Object[]) value;
											for (int j = 0; j < lines.length; j++) {
												buf.append(lines[j]);
												buf.append("\r\n");
											}
										} else if (value instanceof String) {
											buf.append(value);
											buf.append("\r\n");
										}
									}
								}
							}
						}
						buffer.append(prefix + buf.toString().trim() + suffix);
						existed = true;
					}
				}
			}
		}
		return existed;
	}

}
