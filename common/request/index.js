import Http from './request.js'

export default function(data) {
	let http  = new Http(data)
	return http.run()
}