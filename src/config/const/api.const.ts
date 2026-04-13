import axios from "axios";
import { links } from "../routing/links.route";
import type { ServiceConfig, ServiceStatus, ServiceEndpoint } from "../types/components.types";

export const API_URL = import.meta.env.VITE_API_URL || links.STATUS.API;

export const api = axios.create({
  baseURL: API_URL,
});

const getServiceEndpoints = (service: { SITE: string; API?: string; CLERK?: string }): ServiceEndpoint[] => {
  const endpoints: ServiceEndpoint[] = [{ type: 'Site', url: service.SITE }];
  const apiUrl = service.API ?? service.CLERK;

  if (apiUrl) {
    endpoints.push({ type: 'API', url: apiUrl });
  }

  return endpoints;
};

export const STATUS_SERVICE: ServiceConfig = {
  key: 'STATUS',
  label: links.STATUS.LABEL,
  endpoints: [{ type: 'API', url: links.STATUS.API }],
};

export const SERVICE_STATUSES: ServiceConfig[] = [
  {
    key: 'QUALSU',
    label: links.QUALSU.LABEL,
    endpoints: getServiceEndpoints(links.QUALSU),
  },
  {
    key: 'QSU_ID',
    label: links.QSU_ID.LABEL,
    endpoints: getServiceEndpoints(links.QSU_ID),
  },
  {
    key: 'QUALCLOUD',
    label: links.QUALCLOUD.LABEL,
    endpoints: getServiceEndpoints(links.QUALCLOUD),
  },
  {
    key: 'NOTTER',
    label: links.NOTTER.LABEL,
    endpoints: getServiceEndpoints(links.NOTTER),
  },
  {
    key: 'SHRTL',
    label: links.SHRTL.LABEL,
    endpoints: getServiceEndpoints(links.SHRTL),
  },
];

export const INITIAL_STATUS_SERVICE: ServiceStatus = {
  key: STATUS_SERVICE.key,
  label: STATUS_SERVICE.label,
  status: 'offline',
  endpoints: STATUS_SERVICE.endpoints.map((endpoint) => ({
    ...endpoint,
    status: 'offline',
    responseTime: '',
  })),
};

export const INITIAL_SERVICE_STATUSES: ServiceStatus[] = SERVICE_STATUSES.map((service) => ({
  key: service.key,
  label: service.label,
  status: 'offline',
  endpoints: service.endpoints.map((endpoint) => ({
    ...endpoint,
    status: 'offline',
    responseTime: '',
  })),
}));