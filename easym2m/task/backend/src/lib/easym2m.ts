const EASYM2M_BASE_URL = 'https://services.lantia.io/api';

// for development purposes (mock server)
// const EASYM2M_BASE_URL = 'https://private-anon-14930b318d-easym2mmanagementapiv2en.apiary-mock.com/api';

export interface EasyM2MCredentials {
  apiClientId: string;
  apiPassword: string;
  apiKey: string;
}

export interface ConsumptionThreshold {
  dataEnabled?: boolean;
  dataLimit?: number;
  voiceEnabled?: boolean;
  voiceLimit?: number;
  smsEnabled?: boolean;
  smsLimit?: number;
}

export interface UpdateSimCardPayload {
  lifeCycleStatus?: 'ACTIVE' | 'DEACTIVATED';
  alias?: string;
  idAlarm?: string | null;
  dailyConsumptionThreshold?: ConsumptionThreshold;
  monthlyConsumptionThreshold?: ConsumptionThreshold;
}

export interface AlarmPayload {
  name?: string;
  description?: string;
  dailyVoiceThreshold50?: number;
  dailyVoiceThreshold60?: number;
  dailyVoiceThreshold80?: number;
  dailyVoiceThreshold90?: number;
  dailyVoiceThreshold100?: number;
  dailySmsThreshold50?: number;
  dailySmsThreshold60?: number;
  dailySmsThreshold80?: number;
  dailySmsThreshold90?: number;
  dailySmsThreshold100?: number;
  dailyDataThreshold50?: number;
  dailyDataThreshold60?: number;
  dailyDataThreshold80?: number;
  dailyDataThreshold90?: number;
  dailyDataThreshold100?: number;
  monthlyVoiceThreshold50?: number;
  monthlyVoiceThreshold60?: number;
  monthlyVoiceThreshold80?: number;
  monthlyVoiceThreshold90?: number;
  monthlyVoiceThreshold100?: number;
  monthlySmsThreshold50?: number;
  monthlySmsThreshold60?: number;
  monthlySmsThreshold80?: number;
  monthlySmsThreshold90?: number;
  monthlySmsThreshold100?: number;
  monthlyDataThreshold50?: number;
  monthlyDataThreshold60?: number;
  monthlyDataThreshold80?: number;
  monthlyDataThreshold90?: number;
  monthlyDataThreshold100?: number;
}

/** Structured error thrown by EasyM2MClient calls. */
export class EasyM2MApiError extends Error {
  constructor(
    message: string,
    public readonly httpStatus: number,
    public readonly cause: string,
    public readonly code: string
  ) {
    super(message);
    this.name = 'EasyM2MApiError';
  }
}

function classifyHttpError(status: number, body: string): EasyM2MApiError {
  const truncated = body.length > 200 ? body.slice(0, 200) + '…' : body;
  const detail = `HTTP ${status}: ${truncated}`;

  switch (true) {
    case status === 401:
      return new EasyM2MApiError(detail, status,
        'Invalid API Client ID or Password. Check the credentials in the Settings tab.',
        'AUTH_FAILED');
    case status === 403:
      return new EasyM2MApiError(detail, status,
        'Access denied. The API Key may be invalid or have insufficient permissions.',
        'FORBIDDEN');
    case status === 404:
      return new EasyM2MApiError(detail, status,
        'Resource not found. The ICCID may be invalid, or no SIM cards exist for this account.',
        'NOT_FOUND');
    case status === 429:
      return new EasyM2MApiError(detail, status,
        'Too many requests. Wait a moment before retrying.',
        'RATE_LIMITED');
    case status >= 500:
      return new EasyM2MApiError(detail, status,
        'EasyM2M server error. The service may be temporarily unavailable — try again later.',
        'SERVER_ERROR');
    default:
      return new EasyM2MApiError(detail, status,
        `Unexpected HTTP ${status} response from EasyM2M API.`,
        'UNEXPECTED_STATUS');
  }
}

function getAuthHeaders(credentials: EasyM2MCredentials): Record<string, string> {
  const { apiClientId, apiPassword, apiKey } = credentials;
  const encoded = Buffer.from(`${apiClientId}:${apiPassword}`).toString('base64');
  return {
    'Authorization': `Basic ${encoded}`,
    'X-Api-Key': apiKey,
    'Content-Type': 'application/json'
  };
}

