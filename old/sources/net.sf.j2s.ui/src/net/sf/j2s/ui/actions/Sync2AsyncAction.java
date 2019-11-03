package net.sf.j2s.ui.actions;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.internal.ui.actions.SelectionConverter;
import org.eclipse.jdt.internal.ui.javaeditor.CompilationUnitEditor;
import org.eclipse.jdt.ui.actions.ExtractMethodAction;
import org.eclipse.jdt.ui.actions.IJavaEditorActionDefinitionIds;
import org.eclipse.jdt.ui.actions.SelectionDispatchAction;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.ISelectionProvider;
import org.eclipse.ui.IEditorActionDelegate;
import org.eclipse.ui.IEditorPart;
import org.eclipse.ui.IWorkbenchWindowActionDelegate;

/**
 * Our sample action implements workbench action delegate.
 * The action proxy will be created by the workbench and
 * shown in the UI. When the user tries to use the action,
 * this delegate will be created and execution will be 
 * delegated to it.
 * @see IWorkbenchWindowActionDelegate
 */
public class Sync2AsyncAction implements IEditorActionDelegate {
	private CompilationUnitEditor editor;
	private ExtractMethodAction extractMethodAction;
	/**
	 * The constructor.
	 */
	public Sync2AsyncAction() {
	}

	/**
	 * The action has been activated. The argument of the
	 * method represents the 'real' action sitting
	 * in the workbench UI.
	 * @see IWorkbenchWindowActionDelegate#run
	 */
	public void run(IAction action) {
		ICompilationUnit unit = SelectionConverter.getInputAsCompilationUnit(editor);
		System.out.println(unit.getClass());
		//extractMethodAction.run();
	}

	/**
	 * Selection in the workbench has been changed. We 
	 * can change the state of the 'real' action here
	 * if we want, but this can only happen after 
	 * the delegate has been created.
	 * @see IWorkbenchWindowActionDelegate#selectionChanged
	 */
	public void selectionChanged(IAction action, ISelection selection) {
		if (editor != null && extractMethodAction != null) {
			extractMethodAction.update(selection);
			//action.setEnabled(extractMethodAction.isEnabled());
			System.out.println("fdsafs");
			System.out.println(SelectionConverter.getInputAsCompilationUnit(editor).getClass());
		}
	}

	public void setActiveEditor(IAction action, IEditorPart targetEditor) {
		if (targetEditor instanceof CompilationUnitEditor) {
			editor = (CompilationUnitEditor) targetEditor;
			extractMethodAction = new ExtractMethodAction(editor);
			extractMethodAction.setActionDefinitionId(IJavaEditorActionDefinitionIds.EXTRACT_METHOD);
			ISelectionProvider provider= editor.getSelectionProvider();
			ISelection selection= provider.getSelection();
			initAction(extractMethodAction, provider, selection);
			//editor.setAction("ExtractMethod", extractMethodAction); //$NON-NLS-1$
			//action.setEnabled(extractMethodAction.isEnabled());
		} else {
			extractMethodAction = null;
			//action.setEnabled(false);
		}
	}
	private static void initAction(SelectionDispatchAction action, ISelectionProvider provider, ISelection selection){
		System.out.println(provider);
		provider.addSelectionChangedListener(action);
		action.update(selection);
	}

}