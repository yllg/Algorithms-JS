// 1.设置
const setCookie = (key, value, expire) => {
    const d = new Date();
    d.setDate(d.getDate() + expire);
    document.cookie = `${key}=${value};expires=${d.toUTCString()}`;
};

// 2.获取
const getCookie = (key) => {
    const cookieStr = unescape(document.cookie);
    const arr = cookieStr.split("; ");
    let cookieValue = "";
    for (let i = 0; i < arr.length; i++) {
        const temp = arr[i].split("=");
        if (temp[0] === key) {
            cookieValue = temp[1];
            break;
        }
    }
    return cookieValue;
};

// 3.删除
const delCookie = (key) => {
    document.cookie = `${encodeURIComponent(key)}=;expires=${new Date()}`;
};