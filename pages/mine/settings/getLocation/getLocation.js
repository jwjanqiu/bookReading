// pages/mine/settings/getLocation/getLocation.js
const app = getApp()
//引入高德地图
var amapFile = require('../../../../libs/amap-wx.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    src: '',
    mobile: '',
    latitude: '',
    longitude: '',
    markers: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    var that = this;
    //初始化高德地图
    var myAmapFun = new amapFile.AMapWX({
      key: app.globalData.gaodeKey
    });
    //获取当前地理位置
    myAmapFun.getRegeo({
      success: function(data) {
        //成功回调
        // console.log(data)
        that.setData({
          markers: [{
            iconPath: '../../../../assets/icons/location.png',
            id: 0,
            latitude: data[0].latitude,
            longitude: data[0].longitude,
            width: 50,
            height: 50
          }],
          latitude: data[0].latitude,
          longitude: data[0].longitude
        })
      },
      fail: function(info) {
        //失败回调
        console.log(info)
      }
    })
  },

  /**
   * 手机号输入
   */
  mobileInput: function(e) {
    this.setData({
      mobile: e.detail.value
    })
  },

  /**
   * form表单提交,获取定位信息
   */
  formSubmit: function(e) {
    // console.log(e)
    var that = this
    var mobile = that.data.mobile
    var url = app.globalData.url
    //请求菊花
    wx.showNavigationBarLoading()
    wx.showLoading({
      title: '正在查询',
    })
    //请求接口
    wx.request({
      url: url + '/getLocation',
      data: {
        mobile: mobile,
        token: app.globalData.token
      },
      method: 'POST',
      success: function(res) {
        //请求后关闭请求菊花
        wx.hideNavigationBarLoading()
        console.log(res.data)
        //状态码为1时拼装数据
        if (res.data.code == 1) {
          that.setData({
            markers: [{
              iconPath: '../../../../assets/icons/location.png',
              id: 0,
              latitude: res.data.data.lat,
              longitude: res.data.data.lng,
              width: 50,
              height: 50
            }],
            latitude: res.data.data.lat,
            longitude: res.data.data.lng
          })
          //弹框提示当前位置
          wx.showToast({
            title: '当前位置: ' + res.data.data.location,
            icon: 'none',
            duration: 1500
          })
        } else {
          //失败返回失败信息
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
      }
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