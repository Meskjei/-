// Pages/audity/audity.js
const utils = require('../../utils/utils');
const db_utils = require('../../utils/db_utils');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentActivityIndex: 0,
    offset: 0, //当前的偏移量
    audityEvents: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.onPullDownRefresh();
  },
  onReachBottom: function (options) {
    if (this.data.hasNext == true) {
      let query = new wx.BaaS.Query();
      query.compare('college', '=', '数学与信息学院');
      this.getDataPerPage(undefined);
    }
  },

  onPullDownRefresh: function (options) {
    this.data.audityEvents = [];
    this.data.offset = 0;
    this.getDataPerPage(undefined);
    wx.stopPullDownRefresh();
  },
  /**
   * 分页加载
   */
  getDataPerPage: function (query) {
    let that = this;
    let Product = new wx.BaaS.TableObject(app.globalData.audityTableId);
    if (query == undefined) {
      query = new wx.BaaS.Query();
    }
    wx.showNavigationBarLoading();
    Product.limit(20).setQuery(query).offset(this.data.offset).orderBy('-created_at').find().then(res => {
      //判断是否有下一页
      console.log(res);
      that.data.hasNext = res.data.meta.next == null ? false : true;
      if (that.data.hasNext) {
        that.data.offset += 20;
      }
      //进一步处理获取到的数据使之能被瀑布流插件使用

      that.setData({
        audityEvents: that.data.audityEvents.concat(res.data.objects)
      });
      wx.hideNavigationBarLoading();

    }, err => {
      wx.showToast({
        title: '网络故障',
      });
    });
  },
  audityPass: function (e) {
    let MyRecord = {
      state: '审核通过',
      opinion: '审核通过审核通过'
    }
    db_utils.updateData(app.globalData.audityTableId, '5bd65ed8d40d1559b80af920', MyRecord, (res) => {
      console.log(res);
    })
  },
  audityFail: function (e) {
    let MyRecord = {
      state: '审核未通过',
      opinion: '审核未通过审核未通过'
    }
    db_utils.updateData(app.globalData.audityTableId, '5bd65ed8d40d1559b80af920', MyRecord, (res) => {
      console.log(res);
    })
  }
})