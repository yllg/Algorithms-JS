
const getExplorerInfo = () => {
    let t = navigator.userAgent.toLowerCase();
    return 0 <= t.indexOf("msie")
        ? {
            //ie < 11
            type: "IE",
            version: Number(t.match(/msie ([\d]+)/)[1]),
        }
        : !!t.match(/trident\/.+?rv:(([\d.]+))/)
            ? {
                // ie 11
                type: "IE",
                version: 11,
            }
            : 0 <= t.indexOf("edge")
                ? {
                    type: "Edge",
                    version: Number(t.match(/edge\/([\d]+)/)[1]),
                }
                : 0 <= t.indexOf("firefox")
                    ? {
                        type: "Firefox",
                        version: Number(t.match(/firefox\/([\d]+)/)[1]),
                    }
                    : 0 <= t.indexOf("chrome")
                        ? {
                            type: "Chrome",
                            version: Number(t.match(/chrome\/([\d]+)/)[1]),
                        }
                        : 0 <= t.indexOf("opera")
                            ? {
                                type: "Opera",
                                version: Number(t.match(/opera.([\d]+)/)[1]),
                            }
                            : 0 <= t.indexOf("Safari")
                                ? {
                                    type: "Safari",
                                    version: Number(t.match(/version\/([\d]+)/)[1]),
                                }
                                : {
                                    type: t,
                                    version: -1,
                                };
};