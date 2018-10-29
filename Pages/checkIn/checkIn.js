// Pages/club/club.js
const db_utils = require('../../utils/db_utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    QRcode:null
  },

  /**
   * 返回上一页监听函数
   */
  goBack: function (event) {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.produceQRcode();
    wx.setScreenBrightness({
      value: 1,
    });
  },
  produceQRcode:function(){
    const QRtype = 'wxaqrcode';
    const params = {
      path: '../signSuccess/signSuccess?id=123456',
      width: 250
    };
    db_utils.QRcode(QRtype, params, (res,code)=>{
      console.log(code);
      this.setData({
        QRcode: code
      })
    })
  }
})