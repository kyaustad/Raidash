// Not using it anywhere. Just a reference query for a lot of the info I might use later.

export const MasterQuery = {
  query: `query MasterQuery {
  info {
    apps {
      installed
      started
    }
    baseboard {
      manufacturer
      model
    }
    cpu {
      brand
      cores
      manufacturer
      socket
      speed
      speedmax
      speedmin
      threads
    }
    devices {
      gpu {
        vendorname
      }
    }
    os {
      hostname
      uptime
      distro
      release
    }
    memory {
      available
      active
      free
      max
      used
      total
    }
  }
  array {
    caches {
      name
      status
      fsFree
      fsSize
      critical
      warning
      temp
    }
    capacity {
      kilobytes {
        free
        total
        used
      }
    }
    disks {
      name
      status
      fsFree
      fsSize
      critical
      warning
      temp
    }
  }
  docker {
    containers {
      status
      image
    }
  }
  notifications {
    id
    overview {
      unread {
        alert
        info
        total
        warning
      }
    }
  }
  shares {
    name
    used
  }
}`,
};
