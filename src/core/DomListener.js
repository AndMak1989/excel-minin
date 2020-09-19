import {capitalize} from '@core/utils';

export class DomListener {
  constructor($root, listeners = []) {
    if (!$root) {
      throw new Error(`No $root provided for DomListener!`);
    }
    this.listeners = listeners;
    this.$root = $root;
  }

  initDomListeners() {
    this.listeners.forEach( (listener) =>{
      const method = getMethodName(listener);
      if (!this[method]) {
        throw new Error(`Method ${method} in ${this.name || ''} component`);
      }
      this[method] = this[method].bind(this);
      console.log(listener);
      this.$root.on(listener, this[method]);
    });
  }
  removeDomListeners() {
    this.listeners.forEach( (listener) =>{
      const method = getMethodName(listener);
      this.$root.off(listener, this[method].bind(this));
    });
  }
}

function getMethodName(eventName) {
  return 'on' + capitalize(eventName);
}
