import { TasksContext } from '@/entities/todo'
import Field from '@/shared/ui/Field'
import { useContext } from 'react'

const SearchTaskForm = props => {
	const { styles } = props
	const { searchQuery, setsearchQuery } = useContext(TasksContext)
	return (
		<form
			className={styles.form}
			onSubmit={e => e.preventDefault()}
		>
			<Field
				className={styles.field}
				lable="Search task "
				id="search-task"
				type="search"
				value={searchQuery}
				onInput={e => setsearchQuery(e.target.value)}
			/>
		</form>
	)
}
export default SearchTaskForm
