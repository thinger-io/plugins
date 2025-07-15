import * as thingerApi from "@thinger-io/thinger-node";
import process from "node:process";

class EnvTokenProvider implements thingerApi.TokenProvider {
  public getToken(): string {
    return process.env.THINGER_TOKEN_TTN_PLUGIN || "";
  }
}

// Set auth method
const authMethods: thingerApi.AuthMethodsConfiguration = {
    "bearerAuth": {
      "tokenProvider": new EnvTokenProvider(),
    }
  };

const baseServer =  new thingerApi.ServerConfiguration(`https://${process.env.THINGER_HOST}`, { });

export const thingerApiConfig = thingerApi.createConfiguration({
  baseServer: baseServer,
  authMethods: authMethods
})

