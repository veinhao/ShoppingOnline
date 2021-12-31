import{getSetting,chooseAddress,openSetting,showModal,showToast} from "../../utils/asyncWx.js";
import regeneratorRuntime from '../../lib/runtime/runtime';
// pages/cart/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address:{},
    cart:[],
    allChecked:false,
    totalPrice:0,
    totalNum:0
  },


  async handleChooseAddress(){
   
    try {
      //获取权限状态
    const res1=await getSetting();
    const scopeAddress=res1.authSetting["scope.address"];
    //判断权限状态
    if(scopeAddress===false){
      //调用获取收货地址的API
      await openSetting();
    }
    let address=await chooseAddress();
    address.all=address.provinceName+address.cityName+address.countryName+address.detailInfo;
    //存储到缓存中
    wx.setStorageSync('address', address);
    } catch (error) {
      console.log(error)
    }
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
    const cart=wx.getStorageSync('cart')||[];
    this.setData({address});
    //const allChecked=cart.length?cart.every(v=>v.checked):false;
    this.setCart(cart);
  },
handleItemChange(e){
  const goods_id=e.currentTarget.dataset.id;
  //console.log(goods_id);
  let {cart}=this.data;
  let index=cart.findIndex(v=>v.goods_id===goods_id);
  cart[index].checked=!cart[index].checked;
  this.setCart(cart);
 
},
setCart(cart){
  this.setData({
    cart
  });
  wx.setStorageSync('cart', cart);

  
  //const allChecked=cart.length?cart.every(v=>v.checked):false;
  let allChecked=true;
  let totalPrice=0;
  let totalNum=0;
  cart.forEach(v=>{
    if(v.checked){
      totalPrice+=v.num*v.goods_price;
      totalNum+=v.num;
    }else{
      allChecked=false;
    }
  })
  //判断数组是否为空
  allChecked=cart.length!=0?allChecked:false;
  this.setData({
    cart,
    totalPrice,
    totalNum,
    allChecked
  });
},
handleItemAllCheck(){
  let {cart,allChecked}=this.data;
  allChecked=!allChecked;
  cart.forEach(v=>v.checked=allChecked);
  this.setCart(cart);
},
async handleItemNumEdit(e){
  //获取传递过来的参数
  const {operation,id}=e.currentTarget.dataset;
  //获取购物车数组
  let {cart}=this.data;
  
  //找到需要修改的商品索引
  const index=cart.findIndex(v=>v.goods_id===id);
  if(cart[index].num===1&&operation===-1){
    
    const res=await showModal({content:"您是否要删除？"});
    if(res.confirm){
      cart.splice(index,1);
      this.setCart(cart);
    }
  }
  //进行修改数量
  cart[index].num+=operation;
  //设置回缓存和修改中
  this.setCart(cart);
},
async handlePay(){
  const {address,totalNum}=this.data;
  if(!address.userName){
    await showToast({title:"您还没有选择收获地址"});
    return;
  }
  //判断用户有没有选择商品
  if(totalNum===0){
    await showToast({tilte:"您还没有选购商品"});
    return;
  }

  wx.navigateTo({
    url:'/pages/pay/index'
  });
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