import { Dropdown, Modal, Table, TableProps } from 'antd'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import { Pin } from 'components/pin'
import { useDeleteProject, useEditProject } from 'utils/project'
import { ButtonNoPadding } from 'components/lib'
import { useProjectModal, useProjectsQueryKey } from './util'
import { Project } from 'types/project'
import { User } from 'types/user'

// react-router 和 react-router-dom的关系，类似于 react 和 react-dom/react-native/react-vr...

interface ListProps extends TableProps<Project> {
  users: User[]
}

export const List = ({ users, ...props }: ListProps) => {
  const { mutate } = useEditProject(useProjectsQueryKey())

  const pinProject = (id: number) => (pin: boolean) => mutate({ id, pin })

  return (
    <Table
      rowKey={'id'}
      pagination={false}
      columns={[
        {
          title: <Pin checked={true} disabled={true} />,
          render(value, project) {
            return (
              <Pin
                checked={project.pin}
                onCheckedChange={pinProject(project.id)}
              />
            )
          }
        },
        {
          title: '名称',
          sorter: (a, b) => a.name.localeCompare(b.name),
          render(value, project) {
            return <Link to={`${String(project.id)}`}>{project.name}</Link>
          }
        },
        {
          title: '部门',
          dataIndex: 'organization'
        },
        {
          title: '负责人',
          render(value, project) {
            return (
              <span>
                {users.find(user => user.id === project.personId)?.name ||
                  '未知'}
              </span>
            )
          }
        },
        {
          title: '创建时间',
          render(value, project) {
            return (
              <span>
                {project.created
                  ? dayjs(project.created).format('YYYY-MM-DD')
                  : '无'}
              </span>
            )
          }
        },
        {
          render(value, project) {
            return <More project={project} />
          }
        }
      ]}
      {...props}
    />
  )
}

const More = ({ project }: { project: Project }) => {
  const { startEdit } = useProjectModal()
  const editProject = (id: number) => () => startEdit(id)
  const { mutate: deleteProject } = useDeleteProject(useProjectsQueryKey())
  const confirmDeleteProject = (id: number) => {
    Modal.confirm({
      title: '确定删除这个项目吗?',
      content: '点击确定删除',
      okText: '确定',
      onOk() {
        deleteProject({ id })
      }
    })
  }

  const items = [
    {
      label: (
        <ButtonNoPadding type={'link'} onClick={editProject(project.id)}>
          编辑
        </ButtonNoPadding>
      ),
      key: 'edit'
    },
    {
      label: (
        <ButtonNoPadding
          type={'link'}
          onClick={() => confirmDeleteProject(project.id)}
        >
          删除
        </ButtonNoPadding>
      ),
      key: 'delete'
    }
  ]

  return (
    <Dropdown menu={{ items }}>
      <ButtonNoPadding type={'link'}>...</ButtonNoPadding>
    </Dropdown>
  )
}
