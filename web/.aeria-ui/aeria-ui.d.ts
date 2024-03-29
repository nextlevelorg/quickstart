// WARNING: this file will be overriden
declare module 'aeria-ui' {
  export * from 'aeria-ui/dist'

  type SystemStores = typeof import('@aeria-ui/web/stores')
  type UserStores = typeof import('../src/stores')

  type Stores = {
    [P in keyof (SystemStores & UserStores)]: ReturnType<(SystemStores & UserStores)[P]>
  }

  export const useStore: <TStoreId extends keyof Stores | keyof Collections>(
    storeId: TStoreId,
    manager?: import('@aeria-ui/state-management').GlobalStateManager
  ) => TStoreId extends keyof Stores
    ? Stores[TStoreId]
    : TStoreId extends keyof Collections
      ? 'item' extends keyof Collections[TStoreId]
        ? Collections[TStoreId]['item'] extends infer Item
          ? Item extends { _id: any }
            ? import('aeria-ui').CollectionStore<Item>
            : never
          : never
        : never
      : never
}

declare module '@vue/runtime-core' {
  import type { TemplateFunctions } from '@aeria-ui/web'

  interface ComponentCustomProperties {
    formatDateTime: TemplateFunctions['formatDateTime']
    getRelativeTimeFromNow: TemplateFunctions['getRelativeTimeFromNow']
    hasRoles: TemplateFunctions['hasRoles']
    t: TemplateFunctions['t']
    viewTitle: string
    viewIcon: string
    instanceConfig: typeof import('aeria-ui-build').InstanceConfig
    currentUser: (Collections['user']['item'] extends infer UserCollection
      ? UserCollection extends (...args: any[]) => any
        ? ReturnType<UserCollection>
        : UserCollection
      : never
    ) extends infer Coll
      ? Coll['item']
      : never
    t: typeof import('@aeria-ui/i18n').t
  }
}

import type { RouteRecordRaw } from 'vue-router'
import type { Icon } from '@aeriajs/types'

declare global {
  const definePage: (page: Partial<RouteRecordRaw> & {
    meta: {
      title: string
      icon?: Icon
    }
  }) => void
}

export {}
//