// pages/bookdesk/bookdesk.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hour: 0,
    minute: 0,
    second: 0,
    date: '',
    week: '',
    desktop: []
  },

  /**
   * 时钟
   */
  timing: function(that) {
    setInterval(function() {
      //获取当前时间
      var date = new Date()
      //获取年
      var y = date.getFullYear()
      //获取月
      var M = (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1)
      //获取日
      var d = date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
      //获取时
      var h = date.getHours()
      //获取分
      var m = date.getMinutes()
      //获取秒
      var s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds()
      //获取星期几
      var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星球六']
      var week_index = date.getDay()
      var weekday = week[week_index]
      that.setData({
        hour: h,
        minute: m,
        second: s,
        date: y + '-' + M + '-' + d,
        week: weekday
      })
    }, 1000)
  },

  /**
   * 书籍轮播
   */
  desktopRequest: function() {
    var that = this
    wx.request({
      url: app.globalData.url + '/desktop',
      data: {
        token: app.globalData.token
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code != 1) {
          wx.showToast({
            title: '服务器出了问题，请稍后再试(#^.^#)',
            icon: 'none',
            duration: 1500
          })
        } else {
          that.setData({
            desktop: res.data.data
          })
        }
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //修改皮肤
    app.setSkin(this)
    this.timing(this)
    //请求数据
    this.desktopRequest()
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
    //修改皮肤
    app.setSkin(this)
    this.timing(this)
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