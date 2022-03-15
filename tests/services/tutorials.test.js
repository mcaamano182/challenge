const chai = require('chai');
const expect = chai.expect;
const { Op } = require('sequelize');


const db = require('../../src/models');

const {
    deleteTutorial,
    createTutorial,
    updateTutorial,
    getTutorial,
    getTutorials,
    deleteAllTutorials
} = require('../../src/services/tutorials');

describe("Tutorials Service test", function() {

    it("should test getTutorial OK", async () => {
        let id=1;

        const tutorial = await getTutorial(id);

        expect(tutorial.id).equal(1);
    });

    it("should test getTutorial null", async () => {
        const id=-10;

        db.Tutorial.findByPk = async(id) => {
            return null;
        }

        const tutorial = await getTutorial(id);
        expect(tutorial).equal(null);
    });

    it("should test getTutorials OK", async () => {
        const tutorials = await getTutorials({where:{[Op.and]:{}}}, [], () => {});
        expect(tutorials.length > 1).to.be.true;

    });
    it("should test deleteTutorial OK", async () => {
        db.Tutorial.update = async(id) => {
            return "ok";
        }
        const tutorials = await deleteTutorial(1);
        expect(tutorials).equal('ok');
    });
    it("should test deleteAllTutorials OK", async () => {
        db.Tutorial.findByPk = async(id) => {
            return 'ok';
        }
        const tutorials = await deleteAllTutorials();
        expect(tutorials).equal('ok');
    });
    it("should test createTutorial OK", async () => {
        let tutorial = {
            title: "Pizza Napolitana con Gluten Morgen | En Vivo",
            video_url: "https://www.youtube.com/watch?v=qQG7TE0aFPY",
            description: "by gluten morgen tv",
            published_status: "published",
            deleted_at: null
        };

        db.Tutorial.create = async(id) => {
            return {id:id};
        }

        const response = await createTutorial(tutorial);
        expect(response.id!=null).equal(true);
    });

    it("should test createTutorial error, not title", async () => {
        let tutorial = {
            video_url: "https://www.youtube.com/watch?v=qQG7TE0aFPY",
            description: "by gluten morgen tv",
            published_status: "published",
            deleted_at: null
        };
        try{
            const response = await createTutorial(tutorial);
        }catch (e){
            expect(e!=null).equal(true);
        }
    });
    it("should test update OK", async () => {
        let tutorial = {
            title: "Pizza Napolitana con Gluten Morgen | En Vivo",
            video_url: "https://www.youtube.com/watch?v=qQG7TE0aFPY",
            description: "by gluten morgen tv",
            published_status: "published",
            deleted_at: null
        };
        const response = await updateTutorial(1,tutorial);
        expect(response!=null).equal(true);
    });

    it("should test updateTutorial error, not title", async () => {
        let tutorial = {
            video_url: "https://www.youtube.com/watch?v=qQG7TE0aFPY",
            description: "by gluten morgen tv",
            published_status: "published",
            deleted_at: null
        };
        try{
            const response = await updateTutorial(tutorial);
        }catch (e){
            expect(e!=null).equal(true);
        }
    });

});