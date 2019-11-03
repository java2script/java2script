package net.sf.j2s.test.swt.widgets;

import org.eclipse.swt.layout.FillLayout;
import org.eclipse.swt.layout.GridData;
import org.eclipse.swt.layout.GridLayout;
import org.eclipse.swt.widgets.Button;
import org.eclipse.swt.widgets.Display;
import org.eclipse.swt.widgets.Group;
import org.eclipse.swt.widgets.Link;
import org.eclipse.swt.widgets.Shell;
import org.eclipse.swt.widgets.Text;
import org.eclipse.swt.widgets.Tree;
import org.eclipse.swt.widgets.TreeColumn;
import org.eclipse.swt.widgets.TreeItem;
import org.eclipse.swt.graphics.Point;
import org.eclipse.swt.graphics.Rectangle;
import org.eclipse.swt.SWT;
import org.eclipse.swt.events.SelectionAdapter;
import org.eclipse.swt.events.SelectionEvent;

/**
* This code was edited or generated using CloudGarden's Jigloo
* SWT/Swing GUI Builder, which is free for non-commercial
* use. If Jigloo is being used commercially (ie, by a corporation,
* company or business for any purpose whatever) then you
* should purchase a license for each developer using Jigloo.
* Please visit www.cloudgarden.com for details.
* Use of Jigloo implies acceptance of these licensing terms.
* A COMMERCIAL LICENSE HAS NOT BEEN PURCHASED FOR
* THIS MACHINE, SO JIGLOO OR THIS CODE CANNOT BE USED
* LEGALLY FOR ANY CORPORATE OR COMMERCIAL PURPOSE.
*/
public class NewJiglooComposite extends org.eclipse.swt.widgets.Composite {
	private Group group1;
	private Tree tree1;
	private TreeItem treeItem3;
	private TreeItem treeItem5;
	private TreeItem treeItem4;
	private TreeItem treeItem2;
	private TreeItem treeItem1;
	private TreeColumn treeColumn2;
	private TreeColumn treeColumn1;
	private Link link1;
	private Text text1;
	private Button button2;
	private Button button1;

	/**
	* Auto-generated main method to display this 
	* org.eclipse.swt.widgets.Composite inside a new Shell.
	*/
	public static void main(String[] args) {
		showGUI();
	}
		
	/**
	* Auto-generated method to display this 
	* org.eclipse.swt.widgets.Composite inside a new Shell.
	*/
	public static void showGUI() {
		Display display = Display.getDefault();
		Shell shell = new Shell(display);
		NewJiglooComposite inst = new NewJiglooComposite(shell, SWT.NULL);
		Point size = inst.getSize();
		shell.setLayout(new FillLayout());
		shell.layout();
		if(size.x == 0 && size.y == 0) {
			inst.pack();
			shell.pack();
		} else {
			Rectangle shellBounds = shell.computeTrim(0, 0, size.x, size.y);
			shell.setSize(shellBounds.width, shellBounds.height);
		}
		shell.open();
		while (!shell.isDisposed()) {
			if (!display.readAndDispatch())
				display.sleep();
		}
	}

	public NewJiglooComposite(org.eclipse.swt.widgets.Composite parent, int style) {
		super(parent, style);
		initGUI();
	}

	private void initGUI() {
		try {
			GridLayout thisLayout = new GridLayout();
			thisLayout.numColumns = 2;
			this.setLayout(thisLayout);
			this.setSize(443, 284);
			{
				group1 = new Group(this, SWT.NONE);
				GridLayout group1Layout = new GridLayout();
				group1Layout.makeColumnsEqualWidth = true;
				group1.setLayout(group1Layout);
				GridData group1LData = new GridData();
				group1LData.widthHint = 143;
				group1LData.heightHint = 76;
				group1.setLayoutData(group1LData);
				group1.setText("group1");
				{
					link1 = new Link(group1, SWT.NONE);
					GridData link1LData = new GridData();
					link1.setLayoutData(link1LData);
					link1
						.setText("<a href=\"http://bl.ognize.com/\">bl.ognize</a>");
				}
			}
			{
				button1 = new Button(this, SWT.RADIO | SWT.LEFT);
				GridData button1LData = new GridData();
				button1LData.widthHint = 134;
				button1LData.heightHint = 16;
				button1.setLayoutData(button1LData);
				button1.setText("button1");
			}
			{
				button2 = new Button(this, SWT.TOGGLE | SWT.CENTER);
				button2.setText("button2");
			}
			{
				text1 = new Text(this, SWT.MULTI | SWT.WRAP);
				GridData text1LData = new GridData();
				text1LData.widthHint = 142;
				text1LData.heightHint = 43;
				text1.setLayoutData(text1LData);
				text1.setText("text1");
			}
			{
				GridData tree1LData = new GridData();
				tree1LData.horizontalSpan = 2;
				tree1LData.grabExcessHorizontalSpace = true;
				tree1LData.verticalAlignment = GridData.FILL;
				tree1LData.widthHint = 405;
				tree1 = new Tree(this, SWT.NONE);
				tree1.setLayoutData(tree1LData);
				tree1.addSelectionListener(new SelectionAdapter() {
					public void widgetSelected(SelectionEvent evt) {
						tree1WidgetSelected(evt);
					}
				});
				{
					treeItem1 = new TreeItem(tree1, SWT.NONE);
					treeItem1.setText("treeItem1");
					{
						treeItem2 = new TreeItem(treeItem1, SWT.NONE);
						treeItem2.setText("treeItem2");
					}
				}
				{
					treeItem3 = new TreeItem(tree1, SWT.NONE);
					treeItem3.setText("treeItem3");
				}
				{
					treeItem4 = new TreeItem(tree1, SWT.NONE);
					treeItem4.setText("treeItem4");
					{
						treeItem5 = new TreeItem(treeItem4, SWT.NONE);
						treeItem5.setText("treeItem5");
					}
				}
			}
			this.layout();
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	
	private void tree1WidgetSelected(SelectionEvent evt) {
		System.out.println("tree1.widgetSelected, event=" + evt);
		text1.setText(tree1.getSelection()[0].getText());
	}

}
