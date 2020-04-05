const request = require('supertest');
const app = require('../../src/app'); 
const connection = require('../../src/database/connection'); 

describe('ONG', () => {
    beforeEach(async () => {
        await connection.migrate.rollback(); 
        await connection.migrate.latest(); 
    });

    afterAll(async ()=> {
        await connection.destroy(); 
    });

    it('should be able to create a new ONG', async () => {
        const response = await request(app).post('/ongs')
        .send({
            name:"APAD2", 
            email:"contato@contato.com", 
            whatsapp:"1100000000", 
            city:"sao paulo", 
            uf:"SP"
        });     
    
        expect(response.body).toHaveProperty('id'); 
        expect(response.body.id).toHaveLength(8); 
    });  
    
    it('should be able to list existents ONG', async () => {
        //create 
        const ong = await request(app).post('/ongs')
        .send({
            name:"APAD2", 
            email:"contato@contato.com", 
            whatsapp:"1100000000", 
            city:"sao paulo", 
            uf:"SP"
        });     

        const response = await request(app).get('/ongs');
        expect(response.body.name).toEqual(ong.name); 
        expect(response.body.email).toEqual(ong.email); 
        expect(response.body.whatsapp).toEqual(ong.whatsapp); 
        expect(response.body.city).toEqual(ong.city); 
        expect(response.body.uf).toEqual(ong.uf); 
    });
});

//pedente testas delete