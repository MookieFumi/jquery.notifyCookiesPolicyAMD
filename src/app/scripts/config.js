require.config({
    baseUrl: "",
    paths: {
        logger: "scripts/app/logger",
        console: "scripts/app/console",
        jquery: "scripts/jquery-2.1.0",
        "jquery.cookie": "scripts/jquery.cookie",
        "jquery.notifyCookiesPolicy": "scripts/jquery.notifyCookiesPolicy",
        "text": "scripts/text"
    },
    shim: {
        "jquery.notifyCookiesPolicy": {
            deps: ["jquery", "jquery.cookie"]
        }
    },
});