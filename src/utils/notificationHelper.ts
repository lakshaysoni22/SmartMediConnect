// Notification Helper - Global event emitter for notification center
export const openNotificationCenter = () => {
  window.dispatchEvent(new CustomEvent('openNotificationCenter'));
};
