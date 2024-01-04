import { EventBus } from 'app/core/EventBus/EventBus.js'

export enum Events {
  'ORDER:CREATED'
}

export const eventBus = new EventBus<Events>()
