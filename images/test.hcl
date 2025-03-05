packer {
  required_plugins {
    qemu = {
      version = ">= 1.0.0"
      source  = "github.com/hashicorp/qemu"
    }
  }
}

source "qemu" "qcow2_image" {
  iso_url     = "https://cloud-images.ubuntu.com/noble/current/noble-server-cloudimg-amd64.iso" # Change ISO as needed
  iso_checksum = "sha256:https://cloud-images.ubuntu.com/noble/current/SHA256SUMS" 
  output_directory = "output"
  disk_image      = true
  format          = "qcow2"
  headless        = true
  ssh_username    = "ubuntu"
  ssh_password    = "packer"
  communicator    = "ssh"
  boot_wait       = "10s"

  disk_size       = "5000" # 5GB
}

build {
  sources = ["source.qemu.qcow2_image"]

  provisioner "shell" {
    inline = [
      "sudo mkdir -p /shimwow",
      "echo 'Hello from Packer!' | sudo tee /shimwow/shimwow.txt"
    ]
  }
}
