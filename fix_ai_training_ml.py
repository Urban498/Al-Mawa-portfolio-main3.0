# -*- coding: utf-8 -*-
import json

# Read the Malayalam file
with open('messages/ml.json', 'r', encoding='utf-8') as f:
    ml_data = json.load(f)

# Add the missing training service to aiServicesPage
ml_data["aiServicesPage"]["services"]["training"] = {
    "title": "AI പരിശീലനവും വിദ്യാഭ്യാസവും",
    "description": "നിങ്ങളുടെ ടീമിനെ AI സാങ്കേതികവിദ്യകളും മികച്ച രീതികളും ഉപയോഗിച്ച് ശാക്തീകരിക്കുന്നതിനുള്ള സമഗ്ര പരിശീലന പരിപാടികള്",
    "feature1": "AI അടിസ്ഥാനകാര്യങ്ങള്",
    "feature2": "മെഷീന് ലേണിംഗ് വര്ക്ക്ഷോപ്പുകള്",
    "feature3": "ഹാന്ഡ്സ്-ഓണ് പരിശീലനം",
    "feature4": "സര്ട്ടിഫിക്കേഷന് പ്രോഗ്രാമുകള്"
}

# Write back to file
with open('messages/ml.json', 'w', encoding='utf-8') as f:
    json.dump(ml_data, f, ensure_ascii=False, indent=2)

print("✅ SUCCESS!")
print("✅ Added missing AI training service!")
print("✅ All 6 errors should be fixed now!")
