import type { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js';
import {ApiException, ProductsApi} from '@thinger-io/thinger-node';
import {z} from "zod";
import mqtt from "mqtt";

import { Log } from '../lib/log.js';
import {UserEvents} from "../lib/user-events";
import {registerLoggedTool} from "./register_logged_tools";


export function registerSimulationTools(opts: {
  server: McpServer;
  productsApi: ProductsApi;
  userEvents: UserEvents;
}) {
  const {server, productsApi, userEvents} = opts;
  const thingerUser = process.env.THINGER_USER ?? 'unknown';
  const thingerHost = process.env.THINGER_HOST ?? 'unknown';

  registerLoggedTool<{ productId: string }>({
    server,
    userEvents,
    name: 'Simulate-HTTP-Device',
    title: 'Simulate HTTP Device Behavior',
    description: [
      'Simulates an HTTP device sending data to a Thinger.io Product endpoint.',
      '',
      '## What is a Thinger.io Product?',
      'A Product in Thinger.io represents a device type configuration that defines:',
      '- How incoming data should be processed (product pipeline)',
      '- Which resources to create automatically (devices, properties, data buckets)',
      '- Device provisioning and lifecycle management',
      '',
      '## How this tool works:',
      '1. Sends data to a specified Product resource endpoint (e.g., "data", "uplink")',
      '2. The Product pipeline processes the incoming data',
      '3. Based on Product configuration, it may:',
      '   - Create or update a device instance',
      '   - Store data in configured data buckets',
      '   - Set device properties',
      '   - Trigger configured actions or endpoints',
      '',
      '## Verification Steps:',
      'After sending simulation data, verify success by checking:',
      '1. Device was created/updated correctly',
      '2. Device properties were set correctly (if any)',
      '3. Data bucket entries were created (if configured)',
      '4. Any configured product actions were triggered',
      '',
      '## Resource Endpoints:',
      '- "data": Standard name for data ingestion endpoint',
      '- "uplink": LoRaWAN-style uplink messages',
      '- Custom endpoints: As defined in Product configuration',
      '',
      '## Payload Format:',
      'The body should match the format expected by the Product pipeline.',
      'For LoRaWAN products, use the standard format:',
      '{',
      '  "deviceEui": "device-identifier",',
      '  "deviceId": "device-1234",',
      '  "source": "simulator",',
      '  "fPort": 1,',
      '  "fCnt": 42,',
      '  "payload": "AABBCCDDEE",',
      '  "decodedPayload": { "temperature": 21.3, "humidity": 60 },',
      '  "metadata": { "ack": false, "battery": 254, "offline": false, "seqNo": 12345}',
      '}',
      '',
      '## Important Notes:',
      '- The Product must exist and be properly configured before simulation',
      '- Device identifiers in the payload determine which device instance is affected',
      '- Check Product pipeline configuration to understand data processing flow',
    ].join('\n'),
    inputSchema: {
      productId: z.string().min(1).describe("ID of the Thinger.io Product to fetch"),
      resource: z.string().min(1).describe("Resource endpoint to send data to, e.g., 'data', 'uplink"),
      body: z.any().describe("Data payload to send to the resource endpoint"),
    },
    handler: async (args: unknown) => {
      try {
        const { productId, resource, body } = args as {
          productId: string;
          resource: string;
          body: any;
        };

        const response = await productsApi.accessResources(thingerUser, productId, resource, body);
        Log.info(`Simulation data sent to product ${productId} resource ${resource}: ${JSON.stringify(body)}`);

        return {
          content: [
            {
              type: "text",
              text: JSON.stringify(response, null, 2),
            }
          ],
        }
      } catch (err: unknown) {
        const errorMessage = err instanceof ApiException
          ? `Thinger.io API Error:\n${JSON.stringify(err.body, null, 2) ?? err.message}`
          : `Unexpected error: ${err instanceof Error ? err.message : String(err)}`;
        Log.error(errorMessage);
        return {
          isError: true,
          content: [
            {
              type: "text",
              text: errorMessage,
            },
          ],
        };
      }
    }
  })

  registerLoggedTool<{ productId: string }>({
    server,
    userEvents,
    name: 'Simulate-MQTT-Device',
    title: 'Simulate MQTT Device Behavior',
    description: [
      'Simulates an MQTT device publishing data to a Thinger.io Product.',
      '',
      '## What is a Thinger.io Product?',
      'A Product in Thinger.io represents a device type configuration that defines:',
      '- How incoming data should be processed (product pipeline)',
      '- Which resources to create automatically (devices, properties, data buckets)',
      '- Device provisioning and lifecycle management',
      '',
      '## How this tool works:',
      '1. Connects to the Thinger.io MQTT broker',
      '2. Publishes data to the specified topic for the Product',
      '3. The Product pipeline processes the incoming MQTT message',
      '4. Based on Product configuration, it may:',
      '   - Create or update a device instance',
      '   - Store data in configured data buckets',
      '   - Set device properties',
      '   - Trigger configured actions or endpoints',
      '',
      '## MQTT Topic Structure:',
      'Standard Thinger.io MQTT topics follow patterns like:',
      '- `{username}/devices/{deviceId}/{resource}` - Device resource access',
      '- `{username}/products/{productId}/{resource}` - Product resource access',
      '- Custom topics as configured in Product settings',
      '',
      '## Verification Steps:',
      'After publishing MQTT data, verify success by checking:',
      '1. Device was created/updated in the Product',
      '2. Device properties were set correctly',
      '3. Data bucket entries were created (if configured)',
      '4. MQTT connection was established and closed properly',
      '5. Any configured product actions were triggered',
      '',
      '## Payload Format:',
      'The payload should be JSON matching the format expected by the Product pipeline.',
      'Example formats:',
      '- Simple data: { "temperature": 21.3, "humidity": 60 }',
      '- LoRaWAN style: { "deviceEui": "1234", "decodedPayload": {...} }',
      '- Custom format as defined in Product configuration',
      '',
      '## QoS Levels:',
      '- 0: At most once delivery (fire and forget)',
      '- 1: At least once delivery (acknowledged)',
      '- 2: Exactly once delivery (assured)',
      '',
      '## Important Notes:',
      '- The Product must exist and be properly configured before simulation',
      '- MQTT credentials may be required depending on broker configuration',
      '- Check Product pipeline configuration to understand data processing flow',
      '- Connection timeout is set to 10 seconds',
    ].join('\n'),
    inputSchema: {
      deviceId: z.string().min(1).describe('ID of the Thinger.io Device to simulate'),
      topic: z.string().min(1).describe('MQTT topic to publish to (e.g., "my_device/device_id/data/temperature")'),
      payload: z.any().describe('JSON payload to publish to the MQTT topic'),
    },
    handler: async (args: unknown) => {
      const {
        deviceId,
        topic,
        payload,
      } = args as {
        deviceId: string;
        topic: string;
        payload: any;
      };

      const password = "test";
      const mqttBrokerUrl = 'mqtts://' + thingerHost;
      const maxRetries = 3;
      const retryDelayMs = 1000;

      return new Promise((resolve) => {
        let currentAttempt = 0;

        const attemptPublish = () => {
          currentAttempt++;
          const startTime = Date.now();
          const timeoutMs = 10000;

          const clientOptions: mqtt.IClientOptions = {
            clientId: deviceId,
            connectTimeout: timeoutMs,
            clean: true,
            password,
            username: thingerUser,
          };

          Log.log(`Try ${currentAttempt}/${maxRetries} - Connected to MQTT Thinger Broker`, {mqttBrokerUrl, clientOptions});
          const client = mqtt.connect(mqttBrokerUrl, clientOptions);

          const timeoutId = setTimeout(() => {
            client.end(true);

            if (currentAttempt < maxRetries) {
              Log.warn(`Try ${currentAttempt} timeout. Retrying in ${retryDelayMs}ms...`);
              setTimeout(attemptPublish, retryDelayMs);
            } else {
              resolve({
                isError: true,
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(
                      {
                        success: false,
                        error: 'Connection timeout',
                        message: `Failed to connect to MQTT broker within ${timeoutMs}ms after ${maxRetries} attempts`,
                        brokerUrl: mqttBrokerUrl,
                        topic,
                        attempts: currentAttempt,
                      },
                      null,
                      2
                    ),
                  },
                ],
              });
            }
          }, timeoutMs);

          client.on('connect', () => {
            Log.info(`MQTT client connected to ${mqttBrokerUrl} (try ${currentAttempt})`);

            const payloadString = typeof payload === 'string' ? payload : JSON.stringify(payload);

            client.publish(
              topic,
              payloadString,
              {
                qos: 0,
                retain: false,
              },
              (error: any) => {
                clearTimeout(timeoutId);
                const duration = Date.now() - startTime;

                if (error) {
                  Log.error(`MQTT publish error en intento ${currentAttempt}: ${error.message}`);
                  client.end();

                  if (currentAttempt < maxRetries) {
                    Log.warn(`Retrying in ${retryDelayMs}ms...`);
                    setTimeout(attemptPublish, retryDelayMs);
                  } else {
                    resolve({
                      isError: true,
                      content: [
                        {
                          type: 'text',
                          text: JSON.stringify(
                            {
                              success: false,
                              error: error.message,
                              deviceId,
                              topic,
                              duration: `${duration}ms`,
                              attempts: currentAttempt,
                              message: `Failed after ${maxRetries} attempts`,
                            },
                            null,
                            2
                          ),
                        },
                      ],
                    });
                  }
                } else {
                  Log.info(`MQTT message published to topic ${topic} at try ${currentAttempt}: ${typeof payload === 'string' ? payload : JSON.stringify(payload, null, 2)}`);
                  client.end();
                  resolve({
                    content: [
                      {
                        type: 'text',
                        text: JSON.stringify(
                          {
                            success: true,
                            message: 'MQTT message successfully published',
                            deviceId,
                            topic,
                            qos: 0,
                            retain: false,
                            sentData: payload,
                            duration: `${duration}ms`,
                            attempts: currentAttempt,
                            nextSteps: [
                              'Verify device was created/updated in the Product',
                              'Check device properties were set correctly',
                              'Confirm data bucket entries were created (if configured)',
                              'Review any triggered product actions or endpoints',
                            ],
                          },
                          null,
                          2
                        ),
                      },
                    ],
                  });
                }
              }
            );
          });

          client.on('error', (error) => {
            clearTimeout(timeoutId);
            Log.error(`MQTT client error at try ${currentAttempt}: ${error.message}`);
            client.end();

            if (currentAttempt < maxRetries) {
              Log.warn(`Retrying in ${retryDelayMs}ms...`);
              setTimeout(attemptPublish, retryDelayMs);
            } else {
              resolve({
                isError: true,
                content: [
                  {
                    type: 'text',
                    text: JSON.stringify(
                      {
                        success: false,
                        error: error.message,
                        brokerUrl: mqttBrokerUrl,
                        topic,
                        attempts: currentAttempt,
                        message: `Failed after ${maxRetries} attempts`,
                      },
                      null,
                      2
                    ),
                  },
                ],
              });
            }
          });
        };

        attemptPublish();
      });
    },
  });
}
