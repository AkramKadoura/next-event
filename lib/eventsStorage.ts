import create from "zustand";
import { persist } from "zustand/middleware";
import { EventProps } from "../components/Card";

export type EventSchema = EventProps;

export type EventStorage = {
    Events: EventSchema[];
    addEvent: (value: EventSchema) => void;
    removeEvent: (value: EventSchema) => void;
    resetEvents: () => void;
  };
  
  export const useEventStorage = create(
    persist<EventStorage>(
      (set, get) => ({
        Events: [],
        addEvent: (value) => set((state) => ({ Events: [...state.Events, value] })),
        removeEvent: (value) => set((state) => ({ Events: state.Events.filter((event) => event.id !== value.id) })),
        resetEvents: () => set({
            Events: []
        })
      }),
      {
        name: "event-storage",
      }
    )
  );
  