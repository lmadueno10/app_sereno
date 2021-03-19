const chai = require('chai');
const chaiHttp = require("chai-http");
const server = require('../server.js');

chai.should();

chai.use(chaiHttp);

describe('app_sereno API',()=>{
	/**
	 *Test the POST route
	 *
	**/
	describe('POST /api/auth/signin',()=>{
		it('It should POST a new Object',(done)=>{
			const user={
			    "usuario":'47458461',
			    "password":'47458461'
			};
			chai.request(server)
				.post('/api/auth/signin')
				.send(user)
				.end((err,resp)=>{
					resp.should.have.status(201);
					resp.body.should.be.a('Object');
				done();
			})
		})

		it('It should POST an Object but code status 200',(done)=>{
			const user={
			    "usuario":'47458461',
			    "password":'secret'
			};
			chai.request(server)
				.post('/api/auth/signin')
				.send(user)
				.end((err,resp)=>{
					resp.should.have.status(200);
					resp.body.should.be.a('Object');
					resp.body.should.have.property("code").eq(204);
				done();
			})
		})

		it('It should POST response code status 200 when user is empty',(done)=>{
			const user={
			};
			chai.request(server)
				.post('/api/auth/signin')
				.send(user)
				.end((err,resp)=>{
					resp.should.have.status(200);
					resp.body.should.be.a('Object');
				done();
			})
		})
	})

	/**
	 *Test the POST route
	 *
	**/
	describe('POST /api/auth/refresh-token',()=>{
		it('It should POST a new Object',(done)=>{
			const token={
			    'refresh_token':'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXN1YXJpbyI6IjQ3NDU4NDYxIiwiaWF0IjoxNjE1ODg5NzkzfQ.7dIiSwzbnk3uu2IKIKMdfwwO6Ii_rMRq6emvq00hOAw',
			};
			chai.request(server)
				.post('/api/auth/refresh-token')
				.send(token)
				.end((err,resp)=>{
					resp.should.have.status(201);
					resp.body.should.be.a('Object');
				done();
			})
		})

		it('It should POST a code status 500 when token is empty',(done)=>{
			const token={
			};
			chai.request(server)
				.post('/api/auth/refresh-token')
				.send(token)
				.end((err,resp)=>{
					resp.should.have.status(500);
					resp.body.should.be.a('Object');
				done();
			})
		})
	})
})