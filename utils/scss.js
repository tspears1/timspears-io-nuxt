function flattenObjSass(obj, transform = (key, val) => val) {
    return Object.entries(obj).reduce((go, el) => {
        let key = `${el[0]}`;
        let val = el[1];
        if (typeof val === "object" && !Array.isArray(val) && val) {
        return go + `${flattenObjSass(val, `${key}-`, transform)}`;
        } else {
            return (
                go +
                `"${key}": ${
                Array.isArray(val) ? `(${transform(key, val)})` : transform(key, val)
                }, `
            );
        }
    }, "")
}

export { flattenObjSass }