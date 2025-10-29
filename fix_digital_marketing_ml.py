# -*- coding: utf-8 -*-
import json

# Read the Malayalam file
with open('messages/ml.json', 'r', encoding='utf-8') as f:
    ml_data = json.load(f)

# Add the missing sections to digitalMarketingPage
ml_data["digitalMarketingPage"]["stats"] = {
    "emailUsers": {
        "metric": "4.1 ബില്യന്",
        "description": "ലോകമെമ്പാടുമുള്ള ഇമെയില് ഉപയോക്താക്കള്"
    },
    "whatsappUsers": {
        "metric": "2+ ബില്യന്",
        "description": "വാട്സാപ്പ് സജീവ ഉപയോക്താക്കള്"
    },
    "smsOpenRate": {
        "metric": "98%",
        "description": "SMS തുറക്കുന്ന നിരക്ക്"
    },
    "emailROI": {
        "metric": "4200%",
        "description": "ഇമെയില് മാര്ക്കറ്റിംഗിനുള്ള ശരാശരി ROI"
    }
}

ml_data["digitalMarketingPage"]["services"] = {
    "email": {
        "title": "ഇമെയില് മാര്ക്കറ്റിംഗ് സേവനങ്ങള്",
        "description": "നിങ്ങളുടെ പ്രേക്ഷകരെ ഇടപഴകുകയും പരിവര്ത്തനങ്ങള് വര്ദ്ധിപ്പിക്കുകയും ചെയ്യുന്ന പ്രൊഫഷണല് ഇമെയില് കാമ്പെയിനുകള്",
        "feature1": "കാമ്പെയിന് ഡിസൈന്",
        "feature2": "ഓട്ടോമേറ്റഡ് സീക്വന്സുകള്",
        "feature3": "A/B ടെസ്റ്റിംഗ്",
        "feature4": "പ്രകടന വിശകലനം"
    },
    "whatsapp": {
        "title": "വാട്സാപ്പ് മാര്ക്കറ്റിംഗ് സേവനങ്ങള്",
        "description": "വ്യക്തിഗത സന്ദേശങ്ങളുമായി വാട്സാപ്പ് ബിസിനസ് വഴി നേരിട്ടുള്ള ഉപഭോക്തൃ ഇടപെടല്",
        "feature1": "ബിസിനസ് API സെറ്റപ്പ്",
        "feature2": "ബ്രോഡ്കാസ്റ്റ് സന്ദേശങ്ങള്",
        "feature3": "ഉപഭോക്തൃ പിന്തുണ",
        "feature4": "ഓട്ടോമേറ്റഡ് പ്രതികരണങ്ങള്"
    },
    "sms": {
        "title": "SMS മാര്ക്കറ്റിംഗ് സേവനങ്ങള്",
        "description": "സമയ-സെന്സിറ്റീവ് പ്രമോഷനുകള്ക്കും അപ്ഡേറ്റുകള്ക്കുമായി ടാര്ഗെറ്റഡ് SMS കാമ്പെയിനുകളുമായി തൽക്ഷണ എത്തിച്ചേരല്",
        "feature1": "ബള്ക്ക് SMS കാമ്പെയിനുകള്",
        "feature2": "വ്യക്തിഗത സന്ദേശങ്ങള്",
        "feature3": "ഡെലിവറി റിപ്പോര്ട്ടുകള്",
        "feature4": "ഓപ്റ്റ്-ഇന് മാനേജ്മെന്റ്"
    },
    "omnichannel": {
        "title": "ഓമ്നിചാനല് സംയോജനം",
        "description": "സ്ഥിരമായ ഉപഭോക്തൃ അനുഭവത്തിനായി എല്ലാ മാര്ക്കറ്റിംഗ് ചാനലുകളിലും തടസ്സമില്ലാത്ത സംയോജനം",
        "feature1": "ക്രോസ്-പ്ലാറ്റ്ഫോം കാമ്പെയിനുകള്",
        "feature2": "ഏകീകൃത അനലിറ്റിക്സ്",
        "feature3": "ഉപഭോക്തൃ യാത്ര മാപ്പിംഗ്",
        "feature4": "സമന്വയിപ്പിച്ച സന്ദേശമയയ്ക്കല്"
    },
    "benefits": {
        "title": "ഇമെയില്, വാട്സാപ്പ് & SMS മാര്ക്കറ്റിംഗിന്റെ നേട്ടങ്ങള്",
        "description": "ബിസിനസ് വളര്ച്ചയ്ക്കുള്ള മള്ട്ടി-ചാനല് മാര്ക്കറ്റിംഗ് സമീപനത്തിന്റെ സമഗ്ര നേട്ടങ്ങള്",
        "feature1": "ഉയര്ന്ന ഇടപെടല്",
        "feature2": "നേരിട്ടുള്ള ആശയവിനിമയം",
        "feature3": "ചെലവ്-ഫലപ്രദം",
        "feature4": "അളക്കാവുന്ന ഫലങ്ങള്"
    }
}

