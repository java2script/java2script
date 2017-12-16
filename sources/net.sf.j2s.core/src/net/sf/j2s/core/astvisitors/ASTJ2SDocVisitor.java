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
import java.util.Iterator;
import java.util.List;
import java.util.regex.Pattern;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.Comment;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jdt.core.dom.IAnnotationBinding;
import org.eclipse.jdt.core.dom.IMemberValuePairBinding;
import org.eclipse.jdt.core.dom.IMethodBinding;
import org.eclipse.jdt.core.dom.Initializer;
import org.eclipse.jdt.core.dom.Javadoc;
import org.eclipse.jdt.core.dom.MethodDeclaration;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;

import net.sf.j2s.core.adapters.Bindings;
//import net.sf.j2s.core.adapters.ExtendedAdapter;

/**
 * This level of Visitor focuses on dealing with 
 * j2s* Javadoc tags.
 * 
 * @author zhou renjian
 *
 * 2006-12-4
 */
public class ASTJ2SDocVisitor extends ASTEmptyVisitor {
	
	private boolean isDebugging = false;

	private ArrayList<Javadoc> rootJavaDocs; 

	public boolean isDebugging() {
		return isDebugging;
	}

	public void setDebugging(boolean isDebugging) {
		this.isDebugging = isDebugging;
	}

	public boolean visit(Block node) {
		ASTNode parent = node.getParent();
		BodyDeclaration dec = (parent instanceof MethodDeclaration && !((MethodDeclaration)parent).isConstructor() 
				|| parent instanceof Initializer ? (BodyDeclaration) parent : null);
		/*
		 * if comment contains "@j2sNative", then output the given native
		 * JavaScript codes directly.
		 */
		Javadoc javadoc = (dec == null ? getBlockJavadoc(node) : dec.getJavadoc());
		lastPos = node.getStartPosition();
		return (javadoc != null && addJavadocForBlock(javadoc, node) ? false : super.visit(node));
	}


	/**
	 * 
	 * Check for j2sIgnore, j2sDebug, j2sNative, j2sXHTML, j2sXCSS
	 * @param javadoc
	 * @param node
	 * @return true if code was added
	 */
	protected boolean addJavadocForBlock(Javadoc javadoc, Block node) {
		List<?> tags = (javadoc == null ? null : javadoc.tags());
		return (tags != null && tags.size() > 0 && (getTag(tags, "@j2sIgnore") != null
				|| isDebugging() && addSourceForTag(getTag(tags, "@j2sDebug"), "", "")
				// note that isToCompileVariableName() always returns false
				//|| !isToCompileVariableName() && (tagEl = getTag(tags, "@j2sNativeSrc", node)) != null  
				|| addSourceForTag(getTag(tags, "@j2sNative"), "", "")
				|| allowExtensions && (
						addSourceForTagExtended(getTag(tags, "@j2sXHTML"), "", "")
						|| addSourceForTagExtended(getTag(tags, "@j2sXCSS"), "", "")
				)
			));
	}

//	/**
//	 * Check to see whether there are @j2s* and append sources to buffer -- not necessary
//	 * 
//	 * @return true if j2s javadoc was found and added to the buffer 
//	 */
//	protected boolean addJ2SourceForMethod(MethodDeclaration node) {
//		if (node.getJavadoc() == null || node.getJavadoc().tags().size() == 0)
//			return false;
//		buffer.append("<<<");
//		String prefix = "[{\r\n";
//		String suffix = "\r\n}]";
//		boolean ret = (isDebugging() && readSources(node, "@j2sDebug", prefix, suffix, false, false)
//				//|| isToCompileVariableName() && readSources(node, "@j2sNativeSrc", prefix, suffix, false)
//				|| readSources(node, "@j2sNative", prefix, suffix, false, false)
//				|| allowExtensions && (
//					   readSources(node, "@j2sXHTML", prefix, suffix, false, true)
//				    || readSources(node, "@j2sXCSS", prefix, suffix, false, true)
//				  )
//				);
//		buffer.append("<<<" + ret + "<<<");
//		return ret;
//	}

	private TagElement getTag(List<?> tags, String j2sKey) {
		Iterator<?> iter = tags.iterator();
		while (iter.hasNext()) {
			TagElement tagEl = (TagElement) iter.next();
			if (j2sKey.equals(tagEl.getTagName())) {
				//if (superNode != null)
					//super.visit(superNode);
				return tagEl;
			}
		}
		return null;
	}

