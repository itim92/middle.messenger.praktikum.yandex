function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$export(module.exports, "parse", () => $dad363e19ed00b2e$export$98e6a39c04603d36);
function $510fd552298dd2bb$export$ccbedd67ef6e9417(code) {
    return /^([_\n\w\d\sа-я?!.,:{}()[\]'"]+|{[_\n\w\d\sа-я?!.,:{}()[\]'"]+}\s+)</i.test(code.trim());
}
function $510fd552298dd2bb$export$50ea80fc27f8dad5(code) {
    return /^<[a-z]/i.test(code);
}
function $510fd552298dd2bb$export$1e18b0e161b1bf8c(code) {
    return /^\/?>/.test(code);
}
function $510fd552298dd2bb$export$ef36f797e44d57a7(code) {
    return /^<\//.test(code);
}
function $510fd552298dd2bb$export$3b2d240469e38cce(code) {
    return /^<[A-Z]+/.test(code);
}
function $510fd552298dd2bb$export$7500d9bbb9458138(code) {
    return /^\w+[\w\d-_]=/i.test(code);
}
function $510fd552298dd2bb$export$8225720af8e691a0(code) {
    return /{ ?[a-z._\s\d]+ ?}/i.test(code);
}
function $510fd552298dd2bb$export$5881d9cf76a52d8(code) {
    return /^{ ?\[?[`"'a-z]/i.test(code);
}


function $6cc9f4031074e45b$export$4a6ee54de9b0f25d(code) {
    const templateRegexp = /<\/?>/;
    const templates = [];
    let lastTemplate;
    let offset = 0;
    let matches;
    while(matches = code.slice(offset).match(templateRegexp)){
        if (!matches) break;
        const tag = matches[0];
        const isClose = $510fd552298dd2bb$export$ef36f797e44d57a7(tag);
        const matchIndex = matches.index ?? 0;
        if (isClose && lastTemplate) {
            lastTemplate.endIndex = offset + matchIndex;
            lastTemplate.endIndexWithTag = offset + matchIndex + tag.length;
            lastTemplate.code = code.slice(lastTemplate.startIndexWithTag, lastTemplate.endIndex).trim();
            lastTemplate.key = `{{{===${templates.length}===}}}`;
            code = code.slice(0, lastTemplate.startIndex) + lastTemplate.key + code.slice(lastTemplate.endIndexWithTag);
            offset = 0;
            continue;
        }
        lastTemplate = {
            startIndex: offset + matchIndex,
            startIndexWithTag: offset + matchIndex + tag.length
        };
        templates.push(lastTemplate);
        offset += matchIndex + tag.length;
    }
    return [
        code,
        templates
    ];
}



const $3d0cf4718a87e74c$export$e92b897d610f2aba = {
    START_OF_TAG: "START_OF_TAG",
    END_OF_TAG: "END_OF_TAG",
    END_OF_SINGLE_TAG: "END_OF_SINGLE_TAG",
    CLOSE_TAG: "CLOSE_TAG",
    ATTRIBUTE: "ATTRIBUTE",
    TEXT_NODE: "TEXT_NODE"
};


class $d5236a2f272f8223$export$2e2bcd8739ae039 {
    TOKEN_TYPES = $3d0cf4718a87e74c$export$e92b897d610f2aba;
    constructor(template){
        this.tokens = [];
        this.template = template;
        this.code = this.template.code;
    }
    parse() {
        let code = this.code;
        let lastToken = undefined;
        while(code){
            code = code.trim();
            let token = undefined;
            if ($510fd552298dd2bb$export$ccbedd67ef6e9417(code) && this.isMaybeNextText(lastToken)) [token, code] = this.parseTextNode(code);
            else if ($510fd552298dd2bb$export$50ea80fc27f8dad5(code)) [token, code] = this.parseOpenTag(code);
            else if ($510fd552298dd2bb$export$1e18b0e161b1bf8c(code) && this.isMaybeNextAttribute(lastToken)) [token, code] = this.parseEndOfOpenTag(code);
            else if ($510fd552298dd2bb$export$7500d9bbb9458138(code) && this.isMaybeNextAttribute(lastToken)) [token, code] = this.parseAttribute(code);
            else if ($510fd552298dd2bb$export$ef36f797e44d57a7(code)) [token, code] = this.parseCloseTag(code);
            if (typeof token !== "undefined") {
                this.tokens.push(token);
                lastToken = token;
            } else {
                console.error(this.tokens);
                throw new Error(code);
            }
        }
        this.code = code;
        return this.tokens;
    }
    parseEndOfOpenTag(code) {
        const re = /^(\/?>)/;
        const matches = code.match(re);
        const token = this.createToken(this.TOKEN_TYPES.END_OF_TAG);
        if (!matches) return [
            token,
            code
        ];
        const textNode = matches[1];
        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }
        if (/^\/>/.test(textNode)) token.type = this.TOKEN_TYPES.END_OF_SINGLE_TAG;
        return [
            token,
            code
        ];
    }
    parseAttribute(code) {
        const re = /([\w\d]+=)("[\w\d_\-=#{}().: ]+"|{[\w\d_\-=#().: "']+})(\s|\/?)>?/i;
        const matches = code.match(re);
        const token = this.createToken(this.TOKEN_TYPES.ATTRIBUTE);
        if (!matches) return [
            token,
            code
        ];
        const textNode = matches[1] + matches[2];
        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }
        return [
            token,
            code
        ];
    }
    parseCloseTag(code) {
        const re = /^(<\/[a-z\d]+>)/i;
        const matches = code.match(re);
        const token = this.createToken(this.TOKEN_TYPES.CLOSE_TAG);
        if (!matches) return [
            token,
            code
        ];
        const textNode = matches[1];
        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }
        return [
            token,
            code
        ];
    }
    parseOpenTag(code) {
        const re = /^(<[a-z\d]+)(\s|>)/i;
        const matches = code.match(re);
        const token = this.createToken(this.TOKEN_TYPES.START_OF_TAG);
        if (!matches) return [
            token,
            code
        ];
        const textNode = matches[1];
        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode;
        }
        return [
            token,
            code
        ];
    }
    parseTextNode(code) {
        const re = /^([_\n\w\d\sа-я?!.,:{}()[\]'"]+|{[_\n\w\d\sа-я?!.,:{}()[\]'"]+}\s+)</i;
        const matches = code.match(re);
        const token = this.createToken(this.TOKEN_TYPES.TEXT_NODE);
        if (!matches) return [
            token,
            code
        ];
        const textNode = matches[1];
        if (textNode.length) {
            code = code.slice(textNode.length);
            token.value = textNode.trim();
        }
        return [
            token,
            code
        ];
    }
    createToken(type) {
        return {
            type: type,
            value: ""
        };
    }
    isMaybeNextAttribute(lastToken) {
        switch(lastToken?.type){
            case this.TOKEN_TYPES.START_OF_TAG:
            case this.TOKEN_TYPES.ATTRIBUTE:
                return true;
            default:
                return false;
        }
    }
    isMaybeNextText(lastToken) {
        switch(lastToken?.type){
            case this.TOKEN_TYPES.CLOSE_TAG:
            case this.TOKEN_TYPES.END_OF_SINGLE_TAG:
            case this.TOKEN_TYPES.END_OF_TAG:
                return true;
            default:
                return false;
        }
    }
}




const $295f508c3bfe10ef$export$accaa52ddae3fe58 = {
    TEMPLATE: "TEMPLATE",
    FRAGMENT: "FRAGMENT",
    TEXT_NODE: "TEXT_NODE",
    HTML_ELEMENT: "HTML_ELEMENT",
    COMPONENT: "COMPONENT"
};


class $8aa66dcdd6756aa6$export$2e2bcd8739ae039 {
    constructor(tokens){
        this.tokens = tokens;
    }
    generate() {
        const tree = [];
        const treeNode = {
            name: "template",
            type: $295f508c3bfe10ef$export$accaa52ddae3fe58.TEMPLATE,
            children: tree,
            attributes: []
        };
        const tagStack = [];
        // const meta = { lastNode: treeNode };
        tagStack.push(treeNode);
        for (const token of this.tokens){
            let node;
            switch(token.type){
                case $3d0cf4718a87e74c$export$e92b897d610f2aba.TEXT_NODE:
                    node = this.createTextNode(token);
                    tagStack.at(-1)?.children.push(node);
                    break;
                case $3d0cf4718a87e74c$export$e92b897d610f2aba.ATTRIBUTE:
                    node = this.createAttributeNode(token);
                    tagStack.at(-1)?.attributes.push(node);
                    break;
                case $3d0cf4718a87e74c$export$e92b897d610f2aba.CLOSE_TAG:
                    tagStack.pop();
                    break;
                case $3d0cf4718a87e74c$export$e92b897d610f2aba.END_OF_SINGLE_TAG:
                    tagStack.pop();
                    break;
                case $3d0cf4718a87e74c$export$e92b897d610f2aba.END_OF_TAG:
                    break;
                case $3d0cf4718a87e74c$export$e92b897d610f2aba.START_OF_TAG:
                    node = this.createTagNode(token);
                    tagStack.at(-1)?.children.push(node);
                    tagStack.push(node);
                    break;
                default:
                    throw new Error(`invalid token ${token.type}`);
            }
        // meta.lastNode = node;
        }
        return treeNode;
    }
    createTagNode(token) {
        const tag = token.value.slice(1);
        const type = /^[A-Z]/.test(tag) ? $295f508c3bfe10ef$export$accaa52ddae3fe58.COMPONENT : $295f508c3bfe10ef$export$accaa52ddae3fe58.HTML_ELEMENT;
        return {
            type: type,
            name: tag,
            attributes: [],
            children: []
        };
    }
    createAttributeNode(token) {
        const [name, ...attrValueChunks] = token.value.split("=");
        const value = attrValueChunks.join("=");
        return {
            name: name,
            value: value,
            smart: /^{/.test(value)
        };
    }
    createTextNode(token) {
        let value = token.value.trim();
        if ($510fd552298dd2bb$export$8225720af8e691a0(value)) value = value.replace(/({ ?[a-z._\s\d()]+ ?})/i, "$$$1");
        else if ($510fd552298dd2bb$export$5881d9cf76a52d8(value)) return this.createFragmentNode(token);
        value = `\`${value}\``;
        return {
            type: $295f508c3bfe10ef$export$accaa52ddae3fe58.TEXT_NODE,
            content: value
        };
    }
    createFragmentNode(token) {
        return {
            type: $295f508c3bfe10ef$export$accaa52ddae3fe58.FRAGMENT,
            content: `(() => ${token.value.trim().slice(1, -1)})()`
        };
    }
}



class $e81c517acd0c9239$export$2e2bcd8739ae039 {
    constructor(tree){
        this.tree = tree;
    }
    generate() {
        return this.generateNode(this.tree);
    }
    generateNodes(children) {
        const childrenCode = [];
        for (const child of children)childrenCode.push(this.generateNode(child));
        return `[${childrenCode.join(",\n")}]`;
    }
    generateNode(node) {
        let code;
        switch(node.type){
            case $295f508c3bfe10ef$export$accaa52ddae3fe58.TEMPLATE:
            case $295f508c3bfe10ef$export$accaa52ddae3fe58.COMPONENT:
            case $295f508c3bfe10ef$export$accaa52ddae3fe58.HTML_ELEMENT:
                code = this.generateElement(node);
                break;
            case $295f508c3bfe10ef$export$accaa52ddae3fe58.TEXT_NODE:
                code = this.createTextElement(node);
                break;
            case $295f508c3bfe10ef$export$accaa52ddae3fe58.FRAGMENT:
                code = this.createElement({
                    element: "'template'",
                    attributes: "null",
                    children: node.content
                });
                break;
            default:
                throw Error(`unknown node.type ${node}`);
        }
        return code;
    }
    generateElement(node) {
        const element = $295f508c3bfe10ef$export$accaa52ddae3fe58.COMPONENT === node.type ? node.name : `"${node.name}"`;
        const attributes = this.createAttributes(node.attributes);
        const children = node.children ? this.generateNodes(node.children) : `null`;
        return this.createElement({
            element: element,
            attributes: attributes ?? "null",
            children: children
        });
    }
    createAttributes(attributes) {
        if (!attributes || !attributes.length) return null;
        const code = [];
        for (const attr of attributes){
            const value = attr.smart ? attr.value.slice(1, -1) : attr.value;
            code.push(`${attr.name}: ${value}`);
        }
        return `
    {
       ${code.join(",\n")}
    }`;
    }
    createTextElement(node) {
        return `document.createTextNode(${node.content})`;
    }
    createElement({ element: element , attributes: attributes , children: children  }) {
        return `
    Templator.createElement(
        ${element}, 
        ${attributes}, 
        ${children}
    )`;
    }
}


function $dad363e19ed00b2e$export$98e6a39c04603d36(raw) {
    const [_code, templates] = $6cc9f4031074e45b$export$4a6ee54de9b0f25d(raw);
    let code = _code;
    for (const template of templates){
        const tokenizer = new $d5236a2f272f8223$export$2e2bcd8739ae039(template);
        const tokens = tokenizer.parse();
        const treeGenerator = new $8aa66dcdd6756aa6$export$2e2bcd8739ae039(tokens);
        const tree = treeGenerator.generate();
        const codeGenerator = new $e81c517acd0c9239$export$2e2bcd8739ae039(tree);
        const templateCode = codeGenerator.generate();
        code = code.replace(template.key ?? "", templateCode);
    }
    return code;
} /**
 * text node
 * start open tag
 * attribute name="" or name={}
 * end open tag or end singled tag
 * closed tag
 */ 




//# sourceMappingURL=index.js.map
