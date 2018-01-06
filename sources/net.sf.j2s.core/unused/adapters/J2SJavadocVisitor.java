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
import org.eclipse.jdt.core.dom.Annotation;
import org.eclipse.jdt.core.dom.Block;
import org.eclipse.jdt.core.dom.BodyDeclaration;
import org.eclipse.jdt.core.dom.Comment;
import org.eclipse.jdt.core.dom.CompilationUnit;
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
	
	protected Map<Integer, List<Javadoc>> global_mapBlockJavadoc;
	
	protected void setMapJavaDoc(PackageDeclaration node) {
		ASTNode root = node.getRoot();
		global_mapBlockJavadoc = new HashMap<Integer, List<Javadoc>>();

		// gat a list of all @j2s blocks
		
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
						list.add(comment);
						break;
					}
				}
			}
		}
		if (list.isEmpty())
			return;

		// now add all the associated elements

		try {
			root.accept(new BlockVisitor(list));
		} catch (@SuppressWarnings("unused") IndexOutOfBoundsException e) {
			// normal termination from item after last j2sjavadoc
		}

		for (int i = 0, n = list.size(); i < n; i++) {
			System.err.println(i + "  " + (list.get(i) == null ? null : list.get(i).getClass().getName() + " " + list.get(i).getStartPosition() + "..." + (list.get(i).getStartPosition() + list.get(i).getLength())));
		}

		// and link javadoc to its closest block

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
				Integer pt = Integer.valueOf(item.getStartPosition() * factor);
				List<Javadoc> docs = global_mapBlockJavadoc.get(pt);
				if (docs == null)
					global_mapBlockJavadoc.put(pt, docs = new ArrayList<Javadoc>());
				System.err.println(pt + " " + item.getClass().getName() + " " + doc);				
				docs.add(doc);
			}
		}
	}

	/**
	 * prepare a list that alternates [javadoc element javadoc element ... ] associating an element with its javadoc. 
	 * @author RM
	 *
	 */
	protected class BlockVisitor extends ASTVisitor {

		private int ptrDoc0;
		private List<ASTNode> list;
		private int listPtr;

		BlockVisitor(List<ASTNode> list) {
			this.list = list;
			ptrDoc0 = list.get(listPtr = 0).getStartPosition();
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
			checkNode(node, false);
		}

		public void postVisit(ASTNode node) {
			checkNode(node, true);			
		}

		private void checkNode(ASTNode node, boolean isPost) {
			int nodept = node.getStartPosition() + (isPost? node.getLength() : 0);
			while (nodept >= ptrDoc0)
				addNode(node, isPost);
		}

		private void addNode(ASTNode node, boolean isPost) {
			if (isPost)
				list.add(++listPtr, null);
			list.add(++listPtr, node);
			ptrDoc0 = list.get(++listPtr).getStartPosition();
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
			if (javadoc != null) {
				List<Javadoc> list = new ArrayList<Javadoc>();
				list.add(javadoc);
				return !checkJ2sJavadocs(list, false);	
			}
		}
		return super.visit(node);
	}
		
	/**
	 * check any node other than the package node for @j2sNative or @j2sDebug or @j2sIgnore 
	 */
	public boolean preVisit2(ASTNode node) {
		List<Javadoc> j2sJavadoc;
		if (	global_mapBlockJavadoc == null 	
				|| node instanceof MethodDeclaration 
				|| node instanceof Initializer 
				|| (j2sJavadoc = getJ2sJavadoc(node, true)) == null)
			return true;
		boolean isBlock = (node instanceof Block);
		boolean ret = !checkJ2sJavadocs(j2sJavadoc, isBlock) || !isBlock;
		//buffer.append("visiting " + node.getStartPosition() + " " + isBlock + " " +  ret);
		return ret;
	}

	protected List<Javadoc> getJ2sJavadoc(ASTNode node, boolean isPre) {
		List<Javadoc> docs = global_mapBlockJavadoc.remove(Integer.valueOf((isPre ? 1 : -1) * node.getStartPosition()));
		if (!isPre && docs != null)
				checkJ2sJavadocs(docs, false);
		return docs;
	}

	/**
	 * 
	 * Check for j2sIgnore, j2sDebug, j2sNative
	 * @param javadoc
	 * @param isBlock
	 * @return true if code was added
	 */
	protected boolean checkJ2sJavadocs(List<Javadoc> list, boolean isBlock) {
		boolean didAdd = false;
		for (int i = 0, n = list.size(); i < n; i++) {
			Javadoc javadoc = list.get(i);
			List<?> tags = javadoc.tags();
			String prefix = (isBlock && i == 0 ? "{\r\n" : "\r\n");
			String postfix = (isBlock && i == n - 1 ? "}\r\n" : "\r\n");
			if (tags != null && tags.size() > 0 && (
				       isBlock && getTag(tags, "@j2sIgnore") != null
					|| global_j2sFlag_isDebugging && addSourceForTag(getTag(tags, "@j2sDebug"), prefix, postfix)
					|| addSourceForTag(getTag(tags, "@j2sNative"), prefix, postfix)
				)) {
				didAdd = true;
			}
		}
		return didAdd;
	}

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
