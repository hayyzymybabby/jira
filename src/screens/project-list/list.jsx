export const List = ({ list, users }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>名称</th>
          <th>负责人</th>
        </tr>
      </thead>
      <tbody>
        {list.map(project => (
          <tr key={project.id}>
            <td>{project.name}</td>
            <td>
              {/* ?作用：?前为undefined时整体为undefined 不会产生undefined.name报错情形 */}
              {users.find(user => user.id === project.personId)?.name || '未知'}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}
