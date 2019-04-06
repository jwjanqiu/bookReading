// pages/stack/stack.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    stack: [],
    id: "",
    page: 1,
    pageSize: 10,
    hasMoreData: true
  },

  /**
   * 获取所有书籍
   */
  getAllBook: function(message) {
    var url = app.globalData.url
    var that = this
    wx.showNavigationBarLoading()
    if (message != "") {
      wx.showLoading({
        title: message,
      })
    }
    wx.request({
      // url: 'https://www.easy-mock.com/mock/5c8b792b0e11997fba90a4ef/getArticInfo',
      url: url + '/getAllBook',
      data: {
        page: that.data.page,
        token: app.globalData.token
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        //请求后关闭请求标志
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        //获取已有数据
        var stackTem = that.data.stack
        //状态码为1时进行拼装
        if (res.data.code == 1) {
          if (that.data.page == 1) {
            stackTem = []
          }
          //新请求数据
          var stack = res.data.data
          //新请求数据长度比每页数据长度小，表明无更多数据
          if (stack.length < that.data.pageSize) {
            that.setData({
              stack: stackTem.concat(stack),
              hasMoreData: false
            })
          } else {
            //反之有数据，页数加1
            that.setData({
              stack: stackTem.concat(stack),
              hasMoreData: true,
              page: that.data.page + 1
            })
          }
        } else {
          //状态码不为1时，展示错误原因
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        }
      },
      fail: function(res) {
        //请求后关闭请求标志
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        wx.showToast({
          title: '加载数据失败',
          icon: 'none'
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setSkin(this)
    var that = this
    this.getAllBook('正在请求数据')
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
    this.data.page = 1
    this.getAllBook('正在刷新数据')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.getAllBook('正在加载更多数据')
    } else {
      wx.showToast({
        title: '已无更多数据',
        icon: 'none'
      })
    }
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})