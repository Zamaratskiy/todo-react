import { TasksContext } from '@/entities/todo'
import Button from '@/shared/ui/Button'
import Field from '@/shared/ui/Field'
import { useContext, useState } from 'react'

const AddTaskForm = props => {
	const { styles } = props
	const { addTask, newTaskInputRef } = useContext(TasksContext)
	const [newTaskTitle, setNewTaskTitle] = useState('')
	const [error, setError] = useState('')

	const clearNewTaskTitle = newTaskTitle.trim()
	const isNewTaskTitleEmpty = clearNewTaskTitle.length === 0
	const onSubmit = e => {
		e.preventDefault()
		if (!isNewTaskTitleEmpty) {
			addTask(clearNewTaskTitle, () => {
				setNewTaskTitle('')
			})
		}
	}
	const onInput = e => {
		const { value } = e.target
		const clearValue = value.trim()

		const hasOnlySpases = value.length > 0 && clearValue.length === 0
		setNewTaskTitle(clearValue)
		setError(hasOnlySpases ? 'The task cannot be empty' : '')
	}
	return (
		<form
			className={styles.form}
			onSubmit={onSubmit}
		>
			<Field
				className={styles.field}
				lable="New task title"
				id="new-task"
				value={newTaskTitle}
				onInput={onInput}
				ref={newTaskInputRef}
				error={error}
			/>
			<Button
				type="submit"
				isDisabled={isNewTaskTitleEmpty}
			>
				Add
			</Button>
		</form>
	)
}
export default AddTaskForm
