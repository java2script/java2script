package net.sf.j2s.ui.console;


import java.io.File;
import java.net.MalformedURLException;
import java.net.URL;

import net.sf.j2s.ui.Java2ScriptUIPlugin;

import org.eclipse.jface.action.Action;
import org.eclipse.jface.action.IAction;
import org.eclipse.jface.action.IMenuListener;
import org.eclipse.jface.action.IMenuManager;
import org.eclipse.jface.action.IToolBarManager;
import org.eclipse.jface.action.MenuManager;
import org.eclipse.jface.action.Separator;
import org.eclipse.jface.dialogs.IDialogSettings;
import org.eclipse.swt.SWT;
import org.eclipse.swt.browser.Browser;
import org.eclipse.swt.browser.LocationAdapter;
import org.eclipse.swt.browser.LocationEvent;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.program.Program;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Menu;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.IActionBars;
import org.eclipse.ui.ISharedImages;
import org.eclipse.ui.IWorkbenchActionConstants;
import org.eclipse.ui.PlatformUI;
import org.eclipse.ui.part.ViewPart;

public class J2SConsoleView extends ViewPart {
	private static final String SHOW_CONSOLE_ADDRESS_BAR = "show.console.address.bar";
	Browser browser;
	Action actionReload;
	Action actionStop;
	Action actionForward;
	Action actionBack;
	
	Action showAddressBarAction;
	private boolean showAddressBar;

	private Text urlText;
	private IDialogSettings fDialogSettings;
	private Composite addressBar;

	/**
	 * The constructor.
	 */
	public J2SConsoleView() {
		fDialogSettings= Java2ScriptUIPlugin.getDefault().getDialogSettings();
		showAddressBar= !fDialogSettings.getBoolean(SHOW_CONSOLE_ADDRESS_BAR);
	}

