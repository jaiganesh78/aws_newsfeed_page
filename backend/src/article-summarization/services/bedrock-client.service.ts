import {
  BedrockRuntimeClient,
  InvokeModelCommand,
} from '@aws-sdk/client-bedrock-runtime';
import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS } from '../../config/env.keys';

const CLAUDE_HAIKU_MODEL_ID =
  'anthropic.claude-3-haiku-20240307-v1:0';

interface ClaudeTextResponse {
  content?: Array<{
    type?: string;
    text?: string;
  }>;
}

@Injectable()
export class BedrockClientService {
  private readonly logger = new Logger(BedrockClientService.name);
  private readonly client: BedrockRuntimeClient;
  private readonly modelId: string;

  constructor(private readonly configService: ConfigService) {
    const region = this.getRequiredConfig(ENV_KEYS.AWS_REGION);
    this.modelId = this.getRequiredConfig(ENV_KEYS.BEDROCK_MODEL_ID);

    

    this.client = new BedrockRuntimeClient({
      region,
      maxAttempts: 3,
    });
  }

  async invokeClaudeHaiku(prompt: string): Promise<string> {
    try {
      const command = new InvokeModelCommand({
        modelId: this.modelId,
        contentType: 'application/json',
        accept: 'application/json',
        body: JSON.stringify({
          anthropic_version: 'bedrock-2023-05-31',
          max_tokens: 220,
          temperature: 0.2,
          messages: [
            {
              role: 'user',
              content: [
                {
                  type: 'text',
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });

      const response = await this.client.send(command);
      const responseBody = new TextDecoder().decode(response.body);
      const parsedResponse = JSON.parse(
        responseBody,
      ) as ClaudeTextResponse;
      const summary = parsedResponse.content
        ?.find((contentItem) => contentItem.type === 'text')
        ?.text?.trim();

      if (!summary) {
        throw new Error('Bedrock returned an empty summary');
      }

      return summary;
    } catch (error) {
      this.logger.error(
        `Bedrock invocation failed: ${this.formatError(error)}`,
        error instanceof Error ? error.stack : undefined,
      );

      throw error;
    }
  }

  private getRequiredConfig(key: string): string {
    const value = this.configService.get<string>(key);

    if (!value) {
      throw new Error(`${key} is not configured`);
    }

    return value;
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return 'Unknown error';
  }
}
