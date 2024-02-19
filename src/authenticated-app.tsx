import styled from '@emotion/styled'
import { ButtonNoPadding, Row } from 'components/lib'
import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown } from 'antd'
import { Navigate, Route, Routes } from 'react-router'
import { ProjectScreen } from 'screens/project'
import { resetRoute } from 'utils'
import { useState } from 'react'
import { ProjectModal } from 'screens/project-list/project-modal'
import { ProjectPopover } from 'components/project-popover'

export const AuthenticatedApp = () => {
  const [projectModalOpen, setProjectModalOpen] = useState(false)
  return (
    <Container>
      <PageHeader
        projectButton={
          <ButtonNoPadding
            onClick={() => setProjectModalOpen(true)}
            type={'link'}
          >
            创建项目
          </ButtonNoPadding>
        }
      />
      <Main>
        <Routes>
          <Route
            path={'projects'}
            element={
              <ProjectListScreen
                projectButton={
                  <ButtonNoPadding
                    onClick={() => setProjectModalOpen(true)}
                    type={'link'}
                  >
                    创建项目
                  </ButtonNoPadding>
                }
              />
            }
          />
          <Route path={'projects/:projectId/*'} element={<ProjectScreen />} />
          <Route
            index
            element={<Navigate to={'projects'} replace={true} />}
          ></Route>
        </Routes>
      </Main>
      <ProjectModal
        projectModalOpen={projectModalOpen}
        onClose={() => setProjectModalOpen(false)}
      />
    </Container>
  )
}

const PageHeader = (props: { projectButton: JSX.Element }) => {
  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <ButtonNoPadding type={'link'} onClick={resetRoute}>
          <SoftwareLogo width={'18rem'} color={'rgb(38, 132, 255)'} />
        </ButtonNoPadding>
        <ProjectPopover {...props} />
        <span>用户</span>
      </HeaderLeft>
      <HeaderRight>
        <User />
      </HeaderRight>
    </Header>
  )
}

/**
 * grid 和 flex 各自的应用场景
 * 1. 要考虑，是一维布局 还是 二维布局
 * 一般来说，一维布局用flex，二维布局用grid
 * 2. 是从内容出发还是从布局出发？
 * 从内容出发：你先有一组内容(数量一般不固定),然后希望他们均匀的分布在容器中，由内容自己的大小决定占据的空间
 * 从布局出发：先规划网格(数量一般比较固定)，然后再把元素往里填充
 * 从内容出发，用flex
 * 从布局出发，用grid
 *
 */

const User = () => {
  const { logout, user } = useAuth()
  const items = [
    {
      label: (
        <Button onClick={logout} type={'link'}>
          登出
        </Button>
      ),
      key: 'logout'
    }
  ]

  return (
    <Dropdown menu={{ items }}>
      <Button type={'link'} onClick={e => e.preventDefault()}>
        Hi, {user?.name}
      </Button>
    </Dropdown>
  )
}

const Container = styled.div`
  height: 100vh;
`
// grid-area 用来给grid子元素起名字
const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)`
  display: flex;
  align-items: center;
`
const HeaderRight = styled.div``
const Main = styled.main`
  grid-area: main;
`
