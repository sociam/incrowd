
// List of stopwords for NLP methods and object to keep score

stopwords = {

  score: function(str){

    var s = str;

    var en = _.difference(s, stopwords.english).length / s.length;
    var fr = _.difference(s, stopwords.french).length / s.length;

    console.log(en, fr);

  },

  french: ["alors","au","aucuns","aussi","autre","avant","avec","avoir","bon","car","ce","cela","ces","ceux","chaque","ci","comme",
    "comment","dans","des","du","dedans","dehors","depuis","devrait","doit","donc","dos","début","elle","elles","en","encore","essai","est",
    "et","eu","fait","faites","fois","font","hors","ici","il","ils","je	juste","la","le","les","leur","là","ma","maintenant","mais","mes",
    "mine","moins","mon","mot","même","ni","nommés","notre","nous","ou","où","par","parce","pas","peut","peu","plupart","pour","pourquoi",
    "quand","que","quel","quelle","quelles","quels","qui","sa","sans","ses","seulement","si","sien","son","sont","sous","soyez","sujet",
    "sur","ta","tandis","tellement","tels","tes","ton","tous","tout","trop","très","tu","voient","vont","votre","vous","vu","ça","étaient",
    "état","étions","été","être"],

  english:["a","about","above","after","again","against","all","am","an","and","any","are","aren't","as","at","be","because","been","before",
    "being","below","between","both","but","by","can't","cannot","could","couldn't","did","didn't","do","does","doesn't","doing","don't","down",
    "during","each","few","for","from","further","had","hadn't","has","hasn't","have","haven't","having","he","he'd","he'll","he's","her","here",
    "here's","hers","herself","him","himself","his","how","how's","i","i'd","i'll","i'm","i've","if","in","into","is","isn't","it","it's","its",
    "itself","let's","me","more","most","mustn't","my","myself","no","nor","not","of","off","on","once","only","or","other","ought","our","ours",
    "ourselves","out","over","own","same","shan't","she","she'd","she'll","she's","should","shouldn't","so","some","such","than","that","that's",
    "the","their","theirs","them","themselves","then","there","there's","these","they","they'd","they'll","they're","they've","this","those","through",
    "to","too","under","until","up","very","was","wasn't","we","we'd","we'll","we're","we've","were","weren't","what","what's","when","when's","where",
    "where's","which","while","who","who's","whom","why","why's","with","won't","would","wouldn't","you","you'd","you'll","you're","you've","your","yours",
    "yourself","yourselves"]
};
