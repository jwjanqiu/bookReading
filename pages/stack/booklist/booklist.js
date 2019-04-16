// pages/stack/booklist/booklist.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bookList: [],
    stack: [],
    allData: [],
    bookTypes: '',
    page: true
  },

  /**
   * 下一章或上一章
   */
  anotherPage: function (e) {
    var url = app.globalData.url
    var that = this
    var collection = e.target.dataset.collection
    var id = e.target.dataset.id
    that.setData({
      page: false
    })
    wx.request({
      url: url + '/getReading',
      data: {
        collection: collection,
        id: id,
        token: app.globalData.token
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stack: res.data.data.content,
          allData: res.data.data
        }, () => {
          wx.pageScrollTo({
            scrollTop: 0,
            duration: 100,
          })
        })
      }
    })
  },

  /**
   * 章节目录
   */
  directoryPage: function (e) {
    var collection = e.currentTarget.dataset.collection
    var bookTypes = e.currentTarget.dataset.book_types
    wx.redirectTo({
      url: './bookdetail/bookdetail?collection=' + collection + '&bookTypes=' + bookTypes,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var url = app.globalData.url
    var that = this
    var id = options.id ? options.id : ''
    that.setData({
      bookTypes: options.bookTypes
    })
    wx.request({
      url: url + '/getReading',
      data: {
        collection: options.collection,
        id: id,
        token: app.globalData.token
      },
      success: function (res) {
        console.log(res.data)
        that.setData({
          stack: res.data.data.content,
          allData: res.data.data
        })
      }
    }),
      wx.setNavigationBarTitle({
        title: options.bookTypes,
      }),
      app.setSkin(this)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    app.setSkin(this)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})
