import { useState, useEffect } from 'react'

import { SearchPanel } from './search-panel'
import { List } from './list'
import QueryString from 'qs'
import { cleanObject, useDebounce, useMount } from '../../utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [users, setUsers] = useState([])

  const [param, setParam] = useState({
    name: '',
    personId: ''
  })

  const debouncedParam = useDebounce(param, 300)

  const [list, setList] = useState([])

  useEffect(() => {
    fetch(
      `${apiUrl}/projects?${QueryString.stringify(cleanObject(debouncedParam))}`
    ).then(async response => {
      if (response.ok) {
        setList(await response.json())
      }
    })
  }, [debouncedParam])

  useMount(() => {
    fetch(`${apiUrl}/users`).then(async response => {
      if (response.ok) {
        setUsers(await response.json())
      }
    })
  })

  return (
    <div>
      <SearchPanel users={users} param={param} setParam={setParam} />
      <List users={users} list={list} />
    </div>
  )
}
