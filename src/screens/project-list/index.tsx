import styled from '@emotion/styled'
import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from '../../utils'
import { Button, Typography } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'
import { Row } from 'components/lib'

export const ProjectListScreen = (props: {
  setProjectModalOpen: (isOpen: boolean) => void
}) => {
  const [param, setParam] = useProjectsSearchParams()

  const {
    isLoading,
    error,
    data: list,
    retry
  } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  useDocumentTitle('项目列表', false)

  return (
    <Container>
      <Row between={true}>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModalOpen(true)}>
          创建项目
        </Button>
      </Row>
      <SearchPanel users={users || []} param={param} setParam={setParam} />
      {error ? (
        <Typography.Text type={'danger'}>{error.message}</Typography.Text>
      ) : null}
      <List
        setProjectModalOpen={props.setProjectModalOpen}
        refresh={retry}
        loading={isLoading}
        users={users || []}
        dataSource={list || []}
      />
    </Container>
  )
}

ProjectListScreen.whyDidYouRender = false

const Container = styled.div`
  padding: 3.2rem;
`
