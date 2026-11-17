import TaskPage from '@/pages/TaskPage'
import TasksPage from '@/pages/TasksPage'
import Router from './routing'
import './styles'

const App = () => {
	const routes = {
		'/': TasksPage,
		'/tasks/:id': TaskPage,
		'*': () => <div>Page not found</div>
	}
	return (
		// <TascksProvider>
		// 	<Todo />
		// </TascksProvider>
		<Router routes={routes} />
	)
}

export default App
