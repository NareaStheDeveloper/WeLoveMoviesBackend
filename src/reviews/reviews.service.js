const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
  preferred_name: "critic.preferred_name",
  surname: "critic.surname",
  organization_name: "critic.organization_name",
//   created_at: "critic.created_at",
//   updated_at: "critic.updated_at",
});

function read(reviewId){
    return knex("reviews")
    .select("*")
    .where({review_id: reviewId})
    .first()
}

function readCritic(reviewId){
    return knex("reviews as r")
    .join("critics as c", "c.critic_id", "r.critic_id")
    .select("c.*", "r.*")
    .where({ review_id: reviewId})
    .first()
    .then(addCritics)
}

function update(updatedReview){
    return knex("reviews")
    .select("*")
    .where({review_id: updatedReview.review_id})
    .update(updatedReview, "*")
}

function destroy(review_id){
    return knex("reviews")
    .where({review_id})
    .del();
}


module.exports = {
    read,
    readCritic,
    update, 
    delete: destroy,
}