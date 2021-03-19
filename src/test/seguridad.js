const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('../server.js');

chai.should();

chai.use(chaiHttp);

describe('app_sereno API',()=>{
	/**
	 *Test the GET route
	 *
	**/
	describe('GET /api/seguridad',()=>{
		it('It should GET an Object',(done)=>{
			chai.request(server)
				.get('/api/seguridad')
				.end((err,resp)=>{
					resp.should.have.status(200);
					resp.body.should.be.a('Object');
				done();
			})
		})

		it('It should not GET an Object',(done)=>{
			chai.request(server)
				.get('/api/other')
				.end((err,resp)=>{
					resp.should.have.status(200);
				done();
			})
		})
	})

	/**
	 *Test the GET route
	 *
	**/
	describe('GET /api/seguridad/testingdb',()=>{
		it('It should GET an Object',(done)=>{
			chai.request(server)
				.get('/api/seguridad/testingdb')
				.end((err,resp)=>{
					resp.should.have.status(200);
					resp.body.should.be.a('Object');
				done();
			})
		})

		it('It should not GET an Object',(done)=>{
			chai.request(server)
				.get('/api/other')
				.end((err,resp)=>{
					resp.should.have.status(200);
				done();
			})
		})
	})
})