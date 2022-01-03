import { SearchPanel } from './search-panel'
import { List } from './list'
import { useDebounce, useDocumentTitle } from 'utils'
import { Row } from 'antd'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectModal, useProjectsSearchParams } from './util'
import { ButtonNoPadding, ErrorBox, ScreenContainer } from 'components/lib'
import { Profiler } from 'components/profiler'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const { open } = useProjectModal()

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list } = useProjects(useDebounce(param, 200))
  const { data: users } = useUsers()

  return (
    <Profiler id={'项目列表'}>
      <ScreenContainer>
        <Row justify={'space-between'}>
          <h1>项目列表</h1>
          <ButtonNoPadding onClick={open} type={'link'}>
            创建项目
          </ButtonNoPadding>
        </Row>
        <SearchPanel
          users={users || []}
          param={param}
          setParam={setParam}
        ></SearchPanel>
        <ErrorBox error={error} />
        <List
          loading={isLoading}
          users={users || []}
          dataSource={list || []}
        ></List>
      </ScreenContainer>
    </Profiler>
  )
}

ProjectListScreen.whyDidYouRender = false
