import { api } from '../config/const/api.const';
import { API } from '../config/routing/api.route';
import type { PingResponse, PingStatusResult } from '../config/types/api.types';

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
