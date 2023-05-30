const { spec, request } = require('pactum');
const baseUrl = "https://practice.expandtesting.com/notes/api"

describe("users logout test suite", () =>{

    before(()=>{
        request.setDefaultTimeout(5000)
    })
    
     it('logout user test', async () => {
    
        await spec()
        .delete(`${baseUrl}/users/logout`)
        .withHeaders('x-auth-token', '44cd75c24fb44aca84157318f2371761ff7a9c8b4c784a1eb4fc84769826dd98')
        .expectStatus(200)
        .expectBodyContains('User has been successfully logged out');
    });

    it('try logout user - unauthorized flow test', async () => {
    
        await spec()
        .get(`${baseUrl}/users/logout`)
        .withHeaders('x-auth-token', '')
        .expectStatus(401)
        .expectBodyContains('No authentication token specified in x-auth-token header');
    });

    it('delete user account test', async () => {
    
        await spec()
        .delete(`${baseUrl}/users/delete-account`)
        .withHeaders('x-auth-token', 'f6c62cc1fbbf439d961edb08c8d4ee9244f82330011c46bc9215a0aaa983349a')
        .expectStatus(200)
        .expectBodyContains('Account successfully deleted');
    });

    it('try delete user account - unauthorized flow test', async () => {
    
        await spec()
        .get(`${baseUrl}/users/delete-account`)
        .expectStatus(404);
    });

    it('delete a note test', async () => {
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

        const noteId = '64752ba21a35090211432d99'
    
        await spec()
        .delete(`${baseUrl}/notes/${noteId}`)
        .withHeaders('x-auth-token', '341e9db126e341fd93ecc3a4192daa4ed7dfd9e229aa4a95895360dce1cdafa4')
        .expectStatus(200)
        .expectBodyContains('Note successfully deleted');
    });

    it('try delete a note test', async () => {

        const noteId = '64752ba21a35090211432d99'
    
        await spec()
        .delete(`${baseUrl}/notes/${noteId}`)
        .withHeaders('x-auth-token', '341e9db126e341fd93ecc3a4192daa4ed7dfd9e229aa4a95895360dce1cdafa4')
        .expectStatus(400)
        .expectBodyContains('Note successfully deleted');
    });

});
