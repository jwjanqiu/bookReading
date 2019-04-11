// pages/leader/leader.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    daily_beauty: [],
    page: 1,
    pageSize: 10,
    hasMoreData: true
  },

  /**
   * 获取所有每日美图
   */
  getAllDailyBeauty: function(message) {
    //请求共用地址
    var url = app.globalData.url
    var that = this
    //未登录提示去登录
    if (app.globalData.token == '') {
      wx.showToast({
        title: '请先登录',
        icon: 'none',
      })
      setTimeout(function() {
        wx.navigateTo({
          url: '../login/login',
        })
      }, 1000)
    } else {
      //已登录显示请求菊花及信息
      wx.showNavigationBarLoading()
      if (message != "") {
        wx.showLoading({
          title: message,
        })
      }
      //数据请求
      wx.request({
        url: url + '/dailyBeautyList',
        data: {
          token: app.globalData.token,
          page: that.data.page
        },
        method: "POST",
        success: function(res) {
          console.log(res.data)
          //请求后关闭请求标志
          wx.hideNavigationBarLoading()
          if (message != "") {
            wx.hideLoading()
          }
          //获取已有数据
          var beautyTem = that.data.daily_beauty
          //状态码为1时进行拼装
          if (res.data.code == 1) {
            //如果请求页数为第一页，已有数据清空
            if (that.data.page == 1) {
              beautyTem = []
            }
            //新数据
            var beautyList = res.data.data
            //新请求数据长度比每页数据长度小，表明无更多数据
            if (beautyList.length < that.data.pageSize) {
              that.setData({
                daily_beauty: beautyTem.concat(beautyList),
                hasMoreData: false
              })
            } else {
              that.setData({
                daily_beauty: beautyTem.concat(beautyList),
                page: that.data.page + 1,
                hasMoreData: true
              })
            }
          } else {
            if (res.data.code == 401) {
              //状态码不为1时，展示错误原因
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
              setTimeout(function() {
                wx.navigateTo({
                  url: '../login/login',
                })
              }, 500)
            } else {
              //状态码不为1时，展示错误原因
              wx.showToast({
                title: res.data.msg,
                icon: 'none'
              })
            }
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
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    app.setSkin(this)
    //请求beautyList
    this.getAllDailyBeauty('正在请求数据')
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
    //请求beautyList
    this.getAllDailyBeauty('正在请求数据')
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
    this.getAllDailyBeauty('正在刷新数据')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.getAllDailyBeauty('正在加载更多数据')
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