import fetch from 'node-fetch';

import db from '../database/index';
import httpHelper from '../utils/http';


let url = "https://api.stackexchange.com/2.2/users?order=desc&sort=reputation&site=stackoverflow";

const getAll = async () => {
    
    const users = await fetch(url).then(response => response.json());
    
    return httpHelper.mountResponse(users.items, 'Get Users successfully');
};

const get = async (text) => {
    console.debug('GET /search/:text');
    
    const user = await fetch(url+"&inname="+text).then(response => response.json());

    return httpHelper.mountResponse(user, 'Get User successfully');
};


const upsert = async ()  => {

    const users = await fetch(url).then(response => response.json());

    try {
        for (let u in users)
        {
            let result = await db.User.findOne({ where: {user_id}});
            if(result) {
                await result.update(u);                
            } else {
                result = await db.User.create(attr);
            }
            
        }
        
    } catch (e) {
        
        return httpHelper.mountResponse(null, e);
    }

    return httpHelper.mountResponse(result, 'Users created/updated successfully');
};

const deleteUser = async (userId) => {
    const where = {id: userId};

    const result = await db.User.destroy({where});

    if (result === 0) {
        return httpHelper.mountResponse(undefined, 'The user role id provided was not found!', true);
    }
    return httpHelper.mountResponse(undefined, 'User role removed successfully');
};

export default {
    getAll,
    get,
    upsert,
    delete: deleteUser
};
