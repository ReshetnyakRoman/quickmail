export default function getUnreaded (allFolders) {
	var unreaded = {}
	for (let folder in allFolders) {
		unreaded[folder] = allFolders[folder].unreaded
	}
	return unreaded
}