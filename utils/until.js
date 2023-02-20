const until = (conditional) => {
    const poll = (done) => (conditional ? done() : setTimeout(() => poll(done), 500))
    return new Promise(poll)
}

export { until }
