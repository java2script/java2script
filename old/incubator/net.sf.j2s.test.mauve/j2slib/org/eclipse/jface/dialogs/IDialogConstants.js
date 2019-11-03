Clazz.declarePackage ("org.eclipse.jface.dialogs");
Clazz.load (["org.eclipse.jface.resource.JFaceResources"], "org.eclipse.jface.dialogs.IDialogConstants", null, function () {
c$ = Clazz.declareInterface (org.eclipse.jface.dialogs, "IDialogConstants");
Clazz.prepareFields (c$, function () {
});
Clazz.defineStatics (c$,
"OK_ID", 0,
"CANCEL_ID", 1,
"YES_ID", 2,
"NO_ID", 3,
"YES_TO_ALL_ID", 4,
"SKIP_ID", 5,
"STOP_ID", 6,
"ABORT_ID", 7,
"RETRY_ID", 8,
"IGNORE_ID", 9,
"PROCEED_ID", 10,
"OPEN_ID", 11,
"CLOSE_ID", 12,
"DETAILS_ID", 13,
"BACK_ID", 14,
"NEXT_ID", 15,
"FINISH_ID", 16,
"HELP_ID", 17,
"SELECT_ALL_ID", 18,
"DESELECT_ALL_ID", 19,
"SELECT_TYPES_ID", 20,
"NO_TO_ALL_ID", 21,
"INTERNAL_ID", 256,
"CLIENT_ID", 1024);
c$.OK_LABEL = c$.prototype.OK_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("ok");
c$.CANCEL_LABEL = c$.prototype.CANCEL_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("cancel");
c$.YES_LABEL = c$.prototype.YES_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("yes");
c$.NO_LABEL = c$.prototype.NO_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("no");
c$.NO_TO_ALL_LABEL = c$.prototype.NO_TO_ALL_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("notoall");
c$.YES_TO_ALL_LABEL = c$.prototype.YES_TO_ALL_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("yestoall");
c$.SKIP_LABEL = c$.prototype.SKIP_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("skip");
c$.STOP_LABEL = c$.prototype.STOP_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("stop");
c$.ABORT_LABEL = c$.prototype.ABORT_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("abort");
c$.RETRY_LABEL = c$.prototype.RETRY_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("retry");
c$.IGNORE_LABEL = c$.prototype.IGNORE_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("ignore");
c$.PROCEED_LABEL = c$.prototype.PROCEED_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("proceed");
c$.OPEN_LABEL = c$.prototype.OPEN_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("open");
c$.CLOSE_LABEL = c$.prototype.CLOSE_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("close");
c$.SHOW_DETAILS_LABEL = c$.prototype.SHOW_DETAILS_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("showDetails");
c$.HIDE_DETAILS_LABEL = c$.prototype.HIDE_DETAILS_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("hideDetails");
c$.BACK_LABEL = c$.prototype.BACK_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("backButton");
c$.NEXT_LABEL = c$.prototype.NEXT_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("nextButton");
c$.FINISH_LABEL = c$.prototype.FINISH_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("finish");
c$.HELP_LABEL = c$.prototype.HELP_LABEL = org.eclipse.jface.resource.JFaceResources.getString ("help");
Clazz.defineStatics (c$,
"VERTICAL_MARGIN", 7,
"VERTICAL_SPACING", 4,
"HORIZONTAL_MARGIN", 7,
"HORIZONTAL_SPACING", 4,
"BUTTON_BAR_HEIGHT", 25,
"LEFT_MARGIN", 20,
"BUTTON_MARGIN", 4,
"BUTTON_HEIGHT", 14,
"BUTTON_WIDTH", 61,
"INDENT", 21,
"SMALL_INDENT", 7,
"ENTRY_FIELD_WIDTH", 200,
"MINIMUM_MESSAGE_AREA_WIDTH", 300);
});
