export default function getUserFolders (allFolders) {
	var subFolders = []
	for (let folder in allFolders) {
		if (!allFolders[folder].default) subFolders.push({folder:folder, unreaded:allFolders[folder].unreaded})
	}
	return subFolders
} 
