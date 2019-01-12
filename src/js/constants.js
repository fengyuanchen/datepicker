export const IS_BROWSER = typeof window !== 'undefined';
export const WINDOW = IS_BROWSER ? window : {};
export const IS_TOUCH_DEVICE = IS_BROWSER ? 'ontouchstart' in WINDOW.document.documentElement : false;
export const NAMESPACE = 'datepicker';
export const EVENT_CLICK = `click.${NAMESPACE}`;
export const EVENT_FOCUS = `focus.${NAMESPACE}`;
export const EVENT_HIDE = `hide.${NAMESPACE}`;
export const EVENT_KEYUP = `keyup.${NAMESPACE}`;
export const EVENT_PICK = `pick.${NAMESPACE}`;
export const EVENT_RESIZE = `resize.${NAMESPACE}`;
export const EVENT_SCROLL = `scroll.${NAMESPACE}`;
export const EVENT_SHOW = `show.${NAMESPACE}`;
export const EVENT_TOUCH_START = `touchstart.${NAMESPACE}`;
export const CLASS_HIDE = `${NAMESPACE}-hide`;
export const LANGUAGES = {};
export const VIEWS = {
  DAYS: 0,
  MONTHS: 1,
  YEARS: 2,
};
