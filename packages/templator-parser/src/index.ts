import { parseTemplates } from "./template-splitting";
import Tokenizer from "./tokenizer";
import TreeGenerator from "./tree-generator";
import CodeGenerator from "./code-generator";

export function parse(raw: string) {
    const [_code, templates] = parseTemplates(raw);
    let code = _code;

    for (const template of templates) {
        const tokenizer = new Tokenizer(template);
        const tokens = tokenizer.parse();

        const treeGenerator = new TreeGenerator(tokens);
        const tree = treeGenerator.generate();

        const codeGenerator = new CodeGenerator(tree);
        const templateCode = codeGenerator.generate();

        code = code.replace(template.key ?? "", templateCode);
    }

    return code;
}

/**
 * text node
 * start open tag
 * attribute name="" or name={}
 * end open tag or end singled tag
 * closed tag
 */
