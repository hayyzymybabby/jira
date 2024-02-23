import { Button, Drawer } from 'antd'
import { useDispatch, useSelector } from 'react-redux'
import {
  projectListActions,
  selectProjectModalOpen
} from './project-list.slice'

export const ProjectModal = () => {
  const dispatch = useDispatch()
  const projectModalOpen = useSelector(selectProjectModalOpen)

  return (
    <Drawer
      open={projectModalOpen}
      onClose={() => dispatch(projectListActions.closeProjectModal())}
      width={'100%'}
    >
      <h1>projectModal</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>
        关闭
      </Button>
    </Drawer>
  )
}
