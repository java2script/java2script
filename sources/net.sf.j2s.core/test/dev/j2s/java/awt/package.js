var path = ClazzLoader.getClasspathFor ("java.awt.package");
path = path.substring (0, path.lastIndexOf ("package.js"));
ClazzLoader.jarClasspath (path + "Window.js", [
"java.awt.FocusManager",
"$.Window"]);
ClazzLoader.jarClasspath (path + "MediaTracker.js", [
"java.awt.MediaEntry",
"$.ImageMediaEntry",
"$.MediaTracker"]);
ClazzLoader.jarClasspath (path + "EventQueue.js", [
"java.awt.EventQueueItem",
"$.EventQueue",
"$.Queue"]);
ClazzLoader.jarClasspath (path + "Container.js", [
"java.awt.LightweightDispatcher",
"$.Container"]);
ClazzLoader.jarClasspath (path + "AWTKeyStroke.js", [
"java.awt.AWTKeyStroke",
"$.VKCollection"]);
