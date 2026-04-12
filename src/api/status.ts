import { api } from '../config/const/api.const';
import { API } from '../config/routing/api.route';
import type { PingResponse, PingStatusResult } from '../config/types/api.types';
import type { ServiceConfig, ServiceEndpointStatus, ServiceStatus, Statuses } from '../config/types/components.types';

export async function fetchServiceStatus(service: ServiceConfig): Promise<ServiceStatus> {
  const getOverallStatus = (statuses: Statuses[]): Statuses =>
	statuses.includes('error') ? 'error' : 
	statuses.includes('offline') ? 'offline' : 
	'online';

  const endpointStatuses: ServiceEndpointStatus[] = await Promise.all(
	service.endpoints.map(async (endpoint) => {
	  const result = await pingWebsite(endpoint.url);
	  return { ...endpoint, ...result };
	})
  );

  return {
	key: service.key,
	label: service.label,
	status: getOverallStatus(endpointStatuses.map((endpoint) => endpoint.status)),
	endpoints: endpointStatuses,
  };
}

export async function pingWebsite(url: string): Promise<PingStatusResult> {
	try {
		const response = await api.post<PingResponse>(API.PING, { url });

		if (response.status === 200) {
			return { status: 'online', responseTime: response.data.response_time };
		}

		return { status: 'offline', responseTime: '' };
	} catch {
		return { status: 'error', responseTime: '' };
	}
}
