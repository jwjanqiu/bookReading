// pages/leader/stories/stories.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail: [],
    images: {}
  },

  /**
   * 照片自适应
   */
  imageLoad: function(e) {
    var $width = e.detail.width, //获取图片真实宽度
      $height = e.detail.height,
      ratio = $width / $height; //图片的真实宽高比例
    var viewWidth = 718, //设置图片显示宽度，左右留有16rpx边距
      viewHeight = 718 / ratio; //计算的高度值
    var image = this.data.images;
    //将图片的datadata-index作为image对象的key,然后存储图片的宽高值
    image[e.target.dataset.index] = {
      width: viewWidth,
      height: viewHeight
    }
    this.setData({
      images: image
    })
  },

  /**
   * 预览图片
   */
  imgPreview: function(e) {
    wx.previewImage({
      urls: e.currentTarget.dataset.list,
      current: e.currentTarget.dataset.current
    })
  },

  /**
   * 美图详情
   */
  detailRequest: function(id) {
    var url = app.globalData.url
    var that = this
    wx.request({
      url: url + '/getBeautyDetail',
      data: {
        token: app.globalData.token,
        id: id
      },
      method: 'POST',
      success: function(res) {
        if (res.data.code == 1) {
          that.setData({
            detail: res.data.data
          })
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
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置皮肤
    app.setSkin(this)
    //请求详情
    this.detailRequest(options.id)
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
    //请求详情
    // this.detailRequest(options.id)
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