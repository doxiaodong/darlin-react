export function sendMessage(message) {
  if (!window['MessageChannel'] || !navigator.serviceWorker) {
    return
  }
  return new Promise((resolve, reject) => {
    const messageChannel = new MessageChannel()
    messageChannel.port1.onmessage = (event) => {
      if (event.data.error) {
        reject(event.data.error)
      } else {
        resolve(event.data)
      }
    }

    // This sends the message data as well as transferring messageChannel.port2 to the service worker.
    // The service worker can then use the transferred port to reply via postMessage(), which
    // will in turn trigger the onmessage handler on messageChannel.port1.
    // See https://html.spec.whatwg.org/multipage/workers.html#dom-worker-postmessage
    const controller = navigator.serviceWorker.controller
    if (controller) {
      controller.postMessage(message, [messageChannel.port2])
    }
  })
}
