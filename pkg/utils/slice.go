package utils

// Remove an item from a slice
func Remove[T comparable](slice []T, items ...T) []T {
	for i, element := range slice {
		if Contains(items, element) {
			return append(slice[:i], slice[i+1:]...)
		}
	}
	return slice
}

// Contains returns true if the item is in the slice
func Contains[T comparable](slice []T, item T) bool {
	for _, element := range slice {
		if element == item {
			return true
		}
	}
	return false
}
