'use strict'

const express = require('express');
const router = express.Router();

const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200', auth: {username: 'elastic',password: 'WWmJJGmIeRkrLiKOwSEU'} });

var stopwords = require("../../corpus/stopwords.json");
var stemwords = require("../../corpus/stemwords.json");
var named_entities = require("../../corpus/name_entities.json");

router.post('/', async function (req, res) {

    var query = req.body.query;
    var query_trimmed = query.trim();
    var query_words = query_trimmed.split(" ");
    var removing_stopwords = [];
    var size = 100;


    
    var range = 0;
    var sort_method = [];


    var field_type = 'most_fields';


    var Lyricist_En = 1;
    var Lyricist_Si = 1;
    var Artist_En = 1;
    var Artist_Si = 1;
    var Title_En = 1;
    var Title_Si = 1;
    var Year_En = 20;
    var Year_Si = 20;
    var Metaphors = 1;
    var Lyrics = 1;
    var Sorting = 1;


    query_words.forEach(word => {

        // Check language.
        if (/^[A-Za-z0-9/\s/]*$/.test(query_trimmed)) {
            // English


            // Increase score based on stemwords
            stemwords.Lyricist_En.forEach(stemword => {
                if (word.includes(stemword)) {
                    word.replace(stemword, "");
                    Lyricist_En += 1; 
                }
            })

            stemwords.Artist_En.forEach(stemword => {
                if (word.includes(stemword)) {
                    word.replace(stemword, "");
                    Artist_En += 1;
                }
            })

            // Increase score based on stopwords
            if (stopwords.Artist_En.includes(word)) {
                Artist_En += 1;
                removing_stopwords.push(word);
            }

            if (stopwords.Lyricist_En.includes(word)) {
                Lyricist_En += 1;
                removing_stopwords.push(word);
            }

            if (stopwords.Title_En.includes(word)) {
                Title_En += 1;
                removing_stopwords.push(word);
            }

            if (stopwords.Year_En.includes(word)) {
                Year_En += 1;
                removing_stopwords.push(word);
            }

            // Increase score based on named_entities.
            if (named_entities.Lyricists_En.includes(word)) {
                Lyricist_En += 1;
            }

            if (named_entities.Artists_En.includes(word)) {
                Artist_En += 1;
            }

            if (named_entities.Years.includes(word)) {
                Year_En += 1;
            }






        } else {
            // Sinhala


            // Increase score based on stemwords
            stemwords.Lyricist_Si.forEach(stemword => {
                if (word.includes(stemword)) {
                    word.replace(stemword, "");
                    Lyricist_Si += 1;
                }
            })

            stemwords.Artist_Si.forEach(stemword => {
                if (word.includes(stemword)) {
                    word.replace(stemword, "");
                    Artist_Si += 1;
                }
            })

            // Increase score based on stopwords
            if (stopwords.Artist_Si.includes(word)) {
                Artist_Si += 1;
                removing_stopwords.push(word);
            }

            if (stopwords.Lyricist_Si.includes(word)) {
                Lyricist_Si += 1;
                removing_stopwords.push(word);
            }

            if (stopwords.Title_En.includes(word)) {
                Title_Si += 1;
                removing_stopwords.push(word);
            }

            if (stopwords.Year_Si.includes(word)) {
                Year_Si += 1;
                removing_stopwords.push(word);
            }

            if (stopwords.Metaphors.includes(word)) {
                Metaphors += 1;
                removing_stopwords.push(word);
            }

            // Increase score based on named_entities.
            if (named_entities.Lyricists_Si.includes(word)) {
                Lyricist_Si += 1;
            }

            if (named_entities.Artists_Si.includes(word)) {
                Artist_Si += 1;
            }
            

            if (named_entities.Years.includes(word)) {
                Year_Si += 1;
            }

        }

        if (stopwords.Sorting.includes(word)) {
            Sorting += 1;
            removing_stopwords.push(word);
        }
    })

    removing_stopwords.forEach(word => {
        query = query.replace(word, '');
    });

    stopwords.Common.forEach(word => {
        query = query.replace(word, '');
    });


    if (/^[A-Za-z0-9]*$/.test(query_trimmed)) {

        var result = await client.search({
            index: 'sinhalasongsdata',
            body: {
                size: size,
                _source: {
                    includes: ["Title_Si", "Lyricist_Si", "Artist_Si", "Lyrics", "Metaphors.Metaphor","Metaphors.Source", "Metaphors.Target", "Metaphors.Meaning", "Year"]
                },
                sort: sort_method,
                query: {
                    multi_match: {
                        query: query.trim(),
                        fields: [
                            `Artist_En.case_insensitive_and_inflections^${Artist_En}`,
                            `Lyricist_En.case_insensitive_and_inflections^${Lyricist_En}`,
                            `Title_En.case_insensitive_and_inflections^${Title_En}`,
                            `Year^${Year_En}`
                        ],
                        operator: "or",
                        type: field_type
                    }
                },
                aggs: {
                    "metaphore_filter": {
                        terms: {
                            field: "Metaphors.Meaning.raw",
                            size: 10
                        }
                    },
                    "song_title_filter": {
                        terms: {
                            field: "Title_Si.raw",
                            size: 10
                        }
                    },
                    "artist_filter": {
                        terms: {
                            field: "Artist_Si.raw",
                            size: 10
                        }
                    },
                    "writer_filter": {
                        terms: {
                            field: "Lyricist_Si.raw",
                            size: 10
                        }
                    },
                    "year_filter": {
                        terms: {
                            field: "Year.raw",
                            size: 10
                        }
                    }
                }
            }
        });

    } else {
        var result = await client.search({
            index: 'sinhalasongsdata',
            body: {
                size: size,
                _source: {
                    includes: ["Title_Si", "Lyricist_Si", "Artist_Si", "Lyrics", "Metaphors.Metaphor","Metaphors.Source", "Metaphors.Target", "Metaphors.Meaning", "Year"]
                },
                sort: sort_method,
                query: {
                    multi_match: {
                        query: query.trim(),
                        fields: [
                            `Artist_Si^${Artist_Si}`,
                            `Lyricist_Si^${Lyricist_Si}`,
                            `Title_Si^${Title_Si}`,
                            `Year^${Year_Si}`,
                            `Lyrics^${Lyrics}`,
                            `Metaphors.Metaphor^${Metaphors}`,
                            `Metaphors.Source^${Metaphors}`,
                            `Metaphors.Target^${Metaphors}`,
                            `Metaphors.Meaning^${Metaphors}`,
                        ],
                        operator: "or",
                        type: field_type,
                    }
                },
                aggs: {
                    "metaphore_filter": {
                        terms: {
                            field: "Metaphors.Meaning.raw",
                            size: 10
                        }
                    },
                    "song_title_filter": {
                        terms: {
                            field: "Title_Si.raw",
                            size: 10
                        }
                    },
                    "artist_filter": {
                        terms: {
                            field: "Artist_Si.raw",
                            size: 10
                        }
                    },
                    "writer_filter": {
                        terms: {
                            field: "Lyricist_Si.raw",
                            size: 10
                        }
                    },
                    "year_filter": {
                        terms: {
                            field: "Year.raw",
                            size: 10
                        }
                    }
                }
            }
        });
    }

    res.send({
        aggs: result.body.aggregations,
        hits: result.body.hits.hits
    });
});

module.exports = router
