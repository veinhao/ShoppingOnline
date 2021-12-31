import{getSetting,chooseAddress,openSetting,showModal,showToast,requestPayment} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
import {request} from "../../request/index.js"; 
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    totalPrice:0,
    totalNum:0
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
  onShow() {
    const address=wx.getStorageSync('address');
    let cart=wx.getStorageSync('cart')||[];
    cart=cart.filter(v=>v.checked);
    this.setData({address});
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    this.setData({
      cart
    });
    
  
    
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    let totalPrice=0;
    let totalNum=0;
    cart.forEach(v=>{
      
        totalPrice+=v.num*v.goods_price;
        totalNum+=v.num;
     
    })
    //判断数组是否为空
     
    this.setData({
      cart,
      totalPrice,
      totalNum,
      
      address
    });
  },
async handleOrderPay(){
  try {
    const token=wx.getStorageSync('token');
  if(!token){
    wx.navigateTo({
      url: '/pages/auth/index',
    });
    return;
  }
   
  //创建订单
  const header ={Authorization:token};
  const order_prize=this.data.totalPrice;
  const consignee_addr=this.data.address.all;
  const cart=this.data.cart;
  let goods=[];
  cart.forEach(v=>goods.push({
    goods_id:v.goods_id,
    goods_number:v.num,
    goods_prize:v.goods_prize
  }))

  const orderParams={order_prize,consignee_addr,goods};
  const {order_number}=await request({url:"/my/orders/create",method:"POST",data:orderParams});
  const pay=await request({url:"/my/orders/req_unifiedorder",method:"POST",data:{orderParams}});
  await requestPayment(pay);
  const res=await requestPayment(pay);
  await showToast({title:"支付成功"});
  let newCart=wx.getStorageSync('cart');
  newCart=newCart.filter(v=>!v.checked);
  wx.setStorageSync('cart', newCart);
  wx.navigateTo({
    url:'/pages/order/index',
  })
  } catch (error) {
    await showToast({title:"支付失败"});
    console.log(error);
  }
  
},




})