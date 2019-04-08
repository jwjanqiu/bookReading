// pages/mine/settings/settings.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    onOff: true,
    userName: '',
    password: '',
    confirmPassword: ''
  },

  /**modal弹框 */
  btnclick: function() {
    var onOff = this.data.onOff;
    this.setData({
      onOff: !onOff,
      userName: app.globalData.userName
    });
  },

  /**
   * modal确认
   */
  modalConfirm: function(e) {
    var userName = this.data.userName
    var password = this.data.password
    var confirmPassword = this.data.confirmPassword
    var url = app.globalData.url
    var that = this
    //modal状态
    var onOff = this.data.onOff
    //密码有输入
    if (password || confirmPassword) {
      //密码不对应
      if (password != confirmPassword) {
        wx.showToast({
          title: '两次密码不一致',
          icon: 'none',
          duration: 1000
        })
        return;
      }
    }
    //无密码和用户名未修改不请求
    if (!password && (userName == app.globalData.userName)) {
      that.setData({
        onOff: !onOff
      })
      return;
    }

    wx.request({
      url: url + '/modifyUserInfo',
      data: {
        token: app.globalData.token,
        user_name: userName,
        password: password
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          app.globalData.userName = res.data.data.nick_name
          //关闭modal
          that.setData({
            onOff: !onOff,
            userName: res.data.data.nick_name,
            password: '',
            confirmPassword: ''
          })
          //修改storage信息
          var _userInfo = wx.getStorageSync('userInfo')
          _userInfo.userName = res.data.data.nick_name
          wx.setStorageSync('userInfo', _userInfo)
          wx.showToast({
            title: '修改成功',
            icon: 'none',
            duration: 1000
          })
          setTimeout(function() {
            wx.switchTab({
              url: '../mine',
            })
          }, 500)
        } else {
          //失败时提示失败原因
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 1000
          })
        }
      }
    })
  },

  /**
   * modal隐藏 
   */
  modalCancel: function(e) {
    var onOff = this.data.onOff
    this.setData({
      onOff: !onOff
    });
  },

  /**
   * 用户名输入
   */
  userNameInput: function(e) {
    this.setData({
      userName: e.detail.value
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
   * 确认密码输入
   */
  confirmPasswordInput: function(e) {
    this.setData({
      confirmPassword: e.detail.value
    })
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
        //清除缓存
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