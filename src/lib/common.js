export function getUid(seed = "", log = true) {
    var now = new Date()
    var time = now.getTime()
    var uid = time.toString(36).toLocaleUpperCase()
        + "-"
        // 4 random characters in case we generate two uids in the same millisecond (1679615 = 36^4 - 1)
        + Math.round((Math.random() * 1679615)).toString(36).toLocaleUpperCase()
        + seed
    if (log) {
        console.log("Generated uid %s", uid)
    }
    return uid;
}