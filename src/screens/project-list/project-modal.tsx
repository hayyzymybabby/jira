import { Button, Drawer } from 'antd'
import { useProjectModal } from './util'

export const ProjectModal = () => {
  const { projectModalOpen, close } = useProjectModal()
  return (
    <Drawer open={projectModalOpen} onClose={close} width={'100%'}>
      <h1>projectModal</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
