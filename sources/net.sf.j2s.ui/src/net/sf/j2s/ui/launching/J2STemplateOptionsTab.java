package net.sf.j2s.ui.launching;
import net.sf.j2s.ui.launching.template.J2SAppLauncherTemplateContributor;
import net.sf.j2s.ui.launching.template.J2STemplateManager;
import net.sf.j2s.ui.launching.template.TemplateInfo;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunch;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTab;
import org.eclipse.jface.dialogs.Dialog;
import org.eclipse.jface.dialogs.InputDialog;
import org.eclipse.jface.dialogs.MessageDialog;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.layout.RowData;
import org.eclipse.swt.layout.RowLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Combo;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.ISharedImages;
import org.eclipse.ui.PlatformUI;

/**
 * "template" Option tab for j2s application launcher configuration dialog 
 * 
 * TODO: detect user changes in code and ask him if want to save it.
 * TODO: set default template button.
 * @author sgurin
 *
 */
public class J2STemplateOptionsTab extends AbstractLaunchConfigurationTab {

	private J2sTemplateComposite comp;
	private J2SAppLauncherTemplateContributor contributor;

//	protected boolean templateCodeDirty=false;
	
	// **** implement the interface **** //
	
	public J2STemplateOptionsTab(J2SAppLauncherTemplateContributor contributor) {
		super();
		this.contributor=contributor;
	}

	public void createControl(Composite parent) {
		try {
			comp = new J2sTemplateComposite(this, parent, SWT.NULL);
		} catch (Exception e) {
			MessageDialog.openError(parent.getShell(), "Error initializing templates", 
				"An error occurs when trying to initialize templates : "+e.getMessage());
			e.printStackTrace();
			return;
		}
		GridData gd = new GridData(GridData.FILL_BOTH);
		comp.setLayoutData(gd);
		setControl(comp);
	}

	public void setDefaults(ILaunchConfigurationWorkingCopy configuration) {
		configuration.setAttribute(IJ2SLauchingConfiguration.VELOCITY_CODE,
				(String) null);
		configuration.setAttribute(IJ2SLauchingConfiguration.OUTPUT_FILE_NAME,
				(String) null);
	}
	
	public void initializeFrom(ILaunchConfiguration configuration) {
		try {
			comp.getApplyTemplateCheck().setSelection(configuration.getAttribute(
				IJ2SLauchingConfiguration.APPLY_TEMPLATE, true));			
			comp.updateTemaplteCheck();
			
			comp.getTemplateCodeText().setText(configuration.getAttribute(
				IJ2SLauchingConfiguration.VELOCITY_CODE, ""));
			comp.getOutputFileText().setText(configuration.getAttribute(
				IJ2SLauchingConfiguration.OUTPUT_FILE_NAME, ""));
			comp.selectTemplateByName(configuration.getAttribute(
				IJ2SLauchingConfiguration.TEMPLATE_NAME, ""));
			
		} catch (CoreException e) {
			e.printStackTrace();
		}
	}

	public void performApply(ILaunchConfigurationWorkingCopy c) {
		
//		if(templateCodeDirty ) {
//			try {
//				templateCodeDirty=false;
//				comp.doSaveTemplateAs("Template code modified! \nIf you whish to save the changes, please enter the name\nof new template.");
//			} catch (Exception e) {
//				e.printStackTrace();
//			}
//		}
		
		boolean applyTemplate = comp.getApplyTemplateCheck().getSelection();
		String templateCode = comp.getTemplateCodeText().getText();
		int selIdx = comp.getTemplateCombo().getSelectionIndex();
		String templateName=selIdx==-1 ? "" : comp.getTemplateCombo().getItems()[selIdx];
		String outputFileNameTemplate = comp.getOutputFileText().getText();
		
		c.setAttribute(IJ2SLauchingConfiguration.APPLY_TEMPLATE, applyTemplate);
		c.setAttribute(IJ2SLauchingConfiguration.VELOCITY_CODE, templateCode);
		c.setAttribute(IJ2SLauchingConfiguration.OUTPUT_FILE_NAME, outputFileNameTemplate);
		c.setAttribute(IJ2SLauchingConfiguration.TEMPLATE_NAME, templateName);
	}

