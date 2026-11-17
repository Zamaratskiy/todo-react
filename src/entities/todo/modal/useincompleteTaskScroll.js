import { useRef } from 'react'

const useincompleteTaskScroll = tasks => {
	const firstIncompleteTaskRef = useRef(null)
	const firstIncompleteTaskId = tasks.find(({ isDone }) => !isDone)?.id
	return { firstIncompleteTaskId, firstIncompleteTaskRef }
}
export default useincompleteTaskScroll
