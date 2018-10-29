// Pages/publishActivity/publishActivity.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    pictures: [],  //存放选择的图片对象
    activityDate: '',  //当前选择的活动日期
    acitivityTime: '', //当前选择的活动时间
    acitivityLastTime: '' //当前选择的活动持续时间
  },

  /**
   * 修改活动时间
   */
  changeActivityTime: function(event){
    this.setData({activityTime: event.detail.value});
  },
  /**
   * 修改活动持续时间
   */
  changeActivityLastTime: function(event){
    let result = event.detail.value.split(':');
    this.setData({ acitivityLastTime: result[0] + ' 小时 ' + result[1] + ' 分钟'});
  },

  /**
   * 修改活动日期
   */
  changeActivityDate: function(event){
    console.log(event.detail.value);
    this.setData({ activityDate: event.detail.value});
  },
  /**
   * 添加图片
   */
  addPic: function(event){
    let that = this;
    if(this.data.pictures.length >= 9){
      wx.showToast({
        title: '图片数超过上限',
      });
      return;
    }
    wx.chooseImage({
      success: function(res) {
        let rest = 9 - that.data.pictures.length;
        if(rest > 0){
          that.setData({ pictures: that.data.pictures.concat(res.tempFiles.slice(0, rest))});
          console.log(that.data.pictures);
        }
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