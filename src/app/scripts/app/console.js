define('console',
    [],
    function () {
        var
            info = function (text) {
                console.log(text);
            },
            warning = function (test) {
                console.warn(test);
            },
            error = function (test) {
                console.error(test);
            };

        return {
            info: info,
            warning: warning,
            error: error
        };
    });