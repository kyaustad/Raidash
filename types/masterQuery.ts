export interface MasterQueryResponse {
  data: {
    array: {
      caches: {
        name: string;
        status: string;
        fsFree: number;
        critical: string | null;
        fsSize: number;
        temp: number | null;
        warning: string | null;
      }[];
      capacity: { kilobytes: { free: string; total: string; used: string } };
      disks: {
        critical: string | null;
        fsFree: number;
        fsSize: number;
        name: string;
        status: string;
        temp: number | null;
        warning: string | null;
      }[];
    };
    docker: {
      containers: { image: string; status: string }[];
    };
    info: {
      apps: { installed: number; started: number };
      baseboard: { manufacturer: string; model: string };
      cpu: {
        brand: string;
        cores: number;
        manufacturer: string;
        socket: string;
        speed: number;
        speedmax: number;
        speedmin: number;
        threads: number;
      };
      devices: {
        gpu: {
          vendorname: string;
        }[];
      };
      memory: {
        active: number;
        available: number;
        free: number;
        max: number;
        total: number;
        used: number;
      };
      os: {
        distro: string;
        hostname: string;
        release: string;
        uptime: string;
      };
    };
    notifications: {
      overview: {
        unread: {
          alert: number;
          info: number;
          total: number;
          warning: number;
        };
      };
    };
    shares: { name: string; used: number }[];
  };
}
