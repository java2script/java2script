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
package net.sf.j2s.ui.generator;


import net.sf.j2s.core.astvisitors.ASTJ2SMapVisitor;
import net.sf.j2s.core.astvisitors.ASTScriptVisitor;
import net.sf.j2s.core.astvisitors.ASTVariableVisitor;
import net.sf.j2s.core.astvisitors.DependencyASTVisitor;
import net.sf.j2s.core.astvisitors.SWTDependencyASTVisitor;
import net.sf.j2s.core.astvisitors.SWTScriptVisitor;
import net.sf.j2s.core.compiler.Java2ScriptCompiler;
import net.sf.j2s.ui.Java2ScriptUIPlugin;
import org.eclipse.core.filebuffers.FileBuffers;
import org.eclipse.core.filebuffers.IFileBuffer;
import org.eclipse.core.filebuffers.IFileBufferListener;
import org.eclipse.core.filebuffers.ITextFileBuffer;
import org.eclipse.core.runtime.CoreException;
import org.eclipse.core.runtime.IPath;
import org.eclipse.core.runtime.IStatus;
import org.eclipse.core.runtime.Status;
import org.eclipse.jdt.core.IClassFile;
import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.core.IJavaElement;
import org.eclipse.jdt.core.IJavaProject;
import org.eclipse.jdt.core.IOpenable;
import org.eclipse.jdt.core.JavaModelException;
import org.eclipse.jdt.core.dom.AST;
import org.eclipse.jdt.core.dom.ASTParser;
import org.eclipse.jdt.core.dom.CompilationUnit;
import org.eclipse.jface.action.Action;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.action.IMenuListener;
import org.eclipse.jface.action.IMenuManager;
import org.eclipse.jface.action.IToolBarManager;
import org.eclipse.jface.action.MenuManager;
import org.eclipse.jface.action.Separator;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.IDialogSettings;
import org.eclipse.jface.text.DocumentEvent;
import org.eclipse.jface.text.IDocument;
import org.eclipse.jface.text.IDocumentListener;
import org.eclipse.jface.text.ITextSelection;
import org.eclipse.jface.viewers.DoubleClickEvent;
import org.eclipse.jface.viewers.IDoubleClickListener;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.ISelectionChangedListener;
import org.eclipse.jface.viewers.ISelectionProvider;
import org.eclipse.jface.viewers.SelectionChangedEvent;
import org.eclipse.swt.SWT;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.IActionBars;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IPartListener2;
import org.eclipse.ui.ISelectionListener;
import org.eclipse.ui.ISelectionService;
import org.eclipse.ui.IViewSite;
import org.eclipse.ui.IWorkbenchActionConstants;
import org.eclipse.ui.IWorkbenchPart;
import org.eclipse.ui.IWorkbenchPartReference;
import org.eclipse.ui.PartInitException;
import org.eclipse.ui.actions.ActionFactory;
import org.eclipse.ui.part.ViewPart;
import org.eclipse.ui.texteditor.ITextEditor;


public class J2SView extends ViewPart {
	
	private final static String SETTINGS_LINK_WITH_EDITOR= "link_with_editor"; //$NON-NLS-1$
	private final static String SETTINGS_NO_SCRIPT_WRITTEN= "script_written"; //$NON-NLS-1$
	private final static String SETTINGS_COMPRESS_VAR_NAME= "compress_name"; //$NON-NLS-1$

	private Action fFocusAction;
	private Action fClearAction;
	private Action fSelectAllAction;
	private Action fCopyAction;
	private Action fCompressVarNameAction;

	private Text scriptText;
	
	private Action fLinkWithEditor;

	private int fCurrentASTLevel;

	private ITextEditor fEditor;
	private IOpenable fOpenable;
	private CompilationUnit fRoot;
	
	private boolean fDoLinkWithEditor;
	private IDialogSettings fDialogSettings;
	boolean fScriptWritten;
	boolean fCompressVarName;

	private ListenerMix fSuperListener;

	public J2SView() {
		fDialogSettings= Java2ScriptUIPlugin.getDefault().getDialogSettings();
		fDoLinkWithEditor= fDialogSettings.getBoolean(SETTINGS_LINK_WITH_EDITOR);
		fScriptWritten= !fDialogSettings.getBoolean(SETTINGS_NO_SCRIPT_WRITTEN);
		fCompressVarName = fDialogSettings.getBoolean(SETTINGS_COMPRESS_VAR_NAME);
		fCurrentASTLevel = AST.JLS3;
	}

