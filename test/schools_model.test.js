'use strict';

const Promise = require('bluebird');
const chai = require('chai');
const expect = chai.expect;
const sinon = require('sinon');
const sinonChai = require('sinon-chai');
chai.use(sinonChai);

const School = require('../server/db/School');
const Student = require('../server/db/Student');
const conn = require('../server/db').conn;

describe('The `School` model:', () => {

    // First we claer the database and recreate the tables before beginning a run
    before(() => {
        return conn.sync({ force: true });
    });

    // Next, we create an (un-saved!) article instance before every spec
    let school;
    beforeEach(() => {
        school = School.build({
            name: 'Long Beach',
            description: 'LB',
            address: '33 Ocean Drive, Long Beach, NY 11561'
        })
    })

    // Also, we empty the tables after each spec
    afterEach(() => {
        return Promise.all([
            School.truncate({ cascade: true }),
            Student.truncate({ cascade: true })
        ])
    })

    describe('attributes definition', () => {
        it('includes `name,` `description,` and `address` fields', async () => {

            const savedSchool = await school.save();
            expect(savedSchool.name).to.equal('Long Beach');
            expect(savedSchool.description).to.equal('LB');
            expect(savedSchool.address).to.equal('33 Ocean Drive, Long Beach, NY 11561');

        })

        it('requires `name`', async () => {
            school.name = null;

            let result, error;
            try {
                result = await school.validate();
            } catch(err) {
                error = err;
            }

            if(result) throw Error('validation should fail when name is null');

            expect(error).to.be.an.instanceOf(Error);
        })

        it('requires `address` (strict)', async () => {

            school.address = '';

            let result, error;
            try {
                result = await school.validate();
            } catch(err) {
                error = err;
            }

            if(result) throw Error('validation should fail when address is empty');

            expect(error).to.be.an.instanceOf(Error);
            expect(error.message).to.contain('Validation error');
        })
    })

    describe('associations', () => {
        it('has many students', async () => {

            const creatingStudent = Student.create({ firstName: 'Jack', lastName: 'Johnson' });
            const creatingSchool = School.create({
                name: 'Long Beach',
                description: 'LB',
                address: '33 Ocean Drive, Long Beach, NY 11561'
            })

            const [createdStudent, createdSchool] = await Promise.all([creatingStudent, creatingSchool]);

            await createdSchool.setStudents(createdStudent);

            const foundSchool = await School.findOne({
                where: { name: 'Long Beach' },
                include: { model: Student }
            })

            expect(foundSchool.students).to.exist;
            expect(foundSchool.students[0].lastName).to.equal('Johnson');
        })
    })

    describe('capitalization hooks', () => {

        it('capitalizes before creating', async () => {

            const createdSchool = await School.create({
                name: 'long Beach',
                description: 'LB',
                address: '33 Ocean Drive, Long Beach, NY 11561'
            })
            expect(createdSchool.name).to.equal('Long Beach');
        })

        it('capitalizes before updating', async () => {

            const createdSchool = await School.create({
                name: 'long Beach',
                description: 'LB',
                address: '33 Ocean Drive, Long Beach, NY 11561'
            })
            const updatedSchool = await createdSchool.update({ name: 'lido Beach' });
            expect(updatedSchool.name).to.equal('Lido Beach');
        })
    })
})