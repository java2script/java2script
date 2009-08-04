package net.sf.j2s.ui.actions;

import org.eclipse.jdt.core.ICompilationUnit;
import org.eclipse.jdt.internal.ui.actions.SelectionConverter;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.viewers.ISelection;
import org.eclipse.jface.viewers.IStructuredSelection;
import org.eclipse.ui.IActionDelegate;
import org.eclipse.ui.IObjectActionDelegate;
import org.eclipse.ui.IWorkbenchPart;

public class OpenJSAction implements IObjectActionDelegate {

	private ICompilationUnit unit;
	private static boolean isFirstTime = true;

	/**
	 * Constructor for Action1.
	 */
	public OpenJSAction() {
		super();
	}

	/**
	 * @see IObjectActionDelegate#setActivePart(IAction, IWorkbenchPart)
	 */
	public void setActivePart(IAction action, IWorkbenchPart targetPart) {
	}

	/**
	 * @see IActionDelegate#run(IAction)
	 */
	public void run(IAction action) {
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
	 * @see IActionDelegate#selectionChanged(IAction, ISelection)
	 */
	public void selectionChanged(IAction action, ISelection selection) {
		unit = null;
		if (selection instanceof IStructuredSelection) {
			IStructuredSelection structSelection = (IStructuredSelection) selection;
			Object firstElement = structSelection.getFirstElement();
			if (firstElement instanceof ICompilationUnit) {
				unit = (ICompilationUnit) firstElement;
			}
		} else if (selection instanceof ICompilationUnit) {
			unit = (ICompilationUnit) selection;
		}
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
