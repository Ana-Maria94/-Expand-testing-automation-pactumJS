const { spec, request } = require('pactum');
const baseUrl = "https://practice.expandtesting.com/notes/api"

describe("register new user test suite", () =>{

    before(()=>{
        request.setDefaultTimeout(5000)
    })
    
    it('register new user test', async () => {
        const requestBody = {
            "name": "Paulina",
            "email": "paulina@expandtesting.com",
            "password": "thepassword"
        }

        await spec()
        .post(`${baseUrl}/users/register`)
        .withHeaders('Content-Type', 'application/json')
        .withBody(requestBody)
        .expectStatus(201)
        .expectBodyContains(requestBody.name);
    });

     it('try register new user- invalid scenario test', async () => {
        const requestBody = {
            "name": "",
            "email": "severina@expandtesting.com",
            "password": "thepassword"
        }

        await spec()
        .post(`${baseUrl}/users/register`)
        .withHeaders('Content-Type', 'application/json')
        .withBody(requestBody)
        .expectStatus(400)
        .expectBodyContains('User name must be between 4 and 30 characters');
    });

    it('login user test', async () => {
        const requestBody = {
                "email": "ecaterina@expandtesting.com",
                "password": "password1"
        }

        await spec()
        .post(`${baseUrl}/users/login`)
        .withHeaders('Content-Type', 'application/json')
        .withBody(requestBody)
        .expectStatus(200)
        .expectBodyContains(requestBody.email);
    });

    it('user forgot password test', async () => {
        const requestBody = {
                "email": "ecaterina@expandtesting.com",
        }

        await spec()
        .post(`${baseUrl}/users/forgot-password`)
        .withHeaders('Content-Type', 'application/json')
        .withBody(requestBody)
        .expectStatus(200)
        .expectBodyContains(`Password reset link successfully sent to ${requestBody.email}. Please verify by clicking on the given link`);
    });

    it('try user forgot password- bad request flow test', async () => {
        const requestBody = {
                "email": "",
        }

        await spec()
        .post(`${baseUrl}/users/forgot-password`)
        .withHeaders('Content-Type', 'application/json')
        .withBody(requestBody)
        .expectStatus(400)
        .expectBodyContains('A valid email address is required');
    });



    it('create new note test', async () => {
    
        const user = {
                "email": "veridiana@expandtesting.com",
                "password": "password1"
        }
        
        await spec()
        .post(`${baseUrl}/users/login`)
        .withHeaders('Content-Type', 'application/json')
        .withBody(user)
        .expectStatus(200)
        .expectBodyContains(user.email);
        
        const note = {
            "title": "Princess",
            "description": "the happy princess",
            "category": "Home"
        }

        await spec()
        .post(`${baseUrl}/notes`)
        .withHeaders('x-auth-token', '341e9db126e341fd93ecc3a4192daa4ed7dfd9e229aa4a95895360dce1cdafa4')
        .expectStatus(200)
        .withBody(note)
        .expectBodyContains('Note successfully created');
    });
});
