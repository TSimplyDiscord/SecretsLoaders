import process from 'node:process';
import { SecretClient } from '@azure/keyvault-secrets';
import { DefaultAzureCredential } from '@azure/identity';
import { type SecretsLoader, type SecretsStore } from '../SecretsStore.js';

export const loader: SecretsLoader = async (options) => {
	const secrets: SecretsStore = {
		discordAPIKey: '',
		discordAPPID: '',
	};

	if (
		options['azureAlways'] === true ||
		process.env['NODE_ENV'] === 'production'
	) {
		const credential = new DefaultAzureCredential();
		const client = new SecretClient(
			options['azureVaultURL'] as string,
			credential,
		);

		const secretsPromises = [];
		for (const key of options.keys) {
			secretsPromises.push(client.getSecret(key));
		}

		for (const secret of await Promise.all(secretsPromises)) {
			if (secret.value) {
				secrets[secret.name] = secret.value;
			} else {
				throw new Error(`Azure Key Vault is missing value for ${secret.name}`);
			}
		}
	} else {
		for (const key of options.keys) {
			if (process.env[key]) {
				secrets[key] = process.env[key]!;
			} else {
				throw new Error(`Missing ${key} in environment.`);
			}
		}
	}

	return secrets;
};
