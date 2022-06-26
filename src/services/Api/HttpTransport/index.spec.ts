import deepEqualInAnyOrder from "deep-equal-in-any-order";
import chai, { expect } from "chai";
import mock from "xhr-mock";

chai.use(deepEqualInAnyOrder);

import { httpTransportService } from "@/services/Api/HttpTransport/index";

describe("Test GET requests", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it("should return json in object form correctly", async () => {
        // expect(hello("mocha"), "Hello mocha");

        mock.get("/test/get", (req, res) => {
            expect(req.method()).to.equal("GET");
            expect(req.url().toString()).to.equal("/test/get");
            return res.status(200).body('{"data":{"id":"abc-123"}}');
        });

        const response = await httpTransportService.get("/test/get");
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(response).to.deep.equalInAnyOrder({ data: { id: "abc-123" } });
    });
});

describe("Test POST requests", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it("should send correct method request", async () => {
        mock.post("/test/post", (req, res) => {
            expect(req.method()).to.equal("POST");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.post("/test/post");
    });

    it("should send request to correct url", async () => {
        mock.post("/test/post", (req, res) => {
            expect(req.url().toString()).to.equal("/test/post");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.post("/test/post");
    });

    it("should send correct json header", async () => {
        mock.post("/test/post", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.post("/test/post", { data: {} });
    });

    it("should send correct json payload", async () => {
        mock.post("/test/post", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            expect(req.body()).to.equal('{"someData":"value"}');
            return res.status(200).body("{}");
        });

        await httpTransportService.post("/test/post", {
            data: {
                someData: "value",
            },
        });
    });

    it("should return json in object form correctly", async () => {
        mock.post("/test/post", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            expect(req.body()).to.equal('{"someData":"value"}');
            return res.status(200).body('{"someResponse":"value2"}');
        });

        const response = await httpTransportService.post("/test/post", {
            data: {
                someData: "value",
            },
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(response).to.deep.equalInAnyOrder({ someResponse: "value2" });
    });
});

describe("Test PUT requests", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it("should send correct method request", async () => {
        mock.put("/test/put", (req, res) => {
            expect(req.method()).to.equal("PUT");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.put("/test/put");
    });

    it("should send request to correct url", async () => {
        mock.put("/test/put", (req, res) => {
            expect(req.url().toString()).to.equal("/test/put");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.put("/test/put");
    });

    it("should send correct json header", async () => {
        mock.put("/test/put", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.put("/test/put", { data: {} });
    });

    it("should send correct json payload", async () => {
        mock.put("/test/put", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            expect(req.body()).to.equal('{"someData":"value"}');
            return res.status(200).body("{}");
        });

        await httpTransportService.put("/test/put", {
            data: {
                someData: "value",
            },
        });
    });

    it("should return json in object form correctly", async () => {
        mock.put("/test/put", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            expect(req.body()).to.equal('{"someData":"value"}');
            return res.status(200).body('{"someResponse":"value2"}');
        });

        const response = await httpTransportService.put("/test/put", {
            data: {
                someData: "value",
            },
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(response).to.deep.equalInAnyOrder({ someResponse: "value2" });
    });
});

describe("Test DELETE requests", () => {
    beforeEach(() => mock.setup());
    afterEach(() => mock.teardown());

    it("should send correct method request", async () => {
        mock.delete("/test/delete", (req, res) => {
            expect(req.method()).to.equal("DELETE");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.delete("/test/delete");
    });

    it("should send request to correct url", async () => {
        mock.delete("/test/delete", (req, res) => {
            expect(req.url().toString()).to.equal("/test/delete");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.delete("/test/delete");
    });

    it("should send correct json header", async () => {
        mock.delete("/test/delete", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            return res.status(200).body('{"someResponse":"value2"}');
        });

        await httpTransportService.delete("/test/delete", { data: {} });
    });

    it("should send correct json payload", async () => {
        // expect.assertions(3);

        mock.delete("/test/delete", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            expect(req.body()).to.equal('{"someData":"value"}');
            return res.status(200).body("{}");
        });

        await httpTransportService.delete("/test/delete", {
            data: {
                someData: "value",
            },
        });
    });

    it("should return json in object form correctly", async () => {
        // expect.assertions(3);

        mock.delete("/test/delete", (req, res) => {
            expect(req.header("Content-Type")).to.equal("application/json");
            expect(req.body()).to.equal('{"someData":"value"}');
            return res.status(200).body('{"someResponse":"value2"}');
        });

        const response = await httpTransportService.delete("/test/delete", {
            data: {
                someData: "value",
            },
        });

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        expect(response).to.deep.equalInAnyOrder({ someResponse: "value2" });
    });
});
