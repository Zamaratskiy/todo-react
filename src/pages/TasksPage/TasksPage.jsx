import { TascksProvider } from '@/entities/todo'
import Todo from '@/widgets/Todo/Todo'

const TasksPage = () => {
	return (
		<TascksProvider>
			<Todo />
		</TascksProvider>
	)
}
export default TasksPage
