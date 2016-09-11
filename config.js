/**
 * Loads config data from config.json or from environment variables
 *
 * All config variables are accessed in the format: config.category.key
 * If using environment variables, the category.key is set as the environment variable.
 *
 * The config schema sets the type to cast to for environment variables.
 * All valid config variables must be in the config schema.
 * Supported types are currently Number, Boolean, and String. The default is String.
 */

"use strict";

var fs = require('fs');
var configVars = require('./library/config_vars.js');

var configSchema = require('./config.schema.json');
if (fs.existsSync('./config.json')) {
    var configData = require('./config.json');
    configVars.validate_against_schema(configSchema, configData);
    module.exports = configData;
} else {
    module.exports = configVars.from_environment(configSchema);
}