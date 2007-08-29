/*******************************************************************************
 * Copyright (c) 2000, 2005 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *     Zhou Renjian - initial Java2Script implementation
 *******************************************************************************/
package org.eclipse.swt.widgets;


import org.eclipse.swt.SWT;
import org.eclipse.swt.SWTException;
import org.eclipse.swt.events.DisposeEvent;
import org.eclipse.swt.events.DisposeListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.internal.ResizeSystem;
import org.eclipse.swt.internal.browser.OS;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;

/**
 * Instances of this class are used used to inform or warn the user.
 * <dl>
 * <dt><b>Styles:</b></dt>
 * <dd>ICON_ERROR, ICON_INFORMATION, ICON_QUESTION, ICON_WARNING, ICON_WORKING</dd>
 * <dd>OK, OK | CANCEL</dd>
 * <dd>YES | NO, YES | NO | CANCEL</dd>
 * <dd>RETRY | CANCEL</dd>
 * <dd>ABORT | RETRY | IGNORE</dd>
 * <dt><b>Events:</b></dt>
 * <dd>(none)</dd>
 * </dl>
 * <p>
 * Note: Only one of the styles ICON_ERROR, ICON_INFORMATION, ICON_QUESTION,
 * ICON_WARNING and ICON_WORKING may be specified.
 * </p><p>
 * IMPORTANT: This class is intended to be subclassed <em>only</em>
 * within the SWT implementation.
 * </p>
 */
