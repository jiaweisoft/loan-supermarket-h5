/**
 * Created by mapbar_front on 2019-01-24.
 */

// 机构中文名称自定义校验
function getLength (val) {
  let len = 0;
  for (var i = 0; i < val.length; i++) {
    if (val.charCodeAt(i) > 127 || val.charCodeAt(i) === 94) {
      len += 2;
    } else {
      len++;
    }
  }
  return len;
}
export function valideConvergeName (rule, value, callback) {
  if (!value) {
    callback(new Error('请填写机构中文名称'));
  } else {
    if (getLength(value) > 40) {
      callback(new Error('机构中文名称长度应该在40个字符以内'));
    } else {
      callback();
    }
  }
}

// 机构英文名称自定义校验
export function valideEnConvergeName (rule, value, callback) {
  let re = /^[a-zA-Z]+$/;
  if (!re.test(value)) {
    callback(new Error('机构英文名称应该用英文表示'));
  } else if (value.length > 40) {
    callback(new Error('机构英文名称长度应该在40个字符以内'));
  } else {
    callback();
  }
}

// 机构地址自定义校验
export function valideConverAddress (rule, value, callback) {
  let re = /^(http|https):\/\//;
  if (!re.test(value)) {
    callback(new Error('机构地址应该是一个合法的以http/https开头的地址'));
  } else {
    callback();
  }
}

// addEditUser页面：电话号码自定义校验
export function checkPhone (rule, value, callback) {
  if (!value) {
    return callback(new Error('手机号不能为空'));
  } else {
    const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
    if (reg.test(value)) {
      callback();
    } else {
      return callback(new Error('请输入正确的手机号'));
    }
  }
}

// addEditUser页面：字断长度自定义校验
export function lengthVal (rule, value, callback) {
  if (!value || value.length > 40) {
    return callback(new Error('请填写长度在40以内的信息'));
  } else {
    callback();
  }
}

// addEditUser页面：workLengthVal
export function workLengthVal (rule, value, callback) {
  if (!value || value.length > 20) {
    return callback(new Error('请填写长度在20以内的信息'));
  } else {
    callback();
  }
}
