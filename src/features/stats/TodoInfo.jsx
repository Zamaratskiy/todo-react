import { TasksContext } from '@/entities/todo'
import { memo, useContext } from 'react'
const TodoInfo = props => {
	const { styles } = props
	const { tasks, deleteAllTasks, doneTasks } = useContext(TasksContext)
	const total = tasks.length
	const hasTasks = total > 0

	return (
		<div className={styles.info}>
			<div className={styles.totalTasks}>
				Done {doneTasks} from {total}
			</div>
			{hasTasks && (
				<button
					className={styles.deleteAllButton}
					type="button"
					onClick={deleteAllTasks}
				>
					Delete all
				</button>
			)}
		</div>
	)
}

export default memo(TodoInfo)
