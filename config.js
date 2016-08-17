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
var configSchema = require('./config.schema.json');
if (fs.existsSync('./config.json')) {
    var configData = require('./config.json');
    validate_against_schema(configData, configSchema);
    module.exports = configData;
} else {
    module.exports = from_environment(configSchema);
}

function normalize_bool(string) {
    if (string.toLowerCase() == "true") {
        return true;
    }
    else if (string.toLowerCase() == "false") {
        return false;
    }
    return string;
}

function traverse_full_config(schema, eachItem) {
    for (var category in schema) { //iterate through each config category
        if (!schema.hasOwnProperty(category) || category == "_comment") continue;
        for (var key in schema[category]) { //retrieve items in each category
            if (!configSchema[category].hasOwnProperty(key) || key == "_comment") continue;
            eachItem(category, key);
        }
    }
}

function validate_against_schema(config, schema) {
    traverse_full_config(schema, function (category, key) {
        if (!config[category][key]) throw new Error("Missing environment variable " + category + "." + key);
        let type = schema[category][key] || "String";
        if (!validate_type(config[category][key], type)) throw new Error("Incorrect type for " + category + "." + key);
    });
}

function from_environment(schema) {
    var configTemplate = {};
    traverse_full_config(schema, function (category, key) {
        if (!process.env.hasOwnProperty(category + "." + key)) throw new Error('Missing environment variable ' + category + "." + key);
        let type = schema[category][key] || "String";
        configTemplate[category][key] = cast_to_type(process.env[category + "." + key], type);
    });
    return configTemplate;
}

function validate_type(variable, type) {
    type = type.toLowerCase();
    return (typeof variable == type);
}

function cast_to_type(variable, type) {
    type = type.toLowerCase();
    switch (type) {
        case "string": {
            return variable.toString();
        }
        case "boolean": {
            return normalize_bool(variable);
        }
        case "number": {
            return Number(variable);
        }
    }
}