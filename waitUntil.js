function waitUntil(condition, delay, maxAttempts, onSuccess, onFail) {
    console.debug(`- - - waitUntil to run ${onSuccess.name} - trying ${condition.name} up to ${maxAttempts} times over up to ${delay * maxAttempts}ms`);
    let attempts = 0;
    function attempt() {
        setTimeout(function() {
            attempts++;
            console.debug(`- - - - Attempting ${condition.name} to run ${onSuccess.name} (attempt ${attempts} of ${maxAttempts})...`);
            if (condition()) {
                let result = onSuccess();
                console.debug(`- - - - - Success: ${onSuccess.name} returned ${result} after ${attempts * delay}ms`);
            }
            else if (attempts < maxAttempts) {
                attempt();
            }
            else {
                let result = onFail();
                console.debug('- - - - Maximum attempts reached:');
                console.debug(`- - - - - condition: ${condition.name} (currently: ${condition()})`);
                console.debug('- - - - - delay per attempt: ' + delay);
                console.debug('- - - - - attempts taken: ' + attempts);
                console.debug('- - - - - onSuccess: ' + onSuccess.name);
                console.debug(`- - - - - onFail: ${onFail ? `${onFail.name} returned ${result}` : 'not defined'}`);
            }
        }, delay);
    }
    attempt();
}
