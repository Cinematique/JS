function getSearchParams(url) {
    const obj = {}
    const reg = /\w+=\w+/g
    url.match(reg).forEach((item) => {
        let [key, value] = item.split("=")
        obj[key] = value

    }) 
    return obj
}