// pages/stack/booklist/bookdetail/bookdetail.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    category: [],
    collection: '',
    page: 1,
    pageSize: 10,
    hasMoreData: true,
    bookTypes: ''
  },

  /**
   * 章节目录请求
   */
  categoryRequest: function(message, collection) {
    var url = app.globalData.url
    var that = this

    var collectionTem = collection
    if (collectionTem) {
      that.setData({
        collection: collectionTem
      })
    }
    console.log(that.data.collection)
    // wx.showNavigationBarLoading()
    // if (message != "") {
    //   wx.showLoading({
    //     title: message,
    //   })
    // }
    wx.request({
      url: url + '/getCategory',
      data: {
        collection: that.data.collection,
        page: that.data.page,
        token: app.globalData.token
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        //隐藏loading
        // wx.hideNavigationBarLoading()
        // if (message != '') {
        //   wx.hideLoading()
        // }
        //获取已有数据
        var categoryTem = that.data.category
        //状态码为1时进行拼装
        if (res.data.code == 1) {
          if (that.data.page == 1) {
            categoryTem = []
          }
          //新请求数据
          var category = res.data.data
          //新请求数据长度比每页数据长度小，表明无更多数据
          if (category.length < that.data.pageSize) {
            that.setData({
              category: categoryTem.concat(category),
              hasMoreData: false
            })
          } else {
            //反之有数据，页数加1
            that.setData({
              category: categoryTem.concat(category),
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
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var collection = options.collection
    //请求章节目录
    this.categoryRequest('正在请求数据', collection)
    //设置头名
    wx.setNavigationBarTitle({
      title: options.bookTypes,
    })
    this.setData({
      bookTypes: options.bookTypes
    })
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
    this.categoryRequest('正在刷新数据')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.categoryRequest('正在加载更多数据', this.data.collection)
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