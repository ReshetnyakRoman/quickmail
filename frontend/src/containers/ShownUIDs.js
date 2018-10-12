import getUIDlist from '../containers/getUIDlist'

function getLastShownUID(emails, allUIDs=[]){
  const currentUIDs = getUIDlist(emails)
  if (currentUIDs.length>0) {
    return Math.min(...currentUIDs)
  } else if (allUIDs.length > 0) {
    return Math.max(...allUIDs)
  }
  return 0
}

function getFirstShownUID(emails, allUIDs=[]){
	const currentUIDs = getUIDlist(emails)
	if (currentUIDs.length>0) {
		return Math.max(...currentUIDs)
	} else if (allUIDs.length > 0){
		return Math.max(...allUIDs)
	}
	return 0
}

export {getLastShownUID, getFirstShownUID}