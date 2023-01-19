import json

f = open('corpus.json', encoding="utf8")

A = json.load(f)

B=[]
for i in A:
    metaphors=[{
        "Metaphor":i["Metaphor1"],
        "Meaning":i["Meaning1"],
        "Source":i["Source1"],
        "Target":i["Target1"],
        }]
    if i["Metaphor2"] != "":
        metaphors.append({
            "Metaphor":i["Metaphor2"],
            "Meaning":i["Meaning2"],
            "Source":i["Source2"],
            "Target":i["Target2"],
            })
    
    j = {
           "Title_En": i["Title_En"],
           "Title_Si": i["Title_Si"],
           "Artist_En": i["Artist_En"],
           "Artist_Si": i["Artist_Si"],
           "Year": i["Year"],
           "Lyricist_En": i["Lyricist_En"],
           "Lyricist_Si":i["Lyricist_Si"],
           "Lyrics": i["Lyrics"],
           "Metaphors": metaphors
        }
    B.append({"index": {"_index": "sinhalasongsdata"}})
    B.append(j)
print(B)

jsonFile = open("index.json", "a",encoding="utf8")
for i in B:
    jsonString = json.dumps(i,ensure_ascii=False)
    jsonFile.write(jsonString+'\n')
    
jsonFile.close()



