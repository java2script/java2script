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

package net.sf.j2s.ui.text.javadoc;

/**
 * @author zhou renjian
 *
 * 2006-5-3
 */

import java.io.File;
import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Properties;

import org.eclipse.core.resources.IFile;

import org.eclipse.swt.graphics.Image;

import org.eclipse.jface.resource.ImageDescriptor;

import org.eclipse.jface.text.BadLocationException;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IRegion;
import org.eclipse.jface.text.contentassist.IContextInformation;

import org.eclipse.ui.IEditorInput;
import org.eclipse.ui.part.FileEditorInput;

import org.eclipse.jdt.core.CompletionProposal;
import org.eclipse.jdt.core.CompletionRequestor;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IField;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IMember;
import org.eclipse.jdt.core.IMethod;
import org.eclipse.jdt.core.IType;
import org.eclipse.jdt.core.ITypeParameter;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.Signature;

import org.eclipse.jdt.internal.corext.util.JavaModelUtil;
import org.eclipse.jdt.internal.corext.util.TypeFilter;

import org.eclipse.jdt.ui.JavaElementLabelProvider;
import org.eclipse.jdt.ui.JavaElementLabels;
import org.eclipse.jdt.ui.JavaUI;
import org.eclipse.jdt.ui.text.java.IJavaCompletionProposal;
import org.eclipse.jdt.ui.text.java.IJavadocCompletionProcessor;

import org.eclipse.jdt.internal.ui.JavaPlugin;
import org.eclipse.jdt.internal.ui.JavaPluginImages;
import org.eclipse.jdt.internal.ui.text.java.JavaCompletionProposal;
import org.eclipse.jdt.internal.ui.text.java.ProposalInfo;
import org.eclipse.jdt.internal.ui.viewsupport.JavaElementImageProvider;

public class JavaDocCompletionEvaluator implements IJavadocCompletionProcessor, IJavaDocTagConstants {

	private ICompilationUnit fCompilationUnit;
	private IDocument fDocument;
	private int fCurrentPos;
	private int fCurrentLength;

	private String fErrorMessage;

	private JavaElementLabelProvider fLabelProvider;
	private List fResult;

	private boolean fRestrictToMatchingCase;

	public JavaDocCompletionEvaluator() {
		fResult= new ArrayList();
	}

	private static boolean isWordPart(char ch) {
		return Character.isJavaIdentifierPart(ch) || (ch == '#') || (ch == '.') || (ch == '/');
	}

	private static int findCharBeforeWord(IDocument doc, int lineBeginPos, int pos) {
		int currPos= pos - 1;
		if (currPos > lineBeginPos) {
			try {
				while (currPos > lineBeginPos && isWordPart(doc.getChar(currPos))) {
					currPos--;
				}
				return currPos;
			} catch (BadLocationException e) {
				// ignore
			}
		}
		return pos;
	}

	private static int findLastWhitespace(IDocument doc, int lineBeginPos, int pos) {
		try {
			int currPos= pos - 1;
			while (currPos >= lineBeginPos && Character.isWhitespace(doc.getChar(currPos))) {
				currPos--;
			}
			return currPos + 1;
		} catch (BadLocationException e) {
			// ignore
		}
		return pos;
	}

	private static int findClosingCharacter(IDocument doc, int pos, int end, char endChar) throws BadLocationException {
		int curr= pos;
		while (curr < end && (doc.getChar(curr) != endChar)) {
			curr++;
		}
		if (curr < end) {
			return curr + 1;
		}
		return pos;
	}

