# Store2State DOM Subscriber

The **Store2State DOM Subscriber** is an extension of the `store2state` library that provides a straightforward way to bind application state changes to DOM elements in vanilla JavaScript. This utility allows you to manage UI updates efficiently by subscribing to state changes and reacting accordingly.

## Features

- **DOM Binding**: Easily bind application state to DOM elements.
- **Custom Actions**: Define and execute actions when the state changes.
- **Event Handling**: Attach event listeners to DOM elements for interactive applications.
- **Dynamic Updates**: Automatically update the DOM in response to state changes.

## Installation

Ensure `store2state` is installed in your project:

```bash
# Install store2state if not already installed
npm install store2state
```
Install `store2state-dom` package in your project:
```bash
npm install store2state-dom
```
## Usage

### Creating a Store

Begin by creating a store with an initial state using `store2state`:

```javascript
import { createStore } from 'store2state';

const initialState = {
  count: 0,
  message: 'Hello, World!',
};

const store = createStore(initialState);
```

### Creating a Subscriber

Use the `createSubscriber` function to create a new subscriber for a DOM element:

```javascript
import { createSubscriber } from './path-to-subscriber-file';

const displayElement = document.getElementById('display');

const subscriber = createSubscriber(store, displayElement);
```

### Adding Subscribers

Add actions to be executed when the state changes:

```javascript
subscriber.addSubscriber((ele, state) => {
  ele.textContent = `Count: ${state.count}, Message: ${state.message}`;
}).subscribe();
```

### Initializing the Subscriber

Initialize the DOM element with the current state:

```javascript
subscriber.init((ele, state) => {
  ele.textContent = `Initial Count: ${state.count}, Message: ${state.message}`;
});
```

### Handling Events

Add event listeners to DOM elements:

```javascript
const incrementButton = document.getElementById('increment');

subscriber.addEventListener('click', (event, store) => {
  store.set((state) => ({ count: state.count + 1 }));
});
```

### Dispatching Actions

Execute custom actions and dispatch events to update subscribers:

```javascript
subscriber.action((store) => {
  // Perform any state updates or other logic here
  store.set((state) => ({ message: 'State Updated!' }));
});
```

## API Reference

### `CreateSubscriber` Methods

- **`addSubscriber(action: Action<State>)`**: Adds an action to be executed on state changes. Returns the `CreateSubscriber` instance for method chaining.
- **`getLastSubscriberId()`**: Returns the ID of the last added subscriber.
- **`removeSubscriber(id: string)`**: Removes a subscriber action by ID. Returns the `CreateSubscriber` instance.
- **`addEventListener(eventName: string, listener: (event: Event, store: Store<State>) => void)`**: Adds an event listener to the DOM element, automatically executing the provided listener in response to events. Returns the `CreateSubscriber` instance.
- **`subscribe()`**: Subscribes all added actions to state changes. Returns the `CreateSubscriber` instance.
- **`init(initAction: Action<State>)`**: Initializes the DOM element with the current state. Returns the `CreateSubscriber` instance.
- **`action(actionMethod: (store: Store<State>) => void)`**: Executes a custom action and dispatches a `domChange` event to update subscribers.

## Contributing

Contributions are welcome! If you find any issues or have suggestions for improvements, please open an issue or submit a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
