import { TasksContext, ToDoItem } from '@/entities/todo'
import { useContext } from 'react'
const ToDoList = props => {
	const { styles } = props
	const { tasks, filteredTask } = useContext(TasksContext)
	const hasTasks = tasks.length > 0
	const isEmptyFilteredTasks = filteredTask?.length === 0
	if (!hasTasks) {
		return <div className={styles.emptyMessage}>There are no tasks yet</div>
	}
	if (hasTasks && isEmptyFilteredTasks) {
		return <div className={styles.emptyMessage}>Tasks not found</div>
	}

	return (
		<ul className={styles.list}>
			{(filteredTask ?? tasks).map(task => (
				<ToDoItem
					className={styles.item}
					key={task.id}
					{...task}
				/>
			))}
		</ul>
	)
}

export default ToDoList
