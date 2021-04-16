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
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

