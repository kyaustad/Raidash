export const CpuQuery = {
  query: `query CpuQuery {
      info {
        
        cpu {
          brand
          cores
          manufacturer
          socket
          speed
          
          threads
        }
        
        
        
      }
      
    }`,
};
