import React, { useEffect } from 'react'
import { observer } from 'mobx-react'
import { useStores } from '../stores'
import { List, Spin, Descriptions } from 'antd'
import InfiniteScroll from 'react-infinite-scroller/dist/InfiniteScroll';
import styled from 'styled-components'

const Img = styled.img`
  height: 100px;
  object-fit: contain;
  border: 1px solid #eee;
`

const ComponentList = observer(() => {
  const { HistoryStore } = useStores()

  const loadMore = () => {
    HistoryStore.find()
  }
  useEffect(() => {
    // 卸载时调用
    return () => {
      HistoryStore.reset()
    }
  }, [])
  return (
    <div>
      <InfiniteScroll
        initialLoad={true}
        pageStart={0}
        loadMore={loadMore}
        hasMore={!HistoryStore.isLoading && HistoryStore.hasMore}
        useWindow={true}
      >
        <List
          dataSource={HistoryStore.list}
          renderItem={item => (
            <List.Item key={item.id}>
              <Descriptions>
                <Descriptions.Item label="图片"><Img src={item.attributes.url.attributes.url} alt="" /></Descriptions.Item>
                <Descriptions.Item label="图片名称">{item.attributes.filename}</Descriptions.Item>
                <Descriptions.Item label="线上地址"><a target="_blank" href={item.attributes.url.attributes.url}>{item.attributes.url.attributes.url}</a></Descriptions.Item>
              </Descriptions>
            </List.Item>
          )}
        >
          {
            HistoryStore.isLoading && HistoryStore.hasMore && (
              <div>
                <Spin tip="加载中" />
              </div>
            )
          }
        </List>
      </InfiniteScroll>
    </div>
  )
})

export default ComponentList