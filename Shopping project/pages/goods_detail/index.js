import { request } from "../../request/index.js";
import regeneratorRuntime from '../../lib/runtime/runtime';

// pages/goods_detail/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    goodsObj:{},
    isCollect:false
  },

  GoodsInfo:{
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onShow: function () {
    let pages=getCurrentPages();
    let currentPage=pages[pages.length-1];
    let options =currentPage.options;

    const {goods_id}=options;
    this.getGoodsDetail(goods_id);

    
  },
  
  async getGoodsDetail(goods_id){
    const goodsObj=await request({url:"/goods/detail",data:{goods_id}});
    this.GoodsInfo=goodsObj;
    let collect =wx.getStorageSync("collect")||[];
    let isCollect=collect.some(v=>v.goods_id===this.GoodsInfo.goods_id);
    this.setData({
      goodsObj:{
        goods_name:goodsObj.goods_name,
        goods_price:goodsObj.goods_price,
        //iphone 部分手机无法识别webp格式
        goods_introduce:goodsObj.goods_introduce.replace(/\.webp/g,'jpg'),
        pics:goodsObj.pics,
        
        
      },
      isCollect
    });
   
},

handleCartAdd(){
  let cart=wx.getStorageSync('cart')||[];
  let num=0;
  let index=cart.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  if(index===-1){
    this.GoodsInfo.num=1;
    this.GoodsInfo.checked=true;
    cart.push(this.GoodsInfo);
  }else{
    cart[index].num++;  
  }

  wx.setStorageSync('cart', cart);
  wx.showToast({
    title: '加入成功',
    icon:'success', 
    mask:true
  });
},

handlePreviewImage(e){
  //1,先构造要预览的图片数组
  const urls=this.GoodsInfo.pics.map(v=>v.pics_mid);
  //2 接受传递过来的图片URL
  const current=e.currentTarget.dataset.url;
  wx.previewImage({
    current,
    urls,
  });
},
 handleCollect(){
  let isCollect=false;
  let collect=wx.getStorageSync("collect")||[];
  let index=collect.findIndex(v=>v.goods_id===this.GoodsInfo.goods_id);
  if(index!==-1){
    collect.splice(index,1);
    isCollect=false;
    wx.showToast({
      title: '收藏成功',
      icon:'success',
      mask:true     
    });
  }else{
    collect.push(this.GoodsInfo);
    isCollect=true;
  }
  wx.setStorageSync('collect',collect);
  this.setData({

  })
 },
})