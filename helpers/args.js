export function getArgs(args) {
    const [, , ...params] = args;

    return params.reduce((result, param, index, array) => {
        if (param.charAt(0) === '-') {
            const nextParam = array[index + 1];

            result[param.substring(1)] = !nextParam
                || nextParam.charAt(0) === '-'
                || nextParam;
        }

        return result;
    }, {});
}
