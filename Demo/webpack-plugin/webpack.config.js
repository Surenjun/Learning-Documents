const ConsoleLogOnBuildWebpackPlugin = require("./plugins/myPlugin.js");
module.exports = {
    plugins: [
        new ConsoleLogOnBuildWebpackPlugin()
    ]
}
