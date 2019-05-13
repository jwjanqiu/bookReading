//index.js
//获取应用实例
const app = getApp()
//引入高德地图
var amapFile = require('../../libs/amap-wx.js')
Page({
  data: {
    motto: '欢迎来到阿鑫读书',
    userInfo: {
      'nickName': '阿鑫读书',
      'avatarUrl': 'https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83epsArz5gck1iasrDGv5GMgUgs0kibgPgEKEpWibLQKG8ib6BcgiahcNyQuIoKJXg6vw4mX6p37yES4PZ0w/132'
    },
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    time: 3
  },
  //事件处理函数
  // bindViewTap: function() {
  //   wx.navigateTo({
  //     url: '../logs/logs'
  //   })
  // },
  onLoad: function() {
    //设置皮肤
    app.setSkin(this)
    var url = app.globalData.url
    //上传定位
    //初始化高德地图
    var myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    //获取当前地理位置
    myAmapFun.getRegeo({
      success: function (data) {
        //成功回调
        // console.log(data)
        wx.request({
          url: url + '/uploadLocation',
          data: {
            location: data
          },
          method: 'POST',
          success: function (res) {
            console.log('上传成功')
          }
        })
      },
      fail: function (info) {
        //失败回调
        console.log(info)
      }
    })
    var count = setInterval(() => {
      this.setData({
        time: this.data.time - 1
      });
      if (this.data.time == 0) {
        wx.switchTab({
          url: '../leader/leader',
          complete: function(res) {

          }
        })
        clearInterval(count)
      }
    }, 1000)
    // if (app.globalData.userInfo) {
    //   this.setData({
    //     userInfo: app.globalData.userInfo,
    //     hasUserInfo: true
    //   })
    // } else if (this.data.canIUse) {
    //   // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //   // 所以此处加入 callback 以防止这种情况
    //   app.userInfoReadyCallback = res => {
    //     this.setData({
    //       userInfo: res.userInfo,
    //       hasUserInfo: true
    //     })
    //   }
    // } else {
    //   // 在没有 open-type=getUserInfo 版本的兼容处理
    //   wx.getUserInfo({
    //     success: res => {
    //       app.globalData.userInfo = res.userInfo
    //       this.setData({
    //         userInfo: res.userInfo,
    //         hasUserInfo: true
    //       })
    //     }
    //   })
    // }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})