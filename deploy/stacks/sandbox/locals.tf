locals {
  // reversedRootDomain is the root domain name, reversed, for use in the
  // reverse proxy configuration. For example, if the root domain is
  // example.tld, the reversed root domain is tld-example
  // If the root domain is pr-23.previews.example.tld, the reversed root
  // domain is tld-example-previews
  reversedRootDomain = join(
    "-",
    slice(
      reverse(split(".", var.rootDomain)),
      0,
      min(3, length(split(".", var.rootDomain)))
    )
  )
}
