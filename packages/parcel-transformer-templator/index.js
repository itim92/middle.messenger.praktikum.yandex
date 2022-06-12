const { Transformer } = require("@parcel/plugin");
const { parse } = require("templator-parser");

module.exports = new Transformer({
    async transform({ asset, logger }) {
        const source = await asset.getCode();
        const compiled = parse(source).trim();

        asset.setCode(`
        import * as Templator from "templator";
        ${compiled}
        `);
        asset.type = "js";

        return [asset];
    },
});
