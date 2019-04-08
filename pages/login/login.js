// pages/login/login.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    password: ''
  },

  /**
   * 用户名输入 
   */
  nameInput: function(e) {
    this.setData({
      name: e.detail.value
    })
  },

  /**
   * 密码输入
   */
  passwordInput: function(e) {
    this.setData({
      password: e.detail.value
    })
  },

  /**
   * 登录
   */
  login: function(e) {
    var that = this
    var timestamp = Date.parse(new Date());
    timestamp = timestamp / 1000;
    // console.log(e)
    var url = app.globalData.url
    wx.request({
      url: url + '/login',
      data: {
        mobile: that.data.name,
        password: that.data.password
      },
      method: "POST",
      success: function(res) {
        //登录不成功返回信息
        if (res.data.code != 1) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
        } else {
          //登录成功后保存到全局变量
          app.globalData.token = res.data.data.token
          app.globalData.userName = res.data.data.nick_name
          //登录成功后保存缓存
          wx.setStorage({
            key: 'userInfo',
            data: {
              token: res.data.data.token,
              userName: res.data.data.nick_name,
              expireDate: timestamp + 604800
            },
          })
          //登录成功后跳转到分类
          wx.showToast({
            title: res.data.msg,
            success: function() {
              setTimeout(function() {
                wx.switchTab({
                  url: '../stack/stack',
                })
              }, 1000)
            }
          })

        }
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