import React, { useRef } from 'react'
import { observer, useLocalStore } from 'mobx-react'
import { useStores } from '../stores'
import { message, Upload, Descriptions, Badge } from 'antd'
import { InboxOutlined } from '@ant-design/icons'
import styled from 'styled-components'


const { Dragger } = Upload

const ImageShow = styled.div`
  margin-top: 30px;
  border: 1px dashed #ccc;
  padding: 20px;
`

const H1 = styled.h1`
  margin: 20px 0;
  text-align: center;
`

const Image = styled.img`
  max-width: 300px;
`

const ComponentUploader = observer(() => {

  const { ImageStore, UserStore } = useStores()
  const ref1 = useRef()
  const ref2 = useRef()

  const store = useLocalStore(() => ({
    width: null,
    setWidth(width) {
      store.width = width
    },
    get widthStr() {
      return store.width ? `/w/${store.width}` : ''
    },
    height: null,
    setHeight(height) {
      store.height = height
    },
    get heightStr() {
      return store.height ? `/h/${store.height}` : ''
    },
    get fullStr() {
      return ImageStore.serverFile.attributes.url.attributes.url + '?imageView2/0' + store.widthStr + store.heightStr
    }
  }))

  const bindWidthChange = () => {
    store.setWidth(ref1.current.value)
  }

  const bindHeightChange = () => {
    store.setHeight(ref2.current.value)
  }

  const props = {
    // 不显示列表
    showUploadList: false,
    beforeUpload: file => {
      ImageStore.setFile(file)
      ImageStore.setFilename(file.name)
      if (UserStore.currentUser === null) {
        message.warning('请先登录再上传！')
        return false
      }
      ImageStore.upload().then((serverFile) => {
        console.log('上传成功')
        console.log(serverFile)
      }).catch(() => {
        console.log('上传失败')
      })
      return false
    }
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
      {
        ImageStore.serverFile ? <ImageShow>
          <H1>上传结果</H1>
          <Descriptions title="上传图片信息展示" bordered>
            <Descriptions.Item label="线上地址" span={3}><a target="_blank" href={ImageStore.serverFile.attributes.url.attributes.url}>{ImageStore.serverFile.attributes.url.attributes.url}</a></Descriptions.Item>
            <Descriptions.Item label="文件名" span={3}>{ImageStore.filename}</Descriptions.Item>
            <Descriptions.Item label="图片预览" span={3}><Image src={ImageStore.serverFile.attributes.url.attributes.url} alt="" /></Descriptions.Item>
            <Descriptions.Item label="更多尺寸" span={3}>
              <input ref={ref1} onChange={bindWidthChange} placeholder="最大宽度(可选)" />
              <input ref={ref2} onChange={bindHeightChange} placeholder="最大高度(可选)" />
            </Descriptions.Item>
            <Descriptions.Item label="设置大小后线上地址" span={3}>
              <a target="_blank" href={store.fullStr} alt="">{store.fullStr}</a>
            </Descriptions.Item>
          </Descriptions>
        </ImageShow> : null
      }
    </div >
  )
})

export default ComponentUploader