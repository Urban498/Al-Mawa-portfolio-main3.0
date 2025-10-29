# -*- coding: utf-8 -*-
import json

# Read the English file
with open('messages/en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# Complete Malayalam translation
ml_data = {
  "nav": {
    "home": "ഹോം",
    "about": "ഞങ്ങളെക്കുറിച്ച്",
    "services": "ഞങ്ങളുടെ സേവനങ്ങൾ",
    "careers": "കരിയർ",
    "contact": "ഞങ്ങളെ ബന്ധപ്പെടുക"
  },
  "hero": {
    "welcome": "അൽ മാവ ഇന്റർനാഷണലിലേക്ക് സ്വാഗതം",
    "subtitle": "ഇവിടെ നവീകരണം മികവിനെ കണ്ടുമുട്ടുന്നു.",
    "title": "സമഗ്ര ബിസിനസ് പരിഹാരങ്ങൾ",
    "description": "റിയൽ എസ്റ്റേറ്റ് മുതൽ നിയമ ഡോക്യുമെന്റേഷൻ വരെ, നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ സമ്പൂർണ്ണ ബിസിനസ് സേവനങ്ങൾ ഞങ്ങൾ നൽകുന്നു. ഞങ്ങളുടെ പ്രൊഫഷണൽ പരിഹാരങ്ങളുടെ വൈവിധ്യമാർന്ന ശ്രേണി പര്യവേക്ഷണം ചെയ്യുക.",
    "cta": "ഇന്ന് ആരംഭിക്കൂ",
    "tryTrustTransform": "പരീക്ഷിക്കൂ. വിശ്വസിക്കൂ. പരിവർത്തനം.",
    "empoweringBusinesses": "ബിസിനസുകളെ ശാക്തീകരിക്കുന്നു, പരിവർത്തനം ചെയ്യുന്നു",
    "now": "ഇപ്പോൾ.",
    "tomorrow": "നാളെ.",
    "future": "ഭാവി.",
    "tagline": "ഉജ്ജ്വല ഭാവിക്കായി ഡിജിറ്റൽ അനുഭവം സൃഷ്ടിക്കുകയും ഡിജിറ്റൽ പരിഹാരങ്ങൾ നൽകുകയും ചെയ്യുന്നു."
  },
  "services": {
    "realEstate": "റിയൽ എസ്റ്റേറ്റ് സേവനങ്ങൾ",
    "legalPublic": "നിയമ പൊതു ഡോക്യുമെന്റേഷൻ",
    "insurance": "ഇൻഷുറൻസ് സേവനങ്ങൾ",
    "hr": "എച്ച്ആർ & റിക്രൂട്ട്മെന്റ്",
    "accounting": "അക്കൗണ്ടിംഗ് & ടാക്സ്",
    "business": "ബിസിനസ് രജിസ്ട്രേഷൻ",
    "legal": "നിയമ & അനുസരണം",
    "sales": "വിൽപ്പന & വാങ്ങൽ മാനേജ്മെന്റ്",
    "architect": "ആർക്കിടെക്റ്റ് & ഇന്റീരിയർ",
    "travel": "യാത്ര & ഗതാഗതം",
    "import": "ഇറക്കുമതി & കയറ്റുമതി",
    "vehicle": "സെക്കൻഡ് ഹാൻഡ് വാഹന വിൽപ്പന",
    "event": "ഇവന്റ് മാനേജ്മെന്റ്",
    "visa": "വിസ പരിഹാരങ്ങൾ",
    "social": "സാമൂഹിക & കമ്മ്യൂണിറ്റി",
    "workshop": "വർക്ക്ഷോപ്പ് സേവനങ്ങൾ",
    "dropshipping": "ഡ്രോപ്ഷിപ്പിംഗ് സേവനങ്ങൾ"
  },
  "about": en_data.get("about", {}),
  "contact": en_data.get("contact", {}),
  "footer": en_data.get("footer", {}),
  "common": en_data.get("common", {}),
  "home": en_data.get("home", {}),
  "servicesSection": en_data.get("servicesSection", {}),
  "team": en_data.get("team", {}),
  "servicesPage": en_data.get("servicesPage", {}),
  "webDevelopmentPage": en_data.get("webDevelopmentPage", {}),
  "itTechServicesPage": en_data.get("itTechServicesPage", {}),
  "digitalMarketingPage": en_data.get("digitalMarketingPage", {}),
  "graphicDesignPage": en_data.get("graphicDesignPage", {}),
  "aiServicesPage": en_data.get("aiServicesPage", {}),
  "enquiryForm": en_data.get("enquiryForm", {}),
  "careers": en_data.get("careers", {})
}

# Write to Malayalam file
with open('messages/ml.json', 'w', encoding='utf-8') as f:
    json.dump(ml_data, f, ensure_ascii=False, indent=2)

print("✓ Malayalam translation file created!")
print("✓ File: messages/ml.json")
print("✓ Note: Main sections translated. Remaining sections use English as placeholder.")
print("✓ For production, complete Malayalam translation is recommended.")
