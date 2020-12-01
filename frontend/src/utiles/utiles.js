export function extractionFileExt (value) {
    if (value === undefined || value === null || value.lastIndexOf('.') < 1){
        return "";
    }

    return value.substring(value.lastIndexOf('.')+1, value.length);
}