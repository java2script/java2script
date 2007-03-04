/* private */
window["junit.registered"] = false;

(function () {
	ClazzLoader.registerPackages ("junit", [
			"awtui", "extensions", "framework", "runner",
			"swingui", "textui"]);
}) ();

/* private */
window["junit.registered"] = true;
