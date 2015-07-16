/*global alert, confirm, prompt, console*/

/**
 * @ngdoc property
 * @name navigator.notification
 * @module org.apache.cordova.dialogs
 *
 * @description Cordova Notification API mockup.
 */
navigator.notification = navigator.notification || {
    
    alert : function (msg) {
        'use strict';
        
        alert(msg);
        
        //console.log('[CORDOVA MOCK] ALERT');
    },
    
    confirm : function (msg, cb, title, buttons) {
        'use strict';
        
        var result = confirm(msg);

        if (result) {
            cb(1);
        } else {
            cb(2);
        }
        
        //console.log('[CORDOVA MOCK] CONFIRM');

        return result;
    },
    
    prompt : function (msg, cb, title, buttons) {
        'use strict';
        
        var text = prompt(msg),
            results = {};
        
        results.input1 = text;
        
        if (text) {
            results.buttonIndex = 1;
        } else {
            results.buttonIndex = 2;
        }

        if (text) {
            cb(results);
        } else {
            cb(results);
        }
        
        //console.log('[CORDOVA MOCK] CONFIRM');

        return results;
    },
    
    beep : function () {
        'use strict';
        
        console.log('[CORDOVA MOCK] BEEP');
    },
    
    vibrate : function () {
        'use strict';
        
        console.log('[CORDOVA MOCK] VIBRATE');
    }
};

window.cordova = window.cordova || {
    plugins: {}
};

window.cordova.plugins.barcodeScanner = window.cordova.plugins.barcodeScanner || {
    scan: function (success, error) {
        'use strict';
        
        var value = window.prompt("Enter a barcode value");
        
        success({ text: value});
    }
};

window.shake = window.shake || {
    startWatch: function (successCallback, sensitivity, errorCallback) {
        'use strict';
    }
};