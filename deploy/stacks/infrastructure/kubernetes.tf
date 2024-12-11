resource "google_container_cluster" "s42" {
  name     = "cluster-1"
  location = "europe-west1-b"

  initial_node_count        = 0
  min_master_version        = "1.30.5-gke.1443001"
  default_max_pods_per_node = 110

  node_config {
    machine_type = "e2-highmem-2"
    image_type   = "cos_containerd"

    metadata = {
      disable-legacy-endpoints = "true"
    }

    advanced_machine_features {
      threads_per_core = 0
    }

    oauth_scopes = [
      "https://www.googleapis.com/auth/devstorage.read_only",
      "https://www.googleapis.com/auth/logging.write",
      "https://www.googleapis.com/auth/monitoring",
      "https://www.googleapis.com/auth/service.management.readonly",
      "https://www.googleapis.com/auth/servicecontrol",
      "https://www.googleapis.com/auth/trace.append",
    ]
  }

  monitoring_config {
    enable_components = [
      "SYSTEM_COMPONENTS",
      "STORAGE",
      "HPA",
      "POD",
      "DAEMONSET",
      "DEPLOYMENT",
      "STATEFULSET",
      "CADVISOR",
      "KUBELET",
    ]
  }

  logging_config {
    enable_components = [
      "SYSTEM_COMPONENTS",
      "WORKLOADS",
    ]
  }

  addons_config {
    gce_persistent_disk_csi_driver_config {
      enabled = true
    }
  }

}

resource "google_container_node_pool" "pool-high-workers" {
  name    = "pool-high-workers"
  cluster = google_container_cluster.s42.name

  initial_node_count = 3

  autoscaling {
    min_node_count  = 3
    max_node_count  = 6
    location_policy = "BALANCED"
  }

  upgrade_settings {
    max_unavailable = 0
    max_surge       = 1
  }
}