	public String getName() {
		return "Template";
	}	
	public Image getImage() {
		return getClasspathImage();
	}
	public static Image getClasspathImage() {
		return PlatformUI.getWorkbench().getSharedImages().getImage(ISharedImages.IMG_OBJS_TASK_TSK);
	}
	

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#activated(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void activated(ILaunchConfigurationWorkingCopy workingCopy) {}

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#deactivated(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void deactivated(ILaunchConfigurationWorkingCopy workingCopy) {}
	
	// **** GUI **** //
	
	/**
	 * GUI class
	 * @author sgurin
	 */
	public class J2sTemplateComposite extends org.eclipse.swt.widgets.Composite {
		
		private Label label1;
		private Button resetBtn;
		private Button applyTemplateCheck;
		private Text outputFileText;
		private Label label3;
		private Button saveBtn;
		private Composite composite1;
		private Text templateCodeText;
		private Label label2;
		private Combo templateCombo;
		private J2STemplateOptionsTab optionsTab;
		private J2STemplateManager manager;
		private String[] currentTemplateList;

		public J2sTemplateComposite(J2STemplateOptionsTab optionsTab, 
				Composite parent, int style) throws Exception {
			super(parent, style);
			this.optionsTab = optionsTab;
			manager = new J2STemplateManager(contributor);
			initGUI();
		}
		public Button getApplyTemplateCheck() {
			return applyTemplateCheck;
		}
		public Text getOutputFileText() {
			return outputFileText;
		}
		public Text getTemplateCodeText() {
			return templateCodeText;
		}
		public Combo getTemplateCombo() {
			return templateCombo;
		}
		private void doSaveTemplateAs(String msg) throws Exception {
			InputDialog dialog = new InputDialog(J2sTemplateComposite.this.getShell(), 
				"Save As", msg, templateCombo.getText(), null);
			if(dialog.open() == Dialog.OK) {
				String tname = dialog.getValue();
				if(contributor.getBuiltInTemplates().contains(tname)) {
					MessageDialog.openError(J2sTemplateComposite.this.getShell(), "Error", 
						"Error: a predefined template named \""+tname+"\" already exists. \n " +
						"Predefined templates cannot be overwritten, please choose another name");
					return;
				}
				else if(J2SLaunchingUtil.arrayContains(manager.listTemplateNames(), tname)) {
					MessageDialog overwriteDialog = new MessageDialog(J2sTemplateComposite.this.getShell(), 
						"Overwrite existing template", null, "A template named \""+tname+"\" already exists\n" +
						"Are you sure you want to overwrite it?", MessageDialog.QUESTION, new String[]{"Ok", "Cancel"}, 0);
					if(overwriteDialog.open() != 0) {
						return;
					}
				}
				//do it
				manager.putTemplate(new TemplateInfo(tname, templateCodeText.getText(), outputFileText.getText()));
				currentTemplateList = manager.listTemplateNames();
				templateCombo.setItems(currentTemplateList);
				selectTemplateByName(tname);
			}
		}
		
