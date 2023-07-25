function includeScript(src) {
    fetch(src)
        .then(respnse => respnse.text())
        .then(eval)
}

export { includeScript }