	private static int findReplaceEndPos(IDocument doc, String newText, String oldText, int pos) {
		if (oldText.length() == 0 || oldText.equals(newText)) {
			return pos;
		}

		try {
			IRegion lineInfo= doc.getLineInformationOfOffset(pos);
			int end= lineInfo.getOffset() + lineInfo.getLength();

			if (newText.endsWith(">")) { //$NON-NLS-1$
				// for html, search the tag end character
				return findClosingCharacter(doc, pos, end, '>');
			}
			char ch= 0;
			int pos1= pos;
			while (pos1 < end && Character.isJavaIdentifierPart(ch= doc.getChar(pos1))) {
				pos1++;
			}
			if (pos1 < end) {
				// for method references, search the closing bracket
				if ((ch == '(') && newText.endsWith(")")) { //$NON-NLS-1$
					return findClosingCharacter(doc, pos1, end, ')');
				}

			}
			return pos1;
		} catch (BadLocationException e) {
			// ignore
		}
		return pos;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.ui.text.java.IJavaDocCompletionProcessor#computeCompletionProposals(org.eclipse.jdt.core.ICompilationUnit, int, int, int)
	 */
	public IJavaCompletionProposal[] computeCompletionProposals(ICompilationUnit cu, int offset, int length, int flags) {
		if (cu != null) {
			String prjRootPath = cu.getJavaProject().getResource()
					.getLocation().toOSString();
			File file = new File(prjRootPath, ".j2s"); //$NON-NLS-1$
			if (file.exists()) {
				/*
				 * The file .j2s is a marker for Java2Script to compile JavaScript
				 */
				Properties props = new Properties();
				try {
					props.load(new FileInputStream(file));
					String status = props.getProperty("j2s.compiler.status");
					if (!"enable".equals(status)) {
						// No enabled;
						return new IJavaCompletionProposal[0];
					}
				} catch (FileNotFoundException e1) {
					e1.printStackTrace();
				} catch (IOException e1) {
					e1.printStackTrace();
				}
			}
		}
		fCompilationUnit= cu;
		fCurrentPos= offset;
		fCurrentLength= length;
		fRestrictToMatchingCase= (flags & RESTRICT_TO_MATCHING_CASE) != 0;

		IEditorInput editorInput= new FileEditorInput((IFile) cu.getResource());
		fDocument= JavaUI.getDocumentProvider().getDocument(editorInput);
		if (fDocument == null) {
			return null;
		}

		fLabelProvider= new JavaElementLabelProvider(JavaElementLabelProvider.SHOW_POST_QUALIFIED | JavaElementLabelProvider.SHOW_PARAMETERS);
		try {
			evalProposals();
			return (JavaCompletionProposal[]) fResult.toArray(new JavaCompletionProposal[fResult.size()]);
		} catch (JavaModelException e) {
			fErrorMessage= e.getLocalizedMessage();
		} finally {
			fLabelProvider.dispose();
			fLabelProvider= null;
			fResult.clear();
		}
		return null;
	}

	private void evalProposals() throws JavaModelException {
		try {

			IRegion info= fDocument.getLineInformationOfOffset(fCurrentPos);
			int lineBeginPos= info.getOffset();

			int word1Begin= findCharBeforeWord(fDocument, lineBeginPos, fCurrentPos);
			if (word1Begin == fCurrentPos) {
				return;
			}
			char firstChar= fDocument.getChar(word1Begin);
			if (firstChar == '@') {
				String prefix= fDocument.get(word1Begin, fCurrentPos - word1Begin);
				addProposals(prefix, JAVADOC_GENERAL_TAGS, JavaPluginImages.IMG_OBJS_JAVADOCTAG);
				return;
//			} else if (firstChar == '<') {
//				String prefix= fDocument.get(word1Begin, fCurrentPos - word1Begin);
//				addProposals(prefix, fgHTMLProposals, JavaPluginImages.IMG_OBJS_HTMLTAG);
//				return;
			} else if (!Character.isWhitespace(firstChar)) {
				return;
			}
			String prefix= fDocument.get(word1Begin + 1, fCurrentPos - word1Begin - 1);

			// could be a composed java doc construct (@param, @see ...)
			int word2End= findLastWhitespace(fDocument, lineBeginPos, word1Begin);
			if (word2End != lineBeginPos) {
				// find the word before the prefix
				int word2Begin= findCharBeforeWord(fDocument, lineBeginPos, word2End);
				if (fDocument.getChar(word2Begin) == '@') {
					String tag= fDocument.get(word2Begin, word2End - word2Begin);
					if (addArgumentProposals(tag, prefix)) {
						return;
					}
				}
			}
			addAllTags(prefix);
		} catch (BadLocationException e) {
			// ignore
		}
	}

	private boolean prefixMatches(String prefix, String proposal) {
		if (fRestrictToMatchingCase) {
			return proposal.startsWith(prefix);
		} else if (proposal.length() >= prefix.length()) {
			return prefix.equalsIgnoreCase(proposal.substring(0, prefix.length()));
		}
		return false;
	}




	private void addAllTags(String prefix) {
		String jdocPrefix= "@" + prefix; //$NON-NLS-1$
		for (int i= 0; i < JAVADOC_GENERAL_TAGS.length; i++) {
			String curr= JAVADOC_GENERAL_TAGS[i];
			if (prefixMatches(jdocPrefix, curr)) {
				fResult.add(createCompletion(curr, prefix, curr, JavaPluginImages.get(JavaPluginImages.IMG_OBJS_JAVADOCTAG), null, 0));
			}
		}
//		String htmlPrefix= "<" + prefix; //$NON-NLS-1$
//		for (int i= 0; i < fgHTMLProposals.length; i++) {
//			String curr= fgHTMLProposals[i];
//			if (prefixMatches(htmlPrefix, curr)) {
//				fResult.add(createCompletion(curr, prefix, curr, JavaPluginImages.get(JavaPluginImages.IMG_OBJS_HTMLTAG), null, 0));
//			}
//		}
	}

	private void addProposals(String prefix, String[] choices, String imageName) {
		for (int i= 0; i < choices.length; i++) {
			String curr= choices[i];
			if (prefixMatches(prefix, curr)) {
				fResult.add(createCompletion(curr, prefix, curr, JavaPluginImages.get(imageName), null, 0));
			}
		}
	}

	private void addProposals(String prefix, IJavaElement[] choices) {
		for (int i= 0; i < choices.length; i++) {
			IJavaElement elem= choices[i];
			String curr= getReplaceString(elem);
			if (prefixMatches(prefix, curr)) {
				ProposalInfo info= (elem instanceof IMember) ? new ProposalInfo((IMember) elem) : null;
				fResult.add(createCompletion(curr, prefix, fLabelProvider.getText(elem), fLabelProvider.getImage(elem), info, 0));
			}
		}
	}

	private String getReplaceString(IJavaElement elem) {
		if (elem instanceof IMethod) {
			IMethod meth= (IMethod)elem;
			StringBuffer buf= new StringBuffer();
			buf.append(meth.getElementName());
			buf.append('(');
			String[] types= meth.getParameterTypes();
			int last= types.length - 1;
			for (int i= 0; i <= last; i++) {
				buf.append(Signature.toString(Signature.getTypeErasure(types[i])));
				if (i != last) {
					buf.append(", "); //$NON-NLS-1$
				}
			}
			buf.append(')');
			return buf.toString();
		}
		return elem.getElementName();
	}

	/*
	 * Returns true if case is handled
	 */
	private boolean addArgumentProposals(String tag, String argument) throws JavaModelException {
		IJavaElement elem= fCompilationUnit.getElementAt(fCurrentPos);
		if ("@see".equals(tag) || "@link".equals(tag) || "@linkplain".equals(tag) || "@value".equals(tag)) { //$NON-NLS-2$ //$NON-NLS-3$ //$NON-NLS-4$ //$NON-NLS-1$
			if (elem instanceof IMember) {
				evalSeeTag((IMember) elem, argument);
				return true;
			}
		} else if ("@param".equals(tag)) { //$NON-NLS-1$
			if (elem instanceof IMethod) {
				String[] names= ((IMethod)elem).getParameterNames();
				addProposals(argument, names, JavaPluginImages.IMG_MISC_DEFAULT);
				ITypeParameter[] typeParameters= ((IMethod)elem).getTypeParameters();
				String[] typeParameterNames= new String[typeParameters.length];
				for (int i= 0; i < typeParameters.length; i++) {
					typeParameterNames[i]= "<"+typeParameters[i].getElementName()+">"; //$NON-NLS-1$ //$NON-NLS-2$
				}
				addProposals(argument, typeParameterNames, JavaPluginImages.IMG_MISC_DEFAULT);
			} else if (elem instanceof IType) {
				ITypeParameter[] typeParameters= ((IType) elem).getTypeParameters();
				String[] typeParameterNames= new String[typeParameters.length];
				for (int i= 0; i < typeParameters.length; i++) {
					typeParameterNames[i]= "<"+typeParameters[i].getElementName()+">"; //$NON-NLS-1$ //$NON-NLS-2$
				}
				addProposals(argument, typeParameterNames, JavaPluginImages.IMG_MISC_DEFAULT);
			}
			return true;
		} else if ("@throws".equals(tag) || "@exception".equals(tag)) { //$NON-NLS-2$ //$NON-NLS-1$
			if (elem instanceof IMethod) {
				String[] exceptions= ((IMethod)elem).getExceptionTypes();
				for (int i= 0; i < exceptions.length; i++) {
					String curr= Signature.toString(exceptions[i]);
					if (prefixMatches(argument, curr)) {
						fResult.add(createCompletion(curr, argument, curr, JavaPluginImages.get(JavaPluginImages.IMG_OBJS_CLASS), null, 100));
					}
				}
				evalTypeNameCompletions((IMethod)elem, fCurrentPos - argument.length(), argument);
			}
			return true;
		} else if ("@serialData".equals(tag)) { //$NON-NLS-1$
			if (elem instanceof IField) {
				String name= ((IField)elem).getElementName();
				fResult.add(createCompletion(name, argument, name, fLabelProvider.getImage(elem), null, 0));
			}
			return true;
		}
		return false;
	}

	private void evalSeeTag(IMember elem, String arg) throws JavaModelException {
		int wordStart= fCurrentPos - arg.length();
		int pidx= arg.indexOf('#');
		if (pidx == -1) {
			evalTypeNameCompletions(elem, wordStart, arg);
		} else {
			IType parent= null;
			if (pidx > 0) {
				// method or field
				parent= getTypeNameResolve(elem, wordStart, wordStart + pidx);
			} else {
				// '@see #foo'
				parent= (IType) elem.getAncestor(IJavaElement.TYPE);
			}

			if (parent != null) {
				int nidx= arg.indexOf('(', pidx);
				if (nidx == -1) {
					nidx= arg.length();
				}
				String prefix= arg.substring(pidx + 1, nidx);

				addProposals(prefix, parent.getMethods());
				addProposals(prefix, parent.getFields());
			}
		}
	}

	private void evalTypeNameCompletions(IMember currElem, int wordStart, String arg) throws JavaModelException {
		ICompilationUnit preparedCU= createPreparedCU(currElem, wordStart, fCurrentPos);
		if (preparedCU != null) {
			CompletionRequestor requestor= new CompletionRequestor() {
				public void accept(CompletionProposal proposal) {
					if (proposal.getKind() == CompletionProposal.TYPE_REF) {
						String fullTypeName= new String(Signature.toCharArray(proposal.getSignature()));
						if (TypeFilter.isFiltered(fullTypeName)) {
							return;
						}
						
						int start= proposal.getReplaceStart();
						int end= proposal.getReplaceEnd();
						char[] completion= proposal.getCompletion();
						fResult.add(createSeeTypeCompletion(proposal.getFlags(), start, end, completion, fullTypeName, proposal.getRelevance()));
					}
				}
			};
			try {
				preparedCU.codeComplete(fCurrentPos, requestor);
				if (currElem.getDeclaringType() == null && fCurrentPos > wordStart && currElem.getElementName().startsWith(arg)) {
					// for top level types, we use a fake import statement and the current type is never suggested
					IType type= (IType) currElem;
					char[] name= type.getElementName().toCharArray();
					fResult.add(createSeeTypeCompletion(0, wordStart, fCurrentPos, name, JavaModelUtil.getFullyQualifiedName(type), 50));
				}
			} finally {
				preparedCU.discardWorkingCopy();
			}
		}
	}

	private IType getTypeNameResolve(IMember elem, int wordStart, int wordEnd) throws JavaModelException {
		ICompilationUnit preparedCU= createPreparedCU(elem, wordStart, wordEnd);
		if (preparedCU != null) {
			try {
				IJavaElement[] elements= preparedCU.codeSelect(wordEnd, 0);
				if (elements != null && elements.length == 1 && elements[0] instanceof IType) {
					IType type= (IType) elements[0];
					if (preparedCU.equals(type.getCompilationUnit())) {
						IJavaElement[] res= elem.getCompilationUnit().findElements(type);
						if (res.length > 0) {
							return (IType) res[0];
						}
					} else {
						return type;
					}
				}
			} finally {
				preparedCU.getBuffer().setContents(fCompilationUnit.getBuffer().getCharacters());
				preparedCU.discardWorkingCopy();
			}
		}
		return null;
	}

	private ICompilationUnit createPreparedCU(IMember elem, int wordStart, int wordEnd) throws JavaModelException {
		int startpos= elem.getSourceRange().getOffset();
		char[] content= (char[]) fCompilationUnit.getBuffer().getCharacters().clone();
		if ((elem.getDeclaringType() == null) && (wordStart + 6 < content.length)) {
			content[startpos++]= 'i'; content[startpos++]= 'm'; content[startpos++]= 'p';
			content[startpos++]= 'o'; content[startpos++]= 'r'; content[startpos++]= 't';
		}
		if (wordStart < content.length) {
			for (int i= startpos; i < wordStart; i++) {
				content[i]= ' ';
			}
		}

		/*
		 * Explicitly create a new non-shared working copy.
		 */
		ICompilationUnit newCU= fCompilationUnit.getWorkingCopy(null);
		newCU.getBuffer().setContents(content);
		return newCU;
	}


	private JavaCompletionProposal createCompletion(String newText, String oldText, String labelText, Image image, ProposalInfo proposalInfo, int severity) {
		int offset= fCurrentPos - oldText.length();
		int length= fCurrentLength + oldText.length();
		if (fCurrentLength == 0)
			length= findReplaceEndPos(fDocument, newText, oldText, fCurrentPos) - offset;

		JavaCompletionProposal proposal= new JavaCompletionProposal(newText, offset, length, image, labelText, severity);
		proposal.setProposalInfo(proposalInfo);
		proposal.setTriggerCharacters( new char[] { '#' });
		return proposal;
	}

	private JavaCompletionProposal createSeeTypeCompletion(int flags, int start, int end, char[] completion, String fullTypeName, int severity) {
		return null;
		/*
		ProposalInfo proposalInfo= new ProposalInfo(fCompilationUnit.getJavaProject(), fullTypeName);
		StringBuffer nameBuffer= new StringBuffer();
		String simpleName= Signature.getSimpleName(fullTypeName);
		nameBuffer.append(simpleName);
		if (simpleName.length() != fullTypeName.length()) {
			nameBuffer.append(JavaElementLabels.CONCAT_STRING);
			nameBuffer.append(Signature.getQualifier(fullTypeName));
		}
		ImageDescriptor desc= JavaElementImageProvider.getTypeImageDescriptor(false, false, flags, false);
		Image image= JavaPlugin.getImageDescriptorRegistry().get(desc);

		int compLen= completion.length;
		if (compLen > 0 && completion[compLen - 1] == ';') {
			compLen--; // remove the semicolon from import proposals
		}

		JavaCompletionProposal proposal= new JavaCompletionProposal(new String(completion, 0, compLen), start, end - start, image, nameBuffer.toString(), severity);
		proposal.setProposalInfo(proposalInfo);
		proposal.setTriggerCharacters( new char[] { '#' });
		return proposal;
		*/
	}


	/* (non-Javadoc)
	 * @see org.eclipse.jdt.ui.text.java.IJavaDocCompletionProcessor#computeContextInformation(org.eclipse.jdt.core.ICompilationUnit, int)
	 */
	public IContextInformation[] computeContextInformation(ICompilationUnit cu, int offset) {
		fErrorMessage= null;
		return null;
	}

	/* (non-Javadoc)
	 * @see org.eclipse.jdt.ui.text.java.IJavaDocCompletionProcessor#getErrorMessage()
	 */
	public String getErrorMessage() {
		return fErrorMessage;
	}
}
