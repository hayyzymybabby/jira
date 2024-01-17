import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from 'utils/http'
import { Typography } from 'antd'

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<null | Error>(null)

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 300)

  const [list, setList] = useState([])
  const client = useHttp()

  useEffect(() => {
    setIsLoading(true)
    client('projects', { data: cleanObject(debouncedParam) })
      .then(setList)
      .catch(error => {
        setList([])
        setError(error)
      })
      .finally(() => {
        setIsLoading(false)
      })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List loading={isLoading} users={users} dataSource={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
