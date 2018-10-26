const utils = require('../../utils/utils');
const db_utils = require('../../utils/db_utils');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    password: null,
    userName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  getUserName: function (e) {
    this.setData({
      userName: e.detail.value
    })
  },
  getPassword: function (e) {
    this.setData({
      password: e.detail.value
    })
  },
  loginClick: function (e) {
    let tableId;
    let sign = this.data.userName[0];
    app.globalData.userType = sign;
    console.log(sign);
    switch (sign) {
      case 's': tableId = app.globalData.stuTableId;
        break;
      case 'c': tableId = app.globalData.clubTableId;
        break;
      case 'e': tableId = app.globalData.eduTableId;
        break;
      default: utils.showMessage("输入账号错误");
        break;
    }
    let query = new wx.BaaS.Query();
    query.compare('userName', '=', this.data.userName);
    query.compare('password', '=', this.data.password);
    db_utils.searchData(tableId, query,(res)=>{
      console.log(res.data.objects);
      if(res.data.objects==""){
        utils.showModel('登录失败', '账户或密码错误');
      }
      else{
        app.globalData.userInfo = res.data.objects[0];
        utils.showSuccess('登录成功');
        wx.switchTab({
          url: '../my/my',
        })
      }
      console.log(app.globalData.userInfo);
    })
  }
})