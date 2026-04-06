const EASYM2M_BASE_URL = 'https://services.lantia.io/api';

export interface EasyM2MCredentials {
  apiClientId: string;
  apiPassword: string;
  apiKey: string;
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

async function apiRequest(url: string, headers: Record<string, string>): Promise<any> {
  let response: Response;
  let body: string;

  try {
    response = await fetch(url, { method: 'GET', headers });
  } catch (networkErr: any) {
    throw new EasyM2MApiError(
      `Network error: ${networkErr.message}`,
      503,
      'Cannot reach EasyM2M servers (services.lantia.io). Check that the backend has internet connectivity.',
      'NETWORK_ERROR'
    );
  }

  try {
    body = await response.text();
  } catch (readErr: any) {
    throw new EasyM2MApiError(
      `Failed to read response body: ${readErr.message}`,
      response.status,
      'Unexpected communication error with EasyM2M API.',
      'READ_ERROR'
    );
  }

  if (!response.ok) {
    throw classifyHttpError(response.status, body);
  }

  try {
    return JSON.parse(body);
  } catch {
    throw new EasyM2MApiError(
      `Invalid JSON response: ${body.slice(0, 100)}`,
      200,
      'EasyM2M API returned a non-JSON response. The API may have changed or returned an unexpected format.',
      'PARSE_ERROR'
    );
  }
}

export const EasyM2MClient = {
  /**
   * Retrieves a paginated list of SIM cards.
   * Status is an optional path segment; omitting it returns all statuses.
   */
  async listSimCards(credentials: EasyM2MCredentials, size: number, index: number, status?: string): Promise<any> {
    const statusSegment = status ? `/${status}` : '';
    const url = `${EASYM2M_BASE_URL}/v2/customer/simcards/${size}/${index}${statusSegment}`;
    return apiRequest(url, getAuthHeaders(credentials));
  },

  /**
   * Retrieves the full details of a single SIM card by ICCID.
   */
  async getSimCard(credentials: EasyM2MCredentials, iccid: string): Promise<any> {
    const url = `${EASYM2M_BASE_URL}/v2/customer/simcard/${iccid}`;
    return apiRequest(url, getAuthHeaders(credentials));
  }
};
