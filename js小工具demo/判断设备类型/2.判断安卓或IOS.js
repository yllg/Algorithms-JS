
const isAndroid = () => {
    return /android/i.test(navigator.userAgent.toLowerCase());
};

const isIOS = () => {
    let reg = /iPhone|iPad|iPod|iOS|Macintosh/i;
    return reg.test(navigator.userAgent.toLowerCase());
};