	public void createPartControl(Composite parent) {
		scriptText = new Text(parent, SWT.MULTI | SWT.H_SCROLL | SWT.V_SCROLL);
		Dialog.applyDialogFont(scriptText);
		makeActions();
		hookContextMenu();
		contributeToActionBars();
		hookGlobalActions();
	}

	private void hookGlobalActions() {
		IActionBars bars = getViewSite().getActionBars();
		bars.setGlobalActionHandler(ActionFactory.SELECT_ALL.getId(), fSelectAllAction);
		bars.setGlobalActionHandler(ActionFactory.COPY.getId(), fCopyAction);
		bars.setGlobalActionHandler(ActionFactory.DELETE.getId(), fClearAction);
	}

	private void hookContextMenu() {
		MenuManager menuMgr = new MenuManager("#PopupMenu");
		menuMgr.setRemoveAllWhenShown(true);
		menuMgr.addMenuListener(new IMenuListener() {
			public void menuAboutToShow(IMenuManager manager) {
				J2SView.this.fillContextMenu(manager);
			}
		});
		Menu menu = menuMgr.createContextMenu(scriptText);
		scriptText.setMenu(menu);
		//getSite().registerContextMenu(menuMgr, scriptText);
	}

	private void contributeToActionBars() {
		IActionBars bars = getViewSite().getActionBars();
		fillLocalPullDown(bars.getMenuManager());
		fillLocalToolBar(bars.getToolBarManager());
	}

	private void fillLocalPullDown(IMenuManager manager) {
		manager.add(fCompressVarNameAction);
		manager.add(new Separator());
		manager.add(fSelectAllAction);
	}

	private void fillContextMenu(IMenuManager manager) {
		manager.add(fFocusAction);
		manager.add(new Separator());
		manager.add(fCopyAction);
		manager.add(fClearAction);
		manager.add(new Separator());
		manager.add(fSelectAllAction);
		//manager.add(fScriptWrittenAction);
		// Other plug-ins can contribute there actions here
		manager.add(new Separator(IWorkbenchActionConstants.MB_ADDITIONS));
	}
	
	private void fillLocalToolBar(IToolBarManager manager) {
		manager.add(fFocusAction);
		//manager.add(fScriptWrittenAction);
		manager.add(fClearAction);
		manager.add(fLinkWithEditor);
	}

	private void makeActions() {
		fFocusAction = new Action() {
			public void run() {
				performSetFocus();
			}
		};
		fFocusAction.setText("Generate Script");
		fFocusAction.setToolTipText("Generate script from the selected Java element");
		J2SViewImages.setImageDescriptors(fFocusAction, J2SViewImages.SETFOCUS);
		
		fClearAction = new Action() {
			public void run() {
				performClear();
			}
		};
		fClearAction.setText("Clear Script");
		fClearAction.setToolTipText("Clear the script output console");
		J2SViewImages.setImageDescriptors(fClearAction, J2SViewImages.CLEAR);
		/*
		fScriptWrittenAction = new Action("Enable J2SMap", IAction.AS_CHECK_BOX) { //$NON-NLS-1$
			public void run() {
				performScriptWritten();
			}
		};
		fScriptWrittenAction.setChecked(fScriptWritten);
		fScriptWrittenAction.setToolTipText("Converting Java to JavaScript using given J2SMap"); //$NON-NLS-1$
		//J2SViewImages.setImageDescriptors(fScriptWrittenAction, J2SViewImages.ADD_TO_TRAY);
		//fScriptWrittenAction.setEnabled(fScriptWritten);
		*/
		fCompressVarNameAction = new Action("Enable Identifier Minimization", IAction.AS_CHECK_BOX) { //$NON-NLS-1$
			public void run() {
				performCompressName();
			}
		};
		fCompressVarNameAction.setChecked(fCompressVarName);
		fCompressVarNameAction.setToolTipText("Minimization of identifiers for small script size"); //$NON-NLS-1$
		//J2SViewImages.setImageDescriptors(fScriptWrittenAction, J2SViewImages.ADD_TO_TRAY);
		//fCompressVarNameAction.setEnabled(fCompressVarName);

		fLinkWithEditor = new Action() {
			public void run() {
				performLinkWithEditor();
			}
		};
		fLinkWithEditor.setChecked(fDoLinkWithEditor);
		fLinkWithEditor.setText("&Link with Editor"); //$NON-NLS-1$
		fLinkWithEditor.setToolTipText("Link With Editor"); //$NON-NLS-1$
		J2SViewImages.setImageDescriptors(fLinkWithEditor, J2SViewImages.LINK_WITH_EDITOR);
		
		fCopyAction = new Action() {
			public void run() {
				scriptText.copy();
			};
		};
		fCopyAction.setText("&Copy@Ctrl+C"); //$NON-NLS-1$
		fCopyAction.setToolTipText("Copy the selected script"); //$NON-NLS-1$
		
		fSelectAllAction = new Action() {
			public void run() {
				scriptText.selectAll();
			};
		};
		fSelectAllAction.setText("Select &All@Ctrl+A"); //$NON-NLS-1$
		fSelectAllAction.setToolTipText("Select all the script"); //$NON-NLS-1$

//        IActionBars actionBars= getViewSite().getActionBars();
//        ResourceBundle bundle = ConsoleResourceBundleMessages.getBundle();
//        actionBars.setGlobalActionHandler(ActionFactory.FIND.getId(), new FindReplaceAction(bundle, "find_replace_action_", this)); //$NON-NLS-1$
	}