async function apiRequest(url: string, headers: Record<string, string>, method = 'GET', body?: object): Promise<any> {
  let response: Response;
  let responseText: string;

  try {
    const init: RequestInit = { method, headers };
    if (body !== undefined) {
      init.body = JSON.stringify(body);
    }
    response = await fetch(url, init);
  } catch (networkErr: any) {
    throw new EasyM2MApiError(
      `Network error: ${networkErr.message}`,
      503,
      'Cannot reach EasyM2M servers (services.lantia.io). Check that the backend has internet connectivity.',
      'NETWORK_ERROR'
    );
  }

  try {
    responseText = await response.text();
  } catch (readErr: any) {
    throw new EasyM2MApiError(
      `Failed to read response body: ${readErr.message}`,
      response.status,
      'Unexpected communication error with EasyM2M API.',
      'READ_ERROR'
    );
  }

  if (!response.ok) {
    throw classifyHttpError(response.status, responseText);
  }

  if (!responseText || response.status === 204) return null;

  try {
    return JSON.parse(responseText);
  } catch {
    throw new EasyM2MApiError(
      `Invalid JSON response: ${responseText.slice(0, 100)}`,
      200,
      'EasyM2M API returned a non-JSON response. The API may have changed or returned an unexpected format.',
      'PARSE_ERROR'
    );
  }
}

export const EasyM2MClient = {
  /** Retrieves a paginated list of SIM cards, optionally filtered by status. */
  async listSimCards(credentials: EasyM2MCredentials, size: number, index: number, status?: string): Promise<any> {
    const statusSegment = status ? `/${status}` : '';
    const url = `${EASYM2M_BASE_URL}/v2/customer/simcards/${size}/${index}${statusSegment}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },

  /** Retrieves the full details of a single SIM card by ICCID. */
  async getSimCard(credentials: EasyM2MCredentials, iccid: string): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/simcard/${iccid}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },

  /** Updates a SIM card's lifecycle status, alias, alarm assignment and/or consumption thresholds. */
  async updateSimCard(credentials: EasyM2MCredentials, iccid: string, payload: UpdateSimCardPayload): Promise<void> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/simcard/${iccid}`;
    return apiRequest(url, getAuthHeaders(credentials), 'PUT', payload);
  },

  /** Retrieves a paginated list of alarms defined for this account. */
  async listAlarms(credentials: EasyM2MCredentials, size: number, index: number): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/alarm/${size}/${index}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },

  /** Retrieves the detail of a single alarm by its ID. */
  async getAlarm(credentials: EasyM2MCredentials, id: string): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/alarm/${id}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },

  /** Creates a new alarm profile. Returns the new alarm ID. */
  async createAlarm(credentials: EasyM2MCredentials, payload: AlarmPayload): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/alarm`;
    return apiRequest(url, getAuthHeaders(credentials), 'POST', payload);
  },

  /** Updates an existing alarm profile. */
  async updateAlarm(credentials: EasyM2MCredentials, id: string, payload: Omit<AlarmPayload, 'name' | 'description'>): Promise<void> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/alarm/${id}`;
    return apiRequest(url, getAuthHeaders(credentials), 'PUT', payload);
  },

  /** Deletes an alarm. All SIMs assigned to it will have their idAlarm set to null. */
  async deleteAlarm(credentials: EasyM2MCredentials, id: string): Promise<void> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/alarm/${id}`;
    return apiRequest(url, getAuthHeaders(credentials), 'DELETE');
  },

  /**
   * Retrieves paginated consumption records for a SIM card.
   * @param service  'data' | 'voice' | 'sms' | 'all'
   */
  async getSimConsumption(
    credentials: EasyM2MCredentials,
    year: string, month: string, iccid: string,
    service: string, size: number, index: number
  ): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/consumptions/${year}/${month}/${iccid}/${service}/${size}/${index}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },

  /** Retrieves the current balance for a single SIM card. */
  async getSimBalance(credentials: EasyM2MCredentials, iccid: string): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/balance/${iccid}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },

  /** Adds credit (top-up) to a SIM card, deducting from the customer account balance. */
  async topupBalance(credentials: EasyM2MCredentials, iccid: string, amount: number): Promise<void> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/balance/${iccid}/${amount}`;
    return apiRequest(url, getAuthHeaders(credentials), 'POST');
  },

  /**
   * Runs a GSM or GPRS diagnostic test on a SIM card.
   * @param type  'gsm' | 'gprs'
   */
  async runDiagnostics(credentials: EasyM2MCredentials, type: 'gsm' | 'gprs', iccid: string): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/utils/diagnostics/${type}/${iccid}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },
};
