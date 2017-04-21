var on = addEventListener, $ = function (q) {
    return document.querySelector(q)
}, $$ = function (q) {
    return document.querySelectorAll(q)
}, $body = document.body, $inner = $('.inner'), browser = (function () {
    if (navigator.userAgent.match(/Android ([0-9\.]+)/))return 'android';
    if (navigator.userAgent.match(/([0-9_]+) like Mac OS X/) || navigator.userAgent.match(/CPU like Mac OS X/))return 'ios';
    if (navigator.userAgent.match(/(MSIE|rv:11\.0)/))return 'ie';
    return 'other';
})(), trigger = function (t) {
    if (browser == 'ie') {
        var e = document.createEvent('Event');
        e.initEvent(t, false, true);
        dispatchEvent(e);
    } else dispatchEvent(new Event(t));
};
on('load', function () {
    setTimeout(function () {
        $body.className = $body.className.replace(/\bis-loading\b/, 'is-playing');
        setTimeout(function () {
            $body.className = $body.className.replace(/\bis-playing\b/, 'is-ready');
        }, 2375);
    }, 100);
});
var style, sheet, rule;
style = document.createElement('style');
style.appendChild(document.createTextNode(''));
document.head.appendChild(style);
sheet = style.sheet;
if (browser == 'android') {
    (function () {
        sheet.insertRule('body::after { }', 0);
        rule = sheet.cssRules[0];
        var f = function () {
            rule.style.cssText = 'height: ' + (Math.max(screen.width, screen.height)) + 'px';
        };
        on('load', f);
        on('orientationchange', f);
        on('touchmove', f);
    })();
} else if (browser == 'ios') {
    (function () {
        sheet.insertRule('body::after { }', 0);
        rule = sheet.cssRules[0];
        rule.style.cssText = '-webkit-transform: scale(1.0)';
    })();
    (function () {
        sheet.insertRule('body.ios-focus-fix::before { }', 0);
        rule = sheet.cssRules[0];
        rule.style.cssText = 'height: calc(100% + 60px)';
        on('focus', function (event) {
            $body.classList.add('ios-focus-fix');
        }, true);
        on('blur', function (event) {
            $body.classList.remove('ios-focus-fix');
        }, true);
    })();
} else if (browser == 'ie') {
    (function () {
        var t, f;
        f = function () {
            var x = $('#wrapper');
            x.style.height = 'auto';
            if (x.scrollHeight <= innerHeight) x.style.height = '100vh';
        };
        (f)();
        on('resize', function () {
            clearTimeout(t);
            t = setTimeout(f, 250);
        });
        on('load', f);
    })();
}

// something for the nerds
console.log('%c+----------------------------+\n|  spɹǝu ʍoʃʃǝɟ ɹno ǝʞıʃ ǝM  |\n|                            |\n| https://template42.carrd.co|\n+----------------------------+', 'background: black; color: green');
