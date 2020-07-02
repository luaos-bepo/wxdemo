// shopCat/pages/shopCat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      checked:false,
      checked1:false,
      shoplist:[
        
      ],
      skins:[],
      packs:[],
      packsChecked:false,
      skinsChecked:false,
      checkedAll : false,
      totalMoney : 0,
      totalNum : 0,
      checkedShops : []
      
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

      var skins = []
      var packs = []
      
      var totalAll = 0
      var totalMoney = 0
      var totalSkins = 0
      var totalPacks = 0
      var _this = this
      wx.request({
        url: 'http://127.0.0.1:3000/getShopCat',
        header: {
          'content-type': 'application/json' // 默认值
        },
        method : "GET",
        success(res){
          //console.log(res.data)
          
            _this.setData({shoplist : res.data.data})
            //获取到列表后进行数据的处理
            _this.data.shoplist.forEach(shoplist=>{
              totalAll += shoplist.checked
              
              if(shoplist.checked){
                totalMoney += parseFloat(shoplist.now_price)
              }
             
              if(shoplist.belong == 'skin'){
                skins.push(shoplist)
               
                
              }else{
                packs.push(shoplist)
                
              }
            })
           
           
            _this.setData({
              skins :  skins,
              packs : packs,
              totalNum :totalAll,
              totalMoney : totalMoney.toFixed(2)
            })

            _this.data.skins.forEach(skins=>{
              if(skins.checked){
                totalSkins += 1
               //_this.findSelectedId(skins.id)
              }
            })
            _this.data.packs.forEach(packs=>{
              if(packs.checked){
                totalPacks += 1
                //_this.findSelectedId(packs.id)
              }
            })
              
            if(totalSkins == _this.data.skins.length && totalSkins!=0){
              
              _this.setData({skinsChecked : true})
          }
          
          if(totalPacks == _this.data.packs.length && totalPacks!=0){
            _this.setData({packsChecked : true})
          }

          var totalAlla = totalSkins + totalPacks
          //console.log(totalAlla)
          //console.log(_this.data.shoplist.length)
          //console.log(_this.data.checkedShops)
          if(totalAlla == _this.data.shoplist.length && totalAll!=0){
            
            _this.setData({checkedAll : true})
          }
          _this.findSelectedId(_this.data.skins,_this.data.packs)
          
         // _this.setData({checkedShops : _this.data.checkedShops})
          console.log(_this.data.checkedShops)
        }
      })
      //console.log('hahah')
      
      //console.log(this.data.packs,this.data.skins)
      
  },
  //每个礼包前的复选框
  onChange : function(event){
    var total = 0
    var totalSkin = 0
    var totalMoney = 0
    
    var that = this
    if(event.detail == false){
      var checked = 0
    }else{
      var checked = 1
    }
    this.data.packs.forEach(packs=>{
      if(packs.id == event.currentTarget.dataset.id){
        packs.checked = checked
        total += packs.checked
        //that.findSelectedId(packs.id)
        //that.data.checkedShops.push(packs.id)
      }else{
        total += packs.checked
      }

      if(packs.checked){
        totalMoney += parseFloat(packs.now_price)
      }
      
    })
    this.data.skins.forEach(skins=>{
      totalSkin += skins.checked
      if(skins.checked){
        totalMoney += parseFloat(skins.now_price)
      }
    })

    if(total == this.data.packs.length && total!=0){
      this.data.packsChecked = true
    }else{
      this.data.packsChecked = false
    }
    var totalAll = total + totalSkin
    if(totalAll == this.data.shoplist.length && totalAll!=0){
      this.data.checkedAll = true
    }else{
      this.data.checkedAll = false
    }
    
    

    this.setData({
      packs : this.data.packs,
      packsChecked : this.data.packsChecked,
      checkedAll : this.data.checkedAll,
      totalNum : totalAll,
      totalMoney : totalMoney.toFixed(2),
      //checkedShops : this.data.checkedShops
    })
    //console.log(this.data.skins,this.data.packs)
    this.findSelectedId(this.data.skins,this.data.packs)
    console.log(this.data.checkedShops)
  },
