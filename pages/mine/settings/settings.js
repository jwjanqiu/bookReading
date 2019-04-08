// pages/mine/settings/settings.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 退出登录
   */
  logout: function(e) {
    var that = this
    wx.request({
      url: app.globalData.url + '/logout',
      data: {
        token: app.globalData.token
      },
      method: "POST",
      success: function(res) {
        wx.removeStorage({
          key: 'userInfo',
          success: function(res) {
            app.globalData.token = ''
            app.globalData.userName = ''
          },
        })
        wx.showToast({
          title: res.data.msg,
          icon: 'none'
        })
        wx.switchTab({
          url: '../mine',
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置皮肤
    app.setSkin(this)
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
    //设置皮肤
    app.setSkin(this)
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