	/*
	 * Read JavaScript sources from @j2sNative, @j2sPrefix, etc, as well as
	 * annotations
	 */
	/**
	 * for example, for classes only:
	 * 
	 * @j2sPrefix /-* this is from <@>j2sPrefix added outside of just before
	 *            Clazz.decorateAsClass() *-/
	 * 
	 * 
	 * @j2sSuffix /-* this is from <@>j2sSuffix added just after
	 *            Clazz.decorateAsClass() *-/
	 * @param isExtended if this is j2sXHTML or j2sXCSS
	 * 
	 * @return true if javadoc of this sort was found and added to the buffer
	 */
	boolean readSources(BodyDeclaration node, String tagName, String prefix, String suffix, boolean allowBoth,
			boolean isExtended) {
		boolean haveJ2SJavaDoc = false;
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null && javadoc.tags().size() > 1)
			haveJ2SJavaDoc = (isExtended ? addSourceForTagExtended(getTag(javadoc.tags(), tagName), prefix, suffix)
					: addSourceForTag(getTag(javadoc.tags(), tagName), prefix, suffix));
		// only classes allow both
		if (haveJ2SJavaDoc && !allowBoth)
			return haveJ2SJavaDoc;

		// now check annotations (class definitions only)

		List<?> modifiers = node.modifiers();
		for (Iterator<?> iter = modifiers.iterator(); iter.hasNext();) {
			Object obj = iter.next();
			if (!(obj instanceof Annotation))
				continue;
			Annotation annotation = (Annotation) obj;
			String qName = annotation.getTypeName().getFullyQualifiedName();
			int index = qName.indexOf("J2S");
			if (index < 0 || !qName.substring(index).replaceFirst("J2S", "@j2s").startsWith(tagName))
				continue;
			haveJ2SJavaDoc = true;
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
			buffer.append(prefix).append(buf.toString().trim()).append(suffix);
		}
		return haveJ2SJavaDoc;
	}

	private boolean addSourceForTag(TagElement tag, String prefix, String suffix) {
		if (tag == null)
			return false;
		StringBuffer buf = new StringBuffer();
		getSource(tag, buf, false);
		buffer.append(prefix);
		buffer.append(fixCommentBlock(buf.toString()));
		buffer.append(suffix);
		return true;
	}
	
	private String getSource(TagElement tag, StringBuffer buf, boolean isExtended) {
		List<?> fragments = tag.fragments();
		boolean isFirstLine = true;
		String firstLine = null;
		for (Iterator<?> iterator = fragments.iterator(); iterator
				.hasNext();) {
			TextElement commentEl = (TextElement) iterator.next();
			String text = commentEl.getText().trim();
			if (isFirstLine && isExtended) {
				if (text.length() == 0)
					continue;
				firstLine = text.trim();
				isFirstLine = false;
				continue;
			} 
			buf.append(text);
			if (isExtended) {
				buf.append("\r\n");
			} else if (text.length() != 0) {
				buf.append(text.endsWith(";") || text.indexOf("//") >= 0 ? "\r\n" : " ");
				// BH note that all line terminators are removed,
				// as this causes problems after source cleaning, which may result
				// in code such as:
				//
				// return
				// x
				//
				// but this still does not fix the problem that we can have
				// x = " 
				//       "
				// after source cleaning
			}
		}
		return firstLine;
	}

	/**
	 * 
	 * @param text
	 * @return
	 */
	private String fixCommentBlock(String text) {		
		
		// /-* comment *-/ becomes /* comment */ and <@> becomes @

		return (text == null || text.length() == 0 ?  text : Pattern.compile("\\/-\\*(.*)\\*-\\/",
				Pattern.MULTILINE | Pattern.DOTALL)
				.matcher(text).replaceAll("/*$1*/").replaceAll("<@>","@"));
	}
	
	private boolean addSourceForTagExtended(TagElement tagEl, String prefix, String suffix) {
//		if (tagEl == null)
//			return false;
//		StringBuffer buf = new StringBuffer();
//		String firstLine = getSource(tagEl, buf, true);
//		buffer.append(prefix);
//		buffer.append(ExtendedAdapter.buildXSource(getQualifiedClassName(), tagEl.getTagName(), firstLine, buf.toString().trim()));
//		buffer.append(suffix);
		return true;
	}
	
	/**
	 * Get the nearest Javadoc that is after any other element but before this block.
	 * 
	 * @param block
	 * @return nearest Javadoc or null
	 */
	private Javadoc getBlockJavadoc(Block block) {
		ASTNode root = block.getRoot();
		Javadoc jd = null;
		if (root instanceof CompilationUnit) {
			if (rootJavaDocs == null) {
				rootJavaDocs = new ArrayList<Javadoc>();
				List<?> commentList = ((CompilationUnit) root).getCommentList();
				for (Iterator<?> iter = commentList.iterator(); iter.hasNext();) {
					Comment comment = (Comment) iter.next();
					if (comment instanceof Javadoc) {
						List<?> tags = ((Javadoc) comment).tags();
						if (tags.size() != 0) {
							for (Iterator<?> itr = tags.iterator(); itr.hasNext();) {
								TagElement tagEl = (TagElement) itr.next();
								String tagName = tagEl.getTagName();
								if (tagName != null && tagName.startsWith("@j2s")) {
									rootJavaDocs.add((Javadoc) comment);
								}
							}
						}
					}
				}
			}
			// looking for last comment prior to this block starting after all other nodes
			// we can remove any previous Javadocs in case they are still there 
			int blockPos = block.getStartPosition();
			int docPos = 0;
			while (rootJavaDocs.size() > 0 && (docPos = rootJavaDocs.get(0).getStartPosition()) < blockPos) {
				jd = rootJavaDocs.remove(0);
				if (docPos < lastPos)
					jd = null;  
			}
		}
		return jd;
	}

