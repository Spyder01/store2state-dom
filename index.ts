import { type Store } from 'store2state';
import { generateRandomString } from 'store2state/dist/utils';

export type Action<State> = (ele: HTMLElement, state: State) => void;

class CreateSubscriber<State> {
    private store: Store<State>;
    private ele: HTMLElement;
    private actionStack: Record<string, Action<State>>;
    private lastID: string;

    constructor(store: Store<State>, ele: HTMLElement) {
        this.actionStack = {};
        this.ele = ele;
        this.store = store;
        this.lastID = '';
    }

    addSubscriber(action: Action<State>): CreateSubscriber<State> {
        const id = generateRandomString(100);
        if (id in this.actionStack) {
            return this.addSubscriber(action);
        }

        this.actionStack[id] = action;
        this.lastID = id;
        return this;
    }

    getLastSubscriberId() {
        return this.lastID;
    }

    removeSubscriber(id: string) {
        delete this.actionStack[id];
        return this;
    }

    addEventListener(eventName: string, listener: (event: Event, store: Store<State>) => void) {
        this.ele.addEventListener(eventName, e => this.action(store => listener(e, store)));
        return this;
    }

    subscribe() {
        for (let action of Object.values(this.actionStack)) {
            this.store.subscribe('domChange', state => action(this.ele, state))
        }

        this.actionStack = {};
        this.lastID = '';

        return this;
    }

    init(initAction: Action<State>) {
        initAction(this.ele, this.store.get());
        return this;
    }

    action(actionMethod: (store: Store<State>) => void) {
        actionMethod(this.store);
        this.store.dispatch('domChange');
    }
}

export const createSubscriber = <State>(store: Store<State>, ele: HTMLElement) => new CreateSubscriber(store, ele);
