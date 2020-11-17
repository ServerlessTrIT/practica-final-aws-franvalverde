const getResponse = (str) => {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
};


exports.getResponse = getResponse;
