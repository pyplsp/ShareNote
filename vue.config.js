module.exports = {
	publicPath: "./",
    devServer:{
        port:3000,
    },
    transpileDependencies: true,
    lintOnSave: false,
    configureWebpack: {
        resolve: {
            alias: {
                'assets': '@/assets',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'main':'@/main',
                'store':'@/store'
            }
        }
    },
}
