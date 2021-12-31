
export const getSetting=()=>{
    return new  Promise((resolve,reject)=>{
        wx.getSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        });
    })
}

export const chooseAddress=()=>{
    return new  Promise((resolve,reject)=>{
        wx.chooseAddress({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        });
    })
}

export const openSetting=()=>{
    return new  Promise((resolve,reject)=>{
        wx.openSetting({
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        });
    })
}



/*@param {object} param0
*/
export const showModal=()=>{
    return new  Promise((resolve,reject)=>{
        wx.showModal({
            title:"提示",
            content:"您是否要删除？",
            success:(res)=>{
              resolve(res);
            },
            fail:(err)=>{
                reject(err);
            }
          })
    })
}

export const showToast=({title})=>{
    return new  Promise((resolve,reject)=>{
        wx.showModal({
            title:title,
            //content:'none',
            success:(res)=>{
              resolve(res);
            },
            fail:(err)=>{
                reject(err);
            }
          })
    })
}

export const login=()=>{
    return new  Promise((resolve,reject)=>{
        wx.login({
            timeout:10000,
            success:(result)=>{
                resolve(result);
            },
            fail:(err)=>{
                reject(err);
            }
        })
    })
}

export const requestPayment=(pay)=>{
    return new  Promise((resolve,reject)=>{
        wx.requestPayment({
          ...pay,
          success:(result)=>{
            resolve(result);
          },
          fail:(err)=>{
            reject(err)
        },

        })
    })
}
