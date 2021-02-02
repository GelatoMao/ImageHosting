import React, { useRef } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import { Upload } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
const { Dragger } = Upload

const ComponentUploader = observer(() => {
  const { ImageStore } = useStores()
  const ref = useRef()
  const props = {
    beforeUpload: file => {
      console.log(file)
      return false
    }
  }
  const bindChange = () => {
    console.log(ref.current)
    if (ref.current.files.length > 0) {
      ImageStore.setFile(ref.current.files[0])
      ImageStore.setFilename(ref.current.files[0].name)
      ImageStore.upload().then((serverFile) => {
        console.log('上传成功')
        console.log(serverFile)
      }).catch(() => {
        console.log('上传失败')
      })
    }
    window.file = ref.current
  }

  return (
    <div>
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">
          Support for a single or bulk upload. Strictly prohibit from uploading company data or other
          band files
        </p>
      </Dragger>
    </div>
  )
})

export default ComponentUploader