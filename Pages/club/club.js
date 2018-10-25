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
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  produceQRcode:function(){
    const QRtype = 'wxaqrcode';
    const params = {
      path: '../signSuccess/signSuccess?id=123456',
      width: 250
    };
    db_utils.QRcode(QRtype, params, (res,code)=>{
      console.log(res);
      console.log(code);
      this.setDate({
        QRcode: code
      })
    })
  }
})