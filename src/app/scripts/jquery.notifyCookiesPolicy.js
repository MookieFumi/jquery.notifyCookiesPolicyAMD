define('jquery.notifyCookiesPolicy',
    [],
    function () {
        var pluginName = 'notifyCookiesPolicy';
        var cssUrl = "css/jquery.notifyCookiesPolicy.css";

        $.notifyCookiesPolicy = function (options) {
            $.notifyCookiesPolicy.methods.init.apply(this, arguments);
        };

        $.notifyCookiesPolicy.methods = {
            init: function (options) {

                var defaults = $.notifyCookiesPolicy.defaults;
                var settings = $.extend(defaults, options);

                var $cookieAdvise = createCookieAdvise(settings);

                if ($.cookie(defaults.cookieName) == null) {
                    appendCookieAdviseToBody($cookieAdvise);
                    if (settings.cookiePolicy.show) {
                        appendCookiePolicyLink($cookieAdvise, settings);
                    }
                    handlerEvents();
                } else {
                    callbackToEnableGoogleAnalytics(settings.callbackToEnableGoogleAnalytics, $cookieAdvise);
                }
            }
        };

        function loadCss() {
            var link = document.createElement("link");
            link.type = "text/css";
            link.rel = "stylesheet";
            link.href = requirejs.toUrl(cssUrl);
            document.getElementsByTagName("head")[0].appendChild(link);
        }
        function callbackToEnableGoogleAnalytics(callback, $cookieAdvise) {
            if (typeof callback == 'function') {
                callback($cookieAdvise);
            }
        }

        function appendCookieAdviseToBody($cookieAdvise) {
            $('body').append($cookieAdvise);
            loadCss();
        }

        function createCookieAdvise(settings) {
            var $cookieAdvise = $("<div data-plugin-name = '" + pluginName + "'/>");
            $cookieAdvise.addClass(settings.cssClass).html(settings.defaultText);
            $cookieAdvise.data(pluginName, {
                target: $cookieAdvise,
                settings: settings
            });

            return $cookieAdvise;
        }

        function appendCookiePolicyLink($cookieAdvise, settings) {
            var $cookiePolicyLink = $(" <a href='#'>" + settings.cookiePolicy.defaultText + "</a>");
            $cookiePolicyLink.on("click", function (e) {
                e.stopPropagation();

                if (typeof settings.cookiePolicy.callbackToShowCookiePolicy == 'function') {
                    settings.cookiePolicy.callbackToShowCookiePolicy();
                }
            });

            $cookieAdvise.append("&nbsp;").append($cookiePolicyLink);
        }

        function accept() {
            var $cookieAdvise = $("[data-plugin-name='" + pluginName + "']");
            var settings = $cookieAdvise.data(pluginName).settings;

            if ($.cookie(settings.cookieName) == null) {
                $.cookie(settings.cookieName, settings.cookieName, {
                    expires: 365,
                    path: '/'
                });

                var callback = settings.callbackToEnableGoogleAnalytics;
                callbackToEnableGoogleAnalytics(callback, $cookieAdvise);

                $cookieAdvise.remove();

                unhandlerEvents();
            }
        }

        function handlerEvents() {
            handlerClickOnDocument();
            handlerScrollOnWindow();
        }

        function handlerClickOnDocument() {
            $(document).click(function (e) {
                if (e.button != undefined && e.button == 0) {
                    accept();
                }
            });
        }

        function handlerScrollOnWindow() {
            $(window).scroll(function (e) {
                var $cookieAdvise = $("[data-plugin-name='" + pluginName + "']");
                var settings = $cookieAdvise.data(pluginName).settings;
                if ($(window).scrollTop() >= settings.defaultScroll) {
                    accept();
                }
            });
        }

        function unhandlerEvents() {
            $(document).off('click');
            $(window).off('scroll');
        }

        $.notifyCookiesPolicy.defaults = {
            defaultText: 'Utilizamos cookies propias y de terceros para mejorar nuestros servicios. Si contin\xfaa navegando, consideramos que acepta su uso. Para obtener mi\xe1s informacii\xf3n, o bien conocer c\xf3mo cambiar la configuraci\xf3n vea la pol\xedtica de cookies.',
            defaultScroll: 20,
            cssClass: "notify-cookies-policy-container",
            cookieName: "notifyCookiesPolicy_accepted",
            callbackToEnableGoogleAnalytics: null,
            cookiePolicy: {
                show: true,
                defaultText: "Ver Pol\xedtica de cookies",
                callbackToShowCookiePolicy: null
            }
        };
    });
