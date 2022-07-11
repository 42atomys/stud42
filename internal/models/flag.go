package modelsutils

import typesgen "atomys.codes/stud42/internal/api/generated/types"

// TODO: implement a custom scalar type for this.

// TranslateFlagToORM converts a slice of Flag to a slice of string
// that can be used in ORM.
func TranslateFlagToORM(flags ...typesgen.Flag) []string {
	var result []string
	for _, flag := range flags {
		result = append(result, flag.String())
	}
	return result
}

// TranslateORMToFlag converts a slice of string to a slice of Flag.
// The string slice must be in the same format as the ORM.
func TranslateFlagFromORM(flags []string) []typesgen.Flag {
	var result []typesgen.Flag
	for _, flag := range flags {
		result = append(result, typesgen.Flag(flag))
	}
	return result
}
