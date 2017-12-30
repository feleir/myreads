const subscribers = {}

export const moveToShelfEvent = 'moveToShelf'

export const onEvent = (event, callback) => {
    if (!subscribers[event]) {
        subscribers[event] = []
    }
    subscribers[event].push(callback)
}

export const unSubscribe = (event, callback) => {
    if (subscribers[event]) {
        const subscribersOfEvent = subscribers[event]
        const index = subscribersOfEvent.indexOf(callback)
        if (index > -1) {
            subscribersOfEvent.splice(index, 1)
        }
    }
}

export const triggerEvent = (event, ...values) => {
    if (subscribers[event] && subscribers[event].length > 0) {
        subscribers[event].forEach((callback) => callback.apply(null, values))
    }
}