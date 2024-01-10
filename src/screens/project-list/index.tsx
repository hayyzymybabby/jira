import { useState, useEffect } from 'react'
import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { cleanObject, useDebounce, useMount } from '../../utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 300)

  const [list, setList] = useState([])
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debouncedParam) }).then(setList)
  }, [debouncedParam])

  useMount(() => {
    client('users').then(setUsers)
  })

  return (
    <Container>
      <h1>项目列表</h1>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </Container>
  )
}

const Container = styled.div`
  padding: 3.2rem;
`
