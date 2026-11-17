import { createContext, useMemo } from 'react'
import useTasks from './useTasks'
import useincompleteTaskScroll from './useincompleteTaskScroll'
export const TasksContext = createContext({})
export const TascksProvider = props => {
	const { children } = props
	const {
		tasks,
		filteredTask,
		deletTasks,
		deleteAllTasks,
		toggleTaskComplete,

		searchQuery,
		setsearchQuery,
		newTaskInputRef,
		addTask,
		doneTasks,
		disapperingTaskId,
		apperingTaskId
	} = useTasks()
	const { firstIncompleteTaskRef, firstIncompleteTaskId } =
		useincompleteTaskScroll(tasks)
	const value = useMemo(
		() => ({
			tasks,
			filteredTask,
			deletTasks,
			deleteAllTasks,
			toggleTaskComplete,
			searchQuery,
			setsearchQuery,
			newTaskInputRef,
			addTask,
			doneTasks,
			disapperingTaskId,
			apperingTaskId,
			firstIncompleteTaskRef,
			firstIncompleteTaskId
		}),
		[
			tasks,
			filteredTask,
			deletTasks,
			deleteAllTasks,
			toggleTaskComplete,
			searchQuery,
			setsearchQuery,
			newTaskInputRef,
			addTask,
			doneTasks,
			disapperingTaskId,
			apperingTaskId,
			firstIncompleteTaskRef,
			firstIncompleteTaskId
		]
	)
	return <TasksContext.Provider value={value}>{children}</TasksContext.Provider>
}
