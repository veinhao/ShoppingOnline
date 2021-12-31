import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //左侧的菜单工具
    leftMenuList: [],
    //右侧商品
    rightContent: [],
    currentIndex: 0,
    //右侧内容滚动条距离顶部距离
    scrollTop: 0,
  },

  //接口返回数据
  Cates: [],

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //缓存
    //1 先判断本地数据中有没有旧数据
    //2 如果有 则使用本地旧数据
    //3 如果没有 则直接发送请求

    //1 获取本地存储
    const Cates = wx.getStorageSync("cates");
    //2 判断
    if (!Cates) {
      this.getCates();
    } else {
      //有旧的数据 定义过期时间 10s改成5分钟
      if (Date.now() - Cates.time > 1000 * 10) {
        //重新发送请求
        this.getCates();
      } else {
        //可以使用旧数据
        this.Cates = Cates.data;
        let leftMenuList = this.Cates.map((v) => v.cat_name);

        //构建右侧的商品数据
        let rightContent = this.Cates[0].children;
        this.setData({
          leftMenuList,
          rightContent,
        });
      }
    }
  },
  //获取接口数据
  async getCates() {
    // request({
    //   url: "/categories",
    // }).then((res) => {
    //   this.Cates = res.data.message;
    //   //把接口中的数据存到本地
    //   wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
    //   //构建左侧大菜单数据
    //   let leftMenuList = this.Cates.map((v) => v.cat_name);

    //   //构建右侧的商品数据
    //   let rightContent = this.Cates[0].children;
    //   this.setData({
    //     leftMenuList,
    //     rightContent,
    //   });
    // });


    //使用es7的async await发送异步请求
    const res=await request({url:"/categories"});

      this.Cates = res;
      //把接口中的数据存到本地
      wx.setStorageSync("cates", { time: Date.now(), data: this.Cates });
      //构建左侧大菜单数据
      let leftMenuList = this.Cates.map((v) => v.cat_name);

      //构建右侧的商品数据
      let rightContent = this.Cates[0].children;
      this.setData({
        leftMenuList,
        rightContent,
      }); 
  },
  handleItemTap(e) {
    //获取被点击标题身上的索引
    //给data中的currentIndex赋值就可以了
    //根据不同的索引来链接右侧的商品内容
    const { index } = e.currentTarget.dataset;
    let rightContent = this.Cates[index].children;

    this.setData({
      currentIndex: index,
      rightContent,
      //重新设置右侧内容距离顶部的距离
      scrollTop: 0,
    });
  },
});
