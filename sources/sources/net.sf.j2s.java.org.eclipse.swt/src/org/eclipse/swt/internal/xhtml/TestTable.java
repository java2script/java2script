package org.eclipse.swt.internal.xhtml;

import java.util.Date;

import org.eclipse.swt.internal.RunnableCompatibility;

public class TestTable {

	/**
	 * @param args
	 */
	public static void main(String[] args) {
		Element table = document.createElement("TABLE");
		table.style.position = "absolute";
		table.style.left = "100px";
		table.style.top = "25px";
		table.style.border = "1px solid red";
		table.style.backgroundColor = "white";
		document.body.appendChild(table);

		// Element thead = document.createElement("THEAD");
		// table.appendChild(thead);

		Element tbody = document.createElement("TBODY");
		table.appendChild(tbody);

		Date last = new Date();

		for (int i = 0; i < 100; i++) {
			Element tr = document.createElement("TR");
			tbody.appendChild(tr);

			for (int j = 0; j < 10; j++) {
				Element td = document.createElement("TD");
				tr.appendChild(td);

				Element div = document.createElement("DIV");
				td.appendChild(div);

				div.appendChild(document.createTextNode("Hi"
						+ Math.round(Math.random() * 20)));
//				div.onclick = new RunnableCompatibility() {
//
//					public void run() {
//						System.out.println("selected");
//					}
//
//				};
			}
		}
		System.out.println(new Date().getTime() - last.getTime());
	}

}
