const os = require('os')
const fs = require('fs')
const path = require('path')

// 该脚本旨在获取本地 IP 地址并以此更新开发配置文件。

// 获取本地 IP 地址
exports.getLocalIpAddress = function () {
    const interfaces = os.networkInterfaces()
    let ipAddress = null

    for (const iface in interfaces) {
        const ifaceDetails = interfaces[iface]
        if (ifaceDetails) {
            for (const address of ifaceDetails) {
                // 选择 IPv4 地址并排除环回地址
                if (address.family === 'IPv4' && !address.internal) {
                    ipAddress = address.address
                    break
                }
            }
        }
        if (ipAddress) break
    }

    return ipAddress
}

/** 
 * 更新 .env 文件中的 IP 地址
 * @param {string} ipAddress
 * @returns {void}
 */
function updateEnvFile(ipAddress) {
    const envFilePath = path.join(__dirname, '.env.development') // .env 文件路径
    let fileContent = fs.readFileSync(envFilePath, 'utf8')

    // 新的配置项
    const newEnvConfig = [
        `VUE_APP_WS_URL='ws://${ipAddress}:3000'`,
        `VUE_APP_API_URL='http://${ipAddress}:3000/rest/v1'`
    ]

    // 移除旧的配置项并添加新的配置项
    fileContent = fileContent.split('\n').filter(line => {
        return !line.startsWith('VUE_APP_WS_URL') && !line.startsWith('VUE_APP_API_URL')
    }).concat(newEnvConfig).join('\n')

    // 写回 .env 文件
    fs.writeFileSync(envFilePath, fileContent, 'utf8')
}

// 主函数，会在vue.config.js引入该文件时被自动调用。
function main() {
    const ipAddress = exports.getLocalIpAddress()
    if (ipAddress) {
        console.log(`Local IP address: ${ipAddress}`)
        updateEnvFile(ipAddress)
        console.log('.env.development file updated successfully')
    } else {
        console.log('Failed to get local IP address')
    }
}

main()
