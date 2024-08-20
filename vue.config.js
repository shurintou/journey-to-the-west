const { getLocalIpAddress } = require('./updateEnv')

module.exports = {
    devServer: {
        host: getLocalIpAddress(), // 使用本地 IP 地址而非localhost
        port: 8080 // 使用的端口
    }
}