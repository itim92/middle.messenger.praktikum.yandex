import { isCloseOfPairTag } from "../util";
import { TemplateType } from "../types/TemplateType";

export function parseTemplates(code: string): [string, TemplateType[]] {
    const templateRegexp = /<\/?>/;

    const templates = [];
    let lastTemplate: TemplateType | undefined;
    let offset = 0;
    let matches;

    while ((matches = code.slice(offset).match(templateRegexp))) {
        if (!matches) {
            break;
        }

        const tag = matches[0];
        const isClose = isCloseOfPairTag(tag);
        const matchIndex = matches.index ?? 0;

        if (isClose && lastTemplate) {
            lastTemplate.endIndex = offset + matchIndex;
            lastTemplate.endIndexWithTag = offset + matchIndex + tag.length;

            lastTemplate.code = code
                .slice(lastTemplate.startIndexWithTag, lastTemplate.endIndex)
                .trim();

            lastTemplate.key = `{{{===${templates.length}===}}}`;
            code =
                code.slice(0, lastTemplate.startIndex) +
                lastTemplate.key +
                code.slice(lastTemplate.endIndexWithTag);
            offset = 0;

            continue;
        }

        lastTemplate = {
            startIndex: offset + matchIndex,
            startIndexWithTag: offset + matchIndex + tag.length,
        };

        templates.push(lastTemplate);
        offset += matchIndex + tag.length;
    }

    return [code, templates];
}
