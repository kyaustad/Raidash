export const CacheQuery = {
  query: `query CacheQuery {
    
    array {
      caches {
        name
        status
        
        fsUsed
        fsSize
        
        temp
      }
      
    }
    
  }`,
};
