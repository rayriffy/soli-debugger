import type { EventItem } from "../@types/EventItem";
import type { SoliEvent } from "../@types/SoliEvent";

export const filteredSoliEvents = (items: EventItem[], events: SoliEvent[]) => items.filter(item => events.includes(item.data.type))
