'use strict';

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