// Pages/club/club.js
const db_utils = require('../../utils/db_utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  produceQRcode:function(){
    const QRtype = 'wxacodeunlimit';
    const params = {
      scene: 'A',
      page: 'pages/signSuccess/signSuccess',
      width: 250
    };
    db_utils.QRcode(QRtype, params, (res)=>{
      console.log(res);
    })
  }
})