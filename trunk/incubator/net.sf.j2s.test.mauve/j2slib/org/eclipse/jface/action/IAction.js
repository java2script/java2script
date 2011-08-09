Clazz.declarePackage ("org.eclipse.jface.action");
c$ = Clazz.declareInterface (org.eclipse.jface.action, "IAction");
Clazz.defineStatics (c$,
"AS_UNSPECIFIED", 0x00,
"AS_PUSH_BUTTON", 0x01,
"AS_CHECK_BOX", 0x02,
"AS_DROP_DOWN_MENU", 0x04,
"AS_RADIO_BUTTON", 0x08,
"TEXT", "text",
"ENABLED", "enabled",
"IMAGE", "image",
"TOOL_TIP_TEXT", "toolTipText",
"DESCRIPTION", "description",
"CHECKED", "checked",
"RESULT", "result");
c$.HANDLED = c$.prototype.HANDLED = "handled";
