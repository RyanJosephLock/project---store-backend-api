import { User, UserStore } from '../users'

const store = new UserStore()

describe("----- Users Model -----", () => {
    
    it('should have an index method', () => {
        expect(store.index).toBeDefined();
    });
    
    it('should have an show method', () => {
        expect(store.show).toBeDefined();
    });

    it('should have an create method', () => {
        expect(store.create).toBeDefined();
    });

    it('create method should add a user', async () => {
        const user: User = {
            "user_firstname": "CreateUser",
            "user_lastname": "Test",
            "user_password": "Access"
        };
        const newUser = await store.create(user)
        expect(newUser).toEqual(jasmine.objectContaining(
            {        
                user_firstname: "CreateUser",
                user_lastname: "Test"
            }
        ));
    });

    it('index method should return a list of users', async () => {
        const result = await store.index();
        expect(result[result.length-1]).toEqual(jasmine.objectContaining(
            {        
                user_firstname: "CreateUser",
                user_lastname: "Test"
            }
        ));
    });

    it('show method return the correct order', async () => {
        const allUsers = await store.index();
        const result = await store.show(allUsers.length);
        expect(result).toEqual(jasmine.objectContaining(
            {        
                user_firstname: "CreateUser",
                user_lastname: "Test"
            }
        ));
    });

});
