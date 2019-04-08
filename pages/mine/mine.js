// pages/mine/mine.js
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    skin: "",
    switchStatus: false,
    userName: '',
    token: ''
  },

  /**
   * 登录
   */
  login: function(e) {
    wx.redirectTo({
      url: '../login/login',
    })
  },

  /**
   * 夜间模式
   */
  switchChange: function(e) {
    var that = this
    //获取开关状态
    var checkedValue = e.detail.value
    var skin
    //根据开关选取皮肤
    if (checkedValue) {
      skin = 'dark'
    } else {
      skin = 'normal'
    }
    that.setData({
      skin: skin + '-skin'
    })
    wx.setStorage({
      key: 'skin',
      data: skin + '-skin',
    })
    app.setSkin(this)
    if (skin == 'dark') {
      that.setData({
        switchStatus: true
      })
    } else {
      that.setData({
        switchStatus: false
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this
    wx.getStorage({
      key: 'skin',
      success: function(res) {
        var skin = res.data
        if (skin == 'dark-skin') {
          that.setData({
            switchStatus: true
          })
        }
      },
    })
    that.setData({
      userName: app.globalData.userName,
      token: app.globalData.token
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    app.setSkin(this)
    var that = this
    that.setData({
      userName: app.globalData.userName,
      token: app.globalData.token
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})