# Azure Key Vault

[Azure Key Vaults](https://azure.microsoft.com/en-us/products/key-vault) provide a secure easy to use secrets management platform for bots hosted within the Azure ecosystem.

## Usage
1) Download [`azureLoader.ts`](./azureLoader.ts) ([DownGit](https://downgit.cvbox.org/DownGit/#/home?url=https://github.com/TSimplyDiscord/SecretsLoarders/blob/main/loaders/azure/azureLoader.ts)).
1) Move `azureLoader.ts` to `src/lib/SecretsStore/loaders/`.
1) Install required dependencies:
    ```terminal
    yarn add @azure/keyvault-secrets
    yarn add @azure/identity
    ```
1) Update `index.ts` to use the new loader.
    ```ts
    import { loader } from './lib/SecretsStore/loaders/azureLoader.js';

    const secrets = await loadSecrets(loader, { additionalKeys: [] });
    ```