variable "namespaces" {
  description = "A map of namespaces to create."
  type = map(object({
    alias          = list(string)
    istioInjection = bool
  }))
}
