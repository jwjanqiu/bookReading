// pages/mine/settings/calHouseRent/calHouseRent.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    //页面数据
    listData: [],
    //当前页数
    page: 1,
    //每页数据
    pageSize: 10,
    //更多数据
    hasMoreData: true,
    //电费基准
    electric_charge: 0,
    //水费基准
    water_charge: 0,
    //基本房租（展示）
    base_rent: 0,
    //添加modal框开关
    addOnOff: true,
    //基础modal框开关
    baseOnOff: true,
    //当月用水/水费基准
    water: '',
    //当月用电/电费基准
    electric: '',
    //基础房租（设定用）
    baseRent: '',
    //上月使用开关
    first: false,
    //上月电费
    firstElectric: '',
    //上月水费
    firstWater: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    //设置皮肤
    // app.setSkin(this)
    //请求房租明细
    this.requestRent('正在请求数据')
    //请求基础信息
    this.baseInfoRequest()
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
    // app.setSkin(this)
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
    this.requestRent('正在刷新数据')
    wx.stopPullDownRefresh()
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {
    if (this.data.hasMoreData) {
      this.requestRent('正在加载更多数据')
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

  },

  /**
   * 新月度使用弹框 
   */
  add_new: function() {
    var that = this
    that.setData({
      addOnOff: false
    })
  },

  /**
   * 基本设置弹框
   */
  base_set: function() {
    var that = this
    that.setData({
      baseOnOff: false
    })
  },

  /**
   * 新月度使用弹框关闭
   */
  useModalCancel: function(e) {
    var addOnOff = this.data.addOnOff
    this.setData({
      water: '',
      electric: '',
      first_electric: '',
      first_water: '',
      addOnOff: !addOnOff
    });
  },

  /**
   * 新月度使用弹框确认
   */
  useModalConfirm: function(e) {
    var water_charge = this.data.water
    var electric_charge = this.data.electric
    var first_electric = this.data.firstElectric
    var first_water = this.data.firstWater
    var url = app.globalData.url
    var that = this
    var addOnOff = this.data.addOnOff
    wx.request({
      url: url + '/insertNewRent',
      data: {
        token: app.globalData.token,
        water_charge: water_charge,
        electric_charge: electric_charge,
        first_electric: first_electric,
        first_water: first_water
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            addOnOff: !addOnOff,
            water: '',
            electric: '',
            firstElectric: '',
            firstWater: ''
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          that.requestRent('正在刷新数据')
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
   * 基本设置弹框关闭
   */
  baseModalCancel: function(e) {
    var baseOnOff = this.data.baseOnOff
    this.setData({
      water: '',
      electric: '',
      baseRent: '',
      baseOnOff: !baseOnOff,
    });
  },

  /**
   * 基本设置弹框确认
   */
  baseModalConfirm: function(e) {
    var electric = this.data.electric
    var water = this.data.water
    var that = this
    var base_rent = this.data.baseRent
    var baseOnOff = this.data.baseOnOff
    var url = app.globalData.url
    wx.request({
      url: url + '/addRentBaseInfo',
      data: {
        electric: electric,
        water: water,
        base_rent: base_rent,
        token: app.globalData.token
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        if (res.data.code == 1) {
          that.setData({
            baseOnOff: !baseOnOff,
            water: '',
            electric: '',
            baseRent: ''
          })
          wx.showToast({
            title: res.data.msg,
            icon: 'none'
          })
          that.baseInfoRequest()
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
   * 水费输入
   */
  waterInput: function(e) {
    this.setData({
      water: e.detail.value
    })
  },

  /**
   * 上月水费输入
   */
  firstWaterInput: function(e) {
    this.setData({
      firstWater: e.detail.value
    })
  },

  /**
   * 电费输入
   */
  electricInput: function(e) {
    this.setData({
      electric: e.detail.value
    })
  },

  /**
   * 上月电费输入
   */
  firstElectricInput: function(e) {
    this.setData({
      firstElectric: e.detail.value
    })
  },

  /**
   * 基本房租输入
   */
  baseRentInput: function(e) {
    this.setData({
      baseRent: e.detail.value
    })
  },

  /**
   * 请求房租明细
   */
  requestRent: function(message) {
    var url = app.globalData.url
    var that = this
    //展示loading
    wx.showNavigationBarLoading()
    if (message != '') {
      wx.showLoading({
        title: message,
      })
    }
    //数据请求
    wx.request({
      url: url + '/getAllRent',
      data: {
        page: that.data.page,
        token: app.globalData.token
      },
      method: "POST",
      success: function(res) {
        console.log(res.data)
        //成功后关闭loading
        wx.hideNavigationBarLoading()
        if (message != "") {
          wx.hideLoading()
        }
        //获取已有数据
        var listTem = that.data.listData
        //状态码为1时拼装
        if (res.data.code == 1) {
          if (that.data.page == 1) {
            listTem = []
          }
          //新请求的数据
          var listData = res.data.data
          //新请求数据长度比每页数据长度小，表明无更多数据
          if (listData.length < that.data.pageSize) {
            that.setData({
              listData: listTem.concat(listData),
              hasMoreData: false
            })
          } else {
            //反之有数据，页数加1
            that.setData({
              listData: listTem.concat(listData),
              hasMoreData: false,
              page: that.data.page + 1
            })
          }
          //请求数据为空时，让客户填写上月水电
          if (listData.length < 1) {
            that.setData({
              first: true
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
  },

  /**
   * 请求基础数据
   */
  baseInfoRequest: function() {
    var url = app.globalData.url
    var that = this
    wx.request({
      url: url + '/getRentBaseInfo',
      data: {
        token: app.globalData.token
      },
      method: 'POST',
      success: function(res) {
        console.log(res.data)
        var baseInfo = res.data.data
        if (res.data.code == 1) {
          if (baseInfo != null) {
            that.setData({
              electric_charge: baseInfo.electric,
              water_charge: baseInfo.water,
              base_rent: baseInfo.base_rent
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
      }
    })
  }
})