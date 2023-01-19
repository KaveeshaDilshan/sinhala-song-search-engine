const { Client } = require('@elastic/elasticsearch');
const client = new Client({ node: 'http://localhost:9200', auth: {username: 'elastic',password: 'WWmJJGmIeRkrLiKOwSEU'}});

const metaphorSrcSearch = async (phrase) => {
  var size = 50;
  
  const result = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "Metaphors",
            query: {
              match: { "Metaphors.Source": phrase }
            },
            inner_hits: { 
            }
          }
        },
      },
    })


    console.log(result.hits.hits.length)

  return {
    success: 1,
    data:result,
  };
};

// const SrcmetaphorSearchWithType = async (phrase,type) => {
//   const hits = [];
//   var size = 50;

//   const searchResult = await client
//     .search({
//       index: "sinhalasongsdata",
//       _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
//       body: {
//         size: size,
//         query: {
//           nested: {
//             path: "Metaphors",
//             query: {
//               bool: {
//                 must: [
//                   { match: { "Metaphors.Source": phrase }},
//                   { match_phrase: { "metaphors.type":  type}} 
//                 ]
//               }
//             },
//             inner_hits: { 
//             } 
//           }
//         },
//       },
//     })

//   return {
//     success: 1,
//     data:searchResult,
//   };
// };

const metaphorTgetSearch = async (phrase) => {
  const hits = [];
  var size = 50;

  const searchResult = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "Metaphors",
            query: {
              match: { "Metaphors.Target": phrase }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

  return {
    success: 1,
    data:searchResult,
  };
};

const TgtmetaphorSearchWithType = async (phrase,type) => {
  const hits = [];
  var size = 50;
  
  const searchResult = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "Metaphors",
            query: {
              bool: {
                must: [
                  { match: { "Metaphors.Target": phrase }},
                  { match_phrase: { "metaphors.type":  type}} 
                ]
              }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

  return {
    success: 1,
    data:searchResult,
  };
};

const withPartialSrc = async (phrase) => {
  const hits = [];
  const searchResult = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        query: {
          nested: {
            path: "Metaphors",
            query: {
              match_bool_prefix: { "Metaphors.Source": phrase }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

    if (searchResult.hits.total.value<1){
      out={
        success: 1,
        data:[],
      };
    }
    else{
      out_list=[];
      obj_list=searchResult.hits.hits;

      for (let i = 0; i < obj_list.length; i++) {
        obj=obj_list[i];
        met_obj=obj.inner_hits.Metaphors.hits.hits[0];
        out_list.push(met_obj._source.Source);
      }
      uniqe_list=[... new Set(out_list)]
      out={
        success: 1,
        data:uniqe_list,
      };
    }
  return out;
};

const withPartialTget = async (phrase) => {
  const hits = [];
  const searchResult = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        query: {
          nested: {
            path: "Metaphors",
            query: {
              match_bool_prefix: { "Metaphors.Target": phrase }
            },
            inner_hits: { 
            }
          }
        },
      },
    })

    if (searchResult.hits.total.value<1){
      out={
        success: 1,
        data:[],
      };
    }
    else{
      out_list=[];
      obj_list=searchResult.hits.hits;

      for (let i = 0; i < obj_list.length; i++) {
        obj=obj_list[i];
        met_obj=obj.inner_hits.Metaphors.hits.hits[0];
        out_list.push(met_obj._source.Target);
      }
      uniqe_list=[... new Set(out_list)]
      out={
        success: 1, 
        data:uniqe_list,
      };
    }
  return out;
};

const searchByOtherFileds = async (field, phrase) => {
  var size = 50;
  query_obj = {};
  query_obj[field] = phrase;

  const result = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query:  {
          match: query_obj,
        },
      },
    })


    console.log(result.hits.hits.length)

  return {
    success: 1,
    data:result,
  };
};

const searchByMetaphorsMeaning = async (phrase) => {
  var size = 50;

  const result = await client
    .search({
      index: "sinhalasongsdata",
      _source_includes:"Title_En,Title_Si,Artist_En,Artist_Si,Year,Lyricist_En,Lyricist_Si,Lyrics",
      body: {
        size: size,
        query: {
          nested: {
            path: "Metaphors",
            query: {
              match: { "Metaphors.Metaphor": phrase }
            },
            inner_hits: { 
            }
          }
        },
      },
    })


    console.log(result.hits.hits.length)

  return {
    success: 1,
    data:result,
  };
};


module.exports = {
  metaphorSrcSearch,
  // SrcmetaphorSearchWithType,
  metaphorTgetSearch,
  // TgtmetaphorSearchWithType,
  withPartialSrc,
  withPartialTget,
  searchByOtherFileds
};