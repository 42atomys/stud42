package searchengine

// Initizialize the search engine.
// It should be called at startup. (should be called after viper is initialized
// due to dependency on viper)
func Initizialize() {
	initMeilisearchDependency()
}
