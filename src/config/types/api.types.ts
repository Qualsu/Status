import type { Statuses } from "./components.types";

export interface PingResponse {
    response_time: string;
}

export interface PingStatusResult {
    status: Statuses;
    responseTime: string;
}