ml_data["digitalMarketingPage"]["benefit1"] = "ഉപഭോക്താക്കളുമായി അവരുടെ ഇഷ്ടപ്പെട്ട ചാനലുകള് വഴി നേരിട്ടുള്ള ആശയവിനിമയം"
ml_data["digitalMarketingPage"]["benefit2"] = "പരമ്പരാഗത പരസ്യങ്ങളുമായി താരതമ്യപ്പെടുത്തുമ്പോള് ഉയര്ന്ന ഇടപെടല് നിരക്കുകള്"
ml_data["digitalMarketingPage"]["benefit3"] = "അളക്കാവുന്ന ROI ഉള്ള ചെലവ്-ഫലപ്രദമായ മാര്ക്കറ്റിംഗ്"
ml_data["digitalMarketingPage"]["benefit4"] = "ഉപഭോക്തൃ പെരുമാറ്റത്തെയും മുന്ഗണനകളെയും അടിസ്ഥാനമാക്കിയുള്ള വ്യക്തിഗത സന്ദേശമയയ്ക്കല്"
ml_data["digitalMarketingPage"]["benefit5"] = "തത്സമയ ഡെലിവറിയും തൽക്ഷണ ഉപഭോക്തൃ ഫീഡ്ബാക്കും"
ml_data["digitalMarketingPage"]["benefit6"] = "സമയം ലാഭിക്കുകയും കാര്യക്ഷമത വര്ദ്ധിപ്പിക്കുകയും ചെയ്യുന്ന ഓട്ടോമേറ്റഡ് കാമ്പെയിനുകള്"
ml_data["digitalMarketingPage"]["benefit7"] = "കാമ്പെയിന് ഒപ്റ്റിമൈസേഷനായി വിശദമായ അനലിറ്റിക്സും റിപ്പോര്ട്ടിംഗും"
ml_data["digitalMarketingPage"]["benefit8"] = "പതിവ് ഇടപെടലിലൂടെ വര്ദ്ധിച്ച ഉപഭോക്തൃ നിലനിര്ത്തല്"
ml_data["digitalMarketingPage"]["benefit9"] = "പ്രാദേശിക വ്യക്തിഗതമാക്കല് കഴിവുകളുള്ള ആഗോള വ്യാപ്തി"
ml_data["digitalMarketingPage"]["benefit10"] = "നിലവിലുള്ള CRM, മാര്ക്കറ്റിംഗ് ഉപകരണങ്ങളുമായി സംയോജനം"

# Write back to file
with open('messages/ml.json', 'w', encoding='utf-8') as f:
    json.dump(ml_data, f, ensure_ascii=False, indent=2)

print("✅ SUCCESS!")
print("✅ Added missing digitalMarketingPage sections!")
print("✅ - stats (4 items)")
print("✅ - services (5 services)")
print("✅ - benefits (10 benefits)")
print("✅ All errors should be fixed now!")
