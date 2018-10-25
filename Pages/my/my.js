// Pages/my/my.js
const db_utils = require('../../utils/db_utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    functionType: [
      {
        functionName:'扫码签到',
        functionIconPath: '../../images/scan.png'
      }, {
        functionName: '上传材料',
        functionIconPath: '../../images/update.png'
      }
    ],  //功能栏功能类型
    categoryName:'审核材料'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  scanAndUpload:function(res){
    let index = res.currentTarget.dataset.index;
    switch(index){
      case 0: 
        this.scan();
        break;
      case 1: 
        this.upload();
        break;
      default:
        break;
    }
  },
  scan:function(){
    wx.scanCode({
      success(res) {
        console.log(res);
      },
      fail(res) {
        console.log(res);
        wx.showToast({
          title: '网络故障',
          image: '../image/netError.png'
        });
      }
    })
  },
  upload:function(){
    let that=this;
    wx.chooseImage({
      success(res) {
        console.log(that.data.categoryName);
        const tempFilePaths = res.tempFilePaths;
        db_utils.uploadFile(tempFilePaths[0],that.data.categoryName,(res)=>{
          console.log(res);
        })
      }
    });
  }
})