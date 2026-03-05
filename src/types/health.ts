export interface HealthMemoryUsage {
  heapTotal: number;
  heapUsed: number;
  rss: number;
}

export interface HealthResponse {
  uptime: number;
  memoryUsage: HealthMemoryUsage;
}

