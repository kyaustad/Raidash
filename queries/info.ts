export const InfoQuery = {
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
    
  }`,
};
