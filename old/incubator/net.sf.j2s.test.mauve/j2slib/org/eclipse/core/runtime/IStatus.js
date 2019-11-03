Clazz.declarePackage ("org.eclipse.core.runtime");
c$ = Clazz.declareInterface (org.eclipse.core.runtime, "IStatus");
Clazz.defineStatics (c$,
"OK", 0,
"INFO", 0x01,
"WARNING", 0x02,
"ERROR", 0x04,
"CANCEL", 0x08);
