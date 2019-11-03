Clazz.declarePackage ("org.eclipse.core.internal.registry");
Clazz.load (["org.eclipse.core.internal.registry.ConfigurationElementHandle"], "org.eclipse.core.internal.registry.ThirdLevelConfigurationElementHandle", null, function () {
c$ = Clazz.declareType (org.eclipse.core.internal.registry, "ThirdLevelConfigurationElementHandle", org.eclipse.core.internal.registry.ConfigurationElementHandle);
Clazz.overrideMethod (c$, "getConfigurationElement", 
function () {
return this.objectManager.getObject (this.getId (), 4);
});
Clazz.defineMethod (c$, "getChildren", 
function () {
return this.objectManager.getHandles (this.getConfigurationElement ().getRawChildren (), 4);
});
});
