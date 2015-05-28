'use strict';
// Source: src/mms.js
/**
 * @ngdoc overview
 * @name mms
 *
 * @description
 * # mms module
 * This module provides angular services that abstract the mms rest api. The only
 * dependency it has is the LoDash js library. Most service functions return
 * a Promise that allows you to pass it success and failure handlers via the
 * then() method. The format of the objects that are resolved when successful
 * are defined by json schemas that're linked to below.
 *
 * ## Links
 * * [angular.js](http://angularjs.org)
 * * [mms rest api and json schema](https://ems/alfresco/mms/raml/index.html)
 * * {@link mms.URLService#methods_handleHttpStatus Promise rejected object}
 * * [lodash](http://lodash.com)
 *
 * ## Example app that uses this module
 * The following example is an app that uses the ElementService from mms to
 * display the name of a particular element.
 *
 * ### HTML (index.html)
 *  <pre>
    <!doctype html>
    <html ng-app="exampleApp">
        <head>
            <title>Example app</title>
        </head>
        <body ng-controller="exampleCtrl">
            <div>{{element.name}}</div> <!-- data binds to the name property
                                            of the element object in $scope -->
        <script src="lodash.js"></script>
        <script src="angular.js"></script>
        <script src="mms.js"></script>
        <script src="app.js"></script>
        </body>
    </html>
    </pre>
 * ### JS (app.js)
 *  <pre>
    angular.module('exampleApp', ['mms'])
    .controller('exampleCtrl', ['$scope', 'ElementService',
        function($scope, ElementService) { //dependency injections
            ElementService.getElement('_element_id').then(
                function(element) { //success handler
                    $scope.element = element;
                },
                function(reason) { //failed handler
                    alert('get element failed: ' + reason.message);
                }
            );
        }
    ]);
    </pre>
 */
angular.module('mms', [])
.config(['$sceProvider', function($sceProvider) {
    $sceProvider.enabled(false);
}])
.constant('_', window._);
// Source: src/services/CacheService.js
angular.module('mms')
.factory('CacheService', ['_', CacheService]);

/**
 * @ngdoc service
 * @name mms.CacheService
 * @requires _
 *
 * @description
 * Provides cache of key value pairs. Key can be a string or an array of strings.
 */
function CacheService(_) {

    var cache = {};

    /**
     * @ngdoc method
     * @name mms.CacheService#get
     * @methodOf mms.CacheService
     *
     * @description
     * Get value from cache
     *
     * @param {Array.<string>|string} key String key or Array of hierarchical keys
     * @returns {Object} Value if found, null if not found
     */
    var get = function(key) {
        var realkey = key;
        if (angular.isArray(key))
            realkey = makeKey(key);
        if (cache.hasOwnProperty(realkey))
            return cache[realkey];
        return null;
    };

    /**
     * @ngdoc method
     * @name mms.CacheService#put
     * @methodOf mms.CacheService
     *
     * @description
     * Put value into cache
     *
     * @param {Array.<string>|string} key String key or Array of hierarchical keys
     * @param {Object} value The value to save
     * @param {boolean} [merge=false] Whether to replace the value or do a merge if value already exists
     * @param {function} [func=null] Optional function that take in value and key based on iteration of the original value
     *      and returns an object with the same signature as arguments to the put function. For example,
     *      {key: ['key'], value: 'value', merge: false, func: null}
     * @returns {Object} the original value
     */
    var put = function(key, value, merge, func) {
        var m = !merge ? false : merge;
        var realkey = key;
        if (angular.isArray(key))
            realkey = makeKey(key);
        if (cache.hasOwnProperty(realkey) && m)
            _.merge(cache[realkey], value);
        else
            cache[realkey] = value;
        if (func) {
            angular.forEach(value, function(v, k) {
                var ob = func(v, k);
                put(ob.key, ob.value, ob.merge, ob.func);
            });
        }
        return cache[realkey];
    };

    /**
     * @ngdoc method
     * @name mms.CacheService#remove
     * @methodOf mms.CacheService
     *
     * @description
     * Remove value from cache and return it
     *
     * @param {Array.<string>|string} key String key or Array of hierarchical keys
     * @returns {Object} value that was removed or undefined
     */
    var remove = function(key) {
        var realkey = key;
        if (angular.isArray(key))
            realkey = makeKey(key);
        var result = cache[realkey];
        delete cache[realkey];
        return result;
    };

    /**
     * @ngdoc method
     * @name mms.CacheService#exists
     * @methodOf mms.CacheService
     *
     * @description
     * Check if value exists with a specific key
     *
     * @param {Array.<string>|string} key String key or Array of hierarchical keys
     * @returns {boolean} whether value exists for key
     */
    var exists = function(key) {
        var realkey = key;
        if (angular.isArray(key))
            realkey = makeKey(key);
        return cache.hasOwnProperty(realkey);
    };

    var makeKey = function(keys) {
        return keys.join('|');
    };

    return {
        get: get,
        put: put,
        exists: exists,
        remove: remove,
    };

}
// Source: src/services/CommentService.js
angular.module('mms')
.factory('CommentService', ['$q', '$http', 'URLService', 'ElementService', CommentService]);

/**
 * @ngdoc service
 * @name mms.CommentService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 * @requires mms.ElementService
 *
 * @description
 * TBD, this service is a stub, do not use
 */
function CommentService($q, $http, URLService, ElementService) {

    /**
     * @ngdoc method
     * @name mms.CommentService#addComment
     * @methodOf mms.CommentService
     *
     * @description
     * Adds a new comment to an object
     *
     * @param {string} id The id of the object (element or alfresco).
     * @param {string} comment The comment, can contain html
     * @returns {Promise} The promise will be resolved with the new comment object
     */
    var addComment = function(id, comment) {

    };

    /**
     * @ngdoc method
     * @name mms.CommentService#getComments
     * @methodOf mms.CommentService
     *
     * @description
     * Gets the comments for an object, in reverse chronological time
     *
     * @param {string} id The id of the object.
     * @returns {Promise} The promise will be resolved with an array of comment
     *      objects
     */
    var getComments = function(id) {

    };

    /**
     * @ngdoc method
     * @name mms.CommentService#updateComment
     * @methodOf mms.CommentService
     *
     * @description
     * Update a comment
     *
     * @param {Object} comment A comment object with the id and body
     * @returns {Promise} The promise will be resolved with the updated comment object
     */
    var updateComment = function(comment) {

    };

    /**
     * @ngdoc method
     * @name mms.CommentService#deleteComment
     * @methodOf mms.CommentService
     *
     * @description
     * Delete a comment
     *
     * @param {string} commentId The id of the comment.
     * @returns {Promise} The promise will be resolved with the value 'true'
     */
    var deleteComment = function(commentId) {

    };

    return {
        addComment: addComment,
        getComments: getComments,
        updateComment: updateComment,
        deleteComment: deleteComment
    };

}
// Source: src/services/ConfigService.js
angular.module('mms')
.factory('ConfigService', ['$q', '$http', 'URLService', 'CacheService', 'UtilsService', '_', ConfigService]);

/**
 * @ngdoc service
 * @name mms.ConfigService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 * @requires mms.CacheService
 * @requires mms.UtilsService
 * @requires _
 *
 * @description
 * This service manages configurations (tags) and snapshots of products. A product can
 * have snapshots that represent a point in time of the product (a version), and
 * configurations are a grouping of these snapshots from different products. A
 * configuration can enforce a specific time for the snapshots of its products or
 * it can be flexible to include snapshots of different times.
 */

 //['snapshots', ws, ssid]
 //['products', ws, id, 'snapshots']
 //['configs', ws, id, 'snapshots']
 //['configs', ws, id]
 //['sites', ws, sitename, 'configs']
