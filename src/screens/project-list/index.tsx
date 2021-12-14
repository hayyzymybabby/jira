import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from 'utils'
import { Row, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { useDispatch } from 'react-redux'
import { ButtonNoPadding } from 'components/lib'
import { projectListActions } from './project-list.slice'

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
  const dispatch = useDispatch()

  return (
    <Container>
      <Row justify={'space-between'}>
        <h1>项目列表</h1>
        <ButtonNoPadding
          onClick={() => dispatch(projectListActions.openProjectModal())}
        >
          创建项目
        </ButtonNoPadding>
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
