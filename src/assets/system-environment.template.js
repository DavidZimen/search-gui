'use strict';

(function (window) {
    window['env'] = window['env'] || {};

    // Tariff Engine API URL that can be loaded from system environment variables via envsubst command
    window['env']['saerchServiceUrl'] = '${SEARCH_SERVICE_URL}';
    window['env']['opaUrl'] = '${OPA_URL}';
}(this));
