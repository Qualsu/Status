import { useState, useEffect } from 'react';
import { pingWebsite } from '../api/status';
import {
  INITIAL_SERVICE_STATUSES,
  INITIAL_STATUS_SERVICE,
  SERVICE_STATUSES,
  STATUS_SERVICE,
} from '../config/const/api.const';
import type { ServiceConfig, ServiceEndpointStatus, ServiceStatus, Statuses } from '../config/types/components.types';

function getOverallStatus(statuses: Statuses[]): Statuses {
  if (statuses.includes('error')) {
    return 'error';
  }

  if (statuses.includes('offline')) {
    return 'offline';
  }

  return 'online';
}

async function fetchServiceStatus(service: ServiceConfig): Promise<ServiceStatus> {
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

export default function WebsiteStatus() {
  const [statusService, setStatusService] = useState<ServiceStatus>(INITIAL_STATUS_SERVICE);
  const [services, setServices] = useState<ServiceStatus[]>(INITIAL_SERVICE_STATUSES);
  const [hasError, setHasError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const [expandedServiceKey, setExpandedServiceKey] = useState<string | null>(null);
  const downCount = [statusService, ...services].filter((service) => service.status !== 'online').length;

  useEffect(() => {
    const fetchStatuses = async () => {
      const [statusChecker, regularServices] = await Promise.all([
        fetchServiceStatus(STATUS_SERVICE),
        Promise.all(SERVICE_STATUSES.map(fetchServiceStatus)),
      ]);

      setStatusService(statusChecker);
      setServices(regularServices);
      setHasError(
        statusChecker.status !== 'online' ||
        regularServices.some((service) => service.status !== 'online')
      );

      const currentTime = new Date().toLocaleString();
      setLastUpdated(currentTime);
      setLoading(false);
    };

    fetchStatuses();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen text-white px-4 pb-16">
      <div className="w-full max-w-md">
        {loading ? (
          <div className="space-y-8 animate-pulse">
            <div className="flex flex-col items-center gap-3">
              <div className="w-36 h-6 bg-white/8 rounded-full" />
            </div>
            <div className="space-y-2">
              {Array.from({ length: services.length + 1 }).map((_, index) => (
                <div key={index} className="h-13 bg-white/4 rounded-xl" />
              ))}
            </div>
            <div className="flex justify-center">
              <div className="w-28 h-3 bg-white/5 rounded" />
            </div>
          </div>
        ) : (
          <div className="space-y-8">
            <div className="flex justify-center">
              <span className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs ${
                hasError ? 'bg-red-500/10 text-red-400' : 'bg-green-500/10 text-green-400'
              }`}>
                <span className={`w-1.5 h-1.5 rounded-full animate-pulse ${
                  hasError ? 'bg-red-400' : 'bg-green-400'
                }`} />
                {hasError ? `${downCount} service${downCount > 1 ? 's' : ''} offline` : 'All systems operational'}
              </span>
            </div>

            <div className="space-y-1">
              {[statusService, ...services].map((service) => (
                <div key={service.key}>
                  <button
                    type="button"
                    className="w-full flex items-center justify-between px-4 py-3.5 rounded-xl hover:bg-white/4 transition-colors duration-150 text-left"
                    onClick={() => setExpandedServiceKey((prev) => (prev === service.key ? null : service.key))}
                  >
                    <div className="flex items-center gap-3">
                      <span className={`w-2 h-2 rounded-full shrink-0 ${
                        service.status === 'online' ? 'bg-green-400' :
                        service.status === 'offline' ? 'bg-gray-500' : 'bg-red-400'
                      }`} />
                      <span className="text-sm text-white/85">{service.label}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`text-xs px-2 py-0.5 rounded-full ${
                        service.status === 'online' ? 'bg-green-500/10 text-green-400' :
                        service.status === 'offline' ? 'bg-gray-500/10 text-gray-400' :
                        'bg-red-500/10 text-red-400'
                      }`}>
                        {service.status === 'online' ? 'Operational' : service.status === 'offline' ? 'Offline' : 'Degraded'}
                      </span>
                      <svg
                        className={`w-3.5 h-3.5 text-white/20 transition-transform duration-200 ${
                          expandedServiceKey === service.key ? 'rotate-180' : ''
                        }`}
                        viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                      >
                        <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                  </button>

                  {expandedServiceKey === service.key && (
                    <div className="pb-2 space-y-0.5">
                      {service.endpoints.map((endpoint) => (
                        <div key={`${service.key}-${endpoint.type}`} className="flex items-center justify-between px-4 py-2 pl-11">
                          <a
                            className={`text-xs text-white/40 ${
                              endpoint.type === 'Site' ? 'hover:text-white/70 cursor-pointer transition-colors duration-150' : 'cursor-default'
                            }`}
                            href={endpoint.type === 'Site' ? endpoint.url : undefined}
                            target={endpoint.type === 'Site' ? '_blank' : undefined}
                            rel="noreferrer"
                          >
                            {endpoint.type}
                          </a>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-white/30">
                              {endpoint.status === 'online'
                                ? `${endpoint.responseTime} ms`
                                : endpoint.status === 'offline'
                                ? 'Offline'
                                : 'Error'}
                            </span>
                            <span className={`w-1.5 h-1.5 rounded-full ${
                              endpoint.status === 'online' ? 'bg-green-400' :
                              endpoint.status === 'offline' ? 'bg-gray-500' : 'bg-red-400'
                            }`} />
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <p className="text-center text-xs text-white/50">Updated {lastUpdated}</p>
          </div>
        )}
      </div>
    </div>
  );
}


