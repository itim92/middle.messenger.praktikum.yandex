import { Transformer } from "@parcel/plugin";
import { parse } from "templator-parser";
import { MutableAsset } from "@parcel/types";

export default new Transformer({
    async transform({ asset }: { asset: MutableAsset }) {
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
