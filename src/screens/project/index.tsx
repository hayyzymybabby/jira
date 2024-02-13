import { Link } from 'react-router-dom'
import { Routes, Route, Navigate } from 'react-router'
import { KanbanScreen } from 'screens/kanban'
import { EpicScreen } from 'screens/epic'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>ProjectScreen</h1>
      <Link replace to={'kanban'}>
        看板
      </Link>
      <Link replace to={'epic'}>
        任务组
      </Link>
      <Routes>
        <Route path={'kanban'} element={<KanbanScreen />} />
        <Route path={'epic'} element={<EpicScreen />} />
        <Route index element={<Navigate to={'kanban'} replace={true} />} />
      </Routes>
    </div>
  )
}
