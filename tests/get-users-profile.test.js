const { spec, request } = require('pactum');
const baseUrl = "https://practice.expandtesting.com/notes/api"
const getNotesSchema = require('../data/response/get-notes-response-schema.json');

describe("get users profile test suite", () =>{

    before(()=>{
        request.setDefaultTimeout(5000)
    })
    
     it('login user test', async () => {
    
        await spec()
        .get(`${baseUrl}/users/profile`)
        .withHeaders('x-auth-token', 'b941dc90abf84fdd909682e17511650a0ba6c13decdb406abee6c4e863fdd73c')
        .expectStatus(200);
    });

    it('try login user- unauthorized flow test', async () => {
    
        await spec()
        .get(`${baseUrl}/users/profile`)
        .withHeaders('x-auth-token', '')
        .expectStatus(401)
        .expectBodyContains('No authentication token specified in x-auth-token header');
    });

    it('get all notes test', async () => {
    
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

        await spec()
        .get(`${baseUrl}/notes`)
        .withHeaders('x-auth-token', '341e9db126e341fd93ecc3a4192daa4ed7dfd9e229aa4a95895360dce1cdafa4')
        .expectStatus(200)
        .expectJsonSchema(getNotesSchema)
        .expectBodyContains('Notes successfully retrieved');
    });
});
