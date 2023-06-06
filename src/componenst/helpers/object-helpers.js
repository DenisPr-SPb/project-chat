export function updateObjectInArray(items, itemId, objPropName, newObjProps) {
    return items.map(user => {
        return user[objPropName] === itemId ? {...user, ...newObjProps} : user
    })
}