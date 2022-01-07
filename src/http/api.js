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
// 获取管理员列表
export const getAdminList = params => fetchGet('/users/addUser', params);
