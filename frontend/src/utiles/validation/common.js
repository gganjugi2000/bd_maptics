export function isEmpty (value) {
    if (value === undefined || value === null || value === "" || String(value).trim().length < 1)
        return true;

    return false;
}