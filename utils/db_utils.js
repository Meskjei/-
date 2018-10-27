function createTableObject(tableID) {
  let tableObject = new wx.BaaS.TableObject(tableID);
  return tableObject;
}

function setQuery(tableObject, query) {
  tableObject.setQuery(query);
  return tableObject;
}

function searchData(tableID, query, cb) {
  let tableObject = createTableObject(tableID);
  console.log("tableId is:"+tableID);
  if (query != undefined) {
    tableObject = setQuery(tableObject, query);
  }
  tableObject.orderBy('-created_at').find().then(res => {
    console.log(res);
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../image/netError.png'
    });
  });
}

function updateData(tableID, recordID, newData, cb) {
  let tableObject = createTableObject(tableID);
  let record = tableObject.getWithoutData(recordID);
  record.set(newData);
  record.update().then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../image/netError.png'
    });
  });
}

function getData(tableID, recordID, cb){
  let tableObject = new wx.BaaS.TableObject(tableID);
  tableObject.get(recordID).then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../../image/netError.png'
    });
  })
}

function getUserData(uid, cb){
  let myUser = new wx.BaaS.User();
  myUser.get(uid).then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../../image/netError.png'
    });
  });
}

function updateSelfData(newData, cb){
  let myUser = new wx.BaaS.User();
  let currentUser = myUser.getCurrentUserWithoutData();
  currentUser.set(newData).update().then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../../image/netError.png'
    });
  })
}

function uploadFile(filePath, categoryName,cb){
  let MyFile = new wx.BaaS.File();
  let metaData = { categoryName: categoryName };
  let fileParams = { filePath: filePath };
  MyFile.upload(fileParams, metaData).then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../../image/netError.png'
    });
  })
}

function createRecord(tableID, newRecord, cb){
  let MyTableObject = new wx.BaaS.TableObject(tableID);
  let MyRecord = MyTableObject.create();
  MyRecord.set(newRecord).save().then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../../image/netError.png'
    });
  });
}

function deleteRecord(tableID, recordID, cb){
  let MyTableObject = new wx.BaaS.TableObject(tableID);
  MyTableObject.delete(recordID).then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../../image/netError.png'
    });
  });
}

function deleteFile(fileID, cb){
  let MyFile = new wx.BaaS.File();
  MyFile.delete(fileID).then(res => {
    cb(res);
  }, err => {
    console.log(err);
    wx.showToast({
      title: '网络故障',
      image: '../../image/netError.png'
    });
  });
}

function QRcode(QRtype,params,cb){
  wx.BaaS.getWXACode(QRtype, params).then(res => {
    cb(null, res.image)
  }).catch(err => {
    cb(err)
  })
}

module.exports = { searchData, updateData, getData, getUserData, updateSelfData, 
  uploadFile, createRecord, deleteRecord, deleteFile, QRcode}