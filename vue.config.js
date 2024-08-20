
module.exports = {
    devServer: {
        host: process.env.LOCAL_IPADDRESS || 'http://localhost', // 使用本地 IP 地址而非localhost
        port: 8080 // 使用的端口
    }
}