//每个皮肤前的复选框
  onChange1 : function(event){
    var total = 0
    var totalPack = 0
    var totalMoney = 0
    var that = this
    if(event.detail == false){
      var checked = 0
    }else{
      var checked = 1
    }
    this.data.skins.forEach(skins=>{
      if(skins.id == event.currentTarget.dataset.id){
        skins.checked = checked
        total += skins.checked
        //that.findSelectedId(skins.id)
        //that.findSelectedId(skins.id)
      }else{
        total += skins.checked
      }
      if(skins.checked){
        totalMoney += parseFloat(skins.now_price)
      }
    })
    this.data.packs.forEach(packs=>{
      totalPack += packs.checked
      if(packs.checked){
        totalMoney += parseFloat(packs.now_price)
      }
    })
    if(total == this.data.skins.length &&total!=0){
      this.data.skinsChecked = true
    }else{
      this.data.skinsChecked = false
    }
    var totalAll = total + totalPack
    if(totalAll == this.data.shoplist.length && totalAll!=0){
      this.data.checkedAll = true
    }else{
      this.data.checkedAll = false
    }
    this.setData({
      skins : this.data.skins,
      skinsChecked : this.data.skinsChecked,
      checkedAll : this.data.checkedAll,
      totalNum : totalAll,
      totalMoney : totalMoney.toFixed(2),
      //checkedShops : that.data.checkedShops
    })
    this.findSelectedId(this.data.skins,this.data.packs)

    console.log(this.data.checkedShops)
  },
  //道具包全选
  onChangePacks : function(event){
    if(event.detail == false){
      var checked = 0
    }else{
      var checked = 1
    }
    var totalAll = 0
    var totalMoney = 0
    var that = this
    this.data.packs.forEach(packs=>{
      packs.checked = checked
      totalAll += packs.checked
      if(packs.checked){
        totalMoney += parseFloat(packs.now_price)
        //that.data.checkedShops.push(packs.id)
        //that.findSelectedId(packs.id)
      }
    })
    this.data.skins.forEach(skins=>{
      totalAll += skins.checked
      if(skins.checked){
        totalMoney += parseFloat(skins.now_price)
      }
    })
    
    if(event.detail && this.data.skinsChecked){
      this.data.checkedAll = true
    }else{
      this.data.checkedAll = false
    }
    
    this.setData({
      packs : this.data.packs,
      packsChecked : event.detail,
      checkedAll : this.data.checkedAll,
      totalNum : totalAll,
      totalMoney : totalMoney.toFixed(2)
    })
    this.findSelectedId(this.data.skins,this.data.packs)
    console.log(this.data.checkedShops)
  },
  //皮肤全选
  onChangeSkins : function(event){
    if(event.detail == false){
      var checked = 0
    }else{
      var checked = 1
    }
    var totalAll = 0
    var totalMoney = 0
    var that = this
    this.data.skins.forEach(skins=>{
      skins.checked = checked
      totalAll += skins.checked
      if(skins.checked){
        totalMoney += parseFloat(skins.now_price)
        //that.findSelectedId(skins.id)
      }
    })
    this.data.packs.forEach(packs=>{
      totalAll += packs.checked
      if(packs.checked){
        totalMoney += parseFloat(packs.now_price)
      }
    })
    if(event.detail && this.data.packsChecked){
      this.data.checkedAll = true
    }else{
      this.data.checkedAll = false
    }
    this.setData({
      skins : this.data.skins,
      skinsChecked : event.detail,
      checkedAll : this.data.checkedAll,
      totalNum : totalAll,
      totalMoney : totalMoney.toFixed(2)
    })
    this.findSelectedId(this.data.skins,this.data.packs)
    console.log(this.data.checkedShops)
  },
  //全选
  onChangeAll : function(event){
    if(event.detail == false){
      var checked = 0
    }else{
      var checked = 1
    }
    var totalAll = 0
    var totalMoney = 0
    var that = this
    this.data.skins.forEach(skins=>{
      skins.checked = checked
      totalAll += skins.checked
      if(skins.checked){
        totalMoney += parseFloat(skins.now_price)
        //that.findSelectedId(skins.id)
      }
    })
    this.data.packs.forEach(packs=>{
      packs.checked = checked
      totalAll += packs.checked
      if(packs.checked){
        totalMoney += parseFloat(packs.now_price)
       // that.findSelectedId(packs.id)
      }
    })
  
    this.setData({
      packs : this.data.packs,
      skins : this.data.skins,
      packsChecked : checked,
      skinsChecked : checked,
      checkedAll : checked,
      totalNum : totalAll,
      totalMoney : totalMoney.toFixed(2)
    })
    this.findSelectedId(this.data.skins,this.data.packs)
    console.log(this.data.checkedShops)
    //console.log(this.data.skins)
  },

  findSelectedId : function(skins,packs){
     var checkedShop = [] 
     skins.forEach(skins=>{
       if(skins.checked){
         checkedShop.push(skins.id)
       }
     })
     packs.forEach(packs=>{
       if(packs.checked){
          checkedShop.push(packs.id)
       }
       
     })
     this.setData({ checkedShops : checkedShop })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */

  deleteShop : function(){
      var that = this
      
      wx.request({
        url: 'http://127.0.0.1:3000/deleteFromCat',
        header : {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        method : "POST",
        data : this.data.checkedShops,
        success(res){
          that.onLoad()
        }
      })
  },

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