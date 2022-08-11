function mydebounce(fn, delay) {

    let timer = null;

    return function (...args) {

        if (timer) {
            clearTimeout(timer);
        }

        timer = setTimeout(() => {

            fn.apply(null, args);

            timer = null;
        }, delay);

    };
}