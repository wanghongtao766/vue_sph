// 利用 uuid生成随机的字符串 且不能重复只有这一个
// uuid模块和lodash一样 在node_modules中自带，无需 npm i
import { v4 as uuidv4 } from 'uuid'

export const getUUID = () => {
  let uuid = localStorage.getItem('UUID')
  // 如果uuid不存在
  if (!uuid) {
    localStorage.setItem('UUID', uuidv4())
  }
  return uuid
}