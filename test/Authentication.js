
const mongoose = require("mongoose");
const User = require('../models/user');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../index');
const should = chai.should();

chai.use(chaiHttp);

let token = ''

describe('Users', () => {
    before((done) => {
        User.remove({}, (err) => { 
           done();         
        });     
    });
  describe('/signup', () => {
      it('it should signup a new user', (done) => {
          var u = {email: 'gustavo@vaast.com.br', password: '12345'}
        chai.request(server)
            .post('/signup')
            .send(u)
            .end((err, res) => {
                res.should.have.status(200);
                console.log('>>>>>', res.body);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
              done();
            });
      });
      it('it should signin an existing user', (done) => {
        var u = {email: 'gustavo@vaast.com.br', password: '12345'}
      chai.request(server)
          .post('/signin')
          .send(u)
          .end((err, res) => {
              res.should.have.status(200);
              console.log('>>>>>', res.body);
              token = res.body.token;
              //res.body.should.be.a('array');
              //res.body.length.should.be.eql(0);
            done();
          });
    });
    it('it should validate the token', (done) => {
        var u = {email: 'gustavo@vaast.com.br', password: '12345'}
      chai.request(server)
          .get('/')
          .set('authorization', token)
          .end((err, res) => {
              res.should.have.status(200);
              //res.body.should.be.a('array');
              //res.body.length.should.be.eql(0);
            done();
          });
    });
  });
});