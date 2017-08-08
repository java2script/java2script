Clazz.declarePackage ("java.util.spi");
Clazz.load (["java.util.spi.LocaleServiceProvider"], "java.util.spi.TimeZoneNameProvider", null, function () {
c$ = Clazz.declareType (java.util.spi, "TimeZoneNameProvider", java.util.spi.LocaleServiceProvider);
Clazz.makeConstructor (c$, 
function () {
Clazz.superConstructor (this, java.util.spi.TimeZoneNameProvider, []);
});
});
