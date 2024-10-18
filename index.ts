import FormData from './formData.js'


const UniUploadFile = (sendData: any) => {
  const { url, files, name, header, formData, success, fail, filePath } = sendData
  if(filePath){
    // @ts-ignore
    uni.uploadFile({
      url,
      filePath: filePath,
      name,
      header: {
        ...header,
      },
      formData,
      success: (res: any) => {
        if (!success) return
        if (typeof res.data === 'string') {
          res.data = JSON.parse(res.data)
        }
        success(res)
      },
      fail: (err: any) => {
        if (!fail) return
        fail(err)
      },
    })
    return
  }

  // #ifdef MP-WEIXIN
  wxUpload(sendData)
  // #endif

  // #ifndef MP-WEIXIN
  noWxUpload(sendData)
  // #endif
}

const wxUpload = (sendData: any) => {
  const { url, files, name, header, formData, success, fail } = sendData

  const f = new FormData()
  files.forEach((item: any) => {
    f.appendFile(name, item.url, item.name)
  })

  for (let key in formData) {
    f.append(key, formData[key])
  }
  let dataR = f.getData()
  // @ts-ignore
  uni.request({
    url,
    data: dataR.buffer,
    method: 'POST',
    header: {
      ...header,
      'content-type': dataR.contentType,
    },
    success: (res: any) => {
      if (!success) return
      success(res)
    },
    fail: (err: any) => {
      if (!fail) return
      fail(err)
    },
  })
}

const noWxUpload = (sendData: any) => {
  const { url, files, name, header, formData, success, fail } = sendData

  files.forEach((item: any) => {
    item.name = name
  })

  // @ts-ignore
  uni.uploadFile({
    url,
    files,
    name,
    header: {
      ...header,
    },
    formData,
    success: (res: any) => {
      if (!success) return
      if (typeof res.data === 'string') {
        res.data = JSON.parse(res.data)
      }
      success(res)
    },
    fail: (err: any) => {
      if (!fail) return
      fail(err)
    },
  })
}

export default UniUploadFile
