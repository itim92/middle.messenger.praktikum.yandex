import { EventBus } from "@/lib/event-bus";
import { set } from "@/shared/lib";
import { Indexed } from "@/shared/types/Indexed";

export enum StoreEvents {
    Updated = "updated",
}

export class Store extends EventBus {
    private state: Indexed = {};

    public getState() {
        return this.state;
    }

    public set(path: string, value: unknown) {
        set(this.state, path, value);

        // метод EventBus
        this.emit(StoreEvents.Updated, { state: this.state, path, value });
    }
}

export default new Store();
