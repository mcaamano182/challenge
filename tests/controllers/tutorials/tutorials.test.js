const chai = require('chai');
const {headers_name} = require('../../../src/config/const');
const expect = chai.expect;

const tutorialService = require('../../../src/services/tutorials');

const {
    deleteTutorial,
    createTutorial,
    updateTutorial,
    getTutorial,
    getTutorials,
    deleteAllTutorials,
    generateCreateTutorialToken
} = require('../../../src/controllers/tutorials');


describe("Tutorials Controller test", function() {
    it("should test generateCreateTutorialToken OK", function() {
        req = {headers:{}};
        req.headers[headers_name.access_token] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTWF0aWFzIiwiaWQiOjEsImlhdCI6MTY0NzIyNDE0M30.hu4gg6wBtMeIrj1V5vQObo2WWl3KE9NgJqpTKytbZVs';

        const res = {
            data: {},
            send: (data) => {
                res.data = data;
                res.status = 200;
            }
        };

        generateCreateTutorialToken(req, res, () => {});
        expect(res.status).equal(200);

    });

    it("should test generateCreateTutorialToken with no auth token", function() {
        req = {headers:{}};

        var res = {
            data: {},
            sendStatus: (status) => {
                res.status = status;
                return this;
            },
            send: (data) => {
                res.data = data;
                res.status = 200;
                return this;
            },
            send: (data,status) => {
                res.data = data;
                res.status = status;
                return this;
            }
        };

        generateCreateTutorialToken(req, res, () => {});
        expect(res.status).equal(401);

    });

    it("should test deleteAllTutorials OK", function() {
        let req = {headers:{}};

        let res = {
            data: {},
            send: (data) => {
                res.data = data;
                res.status = 200;
                return this;
            }
        };

        tutorialService.deleteAllTutorials = function(){
            return '';
        }

        deleteAllTutorials(req, res, () => {expect(res.status).equal(200);});


    });

    it("should test getTutorial OK", async () => {
        let req = {params:{id:1}};

        let res = {
            data: {},
            send: (data) => {
                res.data = data;
                res.status = 200;
                return this;
            }
        };

        tutorialService.getTutorial = function (id) {
            return {id:id};
        }

        await getTutorial(req, res, () => {});

        expect(res.data.id).equal(1);
        expect(res.status).equal(200);

    });

    it("should test getTutorial with error on tutorialService.getTutorial", async () => {
        let req = {params:{id:1}};

        let res = {
            data: {},
            send: (data, code) => {
                res.data = data;
                res.status = code;
                return this;
            }
        };

        tutorialService.getTutorial = function (id) {
            throw new Error('pasó algo bizarro!')
        }

        await getTutorial(req, res, () => {

        });

        expect(res.status).equal(undefined);

    });

    it("should test getTutorials OK", async () => {
        let req = {query:{title:'title', video_url:'url'}};

        let res = {
            data: {},
            send: (data) => {
                res.data = data;
                res.status = 200;
                return this;
            }
        };

        tutorialService.getTutorials = function () {
            return {};
        }

        await getTutorials(req, res, () => {});

        expect(res.data.id).equal(undefined);
        expect(res.status).equal(200);

    });

    it("should test getTutorials with error on tutorialService.getTutorials", async () => {
        let req = {params:{id:1}};

        let res = {
            data: {},
            send: (data, code) => {
                res.data = data;
                res.status = code;
                return this;
            }
        };

        tutorialService.getTutorials = function (id) {
            throw new Error('pasó algo bizarro!')
        }

        await getTutorials(req, res, () => {});

        expect(res.status).equal(undefined);

    });

    it("should test deleteTutorial OK", async () => {
        let req = {params:{id:1}};

        let res = {
            data: {},
            send: (data) => {
                res.data = data;
                res.status = 200;
                return this;
            }
        };

        tutorialService.deleteTutorial = function (id) {
            return {};
        }

        await deleteTutorial(req, res, () => {});

        expect(res.data.id).equal(undefined);
        expect(res.status).equal(200);

    });

    it("should test create tutorial OK", async () => {
        let req = {body:{title: "Pizza Napolitana con Gluten Morgen | En Vivo",
                video_url: "https://www.youtube.com/watch?v=qQG7TE0aFPY",
                description: "by gluten morgen tv",
                published_status: "published",
                deleted_at: null}};

        let res = {
            data: {},
            send: (data) => {
                res.data = data;
                res.status = 200;
                return this;
            }
        };

        tutorialService.createTutorial = function (data) {
            return {};
        }

        await createTutorial(req, res, () => {});

        expect(res.status).equal(200);

    });

    it("should test update tutorial OK", async () => {
        let req = {
                params:{id:1},
                body:{title: "Pizza Napolitana con Gluten Morgen | En Vivo",
                video_url: "https://www.youtube.com/watch?v=qQG7TE0aFPY",
                description: "by gluten morgen tv",
                published_status: "published",
                deleted_at: null}};

        let res = {
            data: {},
            send: (data) => {
                res.data = data;
                res.status = 200;
                return this;
            }
        };

        tutorialService.updateTutorial = function (data) {
            return {};
        }

        await updateTutorial(req, res, () => {});

        expect(res.status).equal(200);

    });
});