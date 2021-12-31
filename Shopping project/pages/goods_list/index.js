/**
 * 1 用户上划页面 滚动条触底 开始加载下一页数据
 *    1 找到滚动条触底事件
 *    2 判断还有没有下一页数据
 *    3 假如没有下一页数据 弹出一个提示
 *    4 假如还有下一页数据 来加载下一页
 */

import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: [
      {
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodsList: [],
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  totalPages:1,
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.QueryParams.cid = options.cid||"";
    this.QueryParams.query = options.query||"";
    this.getGoodsList();

    
  },
//总页数 
totalPages:1,

  async getGoodsList() {
    const res = await request({ url: "/goods/search", data: this.QueryParams });
    //获取总条数
    const total=res.total;
    //计算总页数
    this.totalPages=Math.ceil(total/this.QueryParams.pagesize);
    //console.log(this.totalPages);
    this.setData({
      goodsList: [...this.data.goodsList,...res.goods]
    });

    wx.stopPullDownRefresh();
  },

  handleTabsItemChange(e) {
    //console.log(e);
    const { index } = e.detail;
    let { tabs } = this.data;
    tabs.forEach((v, i) => i === index ? v.isActive = true : v.isActive = false);
    this.setData({
      tabs
    })
  },


//页面上滑 页面触底
onReachBottom (){
  //console.log("页面触底");
  //判断当前页有没有下一页
  if(this.QueryParams.pagenum>=this.totalPages){
    //console.log("没有下一页");
    wx.showToast({
      title: '没有下一页数据'
    });
  }else{
    //console.log("有下一页");
    this.QueryParams.pagenum++;
    this.getGoodsList();
  }
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
    this.setData({
      goodsList:[]
    })
    this.QueryParams.pagenum=1;

    this.getGoodsList();
  },


  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})