'use strict';

const expect = require('chai').expect;
const request = require('supertest');

const app = require('../server/app');
const agent = request.agent(app);

const conn = require('../server/db').conn;
const School = require('../server/db/School');
const Student = require('../server/db/Student');


describe('The `Schools` Route:', () => {

    // First we clear the database before beginning each run
    before(() => {
        return conn.sync({ force: true });
    })

    // Also, we empty the tables after each spec
    afterEach(() => {
        return Promise.all([
            School.truncate({ cascade: true }),
            Student.truncate({ cascade: true })
        ])
    })

    describe('GET /api/schools', () => {
        it('responds with a array via JSON', async () => {

            const res = await agent
                .get('/api/schools')
                .expect('Content-Type', /json/)
                .expect(200);

            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body).to.have.length(0);
        })
    

        // Save an school in the database using our model and then retrieve it
        it('returns an school if there is one in the DB', async () => {

            await School.create({
                name: 'Test Name',
                description: 'Test Description',
                address: 'Test Address'
            })

            const res = await agent 
                .get('/api/schools')
                .expect(200)

            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body[0].address).to.equal('Test Address');
        })

        it('returns another school if there is one in the DB', async() => {

            await School.create({
                name: 'Test Name',
                description: 'Test Description',
                address: 'Test Address'
            })
            await School.create({
                name: 'Another Test Name',
                description: 'Another Test Description',
                address: 'Another Test Address'
            })

            const res = await agent
                .get('/api/schools')
                .expect(200)

            expect(res.body).to.be.an.instanceOf(Array);
            expect(res.body[0].address).to.equal('Test Address');
            expect(res.body[1].address).to.equal('Another Test Address');
        })
    })

    describe('GET /api/schools/:id', () => {

        let coolSchool; 
        beforeEach(async () => {
            const creatingSchools = [{
                name: 'Test Name',
                description: 'Test Description',
                address: 'Test Address'
            }, {
                name: 'Another Test Name',
                description: 'Another Test Description',
                address: 'Another Test Address'
            }]
            .map(data => School.create(data));
            
            const createdSchools = await Promise.all(creatingSchools);
            coolSchool = createdSchools[1];
        })

        it('returns the JSON of the school based on the id', async () => {

            const res = await agent
                .get('/api/schools/' + coolSchool.id)
                .expect(200);

            if(typeof res.body === 'string') {
                res.body = JSON.parse(res.body);
            }
            expect(res.body.name).to.equal('Another Test Name');
        })

        it('returns a 404 error if the ID is not correct', () => {

            return agent
                .get('/api/schools/79740')
                .expect(404);
        })
    })

    describe('POST /api/schools', () => {
        it('creates a new school', async () => {

            const res = await agent
                .post('/api/schools')
                .send({
                    name: 'Awesome POST-Created School',
                    description: 'Can you believe I did this in a test?',
                    address: '123 Easy Street, Easyville, NY 12345'
                })
                .expect(200);
            
            expect(res.body.id).to.not.be.an('undefined');
            expect(res.body.description).to.equal('Can you believe I did this in a test?');
        })

        it('does not create a new school without address', () => {

            return agent    
                .post('/api/schools')
                .send({
                    name: 'This School should not be allowed.'
                })
                .expect(500);
        })

        // Check if the schools were actually saved to the DB
        it('saves the school to the DB', async () => {
            
            await agent
                .post('/api/schools')
                .send({
                    name: 'Awesome POST-Created School',
                    description: 'Can you believe I did this in a test?',
                    address: '123 Easy Street, Easyville, NY 12345'
                })
                .expect(200);

            const foundSchool = await School.findOne({
                where: { name: 'Awesome POST-Created School' }
            })

            expect(foundSchool).to.exist;
            expect(foundSchool.description).to.equal('Can you believe I did this in a test?');
        })

        // Do not assume async operations (like db writes) will work; always check
        it('sends back JSON of the actual created school, not just the POSTed data', async () => {

            const res = await agent
                .post('/api/schools')
                .send({
                    name: 'Awesome POST-Created School',
                    description: 'Can you believe I did this in a test?',
                    address: '123 Easy Street, Easyville, NY 12345',
                    extraneous: 'Sequelize will quietly ignore this non-schema property'
                })
                .expect(200);

            expect(res.body.extraneous).to.be.an('undefined');
            expect(res.body.createdAt).to.exist;
        })
    })

    describe('PUT /api/schools/:id', () => {

        let school;

        beforeEach(async() => {
            school = await School.create({
                name: 'Final School',
                description: 'You can do it!',
                address: '123 Easy Street, Easyville, NY 12345'
            })
        })

        it('updates a school', async() => {

            const res = await agent 
                .put('/api/schools/' + school.id)
                .send({
                    name: 'Awesome PUT-Updated School'
                })
                .expect(200);

            expect(res.body.id).to.not.be.an('undefined');
            expect(res.body.name).to.equal('Awesome PUT-Updated School');
            expect(res.body.description).to.equal('You can do it!');
        })

        it('saves updates to the DB', async() => {

            await agent 
                .put('/api/schools/' + school.id)
                .send({
                    name: 'Awesome PUT-Updated School'
                })

            const foundSchool = await School.findById(school.id);

            expect(foundSchool).to.exist;
            expect(foundSchool.name).to.equal('Awesome PUT-Updated School');
        })

        it('gets 500 for invalid update', () => {

            return agent
                .put('/api/schools/' + school.id)
                .send({ name: '' })
                .expect(500);
        })
    })

    describe('DELETE, /api/schools/:id', () => {

        let school;

        beforeEach(async() => {
            school = await School.create({
                name: 'Final School',
                description: 'You can do it!',
                address: '123 Easy Street, Easyville, NY 12345'
            })
        })

        it('deletes a school', async() => {

            const res = await agent
                .delete('/api/schools/' + school.id)
                .expect(204)

            expect(res.body.id).to.be.an('undefined');
        })

        it('saves changes in database', async() => {

            const res = await agent
                .delete('/api/schools/' + school.id)
                .expect(204)

            const foundSchool = await School.findByPk(school.id);

            expect(foundSchool).to.not.exist;
        })

        it('responds with a 500 if a school does not exist', () => {
            
            return agent
                .delete('/api/schools/123')
                .expect(500)
        })
    })
})