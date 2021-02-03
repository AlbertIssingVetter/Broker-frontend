import fa from './fa'
import en from './en'
import iran from './icon/iran.png'
import us from './icon/us.png'
// eslint-disable-next-line no-extend-native
String.prototype.format = function() {
    let args = arguments;
    return this.replace(/{(\d+)}/g, function(match, number) {
        return typeof args[number] != 'undefined'
            ? args[number]
            : match
            ;
    });
};
export const langList = {
    fa: {
        obj: fa,
        icon: iran,
        name: 'fa',
    },
    en: {
        obj: en,
        icon: us,
        name: 'en',
    }
}
export const defaultLang = 'fa'
export function getLang() {
    return localStorage.getItem('lang') ? localStorage.getItem('lang') : defaultLang;
}

export default function t(key, ...params) {
    return langList[getLang()].obj[key].format(params);
}
