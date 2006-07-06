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
import org.eclipse.jface.viewers.IStructuredSelection;
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
public class OpenJSEditorAction implements IEditorActionDelegate {
	private CompilationUnitEditor editor;
	private static boolean isFirstTime = true;
	/**
	 * The constructor.
	 */
	public OpenJSEditorAction() {
	}

	/**
	 * The action has been activated. The argument of the
	 * method represents the 'real' action sitting
	 * in the workbench UI.
	 * @see IWorkbenchWindowActionDelegate#run
	 */
	public void run(IAction action) {
		ICompilationUnit unit = SelectionConverter.getInputAsCompilationUnit(editor);
		if (isFirstTime) {
			isFirstTime = false;
			if (!UnitJavaScriptUtil.isUnitJSExisted(unit)) {
				UnitJavaScriptUtil.popupError();
				action.setEnabled(false);
				return ;
			}
		}
		if (unit != null) {
			if (UnitJavaScriptUtil.openEditor(unit)) {
				return ;
			}
		}
		UnitJavaScriptUtil.popupError();
		action.setEnabled(false);
	}

	/**
	 * Selection in the workbench has been changed. We 
	 * can change the state of the 'real' action here
	 * if we want, but this can only happen after 
	 * the delegate has been created.
	 * @see IWorkbenchWindowActionDelegate#selectionChanged
	 */
	public void selectionChanged(IAction action, ISelection selection) {
	}

	public void setActiveEditor(IAction action, IEditorPart targetEditor) {
		if (targetEditor instanceof CompilationUnitEditor) {
			editor = (CompilationUnitEditor) targetEditor;
			ICompilationUnit unit = SelectionConverter.getInputAsCompilationUnit(editor);
			boolean enabled = false;
			if (unit != null) {
				enabled = UnitJavaScriptUtil.isUnitJSExisted(unit);
			}
			if (!enabled) {
				if (isFirstTime) {
					enabled = true;
				}
			}
			action.setEnabled(enabled);
		}
	}
}