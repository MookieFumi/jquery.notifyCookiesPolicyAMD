define('logger',
    ['console'],
    function (console) {
        return {
            log: function (msg, type) {
                switch (type) {
                    case "info":
                        console.info(msg);
                        break;
                    case "warning":
                        console.warning(msg);
                        break;
                    case "error":
                        console.error(msg);
                        break;
                    default:
                        return;
                }
            }
        };
    });