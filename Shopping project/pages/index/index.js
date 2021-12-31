//0 引入 用来发送请求的 方法
import { request } from "../../request/index.js";

Page({
  data: {
    //轮播图数组
    swiperList: [],
    //导航数组
    catesList: [],
    //楼层数组
    floorList: [],
  },
  //options(Object)
  //页面加载 就会 触发
  onLoad: function (options) {
    //1，发送异步请求 获取轮播图数据
    // wx.request({
    //   url: 'https://api-hmugo-web.itheima.net/api/public/v1/home/swiperdata',

    //   success: (result)=>{
    //     this.setData({
    //       swiperList:result.data.message
    //     })
    //   }
    // });

    this.getSwiperList();
    this.getCatesList();
    this.getFloorList();
  },
  //获取轮播图数据
  getSwiperList() {
    request({
      url: "/home/swiperdata",
    }).then((result) => {
      this.setData({
        swiperList: result,
      });
    });
  },
  //获取分类导航数据
  getCatesList() {
    request({
      url: "/home/catitems",
    }).then((result) => {
      this.setData({
        catesList: result,
      });
    });
  },
  //获取楼层数据
  getFloorList() {
    request({
      url: "/home/floordata",
    }).then((result) => {
      this.setData({
        floorList: result,
      });
    });
  },
});