		private void initGUI() {
			try {
				GridLayout thisLayout = new GridLayout();
				thisLayout.makeColumnsEqualWidth = true;
				this.setLayout(thisLayout);
				{
					applyTemplateCheck = new Button(this, SWT.CHECK | SWT.LEFT);					
					applyTemplateCheck.setText("Apply template");
					GridData button1LData = new GridData();
					applyTemplateCheck.setLayoutData(button1LData);
					applyTemplateCheck.addSelectionListener(new SelectionAdapter() {
						public void widgetSelected(SelectionEvent e) {
							optionsTab.updateLaunchConfigurationDialog();
							updateTemaplteCheck();
							
						}
					});
				}
				{
					label1 = new Label(this, SWT.NONE);
					label1.setText("Template:");
					GridData label1LData = new GridData();
					label1.setLayoutData(label1LData);
				}
				{
					composite1 = new Composite(this, SWT.NONE);
					RowLayout composite1Layout = new RowLayout(org.eclipse.swt.SWT.HORIZONTAL);
					composite1Layout.marginLeft = 0;
					composite1.setLayout(composite1Layout);
					GridData composite1LData = new GridData();
					composite1.setLayoutData(composite1LData);
					{
						templateCombo = new Combo(composite1, SWT.NONE);
//						templateCombo.setText("temlate1");
						currentTemplateList = manager.listTemplateNames();
						templateCombo.setItems(currentTemplateList);
						RowData templateComboLData = new RowData();
						templateCombo.setLayoutData(templateComboLData);
						templateCombo.addSelectionListener(new SelectionAdapter() {
//							@Override
							public void widgetSelected(SelectionEvent e) {
								try {
									optionsTab.updateLaunchConfigurationDialog();
									String tname = currentTemplateList[templateCombo.getSelectionIndex()];
									TemplateInfo template = manager.getTemplate(tname);
									outputFileText.setText(template.getFileOutputName());
									templateCodeText.setText(template.getTemplateCode());
								}catch (Exception ex) {
									ex.printStackTrace();
								}
							}
						});						
					}
					{
						saveBtn = new Button(composite1, SWT.PUSH | SWT.CENTER);
						saveBtn.setText("save as");
						RowData saveBtnLData = new RowData();
						saveBtn.setLayoutData(saveBtnLData);
						saveBtn.addSelectionListener(new SelectionAdapter() {
							
							public void widgetSelected(SelectionEvent e) {
								try {
									doSaveTemplateAs("Please enter name for new template:");
								} catch (Exception ex) {
									MessageDialog.openError(J2sTemplateComposite.this.getShell(), 
											"Error", "Unespected error: "+ex.getMessage());
								}
							}
						});
					}
					{
						resetBtn = new Button(composite1, SWT.PUSH | SWT.CENTER);
						resetBtn.setText("reset");
						resetBtn.addSelectionListener(new SelectionAdapter() {
//							@Override
							public void widgetSelected(SelectionEvent e) {
								try {
								MessageDialog overwriteDialog = new MessageDialog(J2sTemplateComposite.this.getShell(), 
									"Reset J2S templates", null, "You are about to reset all user defined J2s templates. \n" +
									"All templates but predefined J2S' will be deleted. \nAre you sure?", 
									MessageDialog.QUESTION, new String[]{"Ok", "Cancel"}, 0);
								if(overwriteDialog.open() == 0) {
									String[] names = manager.listTemplateNames();
									for (int i = 0; i < names.length; i++) 
										manager.removeTemplate(names[i]);									
									templateCombo.setItems(manager.listTemplateNames());
								}
								}catch (Exception ex) {
									MessageDialog.openError(J2sTemplateComposite.this.getShell(), 
											"Error", "Unespected error: "+ex.getMessage());
									ex.printStackTrace();
								}
							}
						});
					}
				}
				{
					label3 = new Label(this, SWT.NONE);
					label3.setText("Output File Name:");
					GridData label3LData = new GridData();
					label3.setLayoutData(label3LData);
				}
				{
					outputFileText = new Text(this, SWT.NONE);
					GridData outputFileTextLData = new GridData();
					outputFileTextLData.horizontalAlignment = GridData.FILL;
					outputFileTextLData.grabExcessHorizontalSpace = true;
					outputFileText.setLayoutData(outputFileTextLData);
					outputFileText.addModifyListener(new ModifyListener() {						
//						@Override
						public void modifyText(ModifyEvent e) {
							optionsTab.updateLaunchConfigurationDialog();
						}
					});
				}
				{
					label2 = new Label(this, SWT.NONE);
					label2.setText("Velocity Code: ");
					GridData label2LData = new GridData();
					label2.setLayoutData(label2LData);
				}
				{
					templateCodeText = new Text(this, SWT.MULTI | SWT.WRAP | SWT.V_SCROLL | SWT.H_SCROLL);
					templateCodeText.setText("text1");
					
					GridData text1LData = new GridData();
					text1LData.verticalAlignment = GridData.FILL;
					text1LData.horizontalAlignment = GridData.FILL;
					text1LData.grabExcessHorizontalSpace = true;
					text1LData.grabExcessVerticalSpace = true;
					templateCodeText.setLayoutData(text1LData);
					
					templateCodeText.addModifyListener(new ModifyListener() {						
//						@Override
						public void modifyText(ModifyEvent e) {
							optionsTab.updateLaunchConfigurationDialog();
//							templateCodeDirty=true;
						}
					});
				}
				this.layout();
				pack();
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		protected void updateTemaplteCheck() {
			if(!applyTemplateCheck.getSelection()) {
				templateCombo.setEnabled(false);
				templateCodeText.setEnabled(false);
				outputFileText.setEnabled(false);
			}
			else{
				templateCombo.setEnabled(true);
				templateCodeText.setEnabled(true);
				outputFileText.setEnabled(true);
			}
		}
		public void selectTemplateByName(String tname) {
			String[] items = templateCombo.getItems();
			for (int i = 0; i < items.length; i++) {
				if(items[i].equals(tname)) {
					templateCombo.select(i);
				}
			}
		}
	}
}