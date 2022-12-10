package utils

import "fmt"

// Remove an item from a slice
func Remove[T comparable](slice []T, items ...T) []T {
	var result = make([]T, 0)
	for _, element := range slice {
		if Contains(items, element) {
			continue
		}
		result = append(result, element)
	}
	return result
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

// Uniq returns a new slice with unique items from the given slice
func Uniq[T comparable](slice []T) []T {
	var unique []T = make([]T, 0)
	for _, element := range slice {
		if Contains(unique, element) {
			continue
		}

		unique = append(unique, element)
	}
	return unique
}

// StringifySlice transform a slice of Stringer into a slice of string
func StringifySlice[T fmt.Stringer](slice []T) []string {
	strSlice := make([]string, len(slice))
	for i, element := range slice {
		strSlice[i] = element.String()
	}
	return strSlice
}
