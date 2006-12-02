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
import org.eclipse.swt.events.KeyAdapter;
import org.eclipse.swt.events.KeyEvent;
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
	private static final String LAST_J2S_APPICATION_URL = "last.j2s.application.url";
	Browser browser;
	Action actionReload;
	Action actionStop;
	Action actionForward;
	Action actionBack;
	
	Action showAddressBarAction;
	private boolean showAddressBar;
	
	private String lastURL;

	private Text urlText;
	private IDialogSettings fDialogSettings;
	private Composite addressBar;

	/**
	 * The constructor.
	 */
	public J2SConsoleView() {
		fDialogSettings= Java2ScriptUIPlugin.getDefault().getDialogSettings();
		showAddressBar= !fDialogSettings.getBoolean(SHOW_CONSOLE_ADDRESS_BAR);
		lastURL= fDialogSettings.get(LAST_J2S_APPICATION_URL);
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
		GridData gd = new GridData();
		gd.exclude = true;
		urlLabel.setLayoutData(gd);
		urlLabel.setText("URL:");
		if (lastURL == null || lastURL.length() == 0) {
			urlLabel.setEnabled(false);
		}
		final Button copyURLButton = new Button(addressBar, SWT.PUSH);
		if (lastURL == null || lastURL.length() == 0) {
			copyURLButton.setEnabled(false);
		}
		copyURLButton.setText("[Copy] URL");
		copyURLButton.setToolTipText("Copy URL into clipboard");
		copyURLButton.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				urlText.selectAll();
				urlText.copy();
			}
		});
		urlText = new Text(addressBar, SWT.BORDER);
		urlText.setLayoutData(new GridData(GridData.FILL_HORIZONTAL));
		if (lastURL == null || lastURL.length() == 0) {
			//urlText.setEditable(false);
			urlText.setEnabled(false);
		} else {
			urlText.setText(lastURL);
		}
		urlText.addKeyListener(new KeyAdapter() {
			public void keyPressed(KeyEvent e) {
				if (e.character == '\r' || e.character == '\n') {
					browse(urlText.getText());
				}
			}
		});
		final Button runButton = new Button(addressBar, SWT.PUSH);
		if (lastURL == null || lastURL.length() == 0) {
			runButton.setEnabled(false);
		}
		runButton.setText("Run");
		runButton.setToolTipText("Run J2S application in the below embedded browser");
		runButton.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				browse(urlText.getText());
			}
		});
		final Button browserButton = new Button(addressBar, SWT.PUSH);
		if (lastURL == null || lastURL.length() == 0) {
			browserButton.setEnabled(false);
		}
		browserButton.setText("Run in External Browser");
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
				runButton.setEnabled(true);
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
				if (lastURL != null && lastURL.length() != 0) {
					browse(lastURL);
				} else {
					browser.refresh();
				}
			}
		};
		actionReload.setText("History");
		actionReload.setToolTipText("Load Last J2S Application");
		if (lastURL == null || lastURL.length() == 0) {
			actionReload.setEnabled(false);
		}
		J2SViewImages.setImageDescriptors(actionReload, J2SViewImages.REFRESH);

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
		if (lastURL != null) {
			actionReload.setText("Reload");
			actionReload.setToolTipText("Refresh current J2S application");
			browser.setUrl(url);
			lastURL = null;
		} else {
			browser.setUrl(url);
			fDialogSettings.put(LAST_J2S_APPICATION_URL, url);
		}
	}
	
	public void load(String html) {
		browser.setText(html);
	}
}