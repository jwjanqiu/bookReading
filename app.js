//app.js
App({
  data: {
    skin: wx.getStorageSync('skin') || 'normal-skin',
    index: 'pages/index/index',
    skins: {
      'normal-skin': {
        tag: '默认',
        color: '#000000',
        background: '#f6f6f6'
      },
      'dark-skin': {
        tag: '深黑',
        color: '#999999',
        background: '#000000'
      }
    }
  },
  onLaunch: function() {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    var that = this
    //获取storage的token
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
        if (res) {
          //有数据且在有效期内把缓存数据赋值给全局变量
          var timestamp = Date.parse(new Date());
          timestamp = timestamp / 1000;
          if (timestamp <= res.data.expireDate) {
            that.globalData.token = res.data.token
            that.globalData.userName = res.data.userName
          }
        }
      },
    })
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  globalData: {
    userInfo: null,
    url: 'https://axinreading.qiuyunxin.com/api',
    // url: 'http://xinreading.com/api',
    token: '',
    userName: ''
  },
  setSkin: function(that) {
    wx.getStorage({
      key: 'skin',
      success: function(res) {
        if (res) {
          that.setData({
            skin: res.data
          })
          var fcolor = res.data == 'dark-skin' ? '#ffffff' : '#000000',
            obj = {
              'normal-skin': {
                color: '#000000',
                background: '#f6f6f6'
              },
              'dark-skin': {
                color: '#ffffff',
                background: '#000000'
              }
            },
            item = obj[res.data],
            tcolor = item.color,
            bcolor = item.background;

          wx.setNavigationBarColor({
            frontColor: fcolor,
            backgroundColor: bcolor,
          })

          wx.setTabBarStyle({
            color: tcolor,
            backgroundColor: bcolor,
          })
        }
      }
    })
  }
})