	protected void performSetFocus() {
		IEditorPart part= EditorUtility.getActiveEditor();
		if (part instanceof ITextEditor) {
			try {
				setInput((ITextEditor) part);
			} catch (CoreException e) {
				scriptText.setText("Could not set AST view input "); //$NON-NLS-1$
			}
		}
	}
	protected void performClear() {
		fOpenable= null;
		scriptText.setText("");
	}
	
	protected void performScriptWritten() {
		/*
		fScriptWritten= fScriptWrittenAction.isChecked();
		fDialogSettings.put(SETTINGS_NO_SCRIPT_WRITTEN, !fScriptWritten);
//		if (fScriptWritten) {
//			ExtendedCompilers.register("java2script", new Java2ScriptCompiler());
//		} else {
//			ExtendedCompilers.deregister("java2script");
//		}
		*/
	}
	
	protected void performCompressName() {
		fCompressVarName = fCompressVarNameAction.isChecked();
		fDialogSettings.put(SETTINGS_COMPRESS_VAR_NAME, !fScriptWritten);
//		if (fScriptWritten) {
//		ExtendedCompilers.register("java2script", new Java2ScriptCompiler());
//		} else {
//		ExtendedCompilers.deregister("java2script");
//		}
	}

	public void setFocus() {
		scriptText.setFocus();
	}
	
	public void setInput(ITextEditor editor) throws CoreException {
		if (fEditor != null) {
			//uninstallModificationListener();
		}
		
		fEditor= null;
		fRoot= null;
		
		if (editor != null) {
			IOpenable openable= EditorUtility.getJavaInput(editor);
			if (openable == null) {
				throw new CoreException(getErrorStatus("Editor not showing a CU or classfile", null)); //$NON-NLS-1$
			}
			fOpenable= openable;
			
			fRoot= createAST(fOpenable, fCurrentASTLevel);
			
			//installModificationListener();

			SWTScriptVisitor visitor = new SWTScriptVisitor();
			
			//visitor.setToCompileVariableName(fCompressVarName);
			((ASTVariableVisitor) visitor.getAdaptable(ASTVariableVisitor.class)).setToCompileVariableName(fCompressVarName);
			ASTJ2SMapVisitor.setJ2SMap(null);
			if (fCompressVarName) {
				String prjFolder = null;
				if (fOpenable instanceof IJavaElement) {
					IJavaElement unit = (IJavaElement) fOpenable;
					IJavaProject javaProject = unit.getJavaProject();
					if (javaProject != null) {
						prjFolder = javaProject.getProject().getLocation().toOSString();
					}
				}
				if (prjFolder != null) {
					Java2ScriptCompiler.updateJ2SMap(prjFolder);
				}
			}
			fRoot.accept(visitor);
			DependencyASTVisitor dvisitor = new SWTDependencyASTVisitor();
			dvisitor.setToCompileVariableName(fCompressVarName);
			try {
				fRoot.accept(dvisitor);
			} catch (Throwable e) {
				e.printStackTrace();
			}
			outputJavaScript(visitor, dvisitor);
		}

	}
	
