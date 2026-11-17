const useTasksLocalStorage = () => {
	const saveTasks = JSON.parse(localStorage.getItem('tasks'))
	const savedTasks = tasks => {
		localStorage.setItem('tasks', JSON.stringify(tasks))
	}
	return {
		saveTasks: saveTasks ? saveTasks : null,
		savedTasks
	}
}
export default useTasksLocalStorage
