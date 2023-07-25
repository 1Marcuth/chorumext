import { includeScript } from "./helper.js"

function includeScripts() {
    includeScript("https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js")
}

function main() {
    includeScripts()
}

window.addEventListener("load", main)