function ConfigService($q, $http, URLService, CacheService, UtilsService, _) {

    /**
     * @ngdoc method
     * @name mms.ConfigService#getSiteConfigs
     * @methodOf mms.ConfigService
     *
     * @description
     * Get configurations in a site
     *
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @param {boolean} [update=false] update from server
     * @returns {Promise} Promise would be resolved with array of configuration objects
     */
    var getSiteConfigs = function(site, workspace, update) {
        var n = normalize(update, workspace);
        var deferred = $q.defer();
        var cacheKey = ['sites', n.ws, site, 'configs'];
        if (CacheService.exists(cacheKey) && !n.update) {
            deferred.resolve(CacheService.get(cacheKey));
            return deferred.promise;
        }
        $http.get(URLService.getSiteConfigsURL(site, n.ws))
        .success(function(data, status, headers, config) {
            CacheService.put(cacheKey, data.configurations, false, function(val, k) {
                return {key: ['configs', n.ws, val.id], value: val, merge: true};
            });
            deferred.resolve(CacheService.get(cacheKey));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#getConfig
     * @methodOf mms.ConfigService
     *
     * @description
     * Get a configuration by id
     *
     * @param {string} id Config id
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @param {boolean} [update=false] update from server
     * @returns {Promise} Promise would be resolved with configuration object
     */
    var getConfig = function(id, site, workspace, update) {
        var n = normalize(update, workspace);
        var deferred = $q.defer();
        var cacheKey = ['configs', n.ws, id];
        if (CacheService.exists(cacheKey) && !n.update) {
            deferred.resolve(CacheService.get(cacheKey));
            return deferred.promise;
        }
        $http.get(URLService.getConfigURL(id, site, n.ws))
        .success(function(data, status, headers, config) {
            deferred.resolve(CacheService.put(cacheKey, data.configurations[0], true));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#getConfigProducts
     * @methodOf mms.ConfigService
     *
     * @description
     * Get a snapshots of a configuration
     *
     * @param {string} id Config id
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @param {boolean} [update=false] update from server
     * @returns {Promise} Promise would be resolved with array of product objects
     */
    var getConfigProducts = function(id, site, workspace, update) {
        var n = normalize(update, workspace);
        var deferred = $q.defer();
        var cacheKey = ['configs', n.ws, id, 'products'];
        if (CacheService.exists(cacheKey) && !n.update) {
            deferred.resolve(CacheService.get(cacheKey));
            return deferred.promise;
        }
        $http.get(URLService.getConfigProductsURL(id, site, n.ws))
        .success(function(data, status, headers, config) {
            CacheService.put(cacheKey, data.products, false, function(val, k) {
                return {key: UtilsService.makeElementKey(val.sysmlid, n.ws, 'latest'), value: val, merge: true};
            });
            deferred.resolve(CacheService.get(cacheKey));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#getConfigSnapshots
     * @methodOf mms.ConfigService
     *
     * @description
     * Get a snapshots of a configuration
     *
     * @param {string} id Config id
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @param {boolean} [update=false] update from server
     * @returns {Promise} Promise would be resolved with array of snapshot objects
     */
    var getConfigSnapshots = function(id, site, workspace, update) {
        var n = normalize(update, workspace);
        var deferred = $q.defer();
        var cacheKey = ['configs', n.ws, id, 'snapshots'];
        if (CacheService.exists(cacheKey) && !n.update) {
            deferred.resolve(CacheService.get(cacheKey));
            return deferred.promise;
        }
        $http.get(URLService.getConfigSnapshotsURL(id, site, n.ws))
        .success(function(data, status, headers, config) {
            CacheService.put(cacheKey, data.snapshots, false, function(val, k) {
                return {key: ['snapshots', n.ws, val.id], value: val, merge: true};
            });
            deferred.resolve(CacheService.get(cacheKey));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#getProductSnapshots
     * @methodOf mms.ConfigService
     *
     * @description
     * Get snapshots of a product
     *
     * @param {string} id Product id
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @param {boolean} [update=false] update from server
     * @returns {Promise} Promise would be resolved with array of snapshot objects
     */
    var getProductSnapshots = function(id, site, workspace, update) {
        var n = normalize(update, workspace);
        var deferred = $q.defer();
        var cacheKey = ['products', n.ws, id, 'snapshots'];
        if (CacheService.exists(cacheKey) && !n.update) {
            deferred.resolve(CacheService.get(cacheKey));
            return deferred.promise;
        }
        $http.get(URLService.getProductSnapshotsURL(id, site, n.ws))
        .success(function(data, status, headers, config) {
            CacheService.put(cacheKey, data.snapshots, false, function(val, k) {
                return {key: ['snapshots', n.ws, val.id], value: val, merge: true};
            });
            deferred.resolve(CacheService.get(cacheKey));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#updateConfig
     * @methodOf mms.ConfigService
     *
     * @description
     * Update properties of a configuration
     *
     * @param {Object} config The config object with updated properties, must have id
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @returns {Promise} Promise would be resolved with the updated config object
     */
    var updateConfig = function(config, site, workspace) {
        var n = normalize(null, workspace);
        var deferred = $q.defer();
        if (!config.hasOwnProperty('id'))
            deferred.reject({status: 400, message: 'Config id not found, create configuration first!'});
        else {
            $http.post(URLService.getSiteConfigsURL(site, n.ws), {'configurations': [config]})
            .success(function(data, status, headers, c) {
                deferred.resolve(CacheService.put(['configs', n.ws, config.id], data, true));
            }).error(function(data, status, headers, config) {
                URLService.handleHttpStatus(data, status, headers, config, deferred);
            });
        }
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#createConfig
     * @methodOf mms.ConfigService
     *
     * @description
     * Create a new configuration
     *
     * @param {Object} config The new config object, must not already have id
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @returns {Promise} Promise would be resolved with the updated config object
     */
    var createConfig = function(config, site, workspace) {
        var n = normalize(null, workspace);
        var deferred = $q.defer();
        if (config.hasOwnProperty('id')) {
            deferred.reject({status: 400, message: 'Config create cannot already have id'});
            return deferred.promise;
        }
        $http.post(URLService.getSiteConfigsURL(site, n.ws), {'configurations': [config]})
        .success(function(data, status, headers, config) {
            deferred.resolve(CacheService.put(['configs', n.ws, config.id], data, true));
            if (CacheService.exists(['sites', n.ws, site, 'configs'])) {
                CacheService.get(['sites', n.ws, site, 'configs']).push(data);
            }
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#updateConfigSnapshots
     * @methodOf mms.ConfigService
     *
     * @description
     * Update a configuration's associated snapshots
     *
     * @param {string} id The id of the config to update
     * @param {Array.<Object>} snapshots Array of snapshot objects
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @returns {Promise} Promise would be resolved with array of snapshot objects
     */
    var updateConfigSnapshots = function(id, snapshots, site, workspace) {
        var n = normalize(null, workspace);
        var deferred = $q.defer();
        var cacheKey = ['configs', n.ws, id, 'snapshots'];
        $http.post(URLService.getConfigSnapshotsURL(id, site, n.ws), {'snapshots': snapshots})
        .success(function(data, status, headers, config) {
            CacheService.put(cacheKey, data.snapshots, false, function(val, k) {
                return {key: ['snapshots', n.ws, val.id], value: val, merge: true};
            });
            deferred.resolve(CacheService.get(cacheKey));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#updateConfigProducts
     * @methodOf mms.ConfigService
     *
     * @description
     * Update a configuration's associated products
     *
     * @param {string} id The id of the config to update
     * @param {Array.<Object>} products Array of product objects
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @returns {Promise} Promise would be resolved with 'ok', and the server
     *      will email the user when completed
     */
    var updateConfigProducts = function(id, products, site, workspace) {
        var n = normalize(null, workspace);
        var deferred = $q.defer();
        var cacheKey = ['configs', n.ws, id, 'products'];
        $http.post(URLService.getConfigProductsURL(id, site, n.ws), {'products': products})
        .success(function(data, status, headers, config) {
            /*CacheService.put(cacheKey, data.products, false, function(val, k) {
                return {key: UtilsService.makeElementKey(val.sysmlid, n.ws, 'latest'), value: val, merge: true};
            });*/
            deferred.resolve(CacheService.get(cacheKey));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ConfigService#createSnapshot
     * @methodOf mms.ConfigService
     *
     * @description
     * Create a new snapshot for a product
     *
     * @param {string} id The id of the product to snapshot
     * @param {string} site Site name
     * @param {string} [workspace=master] Workspace name
     * @returns {Promise} Promise would be resolved with 'ok', and the server
     *      will email the user when completed
     */
    var createSnapshot = function(id, site, workspace) {
        var n = normalize(null, workspace);
        var deferred = $q.defer();
        $http.post(URLService.getProductSnapshotsURL(id, site, n.ws))
        .success(function(data, status, headers, config) {
            deferred.resolve('ok');
            /*
            //TODO the returned json object is the old format
            deferred.resolve(CacheService.put(['snapshots', n.ws, data.id], data, true));
            if (CacheService.exists(['products', n.ws, id, 'snapshots']))
                CacheService.get(['products', n.ws, id, 'snapshots']).push(data); */
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    var createSnapshotArtifact = function(snapshot, site, workspace){
        var n = normalize(null, workspace);
        var deferred = $q.defer();
        $http.post(URLService.getProductSnapshotsURL(snapshot.sysmlid, site, n.ws), {'snapshots': [snapshot]})
        .success(function(data, status, headers, config){
            deferred.resolve('ok');
        }).error(function(data, status, headers, config){
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    var normalize = function(updateFromServer, workspace) {
        return UtilsService.normalize({update: updateFromServer, workspace: workspace, version: null});
    };

    return {
        getSiteConfigs : getSiteConfigs,
        getConfig : getConfig,
        getConfigProducts: getConfigProducts,
        getConfigSnapshots: getConfigSnapshots,
        getProductSnapshots: getProductSnapshots,
        updateConfig: updateConfig,
        createConfig: createConfig,
        updateConfigSnapshots: updateConfigSnapshots,
        updateConfigProducts: updateConfigProducts,
        createSnapshot: createSnapshot,
        createSnapshotArtifact: createSnapshotArtifact
    };
}
// Source: src/services/ElementService.js
angular.module('mms')
.factory('ElementService', ['$q', '$http', 'URLService', 'UtilsService', 'CacheService', '_', ElementService]);

/**
 * @ngdoc service
 * @name mms.ElementService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 * @requires mms.UtilsService
 * @requires mms.CacheService
 * @requires _
 *
 * @description
 * An element CRUD service with additional convenience methods for managing edits.
 *
 * For element json example, see [here](https://ems/alfresco/mms/raml/index.html)
 */
function ElementService($q, $http, URLService, UtilsService, CacheService, _) {

    var inProgress = {};
    /**
     * @ngdoc method
     * @name mms.ElementService#getElement
     * @methodOf mms.ElementService
     *
     * @description
     * Gets an element object by id. If the element object is already in the cache,
     * resolve the existing reference, if not or update is true, request it from server,
     * add/merge into the cache.
     *
     * Most of these methods return promises that will reject with a reason object
     * when a server call fails, see
     * {@link mms.URLService#methods_handleHttpStatus the return object}
     *
     * ## Example Usage
     *  <pre>
        ElementService.getElement('element_id').then(
            function(element) { //element is an element object (see json schema)
                alert('got ' + element.name);
            },
            function(reason) {
                alert('get element failed: ' + reason.message);
                //see mms.URLService#handleHttpStatus for the reason object
            }
        );
        </pre>
     * ## Example with timestamp
     *  <pre>
        ElementService.getElement('element_id', false, 'master', '2014-07-01T08:57:36.915-0700').then(
            function(element) { //element is an element object (see json schema)
                alert('got ' + element.name);
            },
            function(reason) {
                alert('get element failed: ' + reason.message);
                //see mms.URLService#handleHttpStatus for the reason object
            }
        );
        </pre>
     *
     * @param {string} id The id of the element to get.
     * @param {boolean} [update=false] (optional) whether to always get the latest
     *      from server, even if it's already in cache (this will update the cache if exists)
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with the element object,
     *      multiple calls to this method with the same parameters would give the
     *      same object
     */
    var getElement = function(id, update, workspace, version) {
        var n = normalize(id, update, workspace, version);
        var key = 'getElement(' + id + n.update + n.ws + n.ver + ')';

        if (inProgress.hasOwnProperty(key))
            return inProgress[key];

        var deferred = $q.defer();
        if (CacheService.exists(n.cacheKey) && !n.update) {
            var cached = CacheService.get(n.cacheKey);
            if ((cached.specialization.type === 'View' ||
                cached.specialization.type === 'Product') &&
                !cached.specialization.hasOwnProperty('contains')) {
            } else {
                deferred.resolve(cached);
                return deferred.promise;
            }
        }
        inProgress[key] = deferred.promise;
        $http.get(URLService.getElementURL(id, n.ws, n.ver))
        .success(function(data, status, headers, config) {
            deferred.resolve(CacheService.put(n.cacheKey, UtilsService.cleanElement(data.elements[0]), true));
            delete inProgress[key];
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
            delete inProgress[key];
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#getElements
     * @methodOf mms.ElementService
     *
     * @description
     * Same as getElement, but for multiple ids.
     *
     * @param {Array.<string>} ids The ids of the elements to get.
     * @param {boolean} [update=false] (optional) whether to always get latest from server.
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with an array of element objects,
     *      multiple calls to this method with the same ids would result in an array of
     *      references to the same objects.
     */
    var getElements = function(ids, update, workspace, version) {
        var promises = [];
        ids.forEach(function(id) {
            promises.push(getElement(id, update, workspace, version));
        });
        return $q.all(promises);
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#getElementForEdit
     * @methodOf mms.ElementService
     *
     * @description
     * Gets an element object to edit by id. (this is different from getElement in
     * that the element is a clone and not the same reference. The rationale is to
     * consider angular data bindings so editing an element does not cause unintentional
     * updates to other parts of the view, separating reads and edits)
     *
     * ## Example
     *  <pre>
        ElementService.getElementForEdit('element_id').then(
            function(editableElement) {
                editableElement.name = 'changed name'; //immediately change a name and save
                ElementService.updateElement(editableElement).then(
                    function(updatedElement) { //at this point the regular getElement would show the update
                        alert('updated');
                    },
                    function(reason) {
                        alert('update failed');
                    }
                );
            },
            function(reason) {
                alert('get element failed: ' + reason.message);
            }
        );
        </pre>
     *
     * @param {string} id The id of the element to get.
     * @param {boolean} [update=false] Get the latest from server first,
     *      else just make a copy of what's in the element cache
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with the element object,
     *      multiple calls to this method with the same id would result in
     *      references to the same object. This object can be edited without
     *      affecting the same element object that's used for displays
     */
    var getElementForEdit = function(id, update, workspace) {
        var n = normalize(id, update, workspace, null, true);

        var deferred = $q.defer();
        if (CacheService.exists(n.cacheKey) && !n.update)
            deferred.resolve(CacheService.get(n.cacheKey));
        else {
            getElement(id, n.update, n.ws)
            .then(function(data) {
                var edit = _.cloneDeep(data);
                deferred.resolve(CacheService.put(n.cacheKey, UtilsService.cleanElement(edit, true), true));
            }, function(reason) {
                deferred.reject(reason);
            });
        }
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#getElementsForEdit
     * @methodOf mms.ElementService
     *
     * @description
     * Gets element objects to edit by ids.
     *
     * @param {Array.<string>} ids The ids of the elements to get for edit.
     * @param {boolean} [update=false] Get latest from server first
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with an array of editable
     * element objects that won't affect the corresponding displays
     */
    var getElementsForEdit = function(ids, update, workspace) {
        var promises = [];
        ids.forEach(function(id) {
            promises.push(getElementForEdit(id, update, workspace));
        });
        return $q.all(promises);
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#getOwnedElements
     * @methodOf mms.ElementService
     *
     * @description
     * Gets element's owned element objects. TBD (stub)
     *
     * @param {string} id The id of the elements to get owned elements for
     * @param {boolean} [update=false] update elements from server
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with an array of
     * element objects
     */
    var getOwnedElements = function(id, update, workspace, version) {
        var n = normalize(id, update, workspace, version);
        return getGenericElements(URLService.getOwnedElementURL(id, n.ws, n.ver), 'elements', n.update, n.ws, n.ver);
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#getGenericElements
     * @methodOf mms.ElementService
     *
     * @description
     * This is a method to call a predefined url that returns elements json.
     * A key provides the key of the json that has the elements array.
     *
     * ## Example (used by ViewService to get products in a site)
     *  <pre>
        ElementService.getGenericElements('/alfresco/service/sites/europa/products', 'products')
        .then(
            function(products) {
                alert('got ' + products.length + ' products');
            },
            function(reason) {
                alert('failed: ' + reason.message);
            }
        );
        </pre>
     *
     * @param {string} url the url to get
     * @param {string} key json key that has the element array value
     * @param {boolean} [update=false] update cache
     * @param {string} [workspace=master] workspace associated, this will not change the url
     * @param {string} [version=latest] timestamp associated, this will not change the url
     */
    var getGenericElements = function(url, key, update, workspace, version) {
        var n = normalize(null, update, workspace, version);

        var progress = 'getGenericElements(' + url + key + n.update + n.ws + n.ver + ')';
        if (inProgress.hasOwnProperty(progress))
            return inProgress[progress];

        var deferred = $q.defer();

        inProgress[progress] = deferred.promise;
        $http.get(url)
        .success(function(data, status, headers, config) {
            var result = [];
            data[key].forEach(function(element) {
                var ekey = UtilsService.makeElementKey(element.sysmlid, n.ws, n.ver);
                result.push(CacheService.put(ekey, UtilsService.cleanElement(element), true));
            });
            delete inProgress[progress];
            deferred.resolve(result);
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
            delete inProgress[progress];
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#updateElement
     * @methodOf mms.ElementService
     *
     * @description
     * Save element to alfresco and update the cache if successful, the element object
     * must have an id, and whatever property that needs to be updated.
     *
     * {@link mms.ElementService#methods_getElementForEdit see also getElementForEdit}
     *
     * ## Example
     *  <pre>
        var update = {
            'sysmlid': 'element_id',
            'read': '2014-07-01T08:57:36.915-0700', //time the element was last read from the server
            'name': 'updated name',
            'documentation': '<p>updated doc</p>',
            'specialization': {
                'type': 'Property',
                'value': [
                    {
                        'type': 'LiteralString',
                        'string': 'updated string value'
                    }
                ]
            }
        };
        ElementService.updateElement(update).then(
            function(updatedElement) { //this element will have the latest info as well as read time
                alert('update successful');
            },
            function(reason) {
                alert('update failed: ' + reason.message);
            }
        );
        </pre>
     *
     * @param {Object} elem An object that contains element id and any property changes to be saved.
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with the updated cache element reference if
     *      update is successful. If a conflict occurs, the promise will be rejected with status of 409
     */
    var updateElement = function(elem, workspace) {
        var deferred = $q.defer();
        if (!elem.hasOwnProperty('sysmlid'))
            deferred.reject('Element id not found, create element first!');
        else {
            if (elem.hasOwnProperty('owner'))
                delete elem.owner; //hack for getting around a 400 error when owner
                                    //isn't found on server - ok for now since
                                    //owner can't be changed from the web
            var n = normalize(elem.sysmlid, null, workspace, null);
            $http.post(URLService.getPostElementsURL(n.ws), {'elements': [elem]})
            .success(function(data, status, headers, config) {
                var resp = CacheService.put(n.cacheKey, UtilsService.cleanElement(data.elements[0]), true);
                //special case for products view2view updates
                if (resp.specialization && resp.specialization.view2view &&
                    elem.specialization && elem.specialization.view2view)
                    resp.specialization.view2view = elem.specialization.view2view;
                deferred.resolve(resp);
                /* TODO better way to sync edits on update, maybe app level*/
                var edit = CacheService.get(UtilsService.makeElementKey(elem.sysmlid, n.ws, null, true));
                if (edit) {
                    _.merge(edit, resp);
                    UtilsService.cleanElement(edit, true);
                }
            }).error(function(data, status, headers, config) {
                if (status === 409) {
                    var server = _.cloneDeep(data.elements[0]);
                    var newread = server.read;
                    delete server.modified;
                    delete server.read;
                    delete server.creator;
                    UtilsService.cleanElement(server);
                    var orig = CacheService.get(UtilsService.makeElementKey(elem.sysmlid, n.ws, null, false));
                    if (!orig) {
                        URLService.handleHttpStatus(data, status, headers, config, deferred);
                    } else {
                        var current = _.cloneDeep(orig);
                        delete current.modified;
                        delete current.read;
                        delete current.creator;
                        UtilsService.cleanElement(current);
                        if (angular.equals(server, current)) {
                            elem.read = newread;
                            updateElement(elem, workspace)
                            .then(function(good){
                                deferred.resolve(good);
                            }, function(reason) {
                                deferred.reject(reason);
                            });
                        } else {
                            URLService.handleHttpStatus(data, status, headers, config, deferred);
                        }
                    }
                } else
                    URLService.handleHttpStatus(data, status, headers, config, deferred);
            });
        }
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#updateElements
     * @methodOf mms.ElementService
     *
     * @description
     * Save elements to alfresco and update the cache if successful.
     *
     * @param {Array.<Object>} elems Array of element objects that contains element id and any property changes to be saved.
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with an array of updated element references if
     *      update is successful.
     */
    var updateElements = function(elems, workspace) {
        var promises = [];
        elems.forEach(function(elem) {
            promises.push(updateElement(elem, workspace));
        });
        return $q.all(promises);
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#createElement
     * @methodOf mms.ElementService
     *
     * @description
     * Create element on alfresco.
     *
     * ## Example
     *  <pre>
        var create = {
            'name': 'new name',
            'owner': 'owner_id',
            'documentation': '<p>new doc</p>',
            'specialization': {
                'type': 'Property',
                'value': [
                    {
                        'type': 'LiteralString',
                        'string': 'new value'
                    }
                ]
            }
        };
        ElementService.createElement(create).then(
            function(createdElement) { //this element will have a generated id
                alert('create successful with id: ' + createdElement.sysmlid);
            },
            function(reason) {
                alert('create failed: ' + reason.message);
            }
        );
        </pre>
     *
     * @param {Object} elem Element object that must have an owner id.
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with the created element references if
     *      create is successful.
     */
    var createElement = function(elem, workspace) {
        var n = normalize(null, null, workspace, null);

        var deferred = $q.defer();
        if (!elem.hasOwnProperty('owner')) {
        //    deferred.reject('Element create needs an owner'); //relax this?
        //    return deferred.promise;
            elem.owner = 'holding_bin_project'; //hardcode a holding bin for owner for propose element
        }
        if (elem.hasOwnProperty('sysmlid')) {
            deferred.reject({status: 400, message: 'Element create cannot have id'});
            return deferred.promise;
        }
        $http.post(URLService.getPostElementsURL(n.ws), {'elements': [elem]})
        .success(function(data, status, headers, config) {
            var resp = data.elements[0];
            var key = UtilsService.makeElementKey(resp.sysmlid, n.ws, 'latest');
            deferred.resolve(CacheService.put(key, UtilsService.cleanElement(resp), true));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#createElements
     * @methodOf mms.ElementService
     *
     * @description
     * Create elements to alfresco and update the cache if successful.
     *
     * @param {Array.<Object>} elems Array of element objects that must contain owner id.
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with an array of created element references if
     *      create is successful.
     */
    var createElements = function(elems, workspace) {
        var promises = [];
        elems.forEach(function(elem) {
            promises.push(createElement(elem, workspace));
        });
        return $q.all(promises);
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#isDirty
     * @methodOf mms.ElementService
     *
     * @description
     * TBD, do not use. Check if element has been edited and not saved to server
     *
     * @param {string} id Element id
     * @returns {boolean} Whether element is dirty
     */
    var isDirty = function(id, workspace) {
        var editKey = UtilsService.makeElementKey(id, workspace, null, true);
        var normalKey = UtilsService.makeElementKey(id, workspace);
        var normal = CacheService.get(normalKey);
        var edit = CacheService.get(editKey);
        if (edit && !_.isEqual(normal, edit))
            return true;
        return false;
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#search
     * @methodOf mms.ElementService
     *
     * @description
     * Search for elements based on some query
     *
     * @param {string} query A query string (TBD)
     * @param {boolean} [update=false] Whether to update from server
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with an array of element objects
     */
    var search = function(query, update, workspace) {
        var n = normalize(null, update, workspace, null);
        return getGenericElements(URLService.getElementSearchURL(query, n.ws), 'elements', n.update, n.ws, n.ver);
    };

    /**
     * @ngdoc method
     * @name mms.ElementService#getElementVersions
     * @methodOf mms.ElementService
     *
     * @description
     * Queries for an element's entire version history
     *
     * @param {string} id The id of the element
     * @param {boolean} [update=false] update element version cache
     * @param {string} [workspace=master] workspace
     * @returns {Promise} The promise will be resolved with an array of version objects.
     */
    var getElementVersions = function(id, update, workspace) {
        var n = normalize(id, update, workspace, 'versions');
        var deferred = $q.defer();
        if (CacheService.exists(n.cacheKey) && !n.update) {
            deferred.resolve(CacheService.get(n.cacheKey));
            return deferred.promise;
        }
        $http.get(URLService.getElementVersionsURL(id, n.ws))
        .success(function(data, statas, headers, config){
            deferred.resolve(CacheService.put(n.cacheKey, data.versions, true));
        }).error(function(data, status, headers, config){
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    var normalize = function(id, update, workspace, version, edit) {
        var res = UtilsService.normalize({update: update, workspace: workspace, version: version});
        res.cacheKey = UtilsService.makeElementKey(id, res.ws, res.ver, edit);
        return res;
    };

    return {
        getElement: getElement,
        getElements: getElements,
        getElementForEdit: getElementForEdit,
        getElementsForEdit: getElementsForEdit,
        getOwnedElements: getOwnedElements,
        updateElement: updateElement,
        updateElements: updateElements,
        createElement: createElement,
        createElements: createElements,
        getGenericElements: getGenericElements,
        getElementVersions: getElementVersions,
        isDirty: isDirty,
        search: search
    };
}
// Source: src/services/NotificationService.js
angular.module('mms')
.factory('NotificationService', ['$q', '$http', 'URLService', NotificationService]);

/**
 * @ngdoc service
 * @name mms.NotificationService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 *
 * @description
 * This service handles following elements - user will get notification for things they
 * follow that changed
 * TBD (stub)
 */
function NotificationService($q, $http, URLService) {

    /**
     * @ngdoc method
     * @name mms.NotificationService#getFollowing
     * @methodOf mms.NotificationService
     *
     * @description
     * Gets the objects the current user is following
     *
     * @returns {Promise} The promise will be resolved with an array of object ids
     */
    var getFollowing = function() {

    };

    /**
     * @ngdoc method
     * @name mms.NotificationService#follow
     * @methodOf mms.NotificationService
     *
     * @description
     * Follow a new object
     *
     * @param {string} id Element or alfresco id to follow
     * @returns {Promise} The promise will be resolved with an array of object ids
     */
    var follow = function(id) {

    };

    /**
     * @ngdoc method
     * @name mms.NotificationService#unfollow
     * @methodOf mms.NotificationService
     *
     * @description
     * Unfollow the provided object
     *
     * @param {string} id Element or alfresco id to unfollow
     * @returns {Promise} The promise will be resolved with an array of object ids
     */
    var unfollow = function(id) {

    };

    return {
        getFollowing: getFollowing,
        follow: follow,
        unfollow: unfollow
    };

}
// Source: src/services/ProjectService.js
angular.module('mms')
.factory('ProjectService', ['$q', '$http', 'URLService', ProjectService]);

/**
 * @ngdoc service
 * @name mms.ProjectService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 *
 * @description
 * This service gives information about model projects (TBD, stub)
 */
function ProjectService($q, $http, URLService) {

    return {};

}
// Source: src/services/SearchService.js
angular.module('mms')
.factory('SearchService', ['$q', '$http', 'URLService', SearchService]);

function SearchService($q, $http, URLService) {

    return {};

}
// Source: src/services/SiteService.js
angular.module('mms')
.factory('SiteService', ['$q', '$http', 'URLService', 'CacheService', '_', SiteService]);

/**
 * @ngdoc service
 * @name mms.SiteService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 * @requires mms.CacheService
 *
 * @description
 * This is a utility service for getting alfresco site information, such as
 * list of all sites and their categories
 */
function SiteService($q, $http, URLService, CacheService, _) {
    var currentSite = 'europa';
    var inProgress = null;

    /* TODO remove */
    var setCurrentSite = function(site) {
        currentSite = site;
    };

    var getCurrentSite = function() {
        return currentSite;
    };

    /**
     * @ngdoc method
     * @name mms.SiteService#getSite
     * @methodOf mms.SiteService
     *
     * @description
     * Gets site information - name, title, categories
     *
     * @param {string} site The name of site to get.
     * @returns {Promise} Resolves to the site info object.
     */
    var getSite = function(site) {
        var deferred = $q.defer();
        getSites().then(function(data) {
            var result = CacheService.get(['sites', 'master', site]);
            if (result)
                deferred.resolve(result);
            else
                deferred.reject("Site not found");
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.SiteService#getSites
     * @methodOf mms.SiteService
     *
     * @description
     * Gets sites information - name, title, categories for all sites on the server
     * @returns {Promise} Resolves into array of site info objects.
     */
    var getSites = function() {
        if (inProgress)
            return inProgress;
        var deferred = $q.defer();
        var cacheKey = ['sites', 'master'];
        if (CacheService.exists(cacheKey)) {
            deferred.resolve(CacheService.get(cacheKey));
        } else {
            inProgress = deferred.promise;
            $http.get(URLService.getSitesURL())
            .success(function(data, status, headers, config) {
                CacheService.put(cacheKey, data, true, function(site, i) {
                    return {key: ['sites', 'master', site.name], value: site, merge: true};
                });
                deferred.resolve(CacheService.get(cacheKey));
                inProgress = null;
            }).error(function(data, status, headers, config) {
                URLService.handleHttpStatus(data, status, headers, config, deferred);
                inProgress = null;
            });
        }
        return deferred.promise;
    };


    var getSiteProjects = function(site) {

    };

    return {
        getCurrentSite: getCurrentSite,
        setCurrentSite: setCurrentSite,
        getSites: getSites,
        getSite: getSite,
        getSiteProjects: getSiteProjects
    };
}
// Source: src/services/URLService.js
angular.module('mms')
.provider('URLService', function URLServiceProvider() {
    var baseUrl = '/alfresco/service';

    this.setBaseUrl = function(base) {
        baseUrl = base;
    };

    this.$get = [function URLServiceFactory() {
        return urlService(baseUrl);
    }];
});

/**
 * @ngdoc service
 * @name mms.URLService
 *
 * @description
 * This utility service gives back url paths for use in other services in communicating
 * with the server, arguments like workspace, version are expected to be strings and
 * not null or undefined. This service is usually called by higher level services and
 * should rarely be used directly by applications.
 *
 * To configure the base url of the ems server, you can use the URLServiceProvider
 * in your application module's config. By default, the baseUrl is '/alfresco/service'
 * which assumes your application is hosted on the same machine as the ems.
 *  <pre>
        angular.module('myApp', ['mms'])
        .config(function(URLServiceProvider) {
            URLServiceProvider.setBaseUrl('https://ems/alfresco/service');
        });
    </pre>
 * (You may run into problems like cross origin security policy that prevents it from
 *  actually getting the resources from a different server, solution TBD)
 */
function urlService(baseUrl) {
    var root = baseUrl;

    /**
     * @ngdoc method
     * @name mms.URLService#isTimestamp
     * @methodOf mms.URLService
     *
     * @description
     * self explanatory
     *
     * @param {string} version A version string or timestamp
     * @returns {boolean} Returns true if the string has '-' in it
     */
    var isTimestamp = function(version) {
        if (String(version).indexOf('-') >= 0)
            return true;
        return false;
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getConfigSnapshotsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets url that gets or posts snapshots for a configuration in a site
     *
     * @param {string} id Id of the configuration
     * @param {string} site Site name
     * @param {string} workspace Workspace name
     * @returns {string} The url
     */
    var getConfigSnapshotsURL = function(id, site, workspace) {
        return root + "/workspaces/" + workspace +
                      "/sites/" + site +
                      "/configurations/" + id +
                      "/snapshots";
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getProductSnapshotsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets url that gets or creates snapshots for a product in a site
     *
     * @param {string} id Id of the product
     * @param {string} site Site name
     * @param {string} workspace Workspace name
     * @returns {string} The url
     */
    var getProductSnapshotsURL = function(id, site, workspace) {
        return root + "/workspaces/" + workspace +
                      "/sites/" + site +
                      "/products/" + id +
                      "/snapshots";
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getSiteConfigsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets url that gets or creates configurations in a site
     *
     * @param {string} site Site name
     * @param {string} workspace Workspace name
     * @returns {string} The url
     */
    var getSiteConfigsURL = function(site, workspace) {
        return root + "/workspaces/" + workspace +
                      "/sites/" + site +
                      "/configurations";
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getConfigProductsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets url that gets or posts products in a configuration
     *
     * @param {string} id Id of the configuration
     * @param {string} site Site name
     * @param {string} workspace Workspace name
     * @returns {string} The url
     */
    var getConfigProductsURL = function (id, site, workspace) {
        return root + "/workspaces/" + workspace +
                      "/sites/" + site +
                      "/configurations/" + id +
                      "/products";
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getConfigURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets url that gets a configuration
     *
     * @param {string} id Id of the configuration
     * @param {string} site Site name
     * @param {string} workspace Workspace name
     * @returns {string} The url
     */
    var getConfigURL = function(id, site, workspace) {
        return root + "/workspaces/" + workspace +
                      "/sites/" + site +
                      "/configurations/" + id;
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getConfigProductsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets url that gets products in a site
     *
     * @param {string} site Site name
     * @param {string} workspace Workspace name
     * @returns {string} The url
     */
    var getSiteProductsURL = function(site, workspace) {
        return root + "/workspaces/" + workspace +
                      "/sites/" + site +
                      "/products";
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getImageURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the url for querying an image url
     * (this is not the actual image path)
     *
     * @param {string} id The id of the image
     * @param {string} workspace Workspace name
     * @param {string} version Timestamp or version number
     * @returns {string} The path for image url queries.
     */
    var getImageURL = function(id, workspace, version) {
        var r = root + '/workspaces/' + workspace + '/artifacts/' + id;
        return addVersion(r, version);
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getSiteDashboardURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the path for a site dashboard.
     *
     * @param {string} site Site name (not title!).
     * @returns {string} The path for site dashboard.
     */
    var getSiteDashboardURL = function(site) {
        return "/share/page/site/" + site + "/dashboard";
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getElementURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the path for an element
     *
     * @param {string} id The element id.
     * @param {string} workspace Workspace name
     * @param {string} version Timestamp or version number
     * @returns {string} The url.
     */
    var getElementURL = function(id, workspace, version) {
        var r = root + '/workspaces/' + workspace + '/elements/' + id;
        return addVersion(r, version);
    };

    var getOwnedElementURL = function(id, workspace, version) {

        var r = root + '/workspaces/' + workspace + '/elements/' + id + '?recurse=true';
        // TODO return addVersion(r, version);
        return r;

    };

    /**
     * @ngdoc method
     * @name mms.URLService#getDocumentViewsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the url to get all views in a document
     *
     * @param {string} id The document id.
     * @param {string} workspace Workspace name
     * @param {string} version Timestamp or version number
     * @returns {string} The url.
     */
    var getDocumentViewsURL = function(id, workspace, version, simple) {
        var r = root + "/javawebscripts/products/" + id + "/views";
        //var r = root + "/workspaces/" + workspace + "/products/" + id + "/views";
        r = addVersion(r, version);
        if (simple) {
            if (r.indexOf('?') > 0)
                r += '&simple=true';
            else
                r += '?simple=true';
        }
        return r;
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getViewElementsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the url to get all elements referenced in a view
     *
     * @param {string} id The view id.
     * @param {string} workspace Workspace name
     * @param {string} version Timestamp or version number
     * @returns {string} The url.
     */
    var getViewElementsURL = function(id, workspace, version) {
        var r = root + "/javawebscripts/views/" + id + "/elements";
        //var r = root + "/workspaces/" + workspace + "/views/" + id + "/elements";
        return addVersion(r, version);
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getElementVersionsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the url to query for element history
     *
     * @param {string} id The element id.
     * @param {string} workspace Workspace name
     * @returns {string} The url.
     */
    var getElementVersionsURL = function(id, workspace) {
        return root + "/javawebscripts/elements/" + id + "/versions";
        //return root + '/workspaces/' + workspace + '/elements/' + id + '/versions';
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getPostElementsURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the path for posting element changes.
     *
     * @param {string} workspace Workspace name
     * @returns {string} The post elements url.
     */
    var getPostElementsURL = function(workspace) {
        return root + '/workspaces/' + workspace + '/elements';
    };

    /**
     * @ngdoc method
     * @name mms.URLService#handleHttpStatus
     * @methodOf mms.URLService
     *
     * @description
     * Utility for setting the state of a deferred object based on the status
     * of http error. The arguments are the same as angular's $http error
     * callback
     *
     * @param {Object} data The http response
     * @param {number} status Http return status
     * @param {Object} header Http return header
     * @param {Object} config Http config
     * @param {Object} deferred A deferred object that would be rejected
     *      with this object based on the http status:
     *      ```
     *          {
     *              status: status,
     *              message: http status message,
     *              data: data
     *          }
     *      ```
     */
    var handleHttpStatus = function(data, status, header, config, deferred) {
        var result = {status: status, data: data};
        if (status === 404)
            result.message = "Not Found";
        else if (status === 500)
            result.message = "Server Error";
        else if (status === 401 || status === 403)
            result.message = "Permission Error";
        else if (status === 409)
            result.message = "Conflict";
        else
            result.message = "Failed";
        deferred.reject(result);
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getSitesURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the url to query sites.
     *
     * @returns {string} The url.
     */
    var getSitesURL = function() {
        return root + "/rest/sites";
    };

    /**
     * @ngdoc method
     * @name mms.URLService#getElementSearchURL
     * @methodOf mms.URLService
     *
     * @description
     * Gets the url for element keyword search.
     *
     * @param {string} query Keyword query
     * @param {string} workspace Workspace name to search under
     * @returns {string} The post elements url.
     */
    var getElementSearchURL = function(query, workspace) {
        return root + "/javawebscripts/element/search?keyword=" + query;
    };

    var getWorkspacesURL = function() {
        return root + '/workspaces';
    };

    var getWorkspaceURL = function(ws) {
        return root + '/workspaces/' + ws;
    };

    var getWsDiffURL = function(ws1, ws2, ws1time, ws2time) {
        var r = root + '/diff?sourceWs=' + ws2 + '&targetWs=' + ws2;
        if (ws1time && ws1time !== 'latest')
            r += '&sourceTimestamp=' + ws1time;
        if (ws2time && ws2time !== 'latest')
            r += '&targetTimestamp=' + ws2time;
    };

    var addVersion = function(url, version) {
        if (version === 'latest')
            return url;
        if (isTimestamp(version))
            return url + '?timestamp=' + version;
        else
            return url + '/versions/' + version;
    };

    return {
        getSiteDashboardURL: getSiteDashboardURL,
        getElementURL: getElementURL,
        getOwnedElementURL: getOwnedElementURL,
        getElementVersionsURL: getElementVersionsURL,
        getPostElementsURL: getPostElementsURL,
        handleHttpStatus: handleHttpStatus,
        getSitesURL: getSitesURL,
        getElementSearchURL: getElementSearchURL,
        getImageURL: getImageURL,
        getProductSnapshotsURL: getProductSnapshotsURL,
        getConfigSnapshotsURL: getConfigSnapshotsURL,
        getSiteProductsURL: getSiteProductsURL,
        getConfigURL: getConfigURL,
        getSiteConfigsURL: getSiteConfigsURL,
        getConfigProductsURL : getConfigProductsURL,
        getDocumentViewsURL: getDocumentViewsURL,
        getViewElementsURL: getViewElementsURL,
        getWsDiffURL: getWsDiffURL,
        getWorkspacesURL: getWorkspacesURL,
        getWorkspaceURL: getWorkspaceURL,
        isTimestamp: isTimestamp
    };

}
// Source: src/services/UtilsService.js
angular.module('mms')
.factory('UtilsService', ['_', UtilsService]);

/**
 * @ngdoc service
 * @name mms.UtilsService
 * @requires _
 *
 * @description
 * Utilities
 */
function UtilsService(_) {
    var nonEditKeys = ['contains', 'view2view', 'childrenViews', 'displayedElements',
        'allowedElements'];

    var hasCircularReference = function(scope, curId, curType) {
        var curscope = scope;
        while (curscope.$parent) {
            var parent = curscope.$parent;
            if (parent.mmsEid === curId && parent.cfType === curType)
                return true;
            curscope = parent;
        }
        return false;
    };

    var cleanElement = function(elem, forEdit) {
        if (elem.hasOwnProperty('specialization')) {
            if (elem.specialization.type === 'Property') {
                var spec = elem.specialization;
                if (!_.isArray(spec.value))
                    spec.value = [];
                spec.value.forEach(function(val) {
                    if (val.hasOwnProperty('specialization'))
                        delete val.specialization;
                });
            }
            if (elem.specialization.type === 'View') {
                //delete elem.specialization.displayedElements;
                //delete elem.specialization.allowedElements;
            }
            if (elem.specialization.hasOwnProperty('specialization')) {
                delete elem.specialization.specialization;
            }
            if (forEdit) {
                for (var i = 0; i < nonEditKeys.length; i++) {
                    if (elem.specialization.hasOwnProperty(nonEditKeys[i])) {
                        delete elem.specialization[nonEditKeys[i]];
                    }
                }
            }
        }
        return elem;
    };


    /**
     * @ngdoc method
     * @name mms.UtilsService#normalize
     * @methodOf mms.UtilsService
     *
     * @description
     * Normalize common arguments
     *
     * @param {Object} ob Object with update, workspace, version keys
     * @returns {Object} object with update, ws, ver keys based on the input.
     *      default values: {update: false, ws: 'master', ver: 'latest'}
     */
    var normalize = function(ob) {
        var res = {};
        res.update = !ob.update? false : ob.update;
        res.ws = !ob.workspace ? 'master' : ob.workspace;
        res.ver = !ob.version ? 'latest' : ob.version;
        return res;
    };

    /**
     * @ngdoc method
     * @name mms.UtilsService#makeElementKey
     * @methodOf mms.UtilsService
     *
     * @description
     * Make key for element for use in CacheService
     *
     * @param {string} id id of element
     * @param {string} [workspace=master] workspace
     * @param {string} [version=latest] version or timestamp
     * @param {boolean} [edited=false] element is to be edited
     * @returns {Array} key to be used in CacheService
     */
    var makeElementKey = function(id, workspace, version, edited) {
        var ws = !workspace ? 'master' : workspace;
        var ver = !version ? 'latest' : version;
        if (edited)
            return ['elements', ws, id, ver, 'edit'];
        else
            return ['elements', ws, id, ver];
    };

    return {
        hasCircularReference: hasCircularReference,
        cleanElement: cleanElement,
        normalize: normalize,
        makeElementKey: makeElementKey
    };
}
// Source: src/services/ViewService.js
angular.module('mms')
.factory('ViewService', ['$q', '$http', 'URLService', 'ElementService', 'UtilsService', 'CacheService', '_', ViewService]);

/**
 * @ngdoc service
 * @name mms.ViewService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 * @requires mms.ElementService
 * @requires mms.UtilsService
 * @requires mms.CacheService
 * @requires _
 *
 * @description
 * Similar to the ElementService and proxies a lot of functions to it, this provides
 * CRUD for views and products/documents
 *
 * For View and Product json object schemas, see [here](https://ems/alfresco/mms/raml/index.html)
 */
function ViewService($q, $http, URLService, ElementService, UtilsService, CacheService, _) {
    var currentViewId = '';
    var currentDocumentId = '';

    /**
     * @ngdoc method
     * @name mms.ViewService#getView
     * @methodOf mms.ViewService
     *
     * @description
     * Gets a view object by id.
     *
     * @param {string} id The id of the view to get.
     * @param {boolean} [update=false] (optional) whether to always get the latest
     *      from server, even if it's already in cache (this will update everywhere
     *      it's displayed, except for the editables)
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with the view object,
     *      multiple calls to this method with the same id would result in
     *      references to the same object.
     */
    var getView = function(id, update, workspace, version) {
        return ElementService.getElement(id, update, workspace, version);
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#getViews
     * @methodOf mms.ViewService
     *
     * @description
     * Same as getView, but for multiple ids.
     *
     * @param {Array.<string>} ids The ids of the views to get.
     * @param {boolean} [update=false] (optional) whether to always get the latest
     *      from server, even if it's already in cache (this will update everywhere
     *      it's displayed, except for the editables)
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with an array of view objects,
     *      multiple calls to this method with the same ids would result in an array of
     *      references to the same objects.
     */
    var getViews = function(ids, update, workspace, version) {
        return ElementService.getElements(ids, update, workspace, version);
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#getDocument
     * @methodOf mms.ViewService
     *
     * @description
     * Gets a document object by id.
     *
     * @param {string} id The id of the document to get.
     * @param {boolean} [update=false] (optional) whether to always get the latest
     *      from server, even if it's already in cache (this will update everywhere
     *      it's displayed, except for the editables)
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with the document object,
     *      multiple calls to this method with the same id would result in
     *      references to the same object.
     */
    var getDocument = function(id, update, workspace, version) {
        return ElementService.getElement(id, update, workspace, version);
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#updateView
     * @methodOf mms.ViewService
     *
     * @description
     * Save view to alfresco and update the cache if successful, the view object
     * must have an id, and some updated properties. Use this to update view structure
     * or view to element reference caches.
     *
     * @param {Object} view An object that contains view id and any changes to be saved.
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with the updated view
     */
    var updateView = function(view, workspace) {
        return ElementService.updateElement(view, workspace);
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#updateDocument
     * @methodOf mms.ViewService
     *
     * @description
     * Save document to alfresco and update the cache if successful, the document object
     * must have an id, and some updated properties. Use this to update a document's
     * view hierarchy
     *
     * @param {Object} document An object that contains doc id and any changes to be saved.
     * @param {string} [workspace=master] (optional) workspace to use
     * @returns {Promise} The promise will be resolved with the updated doc
     */
    var updateDocument = function(document, workspace) {
        return ElementService.updateElement(document, workspace);
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#getViewElements
     * @methodOf mms.ViewService
     *
     * @description
     * Gets the element objects for elements allowed in this view. The references are
     * the same as ones gotten from ElementService.
     *
     * @param {string} id The id of the view.
     * @param {boolean} [update=false] (optional) whether to always get the latest
     *      from server, even if it's already in cache (this will update everywhere
     *      it's displayed, except for the editables)
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with array of element objects.
     */
    var getViewElements = function(id, update, workspace, version) {
        var n = normalize(update, workspace, version);
        var deferred = $q.defer();
        var url = URLService.getViewElementsURL(id, n.ws, n.ver);
        var cacheKey = ['views', n.ws, id, n.ver, 'elements'];
        if (CacheService.exists(cacheKey) && !n.update)
            deferred.resolve(CacheService.get(cacheKey));
        else {
            ElementService.getGenericElements(url, 'elements', n.update, n.ws, n.ver).
            then(function(data) {
                deferred.resolve(CacheService.put(cacheKey, data, false));
            }, function(reason) {
                deferred.reject(reason);
            });
        }
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#getDocumentViews
     * @methodOf mms.ViewService
     *
     * @description
     * Gets the view objects for a document. The references are
     * the same as ones gotten from ElementService.
     *
     * @param {string} id The id of the document.
     * @param {boolean} [update=false] (optional) whether to always get the latest
     *      from server, even if it's already in cache (this will update everywhere
     *      it's displayed, except for the editables)
     * @param {string} [workspace=master] (optional) workspace to use
     * @param {string} [version=latest] (optional) alfresco version number or timestamp
     * @returns {Promise} The promise will be resolved with array of view objects.
     */
    var getDocumentViews = function(id, update, workspace, version, simple) {
        var n = normalize(update, workspace, version);
        var s = !simple ? false : simple;
        var deferred = $q.defer();
        var url = URLService.getDocumentViewsURL(id, n.ws, n.ver, s);
        var cacheKey = ['products', n.ws, id, n.ver, 'views'];
        if (CacheService.exists(cacheKey) && !n.update)
            deferred.resolve(CacheService.get(cacheKey));
        else {
            ElementService.getGenericElements(url, 'views', n.update, n.ws, n.ver).
            then(function(data) {
                deferred.resolve(CacheService.put(cacheKey, data, false));
            }, function(reason) {
                deferred.reject(reason);
            });
        }
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#addViewToDocument
     * @methodOf mms.ViewService
     *
     * @description
     * This updates a document to include a new view, the new view must be a child
     * of an existing view in the document
     *
     * @param {string} viewid Id of the view to add
     * @param {string} documentId Id of the document to add the view to
     * @param {string} parentViewId Id of the parent view, this view should
     *      already be in the document
     * @param {string} [workspace=master] workspace to use
     * @returns {Promise} The promise would be resolved with updated document object
     */
    var addViewToDocument = function(viewId, documentId, parentViewId, workspace, viewOb) {
        var deferred = $q.defer();
        var ws = !workspace ? 'master' : workspace;
        var docViewsCacheKey = ['products', ws, documentId, 'latest', 'views'];
        getDocument(documentId, workspace)
        .then(function(data) {
            var clone = {};
            clone.sysmlid = data.sysmlid;
            clone.read = data.read;
            clone.specialization = _.cloneDeep(data.specialization);
            delete clone.specialization.contains;
            for (var i = 0; i < clone.specialization.view2view.length; i++) {
                if (clone.specialization.view2view[i].id === parentViewId) {
                    clone.specialization.view2view[i].childrenViews.push(viewId);
                    break;
                }
            }
            clone.specialization.view2view.push({id: viewId, childrenViews: []});
            updateDocument(clone, workspace)
            .then(function(data2) {
                if (CacheService.exists(docViewsCacheKey) && viewOb)
                    CacheService.get(docViewsCacheKey).push(viewOb);
                deferred.resolve(data2);
            }, function(reason) {
                if (reason.status === 409) {
                    clone.read = reason.data.elements[0].read;
                    updateDocument(clone, workspace)
                    .then(function(data3) {
                        if (CacheService.exists(docViewsCacheKey) && viewOb)
                            CacheService.get(docViewsCacheKey).push(viewOb);
                        deferred.resolve(data3);
                    }, function(reason2) {
                        deferred.reject(reason2);
                    });
                } else
                    deferred.reject(reason);
            });
        }, function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#createView
     * @methodOf mms.ViewService
     *
     * @description
     * Create a new view, owner must be specified (parent view), id cannot be specified,
     * if name isn't specified, "Untitled" will be used, a default contains with
     * paragraph of the view documentation will be used. If a document is specified,
     * will also add the view to the document, in this case the parent view should
     * already be in the document. The new view will be added as the last child of the
     * parent view.
     *
     * @param {string} ownerId Id of the parent view
     * @param {string} [name=Untitled] name for the view
     * @param {string} [documentId] optional document to add to
     * @param {string} [workspace=master] workspace to use
     * @returns {Promise} The promise will be resolved with the new view.
     */
    var createView = function(ownerId, name, documentId, workspace) {
        var deferred = $q.defer();
        var view = {
            specialization: {type: 'View', contains: []},
            owner: ownerId,
            name: !name ? 'Untitled View' : name,
            documentation: '',
        };
        ElementService.createElement(view, workspace)
        .then(function(data) {
            data.specialization.contains = [
                {
                    'type': 'Paragraph',
                    'sourceType': 'reference',
                    'source': data.sysmlid,
                    'sourceProperty': 'documentation'
                }
            ];
            data.specialization.allowedElements = [data.sysmlid];
            data.specialization.displayedElements = [data.sysmlid];
            data.specialization.childrenViews = [];
            ElementService.updateElement(data, workspace)
            .then(function(data2) {
                if (documentId) {
                    addViewToDocument(data.sysmlid, documentId, ownerId, workspace, data2)
                    .then(function(data3) {
                        deferred.resolve(data2);
                    }, function(reason) {
                        deferred.reject(reason);
                    });
                } else
                    deferred.resolve(data2);
            }, function(reason) {
                deferred.reject(reason);
            });
        }, function(reason) {
            deferred.reject(reason);
        });
        return deferred.promise;
    };

    /**
     * @ngdoc method
     * @name mms.ViewService#getSiteDocuments
     * @methodOf mms.ViewService
     *
     * @description
     * Gets all the documents in a site
     *
     * @param {string} site Site name
     * @param {boolean} [update=false] Update latest
     * @param {string} [workspace=master] workspace to use
     * @returns {Promise} The promise will be resolved with array of document objects
     */
    var getSiteDocuments = function(site, update, workspace) {
        var n = normalize(update, workspace, null);
        var deferred = $q.defer();
        var url = URLService.getSiteProductsURL(site, n.ws);
        var cacheKey = ['sites', n.ws, site, 'products'];
        if (CacheService.exists(cacheKey) && !n.update)
            deferred.resolve(CacheService.get(cacheKey));
        else {
            ElementService.getGenericElements(url, 'products', n.update, n.ws).
            then(function(data) {
                deferred.resolve(CacheService.put(cacheKey, data, false));
            }, function(reason) {
                deferred.reject(reason);
            });
        }
        return deferred.promise;
    };

    //TODO remove
    var setCurrentViewId = function(id) {
        currentViewId = id;
    };

    var setCurrentDocumentId = function(id) {
        currentDocumentId = id;
    };

    var getCurrentViewId = function() {
        return currentViewId;
    };

    var getCurrentDocumentId = function() {
        return currentDocumentId;
    };

    var normalize = function(update, workspace, version) {
        return UtilsService.normalize({update: update, workspace: workspace, version: version});
    };

    return {
        getView: getView,
        getViews: getViews,
        getDocument: getDocument,
        updateView: updateView,
        updateDocument: updateDocument,
        getViewElements: getViewElements,
        createView: createView,
        addViewToDocument: addViewToDocument,
        getDocumentViews: getDocumentViews,
        getSiteDocuments: getSiteDocuments,
        setCurrentViewId: setCurrentViewId,
        setCurrentDocumentId: setCurrentDocumentId,
        getCurrentViewId: getCurrentViewId,
        getCurrentDocumentId: getCurrentDocumentId
    };

}
// Source: src/services/VizService.js
angular.module('mms')
.factory('VizService', ['$q', '$http', 'URLService', 'CacheService', 'UtilsService', VizService]);

/**
 * @ngdoc service
 * @name mms.VizService
 * @requires $q
 * @requires $http
 * @requires mms.URLService
 * @requries mms.CacheService
 * @requires mms.UtilsService
 *
 * @description
 * This service handles visualization needs and diagramming (TBD)
 */
function VizService($q, $http, URLService, CacheService, UtilsService) {

    /**
     * @ngdoc method
     * @name mms.VizService#getImageURL
     * @methodOf mms.VizService
     *
     * @description
     * Gets the url for an image link based on the Magicdraw diagram id
     *
     * @param {string} id The id of the Magicdraw diagram.
     * @param {boolean} [update=false] update from server
     * @param {string} [workspace=master] the workspace
     * @param {string} [version=latest] timestamp or version
     * @returns {Promise} The promise will be resolved with the latest image url
     */
    var getImageURL = function(id, update, workspace, version) {
        var n = normalize(id, update, workspace, version);
        var deferred = $q.defer();
        if (CacheService.exists(n.cacheKey) && !n.update) {
            deferred.resolve(CacheService.get(n.cacheKey));
            return deferred.promise;
        }
        $http.get(URLService.getImageURL(id, n.ws, n.ver))
        .success(function(data, status, headers, config) {
            deferred.resolve(CacheService.put(n.cacheKey, '/alfresco' + data.artifacts[0].url, false));
        }).error(function(data, status, headers, config) {
            URLService.handleHttpStatus(data, status, headers, config, deferred);
        });
        return deferred.promise;
    };

    var normalize = function(id, update, workspace, version) {
        var res = UtilsService.normalize({update: update, workspace: workspace, version: version});
        res.cacheKey = ['artifactUrl', id, res.ws, res.ver];
        return res;
    };

    return {
        getImageURL: getImageURL,
    };

}
// Source: src/services/WorkspaceService.js
angular.module('mms')
.factory('WorkspaceService', ['$http', '$q', 'URLService', 'ElementService', 'CacheService', WorkspaceService]);

/**
 * @ngdoc service
 * @name mms.WorkspaceService
 * @requires $http
 * @requires $q
 *
 * @description
 */
function WorkspaceService($http, $q, URLService, ElementService, CacheService) {
    var inProgress = null;

    var dummy = {
        "workspace1":{
            creator: 'dlam',
            created: '2014-07-30T09:21:29.032-0700',
            id: 'master',
            name: 'base',
            parent: null,
            elements:[
             {
                documentation:'Lorem ipsum dolor set amit.',
                sysmlid:'_123_394241_12',
                name:'',
                owner:'Lunch',
                specialization:{
                   type:'Property',
                   isDerived:'false',
                   value:[
                      {
                         type:'LiteralString',
                         string:'binada_string'
                      }
                   ]
                }
             },
             {
                "documentation":"Bacon ipsum pork set amit.",
                "sysmlid":"_456_93419_14",
                "name":"Burger",
                "owner":"Lunch",
                "specialization":{
                   "type":"Property",
                   "isDerived":"false",
                   "value":[
                      {
                         "type":"LiteralString",
                         "string":"binada_string"
                      }
                   ]
                }
             },
             {
                "documentation":"Foobar baz foo spam.",
                "sysmlid":"_789_18919_19",
                "name":"Pad Thai",
                "owner":"Lunch",
                "specialization":{
                   "type":"Property",
                   "isDerived":"false",
                   "value":[
                      {
                         "type":"LiteralString",
                         "string":"binada_string"
                      }
                   ]
                }
             },
             {
                "documentation":"Foobar baz foo spam.",
                "sysmlid":"Lunch",
                "name":"Lunch",
                "owner":"Meals",
                "specialization":{
                   "type":"Element"
                }
             },
             {
                "documentation":"Foobar baz foo spam.",
                "sysmlid":"Dinner",
                "name":"Dinner",
                "owner":"Meals",
                "specialization":{
                   "type":"Element"
                }
             },
             {
                "documentation":"Foobar baz foo spam.",
                "sysmlid":"Meals",
                "name":"Meals",
                "owner":"null",
                "specialization":{
                   "type":"Package"
                }
             }
          ],
          "graph":[
             {
                "sysmlid":"Meals",
                "edges":[
                   "Lunch",
                   "Dinner"
                ]
             },
             {
                "sysmlid":"Lunch",
                "edges":[
                   "_123_394241_12",
                   "_456_93419_14",
                   "_789_18919_19"
                ]
             },
             {
                "sysmlid":"Dinner",
                "edges":[

                ]
             }
          ]
       },
       "workspace2":{
          creator: 'raffi',
          created: '2014-07-31T09:21:29.032-0700',
          id: 'test',
          name: 'test',
          parent: 'master',
          updatedElements:[
             {
                sysmlid:'_123_394241_12',
                name:'Skewer'
             }
          ],
          addedElements:[
             {
                documentation:'Salad ipsum dolor set amit.',
                sysmlid:'_192_19342_22',
                name:'Salad',
                owner:'Lunch',
                specialization:{
                   type:'Property',
                   isDerived:'false',
                   value:[
                      {
                         type:'LiteralString',
                         string:'binada_string'
                      }
                   ]
                }
             }
          ],
          deletedElements:[
             {
                sysmlid:'_456_93419_14'
             }
          ],
          movedElements:[
             {
                sysmlid:'_789_18919_19',
                owner:'Dinner'
             }
          ],
          conflicts:[

          ]
       }
    };

    var getAll = function() {
        if (inProgress)
            return inProgress;

        var deferred = $q.defer();
        var cacheKey = ['workspaces', 'master'];
        if (CacheService.exists(cacheKey)) {
            deferred.resolve(CacheService.get(cacheKey));
        } else {
            inProgress = deferred.promise;
            $http.get(URLService.getWorkspacesURL())
            .success(function(data, status, headers, config) {
                CacheService.put(cacheKey, data.workspaces, true, function(workspace, i) {
                    return {key: ['workspaces', workspace.parent, workspace.name], value: workspace, merge: true};
                });
                deferred.resolve(CacheService.get(cacheKey));
                inProgress = null;
            }).error(function(data, status, headers, config) {
                URLService.handleHttpStatus(data, status, headers, config, deferred);
                inProgress = null;
            });
        }
        return deferred.promise;

        /*var deferred = $q.defer();
        deferred.resolve([
            {
                creator: 'dlam',
                created: '2014-07-30T09:21:29.032-0700',
                id: 'master',
                name: 'base',
                parent: null
            },
            {
                creator: 'raffi',
                created: '2014-07-31T09:21:29.032-0700',
                id: 'test',
                name: 'test',
                parent: 'master'
            }
        ]);
        return deferred.promise; */
    };

    var get = function(ws) {

    };

    var diff = function(ws1, ws2, ws1time, ws2time) {
        var deferred = $q.defer();
        deferred.resolve(dummy);
        return deferred.promise;
    };

    var merge = function(changes, targetWs) {
        var deferred = $q.defer();
        deferred.resolve('ok');
        return deferred.promise;
    };

    var remove = function(ws) {

    };

    var create = function(name, parentWs) {

    };


    return {
        getAll: getAll,
        get: get,
        diff: diff,
        merge: merge,
        remove: remove,
        create: create
    };

}
