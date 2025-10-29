import json

# Odia translations
odia_translations = {
    "nav": {
        "home": "ମୁଖ୍ୟ ପୃଷ୍ଠା",
        "about": "ଆମ ବିଷୟରେ",
        "services": "ଆମର ସେବାଗୁଡ଼ିକ",
        "careers": "କ୍ୟାରିୟର",
        "contact": "ଆମକୁ ଯୋଗାଯୋଗ କରନ୍ତୁ"
    },
    "hero": {
        "welcome": "ଅଲ୍ ମାୱା ଇଣ୍ଟରନ୍ୟାସନାଲ୍ କୁ ସ୍ୱାଗତ",
        "subtitle": "ଯେଉଁଠାରେ ନବସୃଜନ ଉତ୍କର୍ଷତାକୁ ଭେଟେ।",
        "title": "ସମ୍ପୂର୍ଣ୍ଣ ବ୍ୟବସାୟ ସମାଧାନ",
        "description": "ରିଅଲ୍ ଏଷ୍ଟେଟ୍ ଠାରୁ ଆଇନଗତ ଡକ୍ୟୁମେଣ୍ଟେସନ୍ ପର୍ଯ୍ୟନ୍ତ, ଆମେ ଆପଣଙ୍କ ଆବଶ୍ୟକତା ଅନୁଯାୟୀ ସମ୍ପୂର୍ଣ୍ଣ ବ୍ୟବସାୟ ସେବା ପ୍ରଦାନ କରୁ। ଆମର ବୃତ୍ତିଗତ ସମାଧାନର ବିବିଧ ପରିସର ଅନ୍ବେଷଣ କରନ୍ତୁ।",
        "cta": "ଆଜି ଆରମ୍ଭ କରନ୍ତୁ",
        "tryTrustTransform": "ପ୍ରୟାସ। ବିଶ୍ୱାସ। ପରିବର୍ତ୍ତନ।",
        "empoweringBusinesses": "ବ୍ୟବସାୟକୁ ସଶକ୍ତ କରିବା, ରୂପାନ୍ତରିତ କରିବା",
        "now": "ବର୍ତ୍ତମାନ।",
        "tomorrow": "ଆସନ୍ତାକାଲି।",
        "future": "ଭବିଷ୍ୟତ।",
        "tagline": "ଉଜ୍ଜ୍ୱଳ ଭବିଷ୍ୟତ ପାଇଁ ଡିଜିଟାଲ୍ ଅନୁଭବ ସୃଷ୍ଟି ଏବଂ ଡିଜିଟାଲ୍ ସମାଧାନ ପ୍ରଦାନ କରିବା।"
    }
}

# Read the English file
with open('messages/or.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Update with Odia translations
data.update(odia_translations)

# Write back
with open('messages/or.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("Odia translation file created successfully!")
