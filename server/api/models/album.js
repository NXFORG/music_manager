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
        this.relhave = results.relhave
        this.relwant = results.relwant
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

    static add(id, { relid, reltitle, relartist, relgenre, relyear, reltype, relimage, relbarcode, relhave, relwant, rellabel }) {
        return new Promise(async (res, rej) => {
            try {
                let newAlbum = await db.run(SQL`INSERT INTO albumcollection (ownerId, relId, relTitle, relArtist, relGenre, relYear, relType, relImage, relBarcode, relHave, relWant, relLabel) VALUES (${id}, ${relid}, ${reltitle}, ${relartist}, ${relgenre}, ${relyear}, ${reltype}, ${relimage}, ${relbarcode}, ${relhave}, ${relwant}, ${rellabel}) RETURNING *;`);
                let album = new Album(newAlbum.rows[0]);
                res(album);
            } catch(err) {
                rej(`Could not add album: ${err}`);
            }
        })
    }

    static deleteOne(userId, albumId){
        return new Promise(async (res, rej) => {
            try {
                await db.run(SQL`DELETE FROM albumcollection WHERE ownerId = ${userId} AND relId = ${albumId};`);
                res('Album deleted');
            } catch(err) {
                rej(`Could not delete album: ${err}`);
            }
        })
    }

    static deleteAll(userId){
        return new Promise(async (res, rej) => {
            try {
                await db.run(SQL`DELETE FROM albumcollection WHERE ownerId = ${userId};`);
                res('Albums deleted');
            } catch(err) {
                rej(`Could not delete album: ${err}`);
            }
        })
    }
}

module.exports = Album