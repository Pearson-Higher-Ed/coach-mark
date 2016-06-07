import './main.scss';
import CoachMark from './src/js/CoachMark'

export { default } from './src/js/CoachMark';

document.body.addEventListener('o.InitCoachMark', e => new CoachMark(e.detail.element, e.detail.opts, e.detail.callback));
