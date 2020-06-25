
// How to bypass create-react-app imports restriction outside of src directory 
// https://stackoverflow.com/a/55298684/11082043
// https://github.com/timarney/react-app-rewired
const ModuleScopePlugin = require('react-dev-utils/ModuleScopePlugin');

module.exports = function override(config, env) {
    config.resolve.plugins = config.resolve.plugins.filter(plugin => !(plugin instanceof ModuleScopePlugin));

    return config;
};