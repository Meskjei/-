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
    activities: [],
    nowActivities: [],
    featureActivities: [],
    endActivities: [],
    currentIndex: 0, //当前的swiper索引值
    swiperHeight: 0, //swiper容器高度
    userType: '', //用户类型
    currentTime: null,
  },


  /**
   * 返回上一页监听函数
   */
  goBack: function(event) {
    wx.navigateBack({
      delta: 1
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    utils.showBusy("加载中...");
    this.getJoinActivity();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },


  /**
   * 获取学生参加的活动
   */
  getJoinActivity: function() {
    var that=this;
    let stuQuery = new wx.BaaS.Query(); // 实例化查询对象（学生）
    stuQuery.compare('studentId', '=', '5bd072e67bc6aa18e705dc34'); // 设置查询条件
    db_utils.searchData(app.globalData.joinActivityTableId, stuQuery, (res) => {
      let activityId = res.data.objects.map((item, index) => { //  遍历objects数组（item为数组项，index为数组项的下标）
        return item.activityId;
      });
      let activityQuery = new wx.BaaS.Query(); // 实例化查询对象（活动）
      activityQuery.in('id', activityId); // 设置查询条件
      db_utils.searchData(app.globalData.activityTableId, activityQuery, (res) => {
        that.data.activities = res.data.objects;
        this.getNowActivity();
      });
    })
  },
  /**
   * 查询学生进行中的活动
   */
  getNowActivity: function () {
    var that = this;
    this.getCurrentTime(() => { //  找到符合条件的活动id
      let nowActivityId = this.data.activities.map((item, index) => {
        let itemStartTime = new Date(Date.parse(item.startTime));
        let itemEndTime = new Date(Date.parse(item.endTime));
        if (itemEndTime >= this.data.currentTime && itemStartTime <= this.data.currentTime) {
          return item.id;
        } else {
          return "null";
        }
      });
      console.log(nowActivityId);
      let activityQuery = new wx.BaaS.Query(); // 实例化查询对象（活动）
      activityQuery.in('id', nowActivityId); // 设置查询条件
      db_utils.searchData(app.globalData.activityTableId, activityQuery, (res) => { //  查询活动的详细内容
        that.setData({
          nowActivities: res.data.objects,
          swiperHeight: that.data.activities.length * 230,
        })
      });

    });
  },
  /**
   * 查询学生未开始的活动
   */
  getFeatureActivity: function () {
    var that = this;
    this.getCurrentTime(() => { //  找到符合条件的活动id
      let featureActivityId = this.data.activities.map((item, index) => {
        let itemStartTime = new Date(Date.parse(item.startTime));
        if (itemStartTime > this.data.currentTime) {
          return item.id;
        } else {
          return "null";
        }
      });
      console.log(featureActivityId);
      let activityQuery = new wx.BaaS.Query(); // 实例化查询对象（活动）
      activityQuery.in('id', featureActivityId); // 设置查询条件
      db_utils.searchData(app.globalData.activityTableId, activityQuery, (res) => { //  查询活动的详细内容
        that.setData({
          featureActivities: res.data.objects,
          swiperHeight: that.data.activities.length * 230,
        })
      });

    });
  },
  /**
   * 查询学生结束的活动
   */
  getEndActivity: function() {
    var that=this;
    this.getCurrentTime(() => { //  找到符合条件的活动id
      let endActivityId = this.data.activities.map((item, index) => {
        let itemEndTime = new Date(Date.parse(item.endTime));
        if (itemEndTime < this.data.currentTime) {
          return item.id;
        } else {
          return "null";
        }
      });
      console.log(endActivityId);
      let activityQuery = new wx.BaaS.Query(); // 实例化查询对象（活动）
      activityQuery.in('id', endActivityId); // 设置查询条件
      db_utils.searchData(app.globalData.activityTableId, activityQuery, (res) => { //  查询活动的详细内容
        that.setData({
          endActivities:res.data.objects,
          swiperHeight: that.data.activities.length * 230,
        })
      });

    });
  },
  /**
   * 修改tab
   */
  changeTab: function(event) {
    let index;
    console.log(event);
    if (event.type == 'change') { //点击tap切换
      index = event.detail.current;
      this.setData({
        currentIndex: index
      });
    } else { //滑动切换
      index = event.currentTarget.dataset.index;
      this.setData({
        currentIndex: index
      });
      return;
    }
    console.log(this.data.currentIndex);
    if (index == 0) {
      this.getNowActivity();
    } else if (index == 1) {
      this.getFeatureActivity();
    } else if (index == 2) {
      this.getEndActivity();
    }
  },
  /**
   * 获取当前时间
   */
  getCurrentTime: function(cb) {
    let that = this;
    wx.request({
      url: 'https://api.m.taobao.com/rest/api3.do?api=mtop.common.getTimestamp',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success(res) {
        that.data.currentTime = new Date(parseInt(res.data.data.t));
        cb();
      },
      fail(res) {
        utils.showModel('网络故障', '获取当前时间失败');
      }
    })
  },
//   /**
//  * 分页加载活动详情
//  */
//   getActivityPerPage: function (query) {
//     let that = this;
//     let Product = new wx.BaaS.TableObject(app.globalData.activityTableId);
//     if (query == undefined) {
//       query = new wx.BaaS.Query();
//     }
//     wx.showNavigationBarLoading();
//     Product.limit(20).setQuery(query).offset(this.data.offset).orderBy('-created_at').find().then(res => {
//       //判断是否有下一页
//       console.log(res);
//       that.data.hasNext = res.data.meta.next == null ? false : true;
//       if (that.data.hasNext) {
//         that.data.offset += 20;
//       }
//       //进一步处理获取到的数据使之能被瀑布流插件使用
//       that.data.activities = that.data.activities.concat(res.data.objects)
//       that.setData({
//         activities: that.data.activities,
//         swiperHeight: that.data.activities.length * 230
//       });
//       console.log(this.data.activities);
//       wx.hideNavigationBarLoading();

//     }, err => {
//       wx.showToast({
//         title: '网络故障',
//       });
//     });
//   },
})