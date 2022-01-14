// api统一接口管理
import {fetchPost, fetchGet} from "./http";

/**
 * @param {string} params
 * 我们定义了一个topics方法
 * 这个方法有一个参数params
 * params是我们请求接口时携带的参数对象
 * 而后调用了我们封装的post方法
 * post方法的第一个参数是我们的接口地址
 * 第二个参数是topics的params参数
 * 即请求接口时携带的参数对象
 * 最后通过export导出topics。
 */

// 用户登陆接口
export const userLogin = params => fetchPost('/open/admin/login', params);
// 新增
export const addList = params => fetchGet('/users/addList', params);
// 获取列表
export const getList = params => fetchGet('/users/getList', params);
// 删除列表
export const delList = params => fetchGet('/users/delList', params);
// 编辑列表
export const editList = params => fetchGet('/users/editList', params);
// 上传图片
export const uploadImg = params => fetchPost('/imgUpload/upload', params);
// 编辑时间
export const editTime = params => fetchGet('/users/editTime', params);
// 获取时间
export const getTime = params => fetchGet('/users/getTime', params);
