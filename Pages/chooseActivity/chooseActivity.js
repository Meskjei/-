// Pages/chooseActivity/chooseActivity.js
const utils = require('../../utils/utils');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTime: null,
    currentActivityIndex: 0,
    offset: 0, //当前的偏移量
    activities: [],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  onShow: function () {
    this.getCurrentTime();
    this.onPullDownRefresh();
  },
  getCurrentTime:function(){
    let that = this;
    wx.request({
      url: 'https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.currentTime = new Date(parseInt(res.data.data.t));
        console.log(that.data.currentTime);
      },
      fail(res) {
        utils.showModel('网络故障', '获取当前时间失败');
      }
    })
  },
  onReachBottom: function (options) {
    if (this.data.hasNext == true) {
      let query = new wx.BaaS.Query();
      query.compare('publisherName', '=', '校科联');
      this.getDataPerPage(query);
    }
  },

  onPullDownRefresh: function (options) {
    this.data.activities = [];
    this.data.offset = 0;
    let query = new wx.BaaS.Query();
    query.compare('publisherName', '=', '校科联');
    this.getDataPerPage(query);
    wx.stopPullDownRefresh();
  },
  /**
   * 分页加载
   */
  getDataPerPage: function (query) {
    let that = this;
    let Product = new wx.BaaS.TableObject(app.globalData.activityTableId);
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
        activities: that.data.activities.concat(res.data.objects)
      });
      console.log(this.data.activities);
      wx.hideNavigationBarLoading();

    }, err => {
      wx.showToast({
        title: '网络故障',
      });
    });
  },
})