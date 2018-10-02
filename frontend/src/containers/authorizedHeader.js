export default function authorizedHeader (component) {
	return {
      'Accept': 'application/json, text/plain, */*',
      'ID': component.state.currentUser.ID,
      Authorization: `Bearer ${component.state.currentUser.accessToken}`
      }
}