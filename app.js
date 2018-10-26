App({

  /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    let that = this
    // 引入 BaaS SDK
    require('./utils/sdk-v1.9.0')
    let clientId = this.globalData.clientId
    wx.BaaS.init(clientId)
  },

  /**
   * 当小程序启动，或从后台进入前台显示，会触发 onShow
   */
  onShow: function (options) {
    
  },

  /**
   * 当小程序从前台进入后台，会触发 onHide
   */
  onHide: function () {
    
  },

  /**
   * 当小程序发生脚本错误，或者 api 调用失败时，会触发 onError 并带上错误信息
   */
  onError: function (msg) {
    
  },
  globalData: {
    clientId: '46408eb85ce79773f291',
    newsTableId: 55410,
    clubTableId: 55402,
    stuTableId: 55401,
    eduTableId: 55403,
    currentActivity: {}, //当前看的活动详情
    userInfo:{},
    userType:null,
  }
})
