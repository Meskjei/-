// Pages/publishActivity/publishActivity.js
const app = getApp();
const db_utils = require('../../utils/db_utils');
const utils = require('../../utils/utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures: [],  //存放选择的图片对象
    categoryName: '活动',
    actTitle:null,
    actContent: null,
    picPath: null
    
  },

  getActTitle: function (e) {
    this.setData({
      actTitle: e.detail.value
    })
  },
  getActContent: function (e) {
    this.setData({
      actContent: e.detail.value
    })
  },
  /**
   * 添加图片
   */
  publishAct:function(e){
    let MyRecord = {
      title: this.data.actTitle,
      content: this.data.actContent,
      publisherName: '校科联',
      cover: this.data.picPath,
      scoreType: 'moral',
      score: 0.2
      }
    db_utils.createRecord(app.globalData.activityTableId,MyRecord,(res)=>{
      console.log(res);
    })
  },
  addPic: function(event){
    let that = this;
    // if(this.data.pictures.length >= 9){
    //   wx.showToast({
    //     title: '图片数超过上限',
    //   });
    //   return;
    // }
    wx.chooseImage({
      success(res) {
        console.log(that.data.categoryName);
        const tempFilePaths = res.tempFilePaths;
        db_utils.uploadFile(tempFilePaths[0], that.data.categoryName, (res) => {
          that.data.picPath = res.data.path;
          console.log(that.data.picPath);
        })
      }
    });
  },

  /**
   * 取消图片的选择
   */
  cancelPic: function(event){
    console.log(event);
    let index = event.currentTarget.dataset.index;
    this.data.pictures.splice(index, 1)
    this.setData({
      pictures: this.data.pictures
    });
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