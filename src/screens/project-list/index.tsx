import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from 'utils'
import { Row, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'

export const ProjectListScreen = (props: { projectButton: JSX.Element }) => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectsSearchParams()
  const {
    isLoading,
    error,
    data: list,
    retry
  } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <Container>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        {props.projectButton}
      </Row>
      <SearchPanel
        users={users || []}
        param={param}
        setParam={setParam}
      ></SearchPanel>
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        projectButton={props.projectButton}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      ></List>
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
