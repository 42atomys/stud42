resource "google_storage_bucket" "s42-users" {
  name     = "s42-users"
  location = "EU"

  public_access_prevention = "inherited"

  versioning {
    enabled = true
  }

  cors {
    max_age_seconds = 3600
    method          = ["PUT"]
    origin = [
      "https://s42.app",
      "https://next.s42.app",
    ]
    response_header = [
      "ETag",
      "Content-Type",
      "Access-Control-Allow-Origin",
    ]
  }
}

resource "google_storage_bucket" "s42-exports" {
  name     = "s42-exports"
  location = "EU"

  public_access_prevention = "inherited"
}

resource "google_storage_bucket_iam_binding" "public_access" {
  bucket = google_storage_bucket.s42-users.name

  role = "roles/storage.objectViewer"
  members = [
    "allUsers",
  ]
}
