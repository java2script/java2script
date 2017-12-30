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
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.regex.Pattern;

import org.eclipse.jdt.core.dom.ASTNode;
import org.eclipse.jdt.core.dom.ASTVisitor;
import org.eclipse.jdt.core.dom.AbstractTypeDeclaration;
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
import org.eclipse.jdt.core.dom.PackageDeclaration;
import org.eclipse.jdt.core.dom.TagElement;
import org.eclipse.jdt.core.dom.TextElement;
//import net.sf.j2s.core.astvisitors.adapters.ExtendedAdapter;

/**
 * This level of Visitor focuses on dealing with 
 * j2s* Javadoc tags.
 * 
 * @author zhou renjian
 * @author Bob Hanson
 *
 * 2006-12-4
 */
public class ASTJ2SDocVisitor extends ASTEmptyVisitor {
	
	protected Map<Integer, Javadoc> global_mapBlockJavadoc;
	
	protected void setMapJavaDoc(PackageDeclaration node) {
		ASTNode root = node.getRoot();
		global_mapBlockJavadoc = new HashMap<Integer, Javadoc>();
		// list all @j2s blocks
		List<ASTNode> list = new ArrayList<ASTNode>();
		List<?> commentList = ((CompilationUnit) root).getCommentList();
		for (int i = 0, n = commentList.size(); i < n; i++) {
			Comment comment = (Comment) commentList.get(i);
			if (comment instanceof Javadoc) {
				List<?> tags = ((Javadoc) comment).tags();
				if (tags.size() != 0) {
					for (Iterator<?> itr = tags.iterator(); itr.hasNext();) {
						TagElement tagEl = (TagElement) itr.next();
						String tagName = tagEl.getTagName();
						if (tagName == null || !tagName.startsWith("@j2sNative") 
								&& !tagName.startsWith("@j2sIgnore")
								&& !tagName.startsWith("@j2sDebug"))
							continue;
						// System.err.println(">>" + list.size() + " adding " +
						// comment.getStartPosition() + " " + comment);
						list.add(comment);
						break;
					}
				}
			}
		}
		if (list.isEmpty())
			return;

		// now add all the blocks

		try {
			root.accept(new BlockVisitor(list));
		} catch (IndexOutOfBoundsException e) {
			// normal termination
		}

		// and link javadoc to its closest block

//		for (int i = 0, n = list.size(); i < n; i++) {
//			System.err.println(i + "  " + (list.get(i) == null ? null : list.get(i).getClass().getName() + " " + list.get(i).getStartPosition() + (list.get(i).getStartPosition() + list.get(i).getLength())));
//		}

		for (int i = 0, n = list.size() - 1; i < n;) {
			Javadoc doc = (Javadoc) list.get(i++);
			ASTNode item = list.get(i);
			int factor = 1;
			if (item instanceof Javadoc) {
				System.err.println("!!Note: @j2s doc ignored because nothing follows it: " + doc.getStartPosition()
						+ "\r\n" + doc);
			} else {
				if (item == null) {
					factor = -1;
					item = list.get(++i);
				}
				i++;
				int pt = item.getStartPosition() * factor;
				global_mapBlockJavadoc.put(Integer.valueOf(pt), doc);
				System.err.println("adding  " + pt + " " + item);
				if (item instanceof Block)
					System.err.println("@j2s doc:\r\n" + doc.getStartPosition() + " " + doc + "\nreplaces block: "
							+ item.getStartPosition() + " " + item.getClass().getName() + "\r\n" + item);
				else if (item instanceof AbstractTypeDeclaration)
					System.err.println("@j2s doc:\r\n" + doc.getStartPosition() + " " + doc
							+ "\nadded before: " + item.getStartPosition() + " " + item.getClass().getName());
				else
					System.err
							.println("@j2s doc:\r\n" + doc.getStartPosition() + " " + doc + "\nadded before: "
									+ item.getStartPosition() + " " + item.getClass().getName() + "\r\n" + item);
			}
		}

	}

	protected class BlockVisitor extends ASTVisitor {

		protected int ptrDoc0, ptrDoc1, ptr, len;
		private List<ASTNode> list;
		private int listPtr = 0;
		private ASTNode spanNode;
		private int spanPt1;

		BlockVisitor(List<ASTNode> list) {
			this.list = list;
			ptrDoc0 = list.get(0).getStartPosition();
			ptrDoc1 = ptrDoc0 + list.get(0).getLength() - 1;
		}

		/**
		 * Just collect blocks after j2s Javadocs. Throws an
		 * IndexOfBoundsException when done with scanning.
		 * 
		 * Note that this no longer requires that the node be a block, because
		 * we are processing these BEFORE the node is visited.
		 * 
		 */

