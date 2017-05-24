var db = require('../db.js');
var session = require('express-session')


/* Listing Object
 *   Students will submit these items and tutors will respond to them.
 *   Fields are WIP
 */
var Listing = function(id, owner, title, descr, time, dur /*,price, responders, tags*/) {
    this.id = id;
    this.owner = owner; /* User ID for the listing's creator */
    this.title = title; /* Title of the listing */
    this.description = descr; /* Description of the listing, detailed info */
    this.time = time; /* Time of post */
    this.duration = dur; /* Requested duration */     
}

/* Response Object
 *
 * {
 *   'id': (unique id),
 *   'listing': (assoc. listing id),
 *   'responder': (tutor id),
 *   'message': (256 char message),
 *   'time': (time of response)
 * }
 */
var Response = function(id, listing, responder, message, time) {
    this.id = id;
    this.listing = listing;
    this.responder = responder;
    this.message = message;
    this.time = time;
}

/* Create a new Listing */
Listing.create = function(owner, title, description, duration, callback) {
    db.query('INSERT INTO Listings (owner, title, description, duration) VALUES(?, ?, ?, ?)', 
        [owner, title, description, duration], function(err, results, fields) {
            if (err) {
                console.log(err);
                callback('INSERT_FAILED');
            }
            else {
                Listing.findById(results.insertId, function(err, listing) {
                    if (err) {
                        console.log(err);
                        callback(err)
                    }
                    else {
                        callback(null, listing);
                    }
                });
            }
        });
}

Listing.delete = function(id, callback) {
    db.query('DELETE FROM Listings WHERE id='+db.escape(id), function(err, results, fields) {
        if (err) {
            console.log(err);
            callback('DELETE_FAILED');
        }
        else if (results.affectedRows < 1) {
            callback('NOT_FOUND');
        }
        else {
            callback(null, 'SUCCESS');
        }
    });
}

/* Retreieve listing by its id */
Listing.findById = function(id, callback) {
    db.query('SELECT id, owner, title, description, time, duration FROM Listings WHERE id = '+db.escape(id), function (err, results, fields) {
        if (err) {
            console.log(err);
            callback('FIND_FAILED');
        }
        if (results.length < 1) {
            callback('NOT_FOUND');
        }
        else {
            listing = new Listing(results[0].id, results[0].owner,
                results[0].title, results[0].description,
                results[0].time, results[0].duration);
            callback(null, listing);
        }
    });
}

Listing.getAll = function(callback) {
    db.query('SELECT * FROM Listings', function(err, results, fields) {
        if (err) {
            console.log(err);
            callback('RETRIEVE_FAILED');
        }
        else {
            var listings = [];
            for (var i = 0; i < results.length; ++i) {
                listings.push(new Listing(results[i].id, results[i].owner,
                    results[i].title, results[i].description, results[i].time,
                    results[i].duration));
            }
            callback(null, listings);
        }
    });
}

/* Update an existing listing */
Listing.prototype.save = function(callback) {
    var self = this; // Give query scope of listing object
    db.query('UPDATE Listings SET owner = ?, title = ?, description = ?, duration = ? WHERE id = ?', [self.owner, self.title, self.description, self.duration, self.id], function(err, results, fields) {
        if (err) {
            console.log(err);
            callback('UPDATE_FAILED');
        }
        else {
            callback(null, self); 
        }
    });
}

/* Get a specific response */
Response.findById = function(responseId, callback) {
    db.query('SELECT * FROM Responses WHERE id=?',
        [responseId], function(err, results, fields) {
            if (err) {
                console.log(err);
                callback('GET_RESPONSE_FAILED');
            }
            else if (results.length < 1) {
                callback('NOT_FOUND');
            }
            else {
                callback(null, new Response(results[0].id, results[0].listing,
                    results[0].responder, results[0].message, results[0].time));
            }
        });
}

/* Respond to this listing */
Listing.prototype.respond = function(user, message, callback) {
    var self = this;
    db.query('INSERT INTO Responses (listing, responder, message) VALUES(?, ?, ?)',
        [self.id, user.id, message], function(err, results, fields) {
            if (err) {
                console.log(err);
                callback(err);
            }
            else {
                Response.findById(results.insertId, function(err, response) {
                    if (err) {
                        console.log(err);
                        callback(err)
                    }
                    else {
                        callback(null, response);
                    }
                });
            }
        });

}

/* Get responses for this listing */
Listing.prototype.getResponses = function(callback) {
    var self = this;
    db.query('SELECT * FROM Responses WHERE listing= ?',
        [self.id], function(err, results, fields) {
            if (err) {
                callback('GET_ALL_RESPONSES_FAILED');
            }
            else {
                responses = [];
                for (var i = 0; i < results.length; ++i) {
                    responses.push(new Response(results[i].id, results[i].listing,
                        results[i].responder, results[i].message, results[i].time));
                    callback(null, responses);
                }
            }
        });
}

module.exports = Listing;
