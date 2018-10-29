// Pages/myActivity/myActivity.js
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
    activityId:[],
    activities: [],
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
    this.onPullDownRefresh();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },
  onReachBottom: function (options) {
    if (this.data.hasNext == true) {
      let stuQuery = new wx.BaaS.Query();
      stuQuery.compare('studentId', '=', '5bd072e67bc6aa18e705dc34');
      db_utils.searchData(app.globalData.joinActivityTableId, stuQuery, (res) => {
        this.data.activityId = res.data.objects.map((item, index) => {
          return item.activityId;
        });
        console.log(this.data.activityId);
        let activityQuery = new wx.BaaS.Query();
        activityQuery.in('id', this.data.activityId);
        this.getDataPerPage(activityQuery);
      })
    }
  },

  onPullDownRefresh: function (options) {
    this.data.activities = [];
    this.data.offset = 0;
    let stuQuery = new wx.BaaS.Query();
    stuQuery.compare('studentId', '=', '5bd072e67bc6aa18e705dc34');
    db_utils.searchData(app.globalData.joinActivityTableId, stuQuery,(res)=>{
      this.data.activityId = res.data.objects.map((item,index)=>{
        return item.activityId;
      });
      console.log(this.data.activityId);
      let activityQuery = new wx.BaaS.Query();
      activityQuery.in('id', this.data.activityId);
      this.getDataPerPage(activityQuery);
    })
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