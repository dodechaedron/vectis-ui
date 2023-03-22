# VECTIS UI

## Overview

Vectis-UI is a multirepo containing multiple packages that are reused across different apps within the repository. Each app is an independent web page that interacts directly with the Vectis contracts.

Please see our [wiki] for details.

## Packages

#### `/apps`

| App                   | Summary                                                          |
| --------------------- | ---------------------------------------------------------------- |
| [`dashboard`](./apps/dashboard) | Vectis Dashboard at [https://dashboard.vectis.space](https://dashboard.vectis.space) |
| [`website`](./apps/website) | Vectis Landing at [https://vectis.space](https://vectis.space) |
| [`dao`](./apps/dao) | VectisDao Page at [https://dao.vectis.space](https://dao.vectis.space) |

#### `/packages`

| Package                             | Summary                                                                                               |
| ----------------------------------- | ----------------------------------------------------------------------------------------------------- |
| [`config`](./packages/config)       | Configurations for various dev tools.                                                                 |                |
| [`components`](./packages/components) | React components|                                                                      |
| [`services`](./packages/services)         | Services that helps to interact with Vectis.                                                               |


[wiki]: https://github.com/nymlab/vectis/wiki