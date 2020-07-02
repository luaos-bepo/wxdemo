// shopping/pages/shopping.js

Page({

  /**
   * 页面的初始数据
   */
  data: {
    time : 30*60*60*1000,
    shopList:[],
    shopNum:0
  },
  addSuccess : function(events){
    var _this = this
    this.data.shopList[0].checked = 0
    
    wx.request({
      url: 'http://127.0.0.1:3000/add',
      header : {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      method : "POST",
      data : _this.data.shopList[0],
      success(res){
        //console.log(res.data.status)
        _this.addShop()
      }
    })
  },

  addShop : function(){
    wx.showToast({
      title: '加入购物车成功',
    })
    this.data.shopNum += 1
    this.setData({
      shopNum : this.data.shopNum
    })
  },

  toShopCat : function(){
    wx.navigateTo({
      url: '/shopCat/pages/shopCat',
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  
  onLoad: function (options) {
      
      var _this=this
      wx.request({
        url: 'http://127.0.0.1:3000/find?id='+options.id,
        header: {
          'content-type': 'application/json' // 默认值
        },
        method : "GET",
        success (res) {
          console.log(res.data.data)
         _this.setResToData(res.data.data)
         
        }
      })
      wx.request({
        
        url: 'http://127.0.0.1:3000/getShopCat',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method : "GET",
        success : function(res){
          _this.setData({shopNum : res.data.data.length})
        }
      })
      this.setData({shopNum : this.data.shopNum})
  },

  setResToData : function(data){
      this.setData({shopList : data})
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