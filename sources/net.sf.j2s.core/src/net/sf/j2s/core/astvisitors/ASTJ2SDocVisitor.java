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
import java.util.Set;
import java.util.regex.Pattern;

import org.eclipse.jdt.core.dom.ASTNode;
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
import org.eclipse.jdt.core.dom.Statement;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;

/**
 * This level of Visitor will try to focus on dealing with those
 * j2s* Javadoc tags.
 * 
 * @author zhou renjian
 *
 * 2006-12-4
 */
public class ASTJ2SDocVisitor extends ASTKeywordVisitor {
	
	private boolean isDebugging = false;

	
	public boolean isDebugging() {
		return isDebugging;
	}

	public void setDebugging(boolean isDebugging) {
		this.isDebugging = isDebugging;
	}

	public boolean visit(Block node) {
		blockLevel++;
		buffer.append("{\r\n");
		ASTNode parent = node.getParent();
		BodyDeclaration dec = (parent instanceof MethodDeclaration ? dec = (BodyDeclaration) parent 
				: parent instanceof Initializer ? (BodyDeclaration) parent : null);
		Javadoc javadoc;
		/*
		 * if comment contains "@j2sNative", then output the given native 
		 * JavaScript codes directly. 
		 */
		if (dec != null 
				&& (javadoc = dec.getJavadoc()) != null 
				&& !visitNativeJavadoc(javadoc, node, true))
			return false;
		int blockStart = node.getStartPosition();
		int previousStart = getPreviousStartPosition(node);
		ASTNode root = node.getRoot();
		Javadoc[] nativeJavadoc = checkJavadocs(root);
		if (nativeJavadoc != null)
		for (int i = nativeJavadoc.length; --i >= 0;) {
			javadoc = nativeJavadoc[i];
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
				if (isDebugging()) {
					for (Iterator iter = tags.iterator(); iter.hasNext();) {
						TagElement tagEl = (TagElement) iter.next();
						if ("@j2sDebug".equals(tagEl.getTagName())) {
							if (superVisit) super.visit(node);
							visitJavadocJ2SSource(tagEl);
							return false;
						}
					}
				}
				boolean toCompileVariableName = ((ASTVariableVisitor) getAdaptable(ASTVariableVisitor.class)).isToCompileVariableName();
				
				if (!toCompileVariableName) {
					for (Iterator iter = tags.iterator(); iter.hasNext();) {
						TagElement tagEl = (TagElement) iter.next();
						if ("@j2sNativeSrc".equals(tagEl.getTagName())) {
							if (superVisit) super.visit(node);
							visitJavadocJ2SSource(tagEl);
							return false;
						}
					}
				}
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sNative".equals(tagEl.getTagName())) {
						if (superVisit) super.visit(node);
						visitJavadocJ2SSource(tagEl);
						return false;
					}
				}
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if ("@j2sXHTML".equals(tagEl.getTagName()) || "@j2sXCSS".equals(tagEl.getTagName())) {
						if (superVisit) super.visit(node);
						visitJavadocXStringSource(tagEl, tagEl.getTagName());
						return false;
					}
				}
			}
		}
		return true;
	}

	private void visitJavadocJ2SSource(TagElement tagEl) {
		List fragments = tagEl.fragments();
		boolean isFirstLine = true;
		StringBuffer buf = new StringBuffer();
		for (Iterator iterator = fragments.iterator(); iterator
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
	
	private void visitJavadocXStringSource(TagElement tagEl, String tagName) {
		List fragments = tagEl.fragments();
		boolean isFirstLine = true;
		StringBuffer buf = new StringBuffer();
		String firstLine = null;
		for (Iterator iterator = fragments.iterator(); iterator
				.hasNext();) {
			TextElement commentEl = (TextElement) iterator.next();
			String text = commentEl.getText().trim();
			if (isFirstLine) {
				if (text.length() == 0) {
					continue;
				}
				firstLine = text.trim();
				isFirstLine = false;
				continue;
			}
			buf.append(text);
			buf.append("\r\n");
		}
		String sources = buf.toString().trim();
		sources = buildXSource(tagName, firstLine, sources);
		buffer.append(sources);
	}

	private Set<String> parseXTag(String sources) {
		Set<String> vars = new HashSet<String>();
		String key = "{$";
		int index = sources.indexOf(key, 0);
		while (index != -1) {
			int idx = sources.indexOf("}", index + key.length());
			if (idx == -1) {
				break;
			}
			String var = sources.substring(index + key.length() - 1, idx); // with prefix $
			if (var.indexOf(' ') == -1) {
				vars.add(var);
			}
			index = sources.indexOf(key, idx + 1);
		}
		key = "<!--";
		index = sources.indexOf(key, 0);
		while (index != -1) {
			int idx = sources.indexOf("-->", index + key.length());
			if (idx == -1) {
				break;
			}
			String comment = sources.substring(index + key.length(), idx).trim();
			if (comment.startsWith("$") && comment.indexOf(' ') == -1) {
				vars.add(comment);
			}
			index = sources.indexOf(key, idx + 3); // 3: "-->".length()
		}
		key = "id";
		index = sources.indexOf(key, 0);
		while (index > 0) {
			char last = sources.charAt(index - 1);
			if (!(last == ' ' || last == '\t' || last == '\n' || last == '\r')) {
				index = sources.indexOf(key, index + key.length());
				continue;
			}
			int idxEqual = index + key.length();
			do {
				char c = sources.charAt(idxEqual);
				if (c == '=') {
					break;
				} else if (c == ' ' || c == '\t') {
					idxEqual++;
					if (idxEqual == sources.length() - 1) {
						idxEqual = -1;
						break;
					}
				} else {
					idxEqual = -1;
					break;
				}
			} while (true);
			if (idxEqual == -1 || idxEqual == sources.length() - 1) {
				break;
			}
			char quote = 0;
			int idxQuoteStart = idxEqual + 1;
			do {
				char c = sources.charAt(idxQuoteStart);
				if (c == '\'' || c == '\"') {
					quote = c;
					break;
				} else if (c == ' ' || c == '\t') {
					idxQuoteStart++;
					if (idxQuoteStart == sources.length() - 1) {
						idxQuoteStart = -1;
						break;
					}
				} else {
					idxQuoteStart = -1;
					break;
				}
			} while (true);
			if (idxQuoteStart == -1 || idxQuoteStart == sources.length() - 1) {
				break;
			}
			int idxQuoteEnd = sources.indexOf(quote, idxQuoteStart + 1);
			if (idxQuoteEnd == -1 || idxQuoteEnd == sources.length() - 1) {
				break;
			}
			String idStr = sources.substring(idxQuoteStart + 1, idxQuoteEnd).trim();
			if (idStr.startsWith("$") && idStr.indexOf(' ') == -1) {
				vars.add(idStr);
			}
			index = sources.indexOf(key, idxQuoteEnd + 1);
		}
		return vars;
	}

	private boolean containsBeginning(Set<String> set, String beginning) {
		for (String s : set) {
			if (s.startsWith(beginning)) {
				return true;
			}
		}
		return false;
	}
	
	private String buildXSource(String tagName, String firstLine, String sources) {
		if (firstLine != null && sources.length() > 0) {
			Set<String> xTags = null;
			StringBuilder builder = new StringBuilder();
			if ("@j2sXHTML".equals(tagName)) {
				boolean shouldMergeFirstLine = false;
				if (firstLine.startsWith("{$") || firstLine.contains("<") || firstLine.contains(">")) {
					shouldMergeFirstLine = true;
				}
				if (shouldMergeFirstLine) {
					sources = firstLine + "\r\n" + sources;
					firstLine = "";
				}
				xTags = parseXTag(sources);
				sources = "\"" + sources.replaceAll("\t", "\\\\t").replaceAll("\"", "\\\\\"").replaceAll("\r\n", "\\\\r\\\\n\" +\r\n\"") + "\"";
				String[] parts = firstLine.split("(,| |\t)+");
				if (firstLine.length() == 0) {
					builder.append("Clazz.parseHTML(");
				} else if (parts == null || parts.length == 1) {
					if ("return".equals(firstLine)) {
						builder.append("return Clazz.parseHTML(");
					} else {
						builder.append("Clazz.parseHTML(").append(firstLine).append(", ");
					}
				} else {
					String firstVar = parts[0];
					String leftStr = firstLine.substring(firstVar.length() + 1).replaceAll("^(,| |\t)+", "");
					if (leftStr.endsWith(",")) {
						leftStr = leftStr.substring(0, leftStr.length() - 1);
					}
					if ("return".equals(firstVar)) {
						builder.append("return Clazz.parseHTML(").append(leftStr).append(", ");
					} else {
						builder.append(firstVar).append(" = Clazz.parseHTML(").append(leftStr).append(", ");
					}
				}
			} else { // @j2sXCSS
				boolean shouldMergeFirstLine = false;
				if (firstLine.startsWith(".") || firstLine.contains("#") || firstLine.contains(">") || firstLine.contains("{")) {
					shouldMergeFirstLine = true;
				} else if (sources.startsWith("{")) {
					shouldMergeFirstLine = true;
				}
				if (shouldMergeFirstLine) {
					sources = firstLine + "\r\n" + sources;
					xTags = parseXTag(sources);
					builder.append("Clazz.parseCSS(");
				} else {
					xTags = parseXTag(sources);
					if (firstLine.endsWith(",")) {
						firstLine = firstLine.substring(0, firstLine.length() - 1);
					}
					builder.append("Clazz.parseCSS(").append(firstLine).append(", ");
				}
				sources = "\"" + sources.replaceAll("\t", "\\\\t").replaceAll("\"", "\\\\\"").replaceAll("\r\n", "\\\\r\\\\n\" +\r\n\"") + "\"";
			}
			boolean containsThis = containsBeginning(xTags, "$:") || containsBeginning(xTags, "$."); 
			boolean containsClass = containsBeginning(xTags, "$/");
			if (containsThis) {
				builder.append("this, ");
			} else if (containsClass) {
				String fullClassName = null;
				String packageName = ((ASTPackageVisitor) getAdaptable(ASTPackageVisitor.class)).getPackageName();
				String className = ((ASTTypeVisitor) getAdaptable(ASTTypeVisitor.class)).getClassName();
				if (packageName != null && packageName.length() != 0) {
					fullClassName = packageName + '.' + className;
				} else {
					fullClassName = className;
				}
				builder.append(fullClassName).append(", ");
			}
			boolean localStarted = false;
			for (String s : xTags) {
				if (s.startsWith("$~")) {
					if (!localStarted) {
						builder.append("{");
						localStarted = true;
					} else {
						builder.append(", ");
					}
					String varName = s.substring(2);
					builder.append(varName).append(": ").append(varName);
				}
			}
			if (localStarted) {
				builder.append("}, ");
			}
			builder.append(sources).append(");\r\n");
			return builder.toString();
		}
		return sources;
	}

	/*
	 * Read HTML/CSS sources from @j2sXHTML, @J2SXCSS or others
	 */
	boolean readStringSources(BodyDeclaration node, String tagName, String prefix, String suffix, boolean both) {
		boolean existed = false;
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						if (tagEl != null) {
							List fragments = tagEl.fragments();
							StringBuffer buf = new StringBuffer();
							boolean isFirstLine = true;
							String firstLine = null;
							for (Iterator iterator = fragments.iterator(); iterator
									.hasNext();) {
								TextElement commentEl = (TextElement) iterator.next();
								String text = commentEl.getText().trim();
								if (isFirstLine) {
									if (text.length() == 0) {
										continue;
									}
									firstLine = text.trim();
									isFirstLine = false;
									continue;
								}
								buf.append(text);
								buf.append("\r\n");
							}
							String sources = buf.toString().trim();
							sources = buildXSource(tagName, firstLine, sources);
							buffer.append(prefix + sources + suffix);
							existed = true;
						}
					}
				}
			}
		}
		return existed;
	}
	
	/*
	 * Read JavaScript sources from @j2sNative, @J2SPrefix or others
	 */
	boolean readSources(BodyDeclaration node, String tagName, String prefix, String suffix, boolean both) {
		boolean existed = false;
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						if (tagEl != null) {
							List fragments = tagEl.fragments();
							StringBuffer buf = new StringBuffer();
							boolean isFirstLine = true;
							for (Iterator iterator = fragments.iterator(); iterator
									.hasNext();) {
								TextElement commentEl = (TextElement) iterator.next();
								String text = commentEl.getText().trim();
								if (isFirstLine) {
									isFirstLine = false;
									if (text.length() == 0) {
										continue;
									}
								}
								buf.append(text);
								buf.append("\r\n");
							}
							String sources = buf.toString().trim();
							// embed block comments and Javadoc @
							sources = sources.replaceAll("(\\/)-\\*|\\*-(\\/)", "$1*$2").replaceAll("<@>", "@");
							buffer.append(prefix + sources + suffix);
							existed = true;
						}
					}
				}
			}
		}
		if (existed && !both) {
			return existed;
		}
		List modifiers = node.modifiers();
		for (Iterator iter = modifiers.iterator(); iter.hasNext();) {
			Object obj = (Object) iter.next();
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

	private String fixCommentBlock(String text) {
		if (text == null || text.length() == 0) {
			return text;
		}
		return Pattern.compile("\\/-\\*(.*)\\*-\\/",
				Pattern.MULTILINE | Pattern.DOTALL)
				.matcher(text).replaceAll("/*$1*/");
	}
	
	private Javadoc[] checkJavadocs(ASTNode root) {
		if (root instanceof CompilationUnit) {
			List commentList = ((CompilationUnit) root).getCommentList();
			ArrayList list = new ArrayList();
			for (Iterator iter = commentList.iterator(); iter.hasNext();) {
				Comment comment = (Comment) iter.next();
				if (comment instanceof Javadoc) {
					List tags = ((Javadoc) comment).tags();
					if (tags.size() != 0) {
						for (Iterator itr = tags.iterator(); itr.hasNext();) {
							TagElement tagEl = (TagElement) itr.next();
							String tagName = tagEl.getTagName();
							if ("@j2sIgnore".equals(tagName) || "@j2sDebug".equals(tagName)
									|| "@j2sNative".equals(tagName) || "@j2sNativeSrc".equals(tagName)
									|| "@j2sXHTML".equals(tagName) || "@j2sXCSS".equals(tagName)) {
								list.add(comment);
							}
						}
					}
				}
			}
			return (Javadoc[]) list.toArray(new Javadoc[0]);
		}
		return null;
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
			} else if (blockParent instanceof CatchClause) {
				CatchClause catchClause = (CatchClause) blockParent;
				previousStart = catchClause.getStartPosition();
			}
		}
		return previousStart;
	}

	/**
	 * Method with "j2s*" tag.
	 * 
	 * @param node
	 * @return
	 */
	protected Object getJ2STag(BodyDeclaration node, String tagName) {
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null) {
			List tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						return tagEl;
					}
				}
			}
		}
		List modifiers = node.modifiers();
		if (modifiers != null && modifiers.size() > 0) {
			for (Iterator iter = modifiers.iterator(); iter.hasNext();) {
				Object obj = (Object) iter.next();
				if (obj instanceof Annotation) {
					Annotation annotation = (Annotation) obj;
					String qName = annotation.getTypeName().getFullyQualifiedName();
					int idx = qName.indexOf("J2S");
					if (idx != -1) {
						String annName = qName.substring(idx);
						annName = annName.replaceFirst("J2S", "@j2s");
						if (annName.startsWith(tagName)) {
							return annotation;
						}
					}
				}
			}
		}
		return null;
	}
	
	/**
	 * Native method without "j2sDebug" or "j2sNative" tag should be ignored
	 * directly.
	 * 
	 * @param node
	 * @return
	 */
	protected boolean isMethodNativeIgnored(MethodDeclaration node) {
		if ((node.getModifiers() & Modifier.NATIVE) != 0) {
			if (isDebugging() && getJ2STag(node, "@j2sDebug") != null) {
				return false;
			}
			if (getJ2STag(node, "@j2sNative") != null) {
				return false;
			}
			if (getJ2STag(node, "@j2sNativeSrc") != null) {
				return false;
			}
			if (getJ2STag(node, "@j2sXHTML") != null) {
				return false;
			}
			if (getJ2STag(node, "@j2sXCSS") != null) {
				return false;
			}
			return true;
		}
		return true; // interface!
	}

}
