import _ from "lodash"


export const debounce = (func, delay) => {
    return _.debounce(func, delay);
};