public  class MessageBox extends Dialog {
	String message = "";
	private Composite buttonPanel;
	private Button btn;
	private int returnCode;
	
/**
 * Constructs a new instance of this class given only its parent.
 *
 * @param parent a shell which will be the parent of the new instance
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 *    <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed subclass</li>
 * </ul>
 */
public MessageBox (Shell parent) {
	this (parent, SWT.OK | SWT.ICON_INFORMATION | SWT.APPLICATION_MODAL);
}

/**
 * Constructs a new instance of this class given its parent
 * and a style value describing its behavior and appearance.
 * <p>
 * The style value is either one of the style constants defined in
 * class <code>SWT</code> which is applicable to instances of this
 * class, or must be built by <em>bitwise OR</em>'ing together 
 * (that is, using the <code>int</code> "|" operator) two or more
 * of those <code>SWT</code> style constants. The class description
 * lists the style constants that are applicable to the class.
 * Style bits are also inherited from superclasses.
 *
 * @param parent a shell which will be the parent of the new instance
 * @param style the style of dialog to construct
 *
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the parent is null</li>
 * </ul>
 * @exception SWTException <ul>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the parent</li>
 *    <li>ERROR_INVALID_SUBCLASS - if this class is not an allowed subclass</li>
 * </ul>
 */
public MessageBox (Shell parent, int style) {
	super (parent, checkStyle (style));
	checkSubclass ();
}

static int checkStyle (int style) {
	if ((style & (SWT.PRIMARY_MODAL | SWT.APPLICATION_MODAL | SWT.SYSTEM_MODAL)) == 0) style |= SWT.APPLICATION_MODAL;
	int mask = (SWT.YES | SWT.NO | SWT.OK | SWT.CANCEL | SWT.ABORT | SWT.RETRY | SWT.IGNORE);
	int bits = style & mask;
	if (bits == SWT.OK || bits == SWT.CANCEL || bits == (SWT.OK | SWT.CANCEL)) return style;
	if (bits == SWT.YES || bits == SWT.NO || bits == (SWT.YES | SWT.NO) || bits == (SWT.YES | SWT.NO | SWT.CANCEL)) return style;
	if (bits == (SWT.RETRY | SWT.CANCEL) || bits == (SWT.ABORT | SWT.RETRY | SWT.IGNORE)) return style;
	style = (style & ~mask) | SWT.OK;
	return style;
}

/**
 * Returns the dialog's message, or an empty string if it does not have one.
 * The message is a description of the purpose for which the dialog was opened.
 * This message will be visible in the dialog while it is open.
 *
 * @return the message
 */
public String getMessage () {
	return message;
}

/**
 * Makes the dialog visible and brings it to the front
 * of the display.
 *
 * @return the ID of the button that was selected to dismiss the
 *         message box (e.g. SWT.OK, SWT.CANCEL, etc...)
 *
 * @exception SWTException <ul>
 *    <li>ERROR_WIDGET_DISPOSED - if the dialog has been disposed</li>
 *    <li>ERROR_THREAD_INVALID_ACCESS - if not called from the thread that created the dialog</li>
 * </ul>
 */
public int open () {

	/* Compute the MessageBox style */
	/*
	int buttonBits = 0;
	if ((style & SWT.OK) == SWT.OK) buttonBits = OS.MB_OK;
	if ((style & (SWT.OK | SWT.CANCEL)) == (SWT.OK | SWT.CANCEL)) buttonBits = OS.MB_OKCANCEL;
	if ((style & (SWT.YES | SWT.NO)) == (SWT.YES | SWT.NO)) buttonBits = OS.MB_YESNO;
	if ((style & (SWT.YES | SWT.NO | SWT.CANCEL)) == (SWT.YES | SWT.NO | SWT.CANCEL)) buttonBits = OS.MB_YESNOCANCEL;
	if ((style & (SWT.RETRY | SWT.CANCEL)) == (SWT.RETRY | SWT.CANCEL)) buttonBits = OS.MB_RETRYCANCEL;
	if ((style & (SWT.ABORT | SWT.RETRY | SWT.IGNORE)) == (SWT.ABORT | SWT.RETRY | SWT.IGNORE)) buttonBits = OS.MB_ABORTRETRYIGNORE;
	if (buttonBits == 0) buttonBits = OS.MB_OK;

	int iconBits = 0;
	if ((style & SWT.ICON_ERROR) != 0) iconBits = OS.MB_ICONERROR;
	if ((style & SWT.ICON_INFORMATION) != 0) iconBits = OS.MB_ICONINFORMATION;
	if ((style & SWT.ICON_QUESTION) != 0) iconBits = OS.MB_ICONQUESTION;
	if ((style & SWT.ICON_WARNING) != 0) iconBits = OS.MB_ICONWARNING;
	if ((style & SWT.ICON_WORKING) != 0) iconBits = OS.MB_ICONINFORMATION;
	/* Only MB_APPLMODAL is supported on WinCE *-/
	int modalBits = 0;
	if (OS.IsWinCE) {
		if ((style & (SWT.PRIMARY_MODAL | SWT.APPLICATION_MODAL | SWT.SYSTEM_MODAL)) != 0) {
			modalBits = OS.MB_APPLMODAL;
		}
	} else {
		if ((style & SWT.PRIMARY_MODAL) != 0) modalBits = OS.MB_APPLMODAL;
		if ((style & SWT.APPLICATION_MODAL) != 0) modalBits = OS.MB_TASKMODAL;
		if ((style & SWT.SYSTEM_MODAL) != 0) modalBits = OS.MB_SYSTEMMODAL;
	}

	int bits = buttonBits | iconBits | modalBits;
	if ((style & SWT.RIGHT_TO_LEFT) != 0) bits |= OS.MB_RTLREADING;
	if ((style & (SWT.LEFT_TO_RIGHT | SWT.RIGHT_TO_LEFT)) == 0) {
		if (parent != null && (parent.style & SWT.MIRRORED) != 0) {
			bits |= OS.MB_RTLREADING;
		}
	}
	/*
	* Feature in Windows.  System modal is not supported
	* on Windows 95 and NT.  The fix is to convert system
	* modal to task modal.
	*-/
	if ((bits & OS.MB_SYSTEMMODAL) != 0) {
		bits |= OS.MB_TASKMODAL;
		bits &= ~OS.MB_SYSTEMMODAL;
	}

	/*
	* Feature in Windows.  In order for MB_TASKMODAL to work,
	* the parent HWND of the MessageBox () call must be NULL.
	* If the parent is not NULL, MB_TASKMODAL behaves the
	* same as MB_APPLMODAL.  The fix to set the parent HWND
	* anyway and not rely on MB_MODAL to work by making the
	* parent be temporarily modal. 
	*-/
	int hwndOwner = parent != null ? parent.handle : 0;
	Shell oldModal = null;
	Display display = null;
	if ((bits & OS.MB_TASKMODAL) != 0) {
		display = parent.getDisplay ();
		oldModal = display.getModalDialogShell ();
		display.setModalDialogShell (parent);
	}

	/* Open the message box *-/
	/* Use the character encoding for the default locale *-/
	TCHAR buffer1 = new TCHAR (0, message, true);
	TCHAR buffer2 = new TCHAR (0, title, true);
	int code = OS.MessageBox (hwndOwner, buffer1, buffer2, bits);
	
	/* Clear the temporarily dialog modal parent *-/
	if ((bits & OS.MB_TASKMODAL) != 0) {
		display.setModalDialogShell (oldModal);
	}
	*/
	returnCode = -1;
	dialogShell = new Shell(parent.display, SWT.CLOSE | SWT.APPLICATION_MODAL);
	dialogShell.addListener(SWT.Close, new Listener() {
		public void handleEvent(Event event) {
			updateReturnCode();
		}
	});
	dialogShell.setText(title);
	dialogShell.setLayout(new GridLayout(2, false));
	int iconID = 0;
	int[] iconStyles = new int[] {
			SWT.ICON_ERROR,
			SWT.ICON_INFORMATION,
			SWT.ICON_QUESTION,
			SWT.ICON_WARNING,
			SWT.ICON_WORKING
	};
	for (int i = 0; i < iconStyles.length; i++) {
		if ((style & iconStyles[i]) != 0) {
			iconID = iconStyles[i];
			break;
		}
	}
	if (iconID != 0) {
		Composite composite = new Composite(dialogShell, SWT.NONE);
		composite.setLayout(new GridLayout());
		GridData gd = new GridData(48, 48);
		composite.setLayoutData(gd);
		Label icon = new Label(composite, SWT.NONE);
		//icon.setImage(new Image(dialogShell.display, "j2slib/images/" + iconName + ".png"));
		icon.setImage(parent.display.getSystemImage(iconID));
		GridData gridData = new GridData(32, 32);
		icon.setLayoutData(gridData);
	}
	Composite composite = new Composite(dialogShell, SWT.NONE);
	composite.setLayout(new GridLayout(2, false));
	GridData gd = new GridData(GridData.FILL_BOTH | GridData.VERTICAL_ALIGN_CENTER);
	if (iconID == 0) {
		gd.horizontalSpan = 2;
	}
	gd.grabExcessVerticalSpace = true;
	gd.heightHint = 48; //64;
	GridData labelGD = new GridData(GridData.VERTICAL_ALIGN_CENTER);
//	int wHint = UIStringUtil.calculatePlainStringLineWidth(message);
	int wHint = OS.getStringPlainWidth(message);
	if (wHint > 480) {
		labelGD.widthHint = 480;
//		int hHint = UIStringUtil.calculatePlainStringBlockHeight(message, labelGD.widthHint);
		int hHint = OS.getStringPlainWrappedHeight(message, labelGD.widthHint);
		if (hHint > 48) {
			gd.heightHint = hHint;
		}
	} else if (wHint < 64){
		labelGD.widthHint = 64;
	} else {
		labelGD.widthHint = wHint;
	}
	composite.setLayoutData(gd);
	Label messageLabel = new Label(composite, SWT.WRAP);
	messageLabel.setText(message);
	messageLabel.setLayoutData(labelGD);
	GridData gd2 = new GridData();
	gd2.grabExcessVerticalSpace = true;
	new Label(composite, SWT.NONE).setLayoutData(gd2);
	
	buttonPanel = new Composite(dialogShell, SWT.NONE);
	int count = 0;
	count += createButton(SWT.YES, "&Yes") == null ? 0 : 1;
	count += createButton(SWT.NO, "&No") == null ? 0 : 1;
	count += createButton(SWT.RETRY, "&Retry") == null ? 0 : 1;
	count += createButton(SWT.ABORT, "&Abort") == null ? 0 : 1;
	count += createButton(SWT.IGNORE, "&Ignore") == null ? 0 : 1;
	count += createButton(SWT.OK, "&OK") == null ? 0 : 1;
	count += createButton(SWT.CANCEL, "&Cancel") == null ? 0 : 1;
	if (count == 0) {
		createButton(SWT.OK, "&OK", true);
		count = 1;
	}
	GridData gridData = new GridData(GridData.CENTER, GridData.CENTER, false, false); //new GridData();
	gridData.horizontalSpan = 2;
//	gridData.grabExcessHorizontalSpace = true;
//	gridData.horizontalAlignment = GridData.HORIZONTAL_ALIGN_CENTER;
	buttonPanel.setLayoutData(gridData);
	buttonPanel.setLayout(new GridLayout(count, true));
	
	dialogShell.pack();
	dialogShell.open();
	Point size = dialogShell.getSize();
	int y = (dialogShell.getMonitor().clientHeight - size.y) / 2 - 20;
	if (y < 0) {
		y = 0;
	}
	dialogShell.setLocation((dialogShell.getMonitor().clientWidth - size.x) / 2, y);
	ResizeSystem.register(dialogShell, SWT.CENTER);
	dialogShell.addDisposeListener(new DisposeListener() {
		public void widgetDisposed(DisposeEvent e) {
			ResizeSystem.unregister(dialogShell, SWT.CENTER);
		}
	});
	/*
	* This code is intentionally commented.  On some
	* platforms, the owner window is repainted right
	* away when a dialog window exits.  This behavior
	* is currently unspecified.
	*/
//	if (hwndOwner != 0) OS.UpdateWindow (hwndOwner);
	
	/* Compute and return the result */
	/*
	if (code != 0) {
		int type = bits & 0x0F;
		if (type == OS.MB_OK) return SWT.OK;
		if (type == OS.MB_OKCANCEL) {
			return (code == OS.IDOK) ? SWT.OK : SWT.CANCEL;
		}
		if (type == OS.MB_YESNO) {
			return (code == OS.IDYES) ? SWT.YES : SWT.NO;
		}
		if (type == OS.MB_YESNOCANCEL) {
			if (code == OS.IDYES) return SWT.YES;
			if (code == OS.IDNO) return SWT.NO;
			return SWT.CANCEL;
		}
		if (type == OS.MB_RETRYCANCEL) {
			return (code == OS.IDRETRY) ? SWT.RETRY : SWT.CANCEL;
		}
		if (type == OS.MB_ABORTRETRYIGNORE) {
			if (code == OS.IDRETRY) return SWT.RETRY;
			if (code == OS.IDABORT) return SWT.ABORT;
			return SWT.IGNORE;
		}
	}
	*/
	return SWT.CANCEL;
}
protected Button createButton(final int btnStyle, String btnLabel) {
	return createButton(btnStyle, btnLabel, false);
}
protected Button createButton(final int btnStyle, String btnLabel, boolean forced) {
	if ((style & btnStyle) != 0 || forced) {
		btn = new Button(buttonPanel, SWT.PUSH);
		btn.setText(btnLabel);
		GridData gridData = new GridData();
		gridData.widthHint = 75;
		gridData.minimumHeight = 24;
		//gridData.horizontalAlignment = GridData.HORIZONTAL_ALIGN_CENTER;
		btn.setLayoutData(gridData);
		btn.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				returnCode = btnStyle;
				dialogShell.close();
			}
		});
		return btn;
	} else {
		return null;
	}
}
/**
 * Sets the dialog's message, which is a description of
 * the purpose for which it was opened. This message will be
 * visible on the dialog while it is open.
 *
 * @param string the message
 * 
 * @exception IllegalArgumentException <ul>
 *    <li>ERROR_NULL_ARGUMENT - if the string is null</li>
 * </ul>
 */
public void setMessage (String string) {
	if (string == null) error (SWT.ERROR_NULL_ARGUMENT);
	message = string;
}

private void updateReturnCode() {
	if (returnCode == -1) {
		returnCode = SWT.CANCEL;
		if ((style & SWT.OK) == SWT.OK) returnCode = SWT.OK;
		if ((style & (SWT.OK | SWT.CANCEL)) == (SWT.OK | SWT.CANCEL)) returnCode = SWT.CANCEL;
		if ((style & (SWT.YES | SWT.NO)) == (SWT.YES | SWT.NO)) returnCode = SWT.NO;
		if ((style & (SWT.YES | SWT.NO | SWT.CANCEL)) == (SWT.YES | SWT.NO | SWT.CANCEL)) returnCode = SWT.CANCEL;
		if ((style & (SWT.RETRY | SWT.CANCEL)) == (SWT.RETRY | SWT.CANCEL)) returnCode = SWT.CANCEL;
		if ((style & (SWT.ABORT | SWT.RETRY | SWT.IGNORE)) == (SWT.ABORT | SWT.RETRY | SWT.IGNORE)) returnCode = SWT.IGNORE;
	}
	/**
	 * @j2sNative
	 * this.dialogReturn = this.returnCode;
	 */{}
}

}
