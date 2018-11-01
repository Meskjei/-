// Pages/submission/submission.js
const app = getApp();
const db_utils = require('../../utils/db_utils');
const utils = require('../../utils/utils');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    picFilePath: '', //图片临时路径
    description:null
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
   * 添加图片材料
   */
  addPic: function (event) {
    let that = this;
    wx.chooseImage({
      count: 1,
      success: function (res) {
        that.setData({ picFilePath: res.tempFilePaths });
      },
    });
  },

  /**
   * 删除图片
   */
  deletePic: function (event) {
    this.setData({ picFilePath: '' });
  },

  /**
   * 获取描述
   */
  getDescription: function (e) {
    this.setData({
      description: e.detail.value
    })
  },
  /**
   * 提交材料
   */
  submit: function (event) {
    var that=this;
    wx.showModal({
      content: '是否确认提交',
      success(res) {
        if (res.confirm) {
          console.log('用户点击确定');
          let categoryName = '审核材料';
          db_utils.uploadFile(that.data.picFilePath[0], categoryName, (res) => {
            console.log(res.data.path);
            let MyRecord = {
              studentId: app.globalData.userInfo.id,
              college: app.globalData.userInfo.college,
              major: app.globalData.userInfo.major,
              picture: res.data.path,
              describe:that.data.description
            }
            db_utils.createRecord(app.globalData.audityTableId, MyRecord, (res) => {
              console.log(res);
            })
          })
        } else if (res.cancel) {
          console.log('用户点击取消');
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
})