	private CompilationUnit createAST(IOpenable input, int astLevel) throws JavaModelException, CoreException {
		CompilationUnit root;
		ASTParser parser= ASTParser.newParser(astLevel);
		parser.setResolveBindings(true);
		if (input instanceof ICompilationUnit) {
			parser.setSource((ICompilationUnit) input);
		} else {
			parser.setSource((IClassFile) input);
		}
		root= (CompilationUnit) parser.createAST(null);
		if (root == null) {
			throw new CoreException(getErrorStatus("Could not create AST", null)); //$NON-NLS-1$
		}
		//updateContentDescription((IJavaElement) input, root, endTime - startTime, false);
		return root;
	}
	
	private IStatus getErrorStatus(String message, Throwable th) {
		return new Status(IStatus.ERROR, "net.sf.j2s.j2sview", IStatus.ERROR, message, th);
	}

	private void outputJavaScript(ASTScriptVisitor visitor, DependencyASTVisitor dvisitor) {
		String js = dvisitor.getDependencyScript(visitor.getBuffer());
		js = js.replaceAll("cla\\$\\$", "c\\$")
				.replaceAll("innerThis", "i\\$")
				.replaceAll("finalVars", "v\\$")
				.replaceAll("\\.callbacks", "\\.b\\$")
				.replaceAll("\\.\\$finals", "\\.f\\$");
		scriptText.setText(js);
	}
	
	protected void performLinkWithEditor() {
		fDoLinkWithEditor= fLinkWithEditor.isChecked();
		fDialogSettings.put(SETTINGS_LINK_WITH_EDITOR, fDoLinkWithEditor);
		

		if (fDoLinkWithEditor && fEditor != null) {
			ISelectionProvider selectionProvider= fEditor.getSelectionProvider();
			if (selectionProvider != null) { // can be null when editor is closed
				doLinkWithEditor(selectionProvider.getSelection());
			}
		}
	}

	
	private void doLinkWithEditor(ISelection selection) {
		ITextSelection textSelection= (ITextSelection) selection;
		int offset= textSelection.getOffset();
		int length= textSelection.getLength();
	}
	
	/*(non-Javadoc)
	 * @see org.eclipse.ui.IViewPart#init(org.eclipse.ui.IViewSite)
	 */
	public void init(IViewSite site) throws PartInitException {
		super.setSite(site);
		if (fSuperListener == null) {
			fSuperListener= new ListenerMix(this);
			
			ISelectionService service= site.getWorkbenchWindow().getSelectionService();
			service.addPostSelectionListener(fSuperListener);
			site.getPage().addPartListener(fSuperListener);
			FileBuffers.getTextFileBufferManager().addFileBufferListener(fSuperListener);
		}
	}

	protected void handleEditorPostSelectionChanged(IWorkbenchPart part, ISelection selection) {
		if (!fDoLinkWithEditor || !(selection instanceof ITextSelection)) {
			return;
		}
		if (fRoot == null || part != fEditor) {
			if (part instanceof ITextEditor && (EditorUtility.getJavaInput((ITextEditor) part) != null)) {
				try {
					setInput((ITextEditor) part);
				} catch (CoreException e) {
					setContentDescription(e.getStatus().getMessage());
				}
			}
			
		} else { // fRoot != null && part == fEditor
			doLinkWithEditor(selection);
		}
	}
	protected void handleDocumentDisposed(IDocument document) {
		//uninstallModificationListener();
	}
	
	protected void handleDocumentChanged(IDocument document) {
		//setASTUptoDate(false);
	}
	
	protected void handleSelectionChanged(ISelection selection) {
	}
	protected void handleDoubleClick(DoubleClickEvent event) {
		//fDoubleClickAction.run();
	}
	
	final void notifyWorkbenchPartClosed(IWorkbenchPartReference partRef) {
		if (fEditor != null && fEditor.equals(partRef.getPart(false))) {
			try {
				setInput(null);
			} catch (CoreException e) {
				// ignore
			}
		}
	}

	private static class ListenerMix implements ISelectionListener, IFileBufferListener, IDocumentListener, ISelectionChangedListener, IDoubleClickListener, IPartListener2 {
		
		private boolean fASTViewVisible= true;
		private J2SView fView;
		
		public ListenerMix(J2SView view) {
			fView= view;
		}
		
