import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useKanbansQueryKey, useTasksModal, useTasksSearchParams } from './util'
import { useTaskTypes } from 'utils/task-type'
import taskIcon from 'assets/task.svg'
import bugIcon from 'assets/bug.svg'
import styled from '@emotion/styled'
import { Button, Card, Dropdown, Modal } from 'antd'
import { CreateTask } from './create-task'
import { Task } from 'types/task'
import { Mark } from 'components/mark'
import { useDeleteKanban } from 'utils/kanban'
import { Row } from 'components/lib'

const TaskTypeIcon = ({ id }: { id: number }) => {
  const { data: taskTypes } = useTaskTypes()
  const name = taskTypes?.find(taskType => taskType.id === id)?.name
  if (!name) return null
  return (
    <img
      src={name === 'task' ? taskIcon : bugIcon}
      alt="icon"
      style={{ width: '1.6rem' }}
    />
  )
}

const TaskCard = ({ task }: { task: Task }) => {
  const { startEdit } = useTasksModal()
  const { name: keyword } = useTasksSearchParams()
  return (
    <Card
      onClick={() => startEdit(task.id)}
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
    >
      <div>
        <Mark keyword={keyword} name={task.name} />
      </div>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

export const KanbanColumn = ({ kanban }: { kanban: Kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())

  const tasks = allTasks?.filter(task => task.kanbanId === kanban.id)

  return (
    <Container>
      <Row between={true}>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>

      <TasksContainer>
        {tasks?.map(task => <TaskCard task={task} key={task.id} />)}
        <CreateTask kanbanId={kanban.id} />
      </TasksContainer>
    </Container>
  )
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync } = useDeleteKanban(useKanbansQueryKey())
  const startEdit = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗',
      onOk() {
        mutateAsync({ id: kanban.id })
      }
    })
  }
  const items = [
    {
      label: (
        <Button onClick={startEdit} type={'link'}>
          删除
        </Button>
      ),
      key: 'delete'
    }
  ]
  return (
    <Dropdown menu={{ items }}>
      <Button type={'link'}>...</Button>
    </Dropdown>
  )
}

export const Container = styled.div`
  min-width: 27rem;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
  display: flex;
  flex-direction: column;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
`

const TasksContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
