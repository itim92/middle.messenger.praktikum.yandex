import { HTTPTransport } from "@/services/Api/HttpTransport";

abstract class BaseServiceAbstract {
    protected readonly http: HTTPTransport;

    constructor(http: HTTPTransport) {
        this.http = http;
    }
}

export { BaseServiceAbstract };