		public void dispose() {
			fView= null;
		}

		public void selectionChanged(IWorkbenchPart part, ISelection selection) {
			if (fASTViewVisible) {
				fView.handleEditorPostSelectionChanged(part, selection);
			}
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#bufferCreated(org.eclipse.core.filebuffers.IFileBuffer)
		 */
		public void bufferCreated(IFileBuffer buffer) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#bufferDisposed(org.eclipse.core.filebuffers.IFileBuffer)
		 */
		public void bufferDisposed(IFileBuffer buffer) {
			if (buffer instanceof ITextFileBuffer) {
				fView.handleDocumentDisposed(((ITextFileBuffer) buffer).getDocument());
			}
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#bufferContentAboutToBeReplaced(org.eclipse.core.filebuffers.IFileBuffer)
		 */
		public void bufferContentAboutToBeReplaced(IFileBuffer buffer) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#bufferContentReplaced(org.eclipse.core.filebuffers.IFileBuffer)
		 */
		public void bufferContentReplaced(IFileBuffer buffer) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#stateChanging(org.eclipse.core.filebuffers.IFileBuffer)
		 */
		public void stateChanging(IFileBuffer buffer) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#dirtyStateChanged(org.eclipse.core.filebuffers.IFileBuffer, boolean)
		 */
		public void dirtyStateChanged(IFileBuffer buffer, boolean isDirty) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#stateValidationChanged(org.eclipse.core.filebuffers.IFileBuffer, boolean)
		 */
		public void stateValidationChanged(IFileBuffer buffer, boolean isStateValidated) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#underlyingFileMoved(org.eclipse.core.filebuffers.IFileBuffer, org.eclipse.core.runtime.IPath)
		 */
		public void underlyingFileMoved(IFileBuffer buffer, IPath path) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#underlyingFileDeleted(org.eclipse.core.filebuffers.IFileBuffer)
		 */
		public void underlyingFileDeleted(IFileBuffer buffer) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.core.filebuffers.IFileBufferListener#stateChangeFailed(org.eclipse.core.filebuffers.IFileBuffer)
		 */
		public void stateChangeFailed(IFileBuffer buffer) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.jface.text.IDocumentListener#documentAboutToBeChanged(org.eclipse.jface.text.DocumentEvent)
		 */
		public void documentAboutToBeChanged(DocumentEvent event) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.jface.text.IDocumentListener#documentChanged(org.eclipse.jface.text.DocumentEvent)
		 */
		public void documentChanged(DocumentEvent event) {
			fView.handleDocumentChanged(event.getDocument());
		}

		/* (non-Javadoc)
		 * @see org.eclipse.jface.viewers.ISelectionChangedListener#selectionChanged(org.eclipse.jface.viewers.SelectionChangedEvent)
		 */
		public void selectionChanged(SelectionChangedEvent event) {
			fView.handleSelectionChanged(event.getSelection());
		}

		/* (non-Javadoc)
		 * @see org.eclipse.jface.viewers.IDoubleClickListener#doubleClick(org.eclipse.jface.viewers.DoubleClickEvent)
		 */
		public void doubleClick(DoubleClickEvent event) {
			fView.handleDoubleClick(event);
		}
		
		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partHidden(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partHidden(IWorkbenchPartReference partRef) {
			IWorkbenchPart part= partRef.getPart(false);
			if (part == fView) {
				fASTViewVisible= false;
			}
		}

		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partVisible(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partVisible(IWorkbenchPartReference partRef) {
			IWorkbenchPart part= partRef.getPart(false);
			if (part == fView) {
				fASTViewVisible= true;
			}
		}

		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partActivated(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partActivated(IWorkbenchPartReference partRef) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partBroughtToTop(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partBroughtToTop(IWorkbenchPartReference partRef) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partClosed(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partClosed(IWorkbenchPartReference partRef) {
			fView.notifyWorkbenchPartClosed(partRef);
		}

		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partDeactivated(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partDeactivated(IWorkbenchPartReference partRef) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partOpened(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partOpened(IWorkbenchPartReference partRef) {
			// not interesting
		}

		/* (non-Javadoc)
		 * @see org.eclipse.ui.IPartListener2#partInputChanged(org.eclipse.ui.IWorkbenchPartReference)
		 */
		public void partInputChanged(IWorkbenchPartReference partRef) {
			// not interesting
		}
	}

}