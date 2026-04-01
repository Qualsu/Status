export type Statuses = 'online' | 'offline' | 'error';

export interface ServiceEndpoint {
  type: 'Site' | 'API';
  url: string;
}

export interface ServiceConfig {
  key: string;
  label: string;
  endpoints: ServiceEndpoint[];
}

export interface ServiceEndpointStatus extends ServiceEndpoint {
  status: Statuses;
  responseTime: string;
}

export interface ServiceStatus {
  key: string;
  label: string;
  status: Statuses;
  endpoints: ServiceEndpointStatus[];
}