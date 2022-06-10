const request = require('supertest')
const app = require("../../app/index.js")
const dotenv = require('dotenv');
dotenv.config();

describe('test index api', () => {
    it('return 200 ok', (done) => {
        request(app)
        .get("/")
        .expect('Content-Type', 'application/json; charset=utf-8')
        .expect(200, done)
    });
});

describe('test api cars', () => {
    it('return 200 ok',(done) => {
        request(app)
        .get("/v1/cars")
        .expect('Content-Type','application/json; charset=utf-8')
        .expect(200, done);
    })
});

describe('test api create car', () => {
    it('return 201 created', async() => {
        const loginAuth =  {
            email: 'usha0619674@gmail.com',
            password: 'sukses'
        };

        await request(app)
        .post("/v1/auth/register")
        .send(loginAuth);

        const response = await request(app)
        .post("/v1/auth/login")
        .send(loginAuth);

        const token = `Bearer ${response.body.accessToken}`;

        const carPayload = {
            name: "Honda",
            price: 1000,
            size: "small"
        };

        await request(app)
        .post("/v1/cars")
        .set("Authorization", token)
        .send(carPayload)
        .expect(201)
        .expect("Content-Type", "application/json; charset=utf-8");


    });

    it('return 401 unauthorized access', async() => {
        const loginAuth = {
            email: 'faradini@gmail.com',
            password: 'sukses'
        };

        await request(app)
        .post("/v1/auth/register")
        .send(loginAuth);

        const response = await request(app)
        .post("/v1/auth/login")
        .send(loginAuth);

        const token = `Bearer ${response.body.accessToken}`;

        const carPayload = {
            name: "Honda",
            price: 1000,
            size: "small"
        };

        await request(app)
        .post("/v1/cars")
        .set("Authorization", token)
        .send(carPayload)
        .expect(401)
        .expect("Content-Type", "application/json; charset=utf-8");
    });
});

describe('test get car by id', () => {
    it('return 200 using valid id', () => {
        request(app)
        .get("/v1/cars/3")
        .expect(200)
        .expect("Content-Type", "application/json; charset=utf-8");
    });

    it('return 404 using invalid id', () => {
        request(app)
        .get("/v1/cars/4509")
        .expect(404)
        .expect("Content-Type", "application/json; charset=utf-8");
    });
});

describe('test api delete car', () => {
    it('return 204 created', async() => {


        const loginAuth =  {
            email: 'fara@gmail.com',
            password: 'faradini'
        };

        await request(app)
        .post("/v1/auth/register")
        .send(loginAuth);

        const response = await request(app)
        .post("/v1/auth/login")
        .send(loginAuth);

        const token = `Bearer ${response.body.accessToken}`;

        await request(app)
        .delete("/v1/cars/4")
        .set("Authorization", token)
        .expect(204);

    });

    it('return 401 unauthorized access', async() => {
        const loginAuth = {
            email: 'faradini@gmail.com',
            password: 'sukses'
        };

        await request(app)
        .post("/v1/auth/register")
        .send(loginAuth);

        const response = await request(app)
        .post("/v1/auth/login")
        .send(loginAuth);

        const token = `Bearer ${response.body.accessToken}`;


        await request(app)
        .delete("/v1/cars/10")
        .set("Authorization", token)
        .expect(401);
    
    });
});





  




    
