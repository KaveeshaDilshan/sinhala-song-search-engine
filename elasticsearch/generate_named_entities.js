'use strict'
const corpus = require('../corpus/corpus.json')

var Lyricists_En = [];
var Lyricists_Si = [];
var Artists_En = [];
var Artists_Si = [];
var Years = [];

function generate_named_entities() {
    corpus.forEach(song => {
        var Artist_En = song.Artist_En;

        if (Artist_En) {
            var splits = splitMultiple(Artist_En.trim(), [' ', ' and ', ',', '&']);
            splits.forEach(split => {
                if (!Artists_En.includes(split.trim())) {
                    Artists_En.push(split.trim());
                }
            });
        }

        var Artist_Si = song.Artist_Si;
        if (Artist_Si) {
            var splits = splitMultiple(Artist_Si.trim(), [' ', ' සහ ', ',', '&', ' සහා ']);
            splits.forEach(split => {
                if (!Artists_Si.includes(split.trim())) {
                    Artists_Si.push(split.trim());
                }
            });
        }

        var Lyricist_En = song.Lyricist_En;
        if (Lyricist_En) {
            var splits = splitMultiple(Lyricist_En.trim(), [' ', ' and ', ',', '&']);
            splits.forEach(split => {
                if (!Lyricists_En.includes(split.trim())) {
                    Lyricists_En.push(split.trim());
                }
            });
        }

        var Lyricist_Si = song.Lyricist_Si;
        if (Lyricist_Si) {
            var splits = splitMultiple(Lyricist_Si.trim(), [' ', ' සහ ', ',', '&', ' සහා ']);
            splits.forEach(split => {
                if (!Lyricists_Si.includes(split.trim())) {
                    Lyricists_Si.push(split.trim());
                }
            });
        }

        var Year = song.Year;
        if (Year) {
            if (!Years.includes(Year)) {
                Years.push(Year);
            }

        }


    });

    var entities = {
        Lyricists_En,
        Lyricists_Si,
        Artists_En,
        Artists_Si,
        Years
    }
    var jsonentities = JSON.stringify(entities);
    var fs = require('fs');
    fs.writeFile('../corpus/name_entities.json', jsonentities, 'utf8', (error) => { console.log(error) });
}

function splitMultiple(str, sep) {
    let replacedStr = str

    for (const separator of sep) {
        replacedStr = replacedStr.split(separator).join('$')
    }

    return replacedStr.split('$')

}

generate_named_entities();
