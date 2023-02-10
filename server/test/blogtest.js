const Blog = require('../models/blogModel');
const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const chaiHttp = require('chai-http')
const server = require('../index');
const { post } = require('../index');

chai.use(chaiHttp);
/*before((done)=>{
    
    Blog.deleteMany({}, function(err){});
    done();
});*/
/**after((done)=>{
   
    Blog.deleteMany({}, function(err){});
    done();
})*/


describe('/First test collection', ()=>{

        it('Test default API welcome route...',(done)=>{

            chai.request(server)
            .get('/home')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.be.a('object');
                const actualVal =res.body.message
                expect(actualVal).to.be.equal('WELCOME!')
                done();
            });

            
        });
        it('should verify the blogs in the database', (done)=>{
            chai.request(server)
            .get('/blogs/All')
            .end((err,res)=>{
                res.should.have.status(200);
                res.body.should.a('array');
                res.body.should.not.eql(0);
                done();
            })
        })

        it('should post a valid query',(done)=>{
            let query = {
                name: 'Raphaela',
                email: 'mahoraphy02@gmail.com',
                message: "Please pass the test"
            }
            chai.request(server)
            .post('/queries/SendQuery')
            .send(query)
            .end((err,res)=>{
                
                res.should.have.status(200);
                done();

            });
        })
        it('should test user registration',(done)=>{
            let user = {
                username: 'Raphaelabnyugsfd',
                email: 'mahoraphy0123hjkjf4@gmail.com',
                password: "12f33erh"
            }
            chai.request(server)
            .post('/user/register')
            .send(user)
            .end((err,res)=>{
                
                res.should.have.status(200);
                done();

            });
        })
        it('should test for valid login', (done)=>{
             
            let user ={
                username: 'Administrator',
                password: 'Test123@'
            }            
            chai.request(server)
            .post('/user/login')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200)
                expect(res.header).to.have.property('auth-token');
                done();
            })
        })

        it('should test valid blog creation', (done)=>{
            let user ={
                username: 'Administrator',
                password: 'Test123@'
            }            
            chai.request(server)
            .post('/user/login')
            .send(user)
            .end((err,res)=>{
                res.should.have.status(200)
                let token = res.header['auth-token'];
                

                let blog = {
                    title: 'Blog From Test File',
                    image: 'https://www.google.com/imgres?imgurl=https%3A%2F%2Fbs-uploads.toptal.io%2Fblackfish-uploads%2Fcomponents%2Fseo%2Fcontent%2Fog_image_file%2Fog_image%2F1154099%2F0712-Bad_Practices_in_Database_Design_-_Are_You_Making_These_Mistakes_Dan_Social-754bc73011e057dc76e55a44a954e0c3.png&imgrefurl=https%3A%2F%2Fwww.toptal.com%2Fdatabase%2Fdatabase-design-bad-practices&tbnid=h3bAJmV-uaSaiM&vet=12ahUKEwju8f7JpoD9AhU1picCHalZDLgQMygCegUIARDoAQ..i&docid=QuwZRA6WkefF2M&w=1720&h=900&q=database&ved=2ahUKEwju8f7JpoD9AhU1picCHalZDLgQMygCegUIARDoAQ',
                    blogContent: "Please let it be now"
                }
                chai.request(server)
                .post('/blogs/newblog')
                .send(blog)
                .end((err,res)=>{
                    res.header('auth-token', token).send(token)
                    res.should.have.status(200);
                    done();
    
                });

            });

            
        })
        it('should test ')
        it('should test something', ()=>{
            //actual test content
            let expectedVal = 10;
            let actualVal = 10;
            expect(actualVal).to.be.equal(expectedVal);
        })
})

