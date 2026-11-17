import { TasksContext, ToDoList } from '@/entities/todo'
import AddTaskForm from '@/features/add-task'
import SearchTaskForm from '@/features/search-task'
import TodoInfo from '@/features/stats'
import Button from '@/shared/ui/Button'
import { useContext } from 'react'
import styles from './Todo.module.scss'

const Todo = () => {
	const { firstIncompleteTaskRef } = useContext(TasksContext)
	return (
		<div className={styles.todo}>
			<h1 className={styles.title}>To Do List</h1>
			<AddTaskForm styles={styles} />
			<SearchTaskForm styles={styles} />
			<TodoInfo styles={styles} />
			<Button
				onClick={() => {
					firstIncompleteTaskRef.current?.scrollIntoView({
						behavior: 'smooth'
					})
				}}
			>
				Show first incoplete task
			</Button>
			<ToDoList styles={styles} />
		</div>
	)
}

export default Todo
