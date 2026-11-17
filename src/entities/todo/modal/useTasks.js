import tasksAPI from '@/shared/tasks/api'
import {
	useCallback,
	useEffect,
	useMemo,
	useReducer,
	useRef,
	useState
} from 'react'
const tasksReduser = (state, action) => {
	switch (action.type) {
		case 'SET_ALL': {
			return Array.isArray(action.tasks) ? action.tasks : state
		}
		case 'ADD': {
			return [...state, action.task]
		}
		case 'TOGGLE_COMPLETE': {
			const { id, isDone } = action
			return state.map(task => {
				if (id === task.id) {
					return { ...task, isDone }
				}
				return task
			})
		}
		case 'DELETE': {
			return state.filter(task => task.id !== action.id)
		}
		case 'DELETE_ALL': {
			return []
		}
		default: {
			return state
		}
	}
}

const useTasks = () => {
	// const { saveTasks, savedTasks } = useTasksLocalStorage()
	// const [tasks, setTasks] = useState(() => {
	// 	if (Array.isArray(saveTasks) && saveTasks.length > 0) {
	// 		return saveTasks
	// 	}
	// 	return [
	// 		{ id: 'task-1', title: 'Купить молока', isDone: false },
	// 		{ id: 'task-2', title: 'Погладить кота', isDone: true }
	// 	]
	// })
	// работа через localStorage
	// const [tasks, setTasks] = useState([]) используем useReduser
	const [tasks, dispatch] = useReducer(tasksReduser, [])

	const newTaskInputRef = useRef(null)

	const renderCount = useRef(0)
	const [searchQuery, setsearchQuery] = useState('')
	const [disapperingTaskId, setDisapperingTaskId] = useState(null)
	const [apperingTaskId, setApperingTaskId] = useState(null)

	// const deleteAllTasks = useCallback(() => {
	// 	const isConfirmed = confirm('Are you sure you want to delete all?')
	// 	if (isConfirmed) {
	// 		tasksAPI.deleleALL(tasks).then(() => setTasks([]))
	// 	}
	// }, [tasks]) используем useReduser

	const deleteAllTasks = useCallback(() => {
		const isConfirmed = confirm('Are you sure you want to delete all?')
		if (isConfirmed) {
			tasksAPI.deleleALL(tasks).then(() => dispatch({ type: 'DELETE_ALL' }))
		}
	}, [tasks])
	const doneTasks = useMemo(() => {
		return tasks.filter(({ isDone }) => isDone).length
	}, [tasks])

	// const deletTasks = useCallback(
	// 	taskId => {
	// 		tasksAPI.delete(taskId).then(() => {
	// 			setDisapperingTaskId(taskId)
	// 			setTimeout(() => {
	// 				setTasks(tasks.filter(task => task.id !== taskId))
	// 				setDisapperingTaskId(null)
	// 			}, 400)
	// 		})
	// 	},
	// 	[tasks]
	// ) используем useReduser
	const deletTasks = useCallback(taskId => {
		tasksAPI.delete(taskId).then(() => {
			setDisapperingTaskId(taskId)
			setTimeout(() => {
				dispatch({ type: 'DELETE', id: taskId })
				setDisapperingTaskId(null)
			}, 400)
		})
	}, [])
	// const toggleTaskComplete = useCallback((taskId, isDone) => {
	// 	tasksAPI.toggleComplete(taskId, isDone).then(() => {
	// 		setTasks(prevTasks =>
	// 			prevTasks.map(task => {
	// 				if (task.id === taskId) {
	// 					return { ...task, isDone }
	// 				}
	// 				return task
	// 			})
	// 		)
	// 	})
	// }, []) используем useReduser
	const toggleTaskComplete = useCallback((taskId, isDone) => {
		tasksAPI.toggleComplete(taskId, isDone).then(() => {
			dispatch({ type: 'TOGGLE_COMPLETE', id: taskId, isDone })
		})
	}, [])

	// const addTask = useCallback(title => {
	// 	const newTask = {
	// 		// id: crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString(), сервер сам генерирует id
	// 		title,
	// 		isDone: true
	// 	}
	// 	tasksAPI.add(newTask).then(addedTask => {
	// 		setTasks(prevTasks => [...prevTasks, addedTask])
	// 		setNewTaskTitle('')
	// 		setsearchQuery('')
	// 		newTaskInputRef.current.focus()
	// 		setApperingTaskId(addedTask.id)
	// 		setTimeout(() => {
	// 			setApperingTaskId(null)
	// 		}, 400)
	// 	})
	// }, []) используем useReduser
	const addTask = useCallback((title, callbackAfterAdding) => {
		const newTask = {
			// id: crypto?.randomUUID ? crypto.randomUUID() : Date.now().toString(), сервер сам генерирует id
			title,
			isDone: true
		}
		tasksAPI.add(newTask).then(addedTask => {
			dispatch({ type: 'ADD', task: addedTask })
			callbackAfterAdding()
			setsearchQuery('')
			newTaskInputRef.current.focus()
			setApperingTaskId(addedTask.id)
			setTimeout(() => {
				setApperingTaskId(null)
			}, 400)
		})
	}, [])

	// useEffect(() => {
	// 	savedTasks(tasks)
	// }, [tasks])
	// работа через localStorage
	// useEffect(() => {
	// 	newTaskInputRef.current.focus()
	// 	tasksAPI.getALL().then(setTasks)
	// }, []) используем useReduser
	useEffect(() => {
		newTaskInputRef.current.focus()
		tasksAPI.getALL().then(tasks => dispatch({ type: 'SET_ALL', tasks }))
	}, [])
	useEffect(() => {
		renderCount.current++
		console.log(`Компонент отрендерелся ${renderCount.current} раза`)
	})

	const filteredTask = useMemo(() => {
		const clearSearchQuery = searchQuery.trim().toLowerCase()

		return clearSearchQuery.length > 0
			? tasks.filter(({ title }) =>
					title.toLowerCase().includes(clearSearchQuery)
				)
			: null
	})
	return {
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
	}
}
export default useTasks
