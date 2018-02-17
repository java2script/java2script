package swingjs.plaf;

/**
 * HTML5 will handle all aspects of obscuring the password
 * 
 * @author Bob Hanson
 *
 */
public class JSPasswordFieldUI extends JSTextFieldUI {

	public JSPasswordFieldUI() {
		inputType = "password";
		setDoc();
	}

}
