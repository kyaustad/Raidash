export const DisksQuery = {
  query: `query DisksQuery {
    
    array {
      
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
        fsUsed
        fsSize
        critical
        warning
        temp
      }
    }
    
  }`,
};
