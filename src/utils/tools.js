export const isIos = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /iphone|ipad|ipod/.test( userAgent );
}

export const isAndroid = () => {
    const userAgent = window.navigator.userAgent.toLowerCase();
    return /android/.test( userAgent );
}

export const isInStandaloneMode = () => {
    if (isAndroid()) {
        return window.navigator.userAgent.endsWith('; inAndroidApk');
    }
    return ('standalone' in window.navigator) && (window.navigator.standalone);
}

export const numberWithCommas = (x) => {
    x = Number(x);
    const a = x.toString().split('.');
    a[0] = a[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return a.join('.')
}

