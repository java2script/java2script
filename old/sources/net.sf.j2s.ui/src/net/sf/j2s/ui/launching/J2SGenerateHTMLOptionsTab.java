package net.sf.j2s.ui.launching;

import org.eclipse.core.runtime.CoreException;
import org.eclipse.debug.core.ILaunchConfiguration;
import org.eclipse.debug.core.ILaunchConfigurationWorkingCopy;
import org.eclipse.debug.ui.AbstractLaunchConfigurationTab;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.ModifyEvent;
import org.eclipse.swt.events.ModifyListener;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;
import org.eclipse.swt.graphics.Font;
import org.eclipse.swt.graphics.Image;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Composite;
import org.eclipse.swt.widgets.Label;
import org.eclipse.swt.widgets.Text;
import org.eclipse.ui.ISharedImages;
import org.eclipse.ui.PlatformUI;

public class J2SGenerateHTMLOptionsTab extends AbstractLaunchConfigurationTab {

	private Button btnUseXHTML;

	private Text headHeaderText;

	private Text tailHeaderText;

	private Text headBodyText;

	private Text tailBodyText;

	public J2SGenerateHTMLOptionsTab() {
		super();
	}

	public void createControl(Composite parent) {
		Font font = parent.getFont();
		Composite comp = new Composite(parent, SWT.NONE);
		GridLayout layout = new GridLayout(1, true);
		comp.setLayout(layout);
		comp.setFont(font);

		GridData gd = new GridData(GridData.FILL_BOTH);
		comp.setLayoutData(gd);
		setControl(comp);

		btnUseXHTML = new Button(comp, SWT.CHECK);
		btnUseXHTML.setText("Use XHTML Header");
		btnUseXHTML.addSelectionListener(new SelectionAdapter() {
			public void widgetSelected(SelectionEvent e) {
				updateLaunchConfigurationDialog();
			}
		});

		Label separator = new Label(comp, SWT.SEPARATOR | SWT.HORIZONTAL);
		GridData gridData = new GridData();
		gridData.horizontalAlignment = GridData.FILL;
		gridData.grabExcessHorizontalSpace = true;
		separator.setLayoutData(gridData);

		new Label(comp, SWT.NONE).setText("Header of Header:");
		headHeaderText = new Text(comp, SWT.MULTI | SWT.WRAP | SWT.BORDER
				| SWT.V_SCROLL);
		gd = new GridData(GridData.FILL_BOTH);
		gd.heightHint = 40;
		gd.widthHint = 100;
		headHeaderText.setLayoutData(gd);
		headHeaderText.setFont(font);
		headHeaderText.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent evt) {
				updateLaunchConfigurationDialog();
			}
		});

		new Label(comp, SWT.NONE).setText("Tail of Header:");
		tailHeaderText = new Text(comp, SWT.MULTI | SWT.WRAP | SWT.BORDER
				| SWT.V_SCROLL);
		gd = new GridData(GridData.FILL_BOTH);
		gd.heightHint = 40;
		gd.widthHint = 100;
		tailHeaderText.setLayoutData(gd);
		tailHeaderText.setFont(font);
		tailHeaderText.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent evt) {
				updateLaunchConfigurationDialog();
			}
		});

		separator = new Label(comp, SWT.SEPARATOR | SWT.HORIZONTAL);
		gridData = new GridData();
		gridData.horizontalAlignment = GridData.FILL;
		gridData.grabExcessHorizontalSpace = true;
		separator.setLayoutData(gridData);

		new Label(comp, SWT.NONE).setText("Header of Body:");
		headBodyText = new Text(comp, SWT.MULTI | SWT.WRAP | SWT.BORDER
				| SWT.V_SCROLL);
		gd = new GridData(GridData.FILL_BOTH);
		gd.heightHint = 40;
		gd.widthHint = 100;
		headBodyText.setLayoutData(gd);
		headBodyText.setFont(font);
		headBodyText.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent evt) {
				updateLaunchConfigurationDialog();
			}
		});

		new Label(comp, SWT.NONE).setText("Tail of Body:");
		tailBodyText = new Text(comp, SWT.MULTI | SWT.WRAP | SWT.BORDER
				| SWT.V_SCROLL);
		gd = new GridData(GridData.FILL_BOTH);
		gd.heightHint = 40;
		gd.widthHint = 100;
		tailBodyText.setLayoutData(gd);
		tailBodyText.setFont(font);
		tailBodyText.addModifyListener(new ModifyListener() {
			public void modifyText(ModifyEvent evt) {
				updateLaunchConfigurationDialog();
			}
		});

	}

	public void setDefaults(ILaunchConfigurationWorkingCopy configuration) {
		configuration.setAttribute(IJ2SLauchingConfiguration.USE_XHTML_HEADER,
				true);
		configuration.setAttribute(IJ2SLauchingConfiguration.HEAD_HEADER_HTML,
				(String) null);
		configuration.setAttribute(IJ2SLauchingConfiguration.TAIL_HEADER_HTML,
				(String) null);
		configuration.setAttribute(IJ2SLauchingConfiguration.HEAD_BODY_HTML,
				(String) null);
		configuration.setAttribute(IJ2SLauchingConfiguration.TAIL_BODY_HTML,
				(String) null);
	}

	public void initializeFrom(ILaunchConfiguration configuration) {
		try {
			btnUseXHTML.setSelection(configuration.getAttribute(
					IJ2SLauchingConfiguration.USE_XHTML_HEADER, true));
			headHeaderText.setText(configuration.getAttribute(
					IJ2SLauchingConfiguration.HEAD_HEADER_HTML, ""));
			tailHeaderText.setText(configuration.getAttribute(
					IJ2SLauchingConfiguration.TAIL_HEADER_HTML, ""));
			headBodyText.setText(configuration.getAttribute(
					IJ2SLauchingConfiguration.HEAD_BODY_HTML, ""));
			tailBodyText.setText(configuration.getAttribute(
					IJ2SLauchingConfiguration.TAIL_BODY_HTML, ""));
		} catch (CoreException e) {
			e.printStackTrace();
		}
	}

	public void performApply(ILaunchConfigurationWorkingCopy configuration) {
		configuration.setAttribute(IJ2SLauchingConfiguration.USE_XHTML_HEADER,
				btnUseXHTML.getSelection());
		configuration.setAttribute(IJ2SLauchingConfiguration.HEAD_HEADER_HTML,
				getAttributeValueFrom(headHeaderText));
		configuration.setAttribute(IJ2SLauchingConfiguration.TAIL_HEADER_HTML,
				getAttributeValueFrom(tailHeaderText));
		configuration.setAttribute(IJ2SLauchingConfiguration.HEAD_BODY_HTML,
				getAttributeValueFrom(headBodyText));
		configuration.setAttribute(IJ2SLauchingConfiguration.TAIL_BODY_HTML,
				getAttributeValueFrom(tailBodyText));
	}

	protected String getAttributeValueFrom(Text text) {
		String content = text.getText().trim();
		if (content.length() > 0) {
			return content;
		}
		return null;
	}

	public String getName() {
		return "HTML";
	}
	
	public Image getImage() {
		return getClasspathImage();
	}

	public static Image getClasspathImage() {
		return PlatformUI.getWorkbench().getSharedImages().getImage(ISharedImages.IMG_OBJ_FILE);
	}
	
	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#activated(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void activated(ILaunchConfigurationWorkingCopy workingCopy) {}

	/* (non-Javadoc)
	 * @see org.eclipse.debug.ui.ILaunchConfigurationTab#deactivated(org.eclipse.debug.core.ILaunchConfigurationWorkingCopy)
	 */
	public void deactivated(ILaunchConfigurationWorkingCopy workingCopy) {}

}
