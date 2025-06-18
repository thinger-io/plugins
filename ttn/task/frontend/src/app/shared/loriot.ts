import {Buffer} from "buffer";

export interface IAppToken {
  appId: number;
  serverId: string;
  token: string;
}

export function parseEncodedToken(encoded: string, appId: number|null): IAppToken {

  // Backward compatibility
  const tokenHex = Buffer.from(encoded, 'base64').toString('hex');
  if (appId && tokenHex.length === 32) {
    return {
      appId,
      serverId: '',
      token: tokenHex,
    };
  } else if (encoded.length < 34) {
    return parseOldToken(encoded);
  }

  const buf = Buffer.from(revertCleanBase64(encoded), 'base64');
  appId = parseInt(buf.slice(0, 4).toString('hex'), 16);
  const serverIdLength = buf.slice(4, 8).readUInt32BE(0);
  const serverId = buf.slice(8, 8 + serverIdLength).toString('utf8');
  const token = buf.slice(8 + serverIdLength).toString('hex');
  return {
    appId,
    serverId,
    token,
  };

  function parseOldToken(encoded: string): IAppToken {
    const appIdBuf = Buffer.from(encoded.slice(0, 6), 'base64');
    const appId = parseInt(appIdBuf.toString('hex'), 16);
    const serverId = '';
    const token = cleanBase64(encoded.slice(6));
    return {
      appId,
      serverId,
      token,
    };
  }

  function revertCleanBase64(val: string): string {
    return val
      .replace(/-/g, '+')
      .replace(/_/g, '/');
  }

  function cleanBase64(val: string): string {
    return val
      .replace(/\+/g, '-')
      .replace(/\//g, '_');
  }

}
