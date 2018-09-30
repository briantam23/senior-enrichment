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

describe('The `School` model', () => {

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
})