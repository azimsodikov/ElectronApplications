module.exports = function countdown(tick) {
    let count = 3;

    let timer = setInterval(_ => {
        tick(count--);
        if (count === -1) {
            clearInterval(timer);
        }
    }, 1000);
}
/**
 * We created the countdown module that will decrease in each interval;
 */