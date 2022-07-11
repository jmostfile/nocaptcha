import { Base64 } from 'js-base64'
//import Blob from "cross-blob"
//import { Blob } from 'buffer'
import { Blob } from 'blob-polyfill'
export default({ app }, inject) => {
    inject('blobimg', b64 => base64toBlob(b64));
  };
  
  function base64toBlob(b64) {
    const split2 = b64.split(',')
    const stype = split2[0].split(':')
    const base64Data = split2[1]
    const contentType = stype[1] || ''
    const sliceSize = 1024
    const byteCharacters = Base64.atob(base64Data)
    const bytesLength = byteCharacters.length
    const slicesCount = Math.ceil(bytesLength / sliceSize)
    const byteArrays = new Array(slicesCount)

    for (let sliceIndex = 0; sliceIndex < slicesCount; ++sliceIndex) {
      const begin = sliceIndex * sliceSize
      const end = Math.min(begin + sliceSize, bytesLength)

      const bytes = new Array(end - begin)
      for (let offset = begin, i = 0; offset < end; ++i, ++offset) {
        bytes[i] = byteCharacters[offset].charCodeAt(0)
      }
      byteArrays[sliceIndex] = new Uint8Array(bytes)
    }
    const blob = new Blob(byteArrays, { type: contentType })
    const bloburl = createObjectURL(blob)
    return bloburl
  }
  function createObjectURL(file) {
    if (global.webkitURL) {
      return global.webkitURL.createObjectURL(file)
    } else if (global.URL && global.URL.createObjectURL) {
      return global.URL.createObjectURL(file)
    } else {
      return null
    }
  }