	/**
	 * This is a callback that will allow us
	 * to create the viewer and initialize it.
	 */
	public void createPartControl(Composite parent) {
		Composite outerComposite = new Composite(parent, SWT.NONE);
		GridLayout gridLayout = new GridLayout();
		gridLayout.marginWidth = 0;
		gridLayout.marginHeight = 0;
		gridLayout.verticalSpacing = 2;
		gridLayout.numColumns = 1;
		outerComposite.setLayout(gridLayout);
		outerComposite.setLayoutData(new GridData(GridData.FILL_BOTH));
		addressBar = new Composite(outerComposite, SWT.NONE);
		gridLayout = new GridLayout();
		gridLayout.marginWidth = 0;
		gridLayout.marginHeight = 0;
		gridLayout.verticalSpacing = 2;
		gridLayout.numColumns = 4;
		addressBar.setLayout(gridLayout);
		GridData gridData = new GridData(GridData.FILL_HORIZONTAL);
		gridData.exclude = !showAddressBar;
		addressBar.setLayoutData(gridData);
		final Label urlLabel = new Label(addressBar, SWT.NONE);
		urlLabel.setText("URL:");
		urlLabel.setEnabled(false);
		urlText = new Text(addressBar, SWT.BORDER);
		urlText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		urlText.setEditable(false);
		urlText.setEnabled(false);
		final Button copyURLButton = new Button(addressBar, SWT.PUSH);
		copyURLButton.setEnabled(false);
		copyURLButton.setText("Copy URL");
		copyURLButton.setToolTipText("Copy URL into clipboard");
		copyURLButton.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				urlText.selectAll();
				urlText.copy();
			}
		});
		final Button browserButton = new Button(addressBar, SWT.PUSH);
		browserButton.setEnabled(false);
		browserButton.setText("Lauch in Browser");
		browserButton.setToolTipText("Lauch the URL in standalone browser");
		browserButton.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				String url = urlText.getText();
				if (url != null && url.length() != 0) {
					try {
						String file = new URL(url).getFile();
						boolean win32 = ((System.getProperty("os.name").indexOf("Windows") != -1) //$NON-NLS-1$ //$NON-NLS-2$ 
								|| (System.getProperty("os.name").indexOf("windows") != -1)); //$NON-NLS-1$ //$NON-NLS-2$
						if (win32 && file.startsWith("/")) {
							file = file.substring(1);
						}
						file = file.replace('/', File.separatorChar);
						Program.launch(file);
					} catch (MalformedURLException e1) {
						e1.printStackTrace();
					}
				}
			}
		});
		addressBar.setVisible(showAddressBar);
		browser = new Browser(outerComposite, SWT.NONE);
		gridData = new GridData(GridData.FILL_BOTH);
		//gridData.horizontalSpan = 4;
		browser.setLayoutData(gridData);
		makeActions();
		//hookContextMenu();
		contributeToActionBars();
		browser.addLocationListener(new LocationAdapter() {
			public void changed(LocationEvent event) {
				actionBack.setEnabled(browser.isBackEnabled());
				actionForward.setEnabled(browser.isForwardEnabled());
				actionReload.setEnabled(true);
				urlText.setText(browser.getUrl());
				urlLabel.setEnabled(true);
				urlText.setEnabled(true);
				copyURLButton.setEnabled(true);
				browserButton.setEnabled(true);
			}
		});
	}

	private void hookContextMenu() {
		MenuManager menuMgr = new MenuManager("#PopupMenu");
		menuMgr.setRemoveAllWhenShown(true);
		menuMgr.addMenuListener(new IMenuListener() {
			public void menuAboutToShow(IMenuManager manager) {
				J2SConsoleView.this.fillContextMenu(manager);
			}
		});
		Menu menu = menuMgr.createContextMenu(browser);
		browser.setMenu(menu);
		//getSite().registerContextMenu(menuMgr, viewer);
	}

	private void contributeToActionBars() {
		IActionBars bars = getViewSite().getActionBars();
		fillLocalPullDown(bars.getMenuManager());
		fillLocalToolBar(bars.getToolBarManager());
	}

	private void fillLocalPullDown(IMenuManager manager) {
		manager.add(actionReload);
		manager.add(new Separator());
		manager.add(showAddressBarAction);
//		manager.add(actionStop);
	}

	private void fillContextMenu(IMenuManager manager) {
		manager.add(actionReload);
//		manager.add(actionStop);
		// Other plug-ins can contribute there actions here
		manager.add(new Separator(IWorkbenchActionConstants.MB_ADDITIONS));
	}
	
	private void fillLocalToolBar(IToolBarManager manager) {
		manager.add(actionBack);
		manager.add(actionForward);
		manager.add(actionReload);
//		manager.add(actionStop);
	}

	private void makeActions() {
		actionBack = new Action() {
			public void run() {
				browser.back();
			}
		};
		actionBack.setText("Back");
		actionBack.setToolTipText("Go back to former J2S application");
		actionBack.setImageDescriptor(PlatformUI.getWorkbench().getSharedImages().
			getImageDescriptor(ISharedImages.IMG_TOOL_BACK));
		actionBack.setEnabled(false);
		
		actionForward = new Action() {
			public void run() {
				browser.forward();
			}
		};
		actionForward.setText("Forward");
		actionForward.setToolTipText("Go forward to next J2S application");
		actionForward.setImageDescriptor(PlatformUI.getWorkbench().getSharedImages().
			getImageDescriptor(ISharedImages.IMG_TOOL_FORWARD));
		actionForward.setEnabled(false);
		
		actionReload = new Action() {
			public void run() {
				browser.refresh();
			}
		};
		actionReload.setText("Reload");
		actionReload.setToolTipText("Refresh current J2S application");
		actionReload.setEnabled(false);
//		actionReload.setImageDescriptor(PlatformUI.getWorkbench().getSharedImages().
//			getImageDescriptor(ISharedImages.IMG_TOOL_REDO));
		J2SViewImages.setImageDescriptors(actionReload, J2SViewImages.REFRESH);
//		try {
//			actionReload.setImageDescriptor(ImageDescriptor.createFromURL(new URL("file:/icons/refresh_nav.gif")));
//		} catch (MalformedURLException e) {
//			// TODO Auto-generated catch block
//			e.printStackTrace();
//		}
		actionStop = new Action() {
			public void run() {
				browser.stop();
			}
		};
		actionStop.setText("Stop");
		actionStop.setToolTipText("Stop loading the rest");
		actionStop.setImageDescriptor(PlatformUI.getWorkbench().getSharedImages().
				getImageDescriptor(ISharedImages.IMG_TOOL_DELETE));
		
		showAddressBarAction = new Action("Show/Hide Address Bar", IAction.AS_CHECK_BOX) { //$NON-NLS-1$
			public void run() {
				performAddressBarAction();
			}
		};
		showAddressBarAction.setChecked(showAddressBar);
		showAddressBarAction.setToolTipText("Show or hide the address bar"); //$NON-NLS-1$
		//J2SViewImages.setImageDescriptors(fScriptWrittenAction, J2SViewImages.ADD_TO_TRAY);
		//showAddressBarAction.setEnabled(showAddressBar);

	}
	protected void performAddressBarAction() {
		showAddressBar= showAddressBarAction.isChecked();
		fDialogSettings.put(SHOW_CONSOLE_ADDRESS_BAR, !showAddressBar);
		addressBar.setVisible(showAddressBar);
		GridData gridData = new GridData(GridData.FILL_HORIZONTAL);
		gridData.exclude = !showAddressBar;
		addressBar.setLayoutData(gridData);
		addressBar.getParent().layout(true);
	}

	public void setFocus() {
		browser.setFocus();
	}
	
	public void browse(String url) {
		browser.setUrl(url);
	}
	
	public void load(String html) {
		browser.setText(html);
	}
}