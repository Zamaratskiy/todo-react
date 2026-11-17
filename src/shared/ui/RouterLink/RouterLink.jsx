import { BASE_URL } from '../../constants'

const RouterLink = props => {
	const { to, children, ...rest } = props
	const handleClick = e => {
		e.preventDefault()
		window.history.pushState({}, '', to)
		window.dispatchEvent(new PopStateEvent('popstate'))
	}
	return (
		<a
			// href={to} deploy приложения поэтому убрали обычный to в аргументах
			href={`${BASE_URL}${to}`}
			onClick={handleClick}
			{...rest}
		>
			{children}
		</a>
	)
}
export default RouterLink
