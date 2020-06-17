// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    background: ['demo-text-1', 'demo-text-2', 'demo-text-3'],
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    imgSrc : '',
    indicatorDots: true,  //开启面板控制点
    vertical: false,     //false 表示不开启纵向移动，既开启横向移动
    autoplay: true,    //是否开启自动切换
    interval: 2000,  //切换间隔2s
    duration: 100,    //滑动的时长
    circular: true,
    loading: true
  },
 
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var _this = this
    wx.request({
      url: 'http://192.168.1.103:3000/pic',
      
      header: {
        'content-type': 'application/json' // 默认值
      },
      method : "GET",
      success (res) {
        console.log(res.data.message[0].src)
        _this.setResToData(res.data.message[0].src)
      }
    })
    },
    setResToData: function(data){
      this.setData({imgSrc : data})
    },
 
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.setData({loading : false})
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

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