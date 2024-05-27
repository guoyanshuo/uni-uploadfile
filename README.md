# uni-uploadfile

uniapp上传文件方法封装插件。主要支持了微信小程序保留原文件名上传。

内部用条件编译判断是否是微信小程序环境，文件只能用files数组形式传递

## 安装

[![npm version](https://img.shields.io/npm/v/uni-uploadfile)](https://www.npmjs.com/package/uni-uploadfile)


`npm i uni-uploadfile -S`

## 使用

```ts
import UniUploadFile from 'uni-uploadfile'

UniUploadFile({
  url: '服务器上传文件url',
  files: '选中的文件数组',
  name: '服务器端接收文件对应的key',
  header: {
    // Authorization: `Bearer ${token}`,
  },
  formData: {
    // HTTP 请求中其他额外的 formData
  },
  success: (res: any) => {
    // 接口调用成功的回调函数	
  },
  fail: (err: any) => {
    // 接口调用失败的回调函数	
  }
})
```
