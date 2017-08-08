Clazz.load (null, "java.util.Locale", ["java.lang.InternalError", "$.NullPointerException", "java.util.MissingResourceException"], function () {
;
(function(){var C$ = Clazz.decorateAsClass (function () {
Clazz.newInstance$ (this, arguments);
}, java.util, "Locale", null, [Cloneable, java.io.Serializable]);

Clazz.newMethod$(C$, '$init$', function () {
this.language = "";
this.country = "";
this.variant = "";
this.hashcode = -1;
}, 1);

Clazz.newMethod$ (C$, 'construct$S$S$S', function (language, country, variant) {
C$.$init$.apply(this);
this.language = C$.prototype.convertOldISOCodes$S.apply(this, [language]);
this.country = country.toUpperCase ();
this.variant = variant.intern ();
}, 1);

Clazz.newMethod$ (C$, 'construct$S$S', function (language, country) {
C$.construct$S$S$S.apply(this, [language, country, ""]);
}, 1);

Clazz.newMethod$ (C$, 'construct$S', function (language) {
C$.construct$S$S$S.apply(this, [language, "", ""]);
}, 1);

Clazz.newMethod$ (C$, 'getDefault', function () {
if (java.util.Locale.defaultLocale == null) {
var language = "en";
var country = "US";
var variant = "";
navigator.userAgent.replace (/;\s*([a-zA-Z]{2,})[-_]([a-zA-Z]{2,});/, function ($0, $1, $2) {
language = $1;
country = $2;
});
java.util.Locale.defaultLocale = new java.util.Locale (language, country, variant);
}return java.util.Locale.defaultLocale;
}, 1);

Clazz.newMethod$ (C$, 'setDefault$java_util_Locale', function (newLocale) {
if (newLocale == null) throw Clazz.$new(NullPointerException.construct$S,["Can't set default locale to NULL"]);
{
java.util.Locale.defaultLocale = newLocale;
}}, 1);

Clazz.newMethod$ (C$, 'getAvailableLocales', function () {
var lcl = java.util.Locale;
return [
lcl.ENGLISH,
lcl.ENGLISH,
lcl.FRENCH,
lcl.GERMAN,
lcl.ITALIAN,
lcl.JAPANESE,
lcl.KOREAN,
lcl.CHINESE,
lcl.SIMPLIFIED_CHINESE,
lcl.TRADITIONAL_CHINESE,
lcl.FRANCE,
lcl.GERMANY,
lcl.ITALY,
lcl.JAPAN,
lcl.KOREA,
lcl.CHINA,
lcl.PRC,
lcl.TAIWAN,
lcl.UK,
lcl.US,
lcl.CANADA,
lcl.CANADA_FRENCH
];
}, 1);

Clazz.newMethod$ (C$, 'getISOCountries', function () {
if (java.util.Locale.isoCountries == null) {
java.util.Locale.isoCountries =  new Array (Clazz.doubleToInt (",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".length / 6));
for (var i = 0; i < java.util.Locale.isoCountries.length; i++) java.util.Locale.isoCountries[i] = ",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".substring ((i * 6) + 1, (i * 6) + 3);

}var result =  new Array (java.util.Locale.isoCountries.length);
System.arraycopy (java.util.Locale.isoCountries, 0, result, 0, java.util.Locale.isoCountries.length);
return result;
}, 1);

Clazz.newMethod$ (C$, 'getISOLanguages', function () {
if (java.util.Locale.isoLanguages == null) {
java.util.Locale.isoLanguages =  new Array (Clazz.doubleToInt (",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".length / 6));
for (var i = 0; i < java.util.Locale.isoLanguages.length; i++) java.util.Locale.isoLanguages[i] = ",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".substring ((i * 6) + 1, (i * 6) + 3);

}var result =  new Array (java.util.Locale.isoLanguages.length);
System.arraycopy (java.util.Locale.isoLanguages, 0, result, 0, java.util.Locale.isoLanguages.length);
return result;
}, 1);

Clazz.newMethod$ (C$, 'getLanguage', function () {
return this.language;
});

Clazz.newMethod$ (C$, 'getCountry', function () {
return this.country;
});

Clazz.newMethod$ (C$, 'getVariant', function () {
return this.variant;
});

Clazz.newMethod$ (C$, 'toString', function () {
var l = this.language.length != 0;
var c = this.country.length != 0;
var v = this.variant.length != 0;
var result = this.language;
if (c || (l && v)) {
result += '_' + this.country;
}if (v && (l || c)) {
result += '_' + this.variant;
}return result;
});

Clazz.newMethod$ (C$, 'getISO3Language', function () {
var length = this.language.length;
if (length == 0) {
return "";
}var index = ",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".indexOf ("," + this.language);
if (index == -1 || length != 2) {
throw Clazz.$new(java.util.MissingResourceException.construct$S$S$S,["Couldn't find 3-letter language code for " + this.language, "LocaleElements_" + this.toString (), "ShortLanguage"]);
}return ",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul".substring (index + 3, index + 6);
});

Clazz.newMethod$ (C$, 'getISO3Country', function () {
var length = this.country.length;
if (length == 0) {
return "";
}var index = ",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".indexOf ("," + this.country);
if (index == -1 || length != 2) {
throw Clazz.$new(java.util.MissingResourceException.construct$S$S$S,["Couldn't find 3-letter country code for " + this.country, "LocaleElements_" + this.toString (), "ShortCountry"]);
}return ",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE".substring (index + 3, index + 6);
});

Clazz.newMethod$ (C$, 'getDisplayLanguage', function () {
return this.getDisplayLanguage$java_util_Locale (java.util.Locale.getDefault ());
});

Clazz.newMethod$ (C$, 'getDisplayLanguage$java_util_Locale', function (inLocale) {
return inLocale.language;
});

Clazz.newMethod$ (C$, 'getDisplayCountry', function () {
return this.getDisplayCountry$java_util_Locale (java.util.Locale.getDefault ());
});

Clazz.newMethod$ (C$, 'getDisplayCountry$java_util_Locale', function (inLocale) {
return inLocale.country;
});

Clazz.newMethod$ (C$, 'getDisplayVariant', function () {
return this.getDisplayVariant$java_util_Locale (java.util.Locale.getDefault ());
});

Clazz.newMethod$ (C$, 'getDisplayVariant$java_util_Locale', function (inLocale) {
return inLocale.variant;
});

Clazz.newMethod$ (C$, 'getDisplayName', function () {
return this.getDisplayName$java_util_Locale (java.util.Locale.getDefault ());
});

Clazz.newMethod$ (C$, 'getDisplayName$java_util_Locale', function (inLocale) {
var s = inLocale.language + "_" + inLocale.country;
var v = inLocale.variant;
if (v != null && v.length != 0) {
return s + "(" + v + ")";
} else {
return s;
}
});

Clazz.newMethod$ (C$, 'clone', function () {
try {
var that = C$.superClazz.prototype.clone.apply(this, arguments);
return that;
} catch (e) {
if (Clazz.exceptionOf (e, CloneNotSupportedException)) {
throw Clazz.$new(InternalError.construct);
} else {
throw e;
}
}
});

Clazz.newMethod$ (C$, 'hashCode', function () {
if (this.hashcode == -1) {
this.hashcode = this.language.hashCode () ^ this.country.hashCode () ^ this.variant.hashCode ();
}return this.hashcode;
});

Clazz.newMethod$ (C$, 'equals$O', function (obj) {
if (this === obj) return true;
if (!(Clazz.instanceOf (obj, java.util.Locale))) return false;
var other = obj;
if (this.hashCode () != other.hashCode ()) return false;
if (this.language !== other.language) return false;
if (this.country !== other.country) return false;
if (this.variant !== other.variant) return false;
return true;
});

Clazz.newMethod$ (C$, 'convertOldISOCodes$S', function (language) {
language = language.toLowerCase ();
if (language === "he") {
return "iw";
} else if (language === "yi") {
return "ji";
} else if (language === "id") {
return "in";
} else {
return language;
}});

Clazz.newMethod$(C$, 'construct', function () {Clazz.super$(C$, this);
C$.$init$.apply(this);
},true);
C$.ENGLISH = C$.prototype.ENGLISH = Clazz.$new(java.util.Locale.construct$S$S$S,["en", "", ""]);
C$.FRENCH = C$.prototype.FRENCH = Clazz.$new(java.util.Locale.construct$S$S$S,["fr", "", ""]);
C$.GERMAN = C$.prototype.GERMAN = Clazz.$new(java.util.Locale.construct$S$S$S,["de", "", ""]);
C$.ITALIAN = C$.prototype.ITALIAN = Clazz.$new(java.util.Locale.construct$S$S$S,["it", "", ""]);
C$.JAPANESE = C$.prototype.JAPANESE = Clazz.$new(java.util.Locale.construct$S$S$S,["ja", "", ""]);
C$.KOREAN = C$.prototype.KOREAN = Clazz.$new(java.util.Locale.construct$S$S$S,["ko", "", ""]);
C$.CHINESE = C$.prototype.CHINESE = Clazz.$new(java.util.Locale.construct$S$S$S,["zh", "", ""]);
C$.SIMPLIFIED_CHINESE = C$.prototype.SIMPLIFIED_CHINESE = Clazz.$new(java.util.Locale.construct$S$S$S,["zh", "CN", ""]);
C$.TRADITIONAL_CHINESE = C$.prototype.TRADITIONAL_CHINESE = Clazz.$new(java.util.Locale.construct$S$S$S,["zh", "TW", ""]);
C$.FRANCE = C$.prototype.FRANCE = Clazz.$new(java.util.Locale.construct$S$S$S,["fr", "FR", ""]);
C$.GERMANY = C$.prototype.GERMANY = Clazz.$new(java.util.Locale.construct$S$S$S,["de", "DE", ""]);
C$.ITALY = C$.prototype.ITALY = Clazz.$new(java.util.Locale.construct$S$S$S,["it", "IT", ""]);
C$.JAPAN = C$.prototype.JAPAN = Clazz.$new(java.util.Locale.construct$S$S$S,["ja", "JP", ""]);
C$.KOREA = C$.prototype.KOREA = Clazz.$new(java.util.Locale.construct$S$S$S,["ko", "KR", ""]);
C$.CHINA = C$.prototype.CHINA = Clazz.$new(java.util.Locale.construct$S$S$S,["zh", "CN", ""]);
C$.PRC = C$.prototype.PRC = Clazz.$new(java.util.Locale.construct$S$S$S,["zh", "CN", ""]);
C$.TAIWAN = C$.prototype.TAIWAN = Clazz.$new(java.util.Locale.construct$S$S$S,["zh", "TW", ""]);
C$.UK = C$.prototype.UK = Clazz.$new(java.util.Locale.construct$S$S$S,["en", "GB", ""]);
C$.US = C$.prototype.US = Clazz.$new(java.util.Locale.construct$S$S$S,["en", "US", ""]);
C$.CANADA = C$.prototype.CANADA = Clazz.$new(java.util.Locale.construct$S$S$S,["en", "CA", ""]);
C$.CANADA_FRENCH = C$.prototype.CANADA_FRENCH = Clazz.$new(java.util.Locale.construct$S$S$S,["fr", "CA", ""]);
Clazz.defineStatics (C$,
"defaultLocale", null,
"isoLanguages", null,
"compressedIsoLanguages", ",aaaar,ababk,afafr,amamh,arara,asasm,ayaym,azaze,babak,bebel,bgbul,bhbih,bibis,bnben,bobod,brbre,cacat,cocos,csces,cycym,dadan,dedeu,dzdzo,elell,eneng,eoepo,esspa,etest,eueus,fafas,fifin,fjfij,fofao,frfra,fyfry,gagai,gdgdh,glglg,gngrn,guguj,hahau,heheb,hihin,hrhrv,huhun,hyhye,iaina,idind,ieile,ikipk,inind,isisl,itita,iuiku,iwheb,jajpn,jiyid,jwjaw,kakat,kkkaz,klkal,kmkhm,knkan,kokor,kskas,kukur,kykir,lalat,lnlin,lolao,ltlit,lvlav,mgmlg,mimri,mkmkd,mlmal,mnmon,momol,mrmar,msmsa,mtmlt,mymya,nanau,nenep,nlnld,nonor,ococi,omorm,orori,papan,plpol,pspus,ptpor,quque,rmroh,rnrun,roron,rurus,rwkin,sasan,sdsnd,sgsag,shsrp,sisin,skslk,slslv,smsmo,snsna,sosom,sqsqi,srsrp,ssssw,stsot,susun,svswe,swswa,tatam,tetel,tgtgk,ththa,titir,tktuk,tltgl,tntsn,toton,trtur,tstso,tttat,twtwi,uguig,ukukr,ururd,uzuzb,vivie,vovol,wowol,xhxho,yiyid,yoyor,zazha,zhzho,zuzul",
"isoCountries", null,
"compressedIsoCountries", ",ADAND,AEARE,AFAFG,AGATG,AIAIA,ALALB,AMARM,ANANT,AOAGO,AQATA,ARARG,ASASM,ATAUT,AUAUS,AWABW,AZAZE,BABIH,BBBRB,BDBGD,BEBEL,BFBFA,BGBGR,BHBHR,BIBDI,BJBEN,BMBMU,BNBRN,BOBOL,BRBRA,BSBHS,BTBTN,BVBVT,BWBWA,BYBLR,BZBLZ,CACAN,CCCCK,CFCAF,CGCOG,CHCHE,CICIV,CKCOK,CLCHL,CMCMR,CNCHN,COCOL,CRCRI,CUCUB,CVCPV,CXCXR,CYCYP,CZCZE,DEDEU,DJDJI,DKDNK,DMDMA,DODOM,DZDZA,ECECU,EEEST,EGEGY,EHESH,ERERI,ESESP,ETETH,FIFIN,FJFJI,FKFLK,FMFSM,FOFRO,FRFRA,FXFXX,GAGAB,GBGBR,GDGRD,GEGEO,GFGUF,GHGHA,GIGIB,GLGRL,GMGMB,GNGIN,GPGLP,GQGNQ,GRGRC,GSSGS,GTGTM,GUGUM,GWGNB,GYGUY,HKHKG,HMHMD,HNHND,HRHRV,HTHTI,HUHUN,IDIDN,IEIRL,ILISR,ININD,IOIOT,IQIRQ,IRIRN,ISISL,ITITA,JMJAM,JOJOR,JPJPN,KEKEN,KGKGZ,KHKHM,KIKIR,KMCOM,KNKNA,KPPRK,KRKOR,KWKWT,KYCYM,KZKAZ,LALAO,LBLBN,LCLCA,LILIE,LKLKA,LRLBR,LSLSO,LTLTU,LULUX,LVLVA,LYLBY,MAMAR,MCMCO,MDMDA,MGMDG,MHMHL,MKMKD,MLMLI,MMMMR,MNMNG,MOMAC,MPMNP,MQMTQ,MRMRT,MSMSR,MTMLT,MUMUS,MVMDV,MWMWI,MXMEX,MYMYS,MZMOZ,NANAM,NCNCL,NENER,NFNFK,NGNGA,NINIC,NLNLD,NONOR,NPNPL,NRNRU,NUNIU,NZNZL,OMOMN,PAPAN,PEPER,PFPYF,PGPNG,PHPHL,PKPAK,PLPOL,PMSPM,PNPCN,PRPRI,PTPRT,PWPLW,PYPRY,QAQAT,REREU,ROROM,RURUS,RWRWA,SASAU,SBSLB,SCSYC,SDSDN,SESWE,SGSGP,SHSHN,SISVN,SJSJM,SKSVK,SLSLE,SMSMR,SNSEN,SOSOM,SRSUR,STSTP,SVSLV,SYSYR,SZSWZ,TCTCA,TDTCD,TFATF,TGTGO,THTHA,TJTJK,TKTKL,TMTKM,TNTUN,TOTON,TPTMP,TRTUR,TTTTO,TVTUV,TWTWN,TZTZA,UAUKR,UGUGA,UMUMI,USUSA,UYURY,UZUZB,VAVAT,VCVCT,VEVEN,VGVGB,VIVIR,VNVNM,VUVUT,WFWLF,WSWSM,YEYEM,YTMYT,YUYUG,ZAZAF,ZMZMB,ZRZAR,ZWZWE");
})()
});

//Created 2017-08-08 06:13:48
