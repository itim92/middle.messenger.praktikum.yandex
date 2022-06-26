const { parse } = require("templator-parser");

module.exports = function (source) {
    const compiled = parse(source).trim();

    return `
        import * as Templator from "@/lib/templator";
        ${compiled}
        `;
};
