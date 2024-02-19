import { Button, Drawer } from 'antd'

export const ProjectModal = (props: {
  projectModalOpen: boolean
  onClose: () => void
}) => {
  return (
    <Drawer
      open={props.projectModalOpen}
      onClose={props.onClose}
      width={'100%'}
    >
      <h1>projectModal</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  )
}
