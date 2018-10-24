// Pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activityType: ['全部', '数学与信息学院', '软件学院', '材料与能源学院', '工程学院', '国际教育学院', '经济管理学院', '林学与风景园林学院', '园艺学院', '资源环境学院', '电子工程学院', '动物科学学院', '海洋学院', '兽医学院', '水利与土木工程学院', '人文与法学学院', '公共管理学院', '外国语学院', '食品学院', '艺术学院', '农学院', '生命科学学院'],
    currentActivityIndex: 0,
    popularActivity: [{ picUrl:'https://ss3.baidu.com/9fo3dSag_xI4khGko9WTAnF6hhy/image/h%3D300/sign=06f18776399b033b3388fada25cf3620/77c6a7efce1b9d162f210013fedeb48f8d5464da.jpg', title: 'Test'}]
  },

  /**
   * 设置活动选择器修改监听
   */
  changeActivity: function(event){
    this.setData({ currentActivityIndex: event.detail.value});
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