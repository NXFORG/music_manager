const db = require('../db_config/config');
const SQL = require('sql-template-strings');

class Album {
    constructor(results){
        this.id = results.id
        this.ownerid = results.ownerid
        this.relid = results.relid
        this.reltitle = results.reltitle
        this.relartist = results.relartist
        this.relgenre = results.relgenre
        this.relyear = results.relyear
        this.reltype = results.reltype
        this.relimage = results.relimage
        this.relbarcode = results.relbarcode
        this.albumowners = results.albumowners
        this.rellabel = results.rellabel
    }
    static collection(ownerId) {
        return new Promise(async (res, rej) => {
            try {
                let result = await db.run(SQL`SELECT * FROM albumcollection WHERE ownerId = ${ownerId};`);
                let coll = result.rows.map(r => new Album(r));
                res(coll);
            } catch (err) {
                rej(`Error retrieving albums: ${err}`);
            }
        })
    }
}

module.exports = Album