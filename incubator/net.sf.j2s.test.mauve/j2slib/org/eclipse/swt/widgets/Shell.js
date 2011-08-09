$_L(["$wt.widgets.Decorations"],"$wt.widgets.Shell",["$wt.graphics.Point","$wt.widgets.Display","$.TypedListener"],function(){
$WTC$$.registerCSS ("$wt.widgets.Shell", ".system-default {\nfont-family:Tahoma, Arial, sans-serif;\nfont-size:8pt;\n}\n.shell-handle {\nposition:absolute;\nborder:1px outset windowframe;\nbackground-color:buttonface;\nz-index:10;\n}\n.shell-opacity {\nwidth:100%;\nmargin:0;\nopacity:0.35;\nfilter:Alpha (opacity=35);\n}\n.shell-default {\nposition:absolute;\n/*top:0;\nleft:0;*/\nbackground-color:buttonface;\n/*overflow:hidden;*/\nfont-size:0;\ntext-align:left;\ncolor:black;\n}\n.shell-trim {\nborder:1px solid windowframe;\n}\n@media all and (-webkit-min-device-pixel-ratio:0) {\n.shell-trim {\nborder:1px solid gray;\n}\n}\n.shell-content {\nposition:absolute;\nleft:0;\ntop:23px;\noverflow:hidden;\nbackground-color:buttonface;\n/*background-color:navy;*/\nz-index:3;\n}\n.shell-tool {\nmargin:0 !important;\n}\n.shell-menu-bar .shell-content {\ntop:44px;\n}\n.shell-left-top, .shell-right-top, .shell-left-bottom, .shell-right-bottom {\nposition:absolute;\nwidth:20px;\nheight:20px;\n/*background-color:#aaaaff;*/\nz-index:1;\n}\n.shell-left-top {\nleft:0;\ntop:0;\ncursor:nw-resize;\n}\n.shell-right-top {\nright:0;\ntop:0;\ncursor:ne-resize;\n}\n.shell-left-bottom {\nleft:0;\nbottom:0;\ncursor:sw-resize;\n}\n.shell-right-bottom {\nright:0;\nbottom:0;\ncursor:se-resize;\n}\n.shell-center-top, .shell-left-middle, .shell-right-middle, .shell-center-bottom {\nposition:absolute;\nz-index:0;\n}\n.shell-center-top {\ncursor:n-resize;\nwidth:100%;\nheight:20px;\nleft:0;\ntop:0;\n}\n.shell-left-middle {\ncursor:w-resize;\nleft:0;\ntop:0;\nwidth:20px;\nheight:100%;\n}\n.shell-right-middle {\ncursor:e-resize;\nright:0;\ntop:0;\nwidth:20px;\nheight:100%;\n}\n.shell-center-bottom {\ncursor:s-resize;\nwidth:100%;\nheight:20px;\nleft:0;\nbottom:0;\n}\n/* Begin of Shell Shadow */\n.shadow-left-top, .shadow-right-top, .shadow-left-bottom, .shadow-right-bottom {\nposition:absolute;\nwidth:16px;\nheight:16px;\nz-index:1;\n}\n.shadow-left-top {\nleft:-16px;\ntop:-16px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABJ0lEQVR4nGNIS0tjIAEzomNyNDIhYWZSNIM1QDELELOCMCkaYZrYgJgdiDmAmJNYzaxImriAmAeIeUGYWM0wjSBN/EAsCMRCQCxMrGZuqEaQJlEgFgdiSSCWwmYALs0iQCwBxDJALA/EikCsTIpmSahGFSDWAGJtINZFdzo+zQpArA7SBMRGQGwGxBbotoOiChTaXFg0qwGxPhCbA7EdELsAsRsu20GhDQowkJ/loTbDNDsBsQ8QBwNxOLrf2ZBsB4U2KMBAftZF0uwLxNFpEJCNzfmgRAKKZ1BUgWwHBRjIzyBn+0A1ZwFxNRC3IBuA7nyQ30FRBQptUICB/BwMsRiseTIQL4cZAPM/J9QAYSCWAmLlNIjzLYDYDYjDgTgbiFtAmoH4PwDG70g8WccLqwAAAABJRU5ErkJggg==);\nbackground-position: right bottom;\nbackground-repeat: no-repeat;\n}\n.shadow-right-top {\nright:-16px;\ntop:-16px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQklEQVR4nGNIS0tjxIIZiMUgghmImZAwSQaBCFYoZoEaxoxmEEEDOIGYA4jZgZgNzTCCBoEIXijmAWIuJMNYiTEERAgDsRAQCwIxP9QwmEEEDQERUkAsCcTiQCwKNQxkEDcxhoAIZSBWBGJ5IJYBYgkgFiFgCIoBukCsDcQaQKwCNUiSWENAhAUQmwGxEdQwdSBWIGAI3CsgA9yA2AWI7YDYHIj1gVgNiyGggAXFDiiKmZANCAfiYCD2AWInJENALgF5BxQmoIAFxQ6GK0AGZKdBQDQQ+yIZAvIOKExAAQuKHZgr2NKQwgJkQAsQVwNxFtQQkEtA3gGFCShgQa4ARTEonYASG4o3QAYsB+LJUENAAOQdUJiAAhYUO6AoBoUFujfgBvyHGgJyCcg7oDABBSwodkDeAKUTUGIThhrAmYYUDgCc5Eg8bh4+UgAAAABJRU5ErkJggg==);\nbackground-position: left bottom;\nbackground-repeat: no-repeat;\n}\n.shadow-left-bottom {\nleft:-16px;\nbottom:-16px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABQklEQVR4nGNIS0tjBGJmIGYFYk4g5gViYSCWAmJlINYFYgsgdgPicCDOBuIWIF4OxP8ZoAYwQQ3ggBogBMSSQKwIxNpAbAbELkAcnAYB1UA8GWQIsgEsQMwOxDxALAjE4kAsD8QaQGwExHZA7APE0UCcBTWkBdkAkDfYgJgLiPmBWBSIZYBYJQ3iDXMgdgJiX6ghIJANMwA5HJC9IZEGcYU6EOsjGQJyCcg74SADsHkD5gqRNEhYKACxGpIhIO+AwsQN2QB0V3BjMQTkEpB3QGECClgLmAHoYYHLEJB3QGECClhQ7OgiG0CMIaAwkYEaBIpiZWwG4DMEFLCg2AFFMchFUugG4DMEFLC8UIMEoYYJYzMAlyHsSAbxQA3jxWUANkNYoAaxIRnGic8AXAYhG8ZKjAHIhsAMgmFmYg3AZhAYAwDbk0g892abRgAAAABJRU5ErkJggg==);\nbackground-position: right top;\nbackground-repeat: no-repeat;\n}\n.shadow-right-bottom {\nright:-16px;\nbottom:-16px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAABP0lEQVR4nGNIS0v7D8TLgbgFiLOBOByI3YDYAoh1gVgZiKWAWBiIeYGYE4hZgZgZiBkZoJonA3F1GgQEA7ELEJsBsTYQKwKxJBALQQ3ggBrABDOgBao5C4ijgdgHiO2A2AiINYBYHojFgVgQiHmAmB2IWZANyIZYDNbsC8ROQGyeBnG+ChDLALEoEPMDMRcQs6VBnA83AORnkLN9kDTrA7F6GsR2iTRM54P9DzMAFGAgP9shaVYDYoU0iN9FkGxHcT4QM4AMAIU2KMBAftaF2oyumRub7TADQJpAoQ0KMJCf5QlohtsOMwAUz4pQjaAAkyBWM8wAKaiNoKgChbYQAc0YBghDNQlCNYJCm4sYzTADeKGYB0kjOzGaYQZwImlig2pkIUYzzABWNE1EaUQ2AKaBCU0jQc0wAxixYAZiMQCxiEg8NJ6W6QAAAABJRU5ErkJggg==);\nbackground-position: left top;\nbackground-repeat: no-repeat;\n}\n.shadow-center-top, .shadow-left-middle, .shadow-right-middle, .shadow-center-bottom {\nposition:absolute;\nz-index:0;\n}\n.shadow-center-top {\nwidth:100%;\nheight:16px;\nleft:0;\ntop:-16px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVR4nGNIS0tjpAQzAAlmSjDIAFZKMMgATkowyABeSjDIAGFKMMgAKUowyABlSjDIAF1KMMgAC0owyAA3SjDIgHBKMMiAbEowyIAWSjDIgOWUYJAB/ynBAI8ocnCpqVcAAAAAAElFTkSuQmCC);\nbackground-position: center bottom;\nbackground-repeat: repeat-x;\n}\n.shadow-left-middle {\nleft:-16px;\ntop:0;\nwidth:16px;\nheight:100%;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPUlEQVR4nGNIS0tjBGJmIGYFYk4g5gViYSCWAmJlINYFYgsgdgPicCDOBuIWIF4OxP8ZRg0YNWDUgOFiAABKlHJwZMWFzQAAAABJRU5ErkJggg==);\nbackground-position: right center;\nbackground-repeat: repeat-y;\n}\n.shadow-right-middle {\nright:-16px;\ntop:0;\nwidth:16px;\nheight:100%;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAPUlEQVR4nGNIS0v7D8TLgbgFiLOBOByI3YDYAoh1gVgZiKWAWBiIeYGYE4hZgZgZiBkZRg0YNWDUgOFiAAAsm3JwP/LaYAAAAABJRU5ErkJggg==);\nbackground-position: left center;\nbackground-repeat: repeat-y;\n}\n.shadow-center-bottom {\nwidth:100%;\nheight:16px;\nleft:0;\nbottom:-16px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQCAYAAAAf8/9hAAAAWklEQVR4nGNIS0v7TwlmABLLKcEgA1oowSADsinBIAPCKcEgA9wowSADLCjBIAN0KcEgA5QpwSADpCjBIAOEKcEgA3gpwSADOCnBIANYKcEgA5gpwSADGCnBAOf4cnBQxNJJAAAAAElFTkSuQmCC);\nbackground-position: center top;\nbackground-repeat: repeat-x;\n}\n/* Narrow Shadow */\n.shadow-narrow-left-top, .shadow-narrow-right-top, .shadow-narrow-left-bottom, .shadow-narrow-right-bottom {\nposition:absolute;\nwidth:8px;\nheight:8px;\nz-index:1;\n}\n.shadow-narrow-left-top {\nleft:-8px;\ntop:-8px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAbklEQVR4nGNIS0tjQMOMUMwExMzYJJmBmBWI2YGYE5skBxDzArEgEAtjk+QHYgkglgdiZWySkkCsDsRGQGwBU8AKNVYCKmkOxD5AHA5SAHItO9ROeahOkGQWELcwQI3nBGJhkJ0gY0E6QZJA/B8AF+NTPbwPJkgAAAAASUVORK5CYII=);\nbackground-position: right bottom;\nbackground-repeat: no-repeat;\n}\n.shadow-narrow-right-top {\nright:-8px;\ntop:-8px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAdElEQVR4nGNIS0tjBmImIGaEYgZkDCI4gZgdiFmhihnRFQgDsSAQ8wIxB7oiEKEMxPJALAHE/OiKQAosgNgIiNWBWBJdEUhBOBD7ALE5VJEE1DpWmIIWIM6CKjKCWgdyE8jhTCAF/6GKwqHWgdwEcjjId8wAg7NTPd3RZ9EAAAAASUVORK5CYII=);\nbackground-position: left bottom;\nbackground-repeat: no-repeat;\n}\n.shadow-narrow-left-bottom {\nleft:-8px;\nbottom:-8px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAeUlEQVR4nGNIS0tjBmJOIBYGYmUgtgDicCBuAeL/DECCCYjZgVgQiOWB2AiIfYA4C6QIpIARiFmBmBeIJYBYHYjNoYrCYQpA1nAAMT8QS0IVgUyyACnApkgCap0yTAG6IpB1IDcJIytAVgRyE8jhnOgKYIpAGOQ7ZgCRhFM9sL641gAAAABJRU5ErkJggg==);\nbackground-position: right top;\nbackground-repeat: no-repeat;\n}\n.shadow-narrow-right-bottom {\nright:-8px;\nbottom:-8px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAeElEQVR4nGNIS0v7D8QtQBwOxBZArAzEwkDMCcTMDFDJLCD2AWIjIJYHYkEgZgdiJgaoTpCkORCrA7EEEPMCMSsQMzJAjTWCSkoCMT8Qc4CMhylQhhorgS4JxAwgBcJQO3nRJWEKQK5lh9qJIglTABJkgkqgSIIwAP1UUz3HZnxGAAAAAElFTkSuQmCC);\nbackground-position: left top;\nbackground-repeat: no-repeat;\n}\n.shadow-narrow-center-top, .shadow-narrow-left-middle, .shadow-narrow-right-middle, .shadow-narrow-center-bottom {\nposition:absolute;\nz-index:0;\n}\n.shadow-narrow-center-top {\nwidth:100%;\nheight:8px;\nleft:0;\ntop:-8px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMElEQVR4nGNIS0tjxocZgAQnPgxSIIwPgxQo48MgBRb4MEhBOD4MUtCCD4MU/MeHAdutXyH7Sod3AAAAAElFTkSuQmCC);\nbackground-position: center bottom;\nbackground-repeat: repeat-x;\n}\n.shadow-narrow-left-middle {\nleft:-8px;\ntop:0;\nwidth:8px;\nheight:100%;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIklEQVR4nGNIS0tjBmJOIBYGYmUgtgDicCBuAeL/DCNDAQB36F8h0d4gQQAAAABJRU5ErkJggg==);\nbackground-position: right center;\nbackground-repeat: repeat-y;\n}\n.shadow-narrow-right-middle {\nright:-8px;\ntop:0;\nwidth:8px;\nheight:100%;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAIklEQVR4nGNIS0v7D8QtQBwOxBZArAzEwkDMCcTMDCNDAQC9d18hhcSz6gAAAABJRU5ErkJggg==);\nbackground-position: left center;\nbackground-repeat: repeat-y;\n}\n.shadow-narrow-center-bottom {\nwidth:100%;\nheight:8px;\nleft:0;\nbottom:-8px;\nbackground-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAYAAADED76LAAAAMElEQVR4nGNIS0v7jw8zAIkWfBikIBwfBimwwIdBCpTxYZACYXwYpIATHwYpYMaHAVmyXyH2NbXoAAAAAElFTkSuQmCC);\nbackground-position: center top;\nbackground-repeat: repeat-x;\n}\n/* End of Shell Shadow */\n.shell-title-bar {\nposition:absolute;\nleft:0;\ntop:0;\nmargin:3px;\nmargin-bottom:0;\nheight:20px;\noverflow:hidden;\nbackground-color:activecaption;\nz-index:2;\nfont-size:10pt;\nheight:1.5em;\nmin-height:20px;\n_height:1.6em;\n}\n.shell-title-text {\nposition:absolute;\ncursor:default;\nwhite-space:nowrap;\n/*background-color:#6677ee;*/\ncolor:captiontext;\nfont-family:Arial, sans-serif;\nfont-weight:bold;\nfont-size:10pt;\nmargin-top:2px;\nheight:18px;\noverflow:hidden;\nz-index:0;\nheight:1.5em;\nmin-height:18px;\n}\n.shell-title-icon {\nposition:absolute;\ntop:0;\nbackground-position:center center;\nbackground-repeat:no-repeat;\nwidth:18px;\nheight:20px;\noverflow:hidden;\nz-index:1;\ntop:50%;\nmargin-top:-10px;\n}\n* html .shell-title-icon {\nmargin-top:-8px;\n}\n.shell-title-min, .shell-title-normal-max, .shell-title-close {\nposition:absolute;\ntop:1px;\nbackground-repeat:no-repeat;\nmargin:1px;\npadding:0;\nwidth:14px;\nheight:14px;\noverflow:hidden;\nz-index:1;\nbackground-color:white;\nborder:1px solid white;\ntop:50%;\nmargin-top:-8px;\nopacity:0.65;\nfilter:Alpha(Opacity=65);\n}\n.shell-title-min:hover, .shell-title-normal-max:hover, .shell-title-close:hover {\nopacity:1;\nfilter:Alpha(Opacity=100);\n}\n.alaa-icon {\nbackground-image:url(\'images/packed.gif\');\nbackground-repeat:no-repeat;\nbackground-position:-16px -15px;\nbackground-color:transparent !important;\n}\n.shell-title-icon {\nbackground-image:url(\'images/packed.gif\');\nbackground-position:-16px -15px;\n}\n.shell-title-icon-console {\nwidth:16px !important;\nheight:16px !important;\nmargin-top:-8px;\nbackground-position:0px -32px !important;\n}\n.shell-title-min {\nbackground-image:url(\'images/packed.gif\');\nbackground-position:0px -17px;\n}\n.shell-title-normal-max {\nbackground-image:url(\'images/packed.gif\');\nbackground-position:-17px 0px;\n}\n.shell-maximized .shell-title-normal-max {\nbackground-image:url(\'images/packed.gif\');\nbackground-position:-34px 0px;\n}\n.shell-title-close {\nbackground-image:url(\'images/packed.gif\');\nbackground-position:0px 0px;\n}\n.shell-modal-block {\nbackground-color:gray;\nopacity:0.25;\nfilter:Alpha(Opacity=25);\nposition:absolute;\nleft:0;\ntop:0;\nwidth:100%;\nheight:100%;\n}\n.over-iframe-layer {\nbackground-color:white;\nopacity:0.01;\nfilter:Alpha(Opacity=1);\nposition:absolute;\nleft:0;\ntop:0;\nwidth:100%;\nheight:100%;\n}\n.swt-widgets-shell {\nwidth:324px;\n}\n@media all and (min-width:0px){/* opera */\n.shell-modal-block {\nbackground-color:transparent;\nbackground-image:url(\'images/alpha.png\');\n}\n.over-iframe-layer {\nbackground-color:transparent;\nbackground-image:url(\'images/alpha.png\');\n}\n}\n");

$WTC$$.registerCSS ("$wt.widgets.Shell.IE", "/* IE 7.0 + */\n*:first-child+html .shadow-left-top {\nbackground-image: url(\'images/top-left.png\');\n}\n*:first-child+html .shadow-right-top {\nbackground-image: url(\'images/top-right.png\');\n}\n*:first-child+html .shadow-left-bottom {\nbackground-image: url(\'images/bottom-left.png\');\n}\n*:first-child+html .shadow-right-bottom {\nbackground-image: url(\'images/bottom-right.png\');\n}\n*:first-child+html .shadow-center-top {\nbackground-image: url(\'images/top.png\');\n}\n*:first-child+html .shadow-left-middle {\nbackground-image: url(\'images/left.png\');\n}\n*:first-child+html .shadow-center-bottom {\nbackground-image: url(\'images/bottom.png\');\n}\n*:first-child+html .shadow-right-middle {\nbackground-image: url(\'images/right.png\');\n}\n/* IE 6.0 - */\n* html .shadow-left-top,\n* html .shadow-right-top,\n* html .shadow-left-bottom,\n* html .shadow-right-bottom,\n* html .shadow-center-top,\n* html .shadow-left-middle,\n* html .shadow-right-middle,\n* html .shadow-center-bottom {\nbackground-image: none;\n}\n* html .shadow-left-top {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/top-left.png\', sizingMethod=\'scale\');\n}\n* html .shadow-right-top {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/top-right.png\', sizingMethod=\'scale\');\n}\n* html .shadow-left-bottom {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/bottom-left.png\', sizingMethod=\'scale\');\n}\n* html .shadow-right-bottom {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/bottom-right.png\', sizingMethod=\'scale\');\n}\n* html .shadow-center-top {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/top.png\', sizingMethod=\'scale\');\n}\n* html .shadow-left-middle {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/left.png\', sizingMethod=\'scale\');\n}\n* html .shadow-right-middle {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/right.png\', sizingMethod=\'scale\');\n}\n* html .shadow-center-bottom {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/bottom.png\', sizingMethod=\'scale\');\n}\n/* IE 7.0 + */\n*:first-child+html .shadow-narrow-left-top {\nbackground-image: url(\'images/narrow-top-left.png\');\n}\n*:first-child+html .shadow-narrow-right-top {\nbackground-image: url(\'images/narrow-top-right.png\');\n}\n*:first-child+html .shadow-narrow-left-bottom {\nbackground-image: url(\'images/narrow-bottom-left.png\');\n}\n*:first-child+html .shadow-narrow-right-bottom {\nbackground-image: url(\'images/narrow-bottom-right.png\');\n}\n*:first-child+html .shadow-narrow-center-top {\nbackground-image: url(\'images/narrow-top.png\');\n}\n*:first-child+html .shadow-narrow-left-middle {\nbackground-image: url(\'images/narrow-left.png\');\n}\n*:first-child+html .shadow-narrow-center-bottom {\nbackground-image: url(\'images/narrow-bottom.png\');\n}\n*:first-child+html .shadow-narrow-right-middle {\nbackground-image: url(\'images/narrow-right.png\');\n}\n/* IE 6.0 - */\n* html .shadow-narrow-left-top,\n* html .shadow-narrow-right-top,\n* html .shadow-narrow-left-bottom,\n* html .shadow-narrow-right-bottom,\n* html .shadow-narrow-center-top,\n* html .shadow-narrow-left-middle,\n* html .shadow-narrow-right-middle,\n* html .shadow-narrow-center-bottom {\nbackground-image: none;\n}\n* html .shadow-narrow-left-top {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-top-left.png\', sizingMethod=\'scale\');\n}\n* html .shadow-narrow-right-top {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-top-right.png\', sizingMethod=\'scale\');\n}\n* html .shadow-narrow-left-bottom {s\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-bottom-left.png\', sizingMethod=\'scale\');\n}\n* html .shadow-narrow-right-bottom {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-bottom-right.png\', sizingMethod=\'scale\');\n}\n* html .shadow-narrow-center-top {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-top.png\', sizingMethod=\'scale\');\n}\n* html .shadow-narrow-left-middle {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-left.png\', sizingMethod=\'scale\');\n}\n* html .shadow-narrow-right-middle {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-right.png\', sizingMethod=\'scale\');\n}\n* html .shadow-narrow-center-bottom {\nfilter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'images/narrow-bottom.png\', sizingMethod=\'scale\');\n}\n* html .shell-title-min, * html .shell-title-normal-max, * html .shell-title-close {\nmargin-bottom:0;\nfilter:Alpha(Opacity=80);\n}\n.swt-widgets-shell-ie {\nwidth:324px;\n}\n");
 c$ = $_C (function () {
this.activeMenu = null;
this.minWidth = -1;
this.minHeight = -1;
this.lastActive = null;
this.region = null;
$_Z (this, arguments);
}, $wt.widgets, "Shell", $wt.widgets.Decorations);
$_K (c$, 
function () {
this.construct (null, null, 1264, 0);
});
$_K (c$, 
function (style) {
this.construct (null, null, style, 0);
}, "~N");
$_K(c$,
function(display){
this.construct(display,null,1264,0);
},"$wt.widgets.Display");
$_K(c$,
function(display,style){
this.construct(display,null,style,0);
},"$wt.widgets.Display,~N");
$_K(c$,
function(display,parent,style,handle){
this.children=new Array(0);
if(display==null)display=$wt.widgets.Display.getCurrent();
if(display==null)display=$wt.widgets.Display.getDefault();
this.style=$wt.widgets.Shell.checkStyle(style);
this.parent=parent;
this.display=display;
this.createWidget();
},"$wt.widgets.Display,$wt.widgets.Shell,~N,~N");
$_K(c$,
function(parent){
this.construct(parent!=null?parent.display:null,parent,2144,0);
},"$wt.widgets.Shell");
$_K(c$,
function(parent,style){
this.construct(parent!=null?parent.display:null,parent,style,0);
},"$wt.widgets.Shell,~N");
c$.win32_new=$_M(c$,"win32_new",
function(display,handle){
return new $wt.widgets.Shell(display,null,8,handle);
},"$wt.widgets.Display,~N");
c$.checkStyle=$_M(c$,"checkStyle",
function(style){
style=$wt.widgets.Decorations.checkStyle(style);
var mask=229376;
var bits=style&~mask;
if((style&131072)!=0)return bits|131072;
if((style&65536)!=0)return bits|65536;
if((style&32768)!=0)return bits|32768;
return bits;
},"~N");
$_M(c$,"computeSize",
function(wHint,hHint,changed){
var size=$_U(this,$wt.widgets.Shell,"computeSize",[wHint,hHint,changed]);
if(size.x<this.minWidth){
size.x=this.minWidth;
}if(size.y<this.minHeight){
size.y=this.minHeight;
}return size;
},"~N,~N,~B");
$_M(c$,"addShellListener",
function(listener){
var typedListener=new $wt.widgets.TypedListener(listener);
this.addListener(21,typedListener);
this.addListener(19,typedListener);
this.addListener(20,typedListener);
this.addListener(26,typedListener);
this.addListener(27,typedListener);
},"$wt.events.ShellListener");
$_M(c$,"close",
function(){
if(this.parent==null&&(this.getStyle()&4)==0&&this.display.taskBar!=null){
var taskBar=this.display.taskBar;
taskBar.removeShellItem(this);
taskBar.handleApproaching();
taskBar.updateLayout();
taskBar.setMinimized(false);
taskBar.updateLastModified();
}var nextShell=null;
if($_O(this.parent,$wt.widgets.Shell)){
nextShell=this.parent;
if(!nextShell.isVisible()){
nextShell=null;
}}this.closeWidget();
if(nextShell==null||nextShell.isDisposed()){
nextShell=$wt.widgets.Display.getTopShell();
}if(nextShell!=null&&!nextShell.isDisposed()){
nextShell.bringToTop();
nextShell.forceFocus();
}else{
if(window["document.title"]!=null){
document.title=window["document.title"];
}
}});
$_V(c$,"enableWidget",
function(enabled){
if(enabled){
this.state&=-9;
}else{
this.state|=8;
}},"~B");
$_V(c$,"findCursor",
function(){
return this.cursor;
});
$_V(c$,"findThemeControl",
function(){
return null;
});
$_M(c$,"fixShell",
function(newShell,control){
if(this===newShell)return;
if(control===this.lastActive)this.setActiveControl(null);
newShell.setToolTipText(control.handle,control.toolTipText);
},"$wt.widgets.Shell,$wt.widgets.Control");
$_M(c$,"forceActive",
function(){
if(!this.isVisible())return;
this.bringToTop();
});
$_V(c$,"forceResize",
function(){
});
$_M(c$,"getBounds",
function(){
return $_U(this,$wt.widgets.Shell,"getBounds",[]);
});
$_V(c$,"getEnabled",
function(){
return(this.state&8)==0;
});
$_M(c$,"getImeInputMode",
function(){
return 0;
});
$_M(c$,"getLocation",
function(){
return $_U(this,$wt.widgets.Shell,"getLocation",[]);
});
$_M(c$,"getMinimumSize",
function(){
var width=Math.max(0,this.minWidth);
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
width=Math.max(width,80);
}var height=Math.max(0,this.minHeight);
if((this.style&8)==0&&(this.style&trim)!=0){
if((this.style&16)!=0){
height=Math.max(height,24);
}else{
height=Math.max(height,24);
}}if((this.style&8)!=0){
return new $wt.graphics.Point(this.minWidth,Math.max(this.minHeight-24,0));
}return new $wt.graphics.Point(width,height);
});
$_M(c$,"getRegion",
function(){
return this.region;
});
$_V(c$,"getShell",
function(){
return this;
});
$_M(c$,"getSize",
function(){
return $_U(this,$wt.widgets.Shell,"getSize",[]);
});
$_M(c$,"getShells",
function(){
var count=0;
var shells=this.display.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!==this);
if(shell===this)count++;
}
var index=0;
var result=new Array(count);
for(var i=0;i<shells.length;i++){
var shell=shells[i];
do{
shell=shell.parent;
}while(shell!=null&&shell!==this);
if(shell===this){
result[index++]=shells[i];
}}
return result;
});
$_V(c$,"isLayoutDeferred",
function(){
return this.layoutCount>0;
});
$_V(c$,"isEnabled",
function(){
return this.getEnabled();
});
$_V(c$,"isVisible",
function(){
return this.getVisible();
});
$_M(c$,"open",
function(){
this.nextWindowLocation(this.width,this.height);
this.bringToTop();
if(this.isDisposed())return;
this.setVisible(true);
if(this.isDisposed())return;
this.layout();
if(this.parent==null&&(this.getStyle()&4)==0&&this.display.taskBar!=null){
var taskBar=this.display.taskBar;
taskBar.createShellItem(this);
taskBar.handleApproaching();
w$.setTimeout($_Q((($_D("$wt.widgets.Shell$1")?0:org.eclipse.swt.widgets.Shell.$Shell$1$()),$_N($wt.widgets.Shell$1,this,null))),50);
taskBar.setMinimized(false);
taskBar.updateLastModified();
}});
$_V(c$,"releaseChild",
function(){
});
$_M(c$,"releaseShells",
function(){
var shells=this.getShells();
for(var i=0;i<shells.length;i++){
var shell=shells[i];
if(!shell.isDisposed())shell.releaseResources();
}
});
$_M(c$,"releaseWidget",
function(){
this.releaseShells();
$_U(this,$wt.widgets.Shell,"releaseWidget",[]);
this.activeMenu=null;
this.display.clearModal(this);
this.lastActive=null;
this.region=null;
});
$_M(c$,"removeMenu",
function(menu){
$_U(this,$wt.widgets.Shell,"removeMenu",[menu]);
if(menu===this.activeMenu)this.activeMenu=null;
},"$wt.widgets.Menu");
$_M(c$,"removeShellListener",
function(listener){
if(this.eventTable==null)return;
this.eventTable.unhook(21,listener);
this.eventTable.unhook(19,listener);
this.eventTable.unhook(20,listener);
this.eventTable.unhook(26,listener);
this.eventTable.unhook(27,listener);
},"$wt.events.ShellListener");
$_M(c$,"setActive",
function(){
if(!this.isVisible())return;
this.bringToTop();
});
$_M(c$,"setActiveControl",
function(control){
if(control!=null&&control.isDisposed())control=null;
if(this.lastActive!=null&&this.lastActive.isDisposed())this.lastActive=null;
if(this.lastActive===control)return;
var activate=(control==null)?new Array(0):control.getPath();
var deactivate=(this.lastActive==null)?new Array(0):this.lastActive.getPath();
this.lastActive=control;
var index=0;
var length=Math.min(activate.length,deactivate.length);
while(index<length){
if(activate[index]!==deactivate[index])break;
index++;
}
for(var i=deactivate.length-1;i>=index;--i){
if(!deactivate[i].isDisposed()){
deactivate[i].sendEvent(27);
}}
for(var i=activate.length-1;i>=index;--i){
if(!activate[i].isDisposed()){
activate[i].sendEvent(26);
}}
},"$wt.widgets.Control");
$_M(c$,"setBounds",
function(x,y,width,height,flags,defer){
$_U(this,$wt.widgets.Shell,"setBounds",[x,y,width,height,flags,false]);
},"~N,~N,~N,~N,~N,~B");
$_M(c$,"setEnabled",
function(enabled){
if(((this.state&8)==0)==enabled)return;
$_U(this,$wt.widgets.Shell,"setEnabled",[enabled]);
},"~B");
$_M(c$,"setImeInputMode",
function(mode){
},"~N");
$_M(c$,"setMinimumSize",
function(width,height){
var widthLimit=0;
var heightLimit=0;
var trim=1248;
if((this.style&8)==0&&(this.style&trim)!=0){
}this.minWidth=Math.max(widthLimit,width);
this.minHeight=Math.max(heightLimit,height);
var size=this.getSize();
var newWidth=Math.max(size.x,this.minWidth);
var newHeight=Math.max(size.y,this.minHeight);
if(this.minWidth<=widthLimit)this.minWidth=-1;
if(this.minHeight<=heightLimit)this.minHeight=-1;
if(newWidth!=size.x||newHeight!=size.y)this.setSize(newWidth,newHeight);
},"~N,~N");
$_M(c$,"setMinimumSize",
function(size){
this.setMinimumSize(size.x,size.y);
},"$wt.graphics.Point");
$_M(c$,"setItemEnabled",
function(cmd,enabled){
},"~N,~B");
$_M(c$,"setParent",
function(){
});
$_M(c$,"setRegion",
function(region){
if((this.style&8)==0)return;
},"$wt.graphics.Region");
$_M(c$,"setToolTipText",
function(hwnd,text){
},"~O,~S");
$_M(c$,"setVisible",
function(visible){
if(this.parent==null&&(this.getStyle()&4)==0&&this.display.taskBar!=null){
var taskBar=this.display.taskBar;
if(!visible){
taskBar.removeShellItem(this);
}else{
taskBar.createShellItem(this);
}taskBar.handleApproaching();
w$.setTimeout($_Q((($_D("$wt.widgets.Shell$2")?0:org.eclipse.swt.widgets.Shell.$Shell$2$()),$_N($wt.widgets.Shell$2,this,null))),50);
if(visible!=this.isVisible()){
taskBar.setMinimized(false);
taskBar.updateLastModified();
taskBar.updateLayout();
}}if(this.drawCount!=0){
if(((this.state&16)==0)==visible)return;
}else{
if(visible==(this.handle.style.visibility!=="hidden"))return;
}var mask=229376;
if((this.style&mask)!=0){
if(visible){
this.display.setModalShell(this);
var control=this;
if(control!=null&&!control.j2sIsActive()){
this.bringToTop();
if(this.isDisposed())return;
}}else{
this.display.clearModal(this);
}}else{
this.updateModal();
}$_U(this,$wt.widgets.Shell,"setVisible",[visible]);
if(this.isDisposed())return;
if(visible){
this.SetWindowPos(this.handle,null,this.left,this.top,this.width,this.height,0);
}else{
var topShell=$wt.widgets.Display.getTopShell();
if(topShell!=null){
topShell.bringToTop();
}else{
if(window["document.title"]!=null){
document.title=window["document.title"];
}
}}},"~B");
$_V(c$,"traverseEscape",
function(){
if(this.parent==null)return false;
if(!this.isVisible()||!this.isEnabled())return false;
this.close();
return true;
});
$_M(c$,"updateModal",
function(){
});
c$.$Shell$1$=function(){
$_H();
c$=$_W($wt.widgets,"Shell$1",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Shell"].display.taskBar.updateLayout();
});
c$=$_P();
};
c$.$Shell$2$=function(){
$_H();
c$=$_W($wt.widgets,"Shell$2",null,Runnable);
$_V(c$,"run",
function(){
this.b$["$wt.widgets.Shell"].display.taskBar.updateLayout();
});
c$=$_P();
};

Sync2Async={};
Sync2Async.block=function(shell,oThis,runnable){
shell.addDisposeListener((function(i$,v$){
if(!$_D("Sync2Async$1")){
$_H();
c$=Sync2Async$1=function(){
$_B(this,arguments);
$_Z(this,arguments);
};
Clazz.decorateAsType(c$,"Sync2Async$1",null,$wt.events.DisposeListener);
$_M(c$,"widgetDisposed",
function(e){
var $runnable=this.f$.runnable;
var $oThis=this.f$.oThis;
window.setTimeout(function(){
$runnable.apply($oThis);
},0);

},"$wt.events.DisposeEvent");
c$=$_P();
}
return $_N(Sync2Async$1,i$,v$);
})(this,$_F("runnable",runnable,"oThis",oThis)));
shell.getDisplay().readAndDispatch();
};
});