//	private int getPreviousStartPosition(Block node) {
//		int previousStart = 0;
//		ASTNode blockParent = node.getParent();
//		if (blockParent != null) {
//			if (blockParent instanceof Statement) {
//				Statement sttmt = (Statement) blockParent;
//				previousStart = sttmt.getStartPosition();
//				if (sttmt instanceof Block) {
//					Block parentBlock = (Block) sttmt;
//					for (Iterator<?> iter = parentBlock.statements().iterator(); iter.hasNext();) {
//						Statement element = (Statement) iter.next();
//						if (element == node) {
//							break;
//						}
//						previousStart = element.getStartPosition() + element.getLength();
//					}
//				} else if (sttmt instanceof IfStatement) {
//					IfStatement ifSttmt = (IfStatement) sttmt;
//					if (ifSttmt.getElseStatement() == node) {
//						Statement thenSttmt = ifSttmt.getThenStatement();
//						previousStart = thenSttmt.getStartPosition() + thenSttmt.getLength();
//					}
//				}
//			} else if (blockParent instanceof MethodDeclaration) {
//				previousStart = ((MethodDeclaration) blockParent).getStartPosition();
//			} else if (blockParent instanceof Initializer) {
//				previousStart = ((Initializer) blockParent).getStartPosition();
//			} else if (blockParent instanceof CatchClause) {
//				previousStart = ((CatchClause) blockParent).getStartPosition();
//			}
//		}
//		return previousStart;
//	}

	/**
	 * 
	 * @param node
	 * @param mBinding
	 * @param isEnd
	 * @return true to keep this method
	 */
	protected boolean checkKeepSpecialClassMethod(BodyDeclaration node, IMethodBinding mBinding, boolean isEnd) {
		boolean doKeep = true;
//		if (isEnd) {
//			if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun"))
//				doKeep = false;
//			String[] pipeMethods = new String[] { "pipeSetup", "pipeThrough", "through", "pipeMonitoring",
//					"pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper" };
//			for (int i = 0; i < pipeMethods.length; i++) {
//				if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
//					doKeep = false;
//					break;
//				}
//			}
//			if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert"))
//				doKeep = false;
//		} else {
//			if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimpleRPCRunnable", "ajaxRun"))
//				doKeep = false;
//			String[] pipeMethods = new String[] { "pipeSetup", "pipeThrough", "through", "pipeMonitoring",
//					"pipeMonitoringInterval", "pipeWaitClosingInterval", "setPipeHelper" };
//			for (int i = 0; i < pipeMethods.length; i++) {
//				if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.SimplePipeRunnable", pipeMethods[i])) {
//					doKeep = false;
//					break;
//				}
//			}
//			if (Bindings.isMethodInvoking(mBinding, "net.sf.j2s.ajax.CompoundPipeSession", "convert"))
//				doKeep = false;
//		}
		return (doKeep || getJ2STag(node, "@j2sKeep") != null);
	}

	/**
	 * @param node
	 * @return true if we have @j2sIngore for this BodyDeclaration
	 */
	protected boolean checkj2sIgnore(BodyDeclaration node) {
	  return getJ2STag(node, "@j2sIgnore") != null;
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
			List<?> tags = javadoc.tags();
			if (tags.size() != 0) {
				for (Iterator<?> iter = tags.iterator(); iter.hasNext();) {
					TagElement tagEl = (TagElement) iter.next();
					if (tagName.equals(tagEl.getTagName())) {
						return tagEl;
					}
				}
			}
		}
		List<?> modifiers = node.modifiers();
		if (modifiers != null && modifiers.size() > 0) {
			for (Iterator<?> iter = modifiers.iterator(); iter.hasNext();) {
				Object obj = iter.next();
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


}
