import { useState, useEffect } from 'react';
import axios from 'axios';
import { CheckCircle, XCircle } from 'lucide-react';

interface SiteStatus {
  name: string;
  url: string;
  status: 'online' | 'offline' | 'error';
  responseTime: string;
}

export default function WebsiteStatus() {
  const [sites, setSites] = useState<SiteStatus[]>([
    { name: 'Website', url: 'https://qual.su', status: 'offline', responseTime: '' },
    { name: 'Qual ID', url: 'https://id.qual.su', status: 'offline', responseTime: '' },
    { name: 'Notter', url: 'https://notter.tech', status: 'offline', responseTime: '' },
    { name: 'API', url: import.meta.env.VITE_API_URL, status: 'offline', responseTime: '' },
  ]);
  const [hasError, setHasError] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const checkStatus = async (url: string): Promise<{ status: 'online' | 'offline' | 'error'; responseTime: string }> => {
      try {
        const response = await axios.post(`${import.meta.env.VITE_API_URL}/ping`, { url: url });

        if (response.status === 200) {
          return { status: 'online', responseTime: response.data.response_time };
        } else {
          return { status: 'offline', responseTime: '' };
        }
      } catch {
        return { status: 'error', responseTime: '' };
      }
    };

    const fetchStatuses = async () => {
      const statuses = await Promise.all(
        sites.map(async (site) => {
          const status = await checkStatus(site.url);
          return { ...site, ...status };
        })
      );

      setSites(statuses);
      setHasError(statuses.some((site) => site.status === 'offline' || site.status === 'error'));

      const currentTime = new Date().toLocaleString();
      setLastUpdated(currentTime);
      setLoading(false);
    };

    fetchStatuses();
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen text-white">
      <div className="p-6 w-full max-w-xl space-y-6">
        {loading ? (
          <div className="space-y-6 opacity-30">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse" />
              <div className="w-32 h-6 bg-gray-300 rounded animate-pulse" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 4 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-4 h-4 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-32 h-6 bg-gray-300 rounded animate-pulse" />
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-24 h-2 bg-gray-300 rounded-full animate-pulse" />
                    <div className="w-16 h-6 bg-gray-300 rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
            <div className="flex justify-center">
              <div className="w-32 h-4 bg-gray-300 rounded animate-pulse" />
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex justify-center items-center space-x-2">
              {hasError ? (
                <XCircle className="text-red-500" size={48} />
              ) : (
                <CheckCircle className="text-green-500" size={48} />
              )}
              <span className="text-xl font-semibold">
                {hasError ? `${sites.filter((site) => site.status !== 'online').length} site(s) are down` : 'All sites are up'}
              </span>
            </div>

            <div className="space-y-4">
              {sites.map((site, index) => (
                <div key={index} className="flex items-center justify-between space-x-4">
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full animate-pulse ${
                        site.status === 'online'
                          ? 'bg-green-500'
                          : site.status === 'offline'
                          ? 'bg-gray-500'
                          : 'bg-red-500'
                      }`}
                    />
                    <a className="flex-1 text-sm hover:underline hover:text-current/80" href={site.url}>
                      {site.name}
                    </a>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="relative w-24 h-2 bg-gray-300 rounded-full">
                      <div
                        className={`absolute top-0 left-0 h-full rounded-full ${
                          site.status === 'online'
                            ? 'bg-green-500'
                            : site.status === 'offline'
                            ? 'bg-gray-500'
                            : 'bg-red-500'
                        }`}
                        style={{
                          width: site.status === 'online' ? '100%' : site.status === 'offline' ? '0%' : '50%',
                        }}
                      />
                    </div>
                    <span className="text-sm">
                      {site.status === 'online'
                        ? `${site.responseTime} ms`
                        : site.status === 'offline'
                        ? 'Offline'
                        : 'Error'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
            <div className="text-center text-sm text-gray-400">
              Last updated: {lastUpdated}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