		public void preVisit(ASTNode node) throws IndexOutOfBoundsException {
			int nodePt = node.getStartPosition();
			// check for too early
			if (nodePt < ptrDoc0) {
				// check for a spanning node:
				//   {.... doc....}{....}
				// where the end of the spanning block is before the 
				// beginning of the node otherwise associated with this doc
				if (node instanceof Block && nodePt + (len = node.getLength()) > ptrDoc1) {
					spanNode = node;
					spanPt1 = nodePt + len;
				}
				return;
			}

			// We have found a node that is after the doc.
			
			// before:
			// ....v
			// ....J...J.J.J.J
			// .bbb.Bbb.B.B.B.Bbbbb
			// after:
			// ........v
			// ....JB..J.J.J.J
			// .bbb..bb.B.B.B.Bbbbb

			while (++listPtr < list.size()) {

				// But are there some docs between this doc and the node?

				// check for
				// ........v
				// ....JB..JJ.
				// .bbb.bbb..B
				// becoming
				// .........v
				// ....JB..xJB where "x" is ignored
				// .bbb..bb...

				ptrDoc0 = list.get(listPtr).getStartPosition();
				ptrDoc1 = ptrDoc0 + list.get(listPtr).getLength() - 1;

				if (nodePt < ptrDoc0) {
					// have the closest
					break;
				}
				// If so, ignore the earlier block.
				list.remove(--listPtr);
			}

			// now ptrDoc0 points to the NEXT doc, or we are done with docs
			
			if (nodePt < ptrDoc0 || listPtr == list.size()) {
				//if (!(node instanceof Block))
				//	System.err.println("!!Note @j2s node not a block :" + list.get(listPtr - 1));
				
				// Do we have a spanning node that should trump this later node?
				
				if (spanNode != null && (spanPt1 < nodePt || listPtr == list.size())) {
					// add a null to indicate that this is a trailing doc, not a leading one
					list.add(listPtr++, null);
					node = spanNode;
				}
				list.add(listPtr, node);
			}
			// the following will throw the desired exception when the task is
			// done
			list.get(++listPtr);
			return;
		}
	}



   /**
    * Only specially process blocks if they are method declarations.
    * Never process these for constructors.
    */
	public boolean visit(Block node) {
		ASTNode parent = node.getParent();
		if (parent instanceof MethodDeclaration && !((MethodDeclaration)parent).isConstructor()
				|| parent instanceof Initializer) {
			Javadoc javadoc = ((BodyDeclaration) parent).getJavadoc();
			if (javadoc != null && checkJ2sJavadoc(javadoc, false))
				return false;			
		}
		return super.visit(node);
	}
		
	/**
	 * check any node other than the package node for @j2sNative or @j2sDebug or @j2sIgnore 
	 */
	public boolean preVisit2(ASTNode node) {
		Javadoc j2sJavadoc;
		if (	global_mapBlockJavadoc == null 	
				|| node instanceof MethodDeclaration 
				|| node instanceof Initializer 
				|| node.getParent().getClass() == org.eclipse.jdt.core.dom.IfStatement.class
				|| (j2sJavadoc = getJ2sJavadoc(node, true)) == null)
			return true;
		boolean isBlock = (node instanceof Block);
		return !checkJ2sJavadoc(j2sJavadoc, isBlock) || !isBlock;
	}

	protected Javadoc getJ2sJavadoc(ASTNode node, boolean isPre) {
		return global_mapBlockJavadoc.remove(Integer.valueOf((isPre ? 1 : -1) * node.getStartPosition()));
	}

	/**
	 * 
	 * Check for j2sIgnore, j2sDebug, j2sNative, j2sXHTML, j2sXCSS
	 * @param javadoc
	 * @param isBlock
	 * @return true if code was added
	 */
	protected boolean checkJ2sJavadoc(Javadoc javadoc, boolean isBlock) {
		List<?> tags = (javadoc == null ? null : javadoc.tags());
		String prefix = (isBlock ? "{\r\n" : "");
		String postfix = (isBlock ? "}\r\n" : "\r\n");
		return (tags != null && tags.size() > 0 && (isBlock && getTag(tags, "@j2sIgnore") != null
				|| global_j2sFlag_isDebugging && addSourceForTag(getTag(tags, "@j2sDebug"), prefix, postfix)
				|| addSourceForTag(getTag(tags, "@j2sNative"), prefix, postfix)
			//	|| global_allowExtensions && (
			//			addSourceForTagExtended(getTag(tags, "@j2sXHTML"), "", "")
			//			|| addSourceForTagExtended(getTag(tags, "@j2sXCSS"), "", "")
			//	)
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

	/**
	 * For classes only, processing the @j2sSuffix directive
	 * 
	 * @param isExtended if this is j2sXHTML or j2sXCSS -- no longer supported
	 * 
	 * @return true if javadoc of this sort was found and added to the buffer
	 */
	boolean readSources(BodyDeclaration node, String tagName, String prefix, String suffix, boolean allowBoth,
			boolean isExtended) {
		boolean haveJ2SJavaDoc = false;
		Javadoc javadoc = node.getJavadoc();
		if (javadoc != null && javadoc.tags().size() > 1)
			haveJ2SJavaDoc = 
			//isExtended ? addSourceForTagExtended(getTag(javadoc.tags(), tagName), prefix, suffix)	: 
						addSourceForTag(getTag(javadoc.tags(), tagName), prefix, suffix);
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
	
//	private boolean addSourceForTagExtended(TagElement tagEl, String prefix, String suffix) {
//		if (tagEl == null)
//			return false;
//		StringBuffer buf = new StringBuffer();
//		String firstLine = getSource(tagEl, buf, true);
//		buffer.append(prefix);
//		buffer.append(ExtendedAdapter.buildXSource(getQualifiedClassName(), tagEl.getTagName(), firstLine, buf.toString().trim()));
//		buffer.append(suffix);
//		return true;
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
		return (doKeep || getJ2SKeepOrIgnore(node, "@j2sKeep") != null);
	}

	/**
	 * @param node
	 * @return true if we have @j2sIngore for this BodyDeclaration
	 */
	protected boolean checkj2sIgnore(BodyDeclaration node) {
	  return getJ2SKeepOrIgnore(node, "@j2sIgnore") != null;
	}

	/**
	 * Method with "j2s*" tag.
	 * 
	 * @param node
	 * @return
	 */
	protected Object getJ2SKeepOrIgnore(BodyDeclaration node, String tagName) {
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
					if (idx >= 0) {
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
