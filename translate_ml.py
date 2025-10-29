import json

# Malayalam translations mapping
ml_translations = {
    # Navigation
    "ಮುಖಪುಟ": "ഹോം",
    "ನಮ್ಮ ಬಗ್ಗೆ": "ഞങ്ങളെക്കുറിച്ച്",
    "ನಮ್ಮ ಸೇವೆಗಳು": "ഞങ്ങളുടെ സേവനങ്ങൾ",
    "ವೃತ್ತಿ": "കരിയർ",
    "ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ": "ഞങ്ങളെ ബന്ധപ്പെടുക",
    
    # Hero section
    "ಅಲ್ ಮಾವಾ ಇಂಟರ್ನ್ಯಾಷನಲ್ ಗೆ ಸ್ವಾಗತ": "അൽ മാവ ഇന്റർനാഷണലിലേക്ക് സ്വാഗതം",
    "ಇಲ್ಲಿ ನಾವೀನ್ಯತೆ ಉತ್ಕೃಷ್ಟತೆಯನ್ನು ಭೇಟಿಯಾಗುತ്ತದೆ.": "ഇവിടെ നവീകരണം മികവിനെ കണ്ടുമുട്ടുന്നു.",
    "ಸಮಗ್ರ ವ್ಯಾಪಾರ ಪರಿಹಾರಗಳು": "സമഗ്ര ബിസിനസ് പരിഹാരങ്ങൾ",
    "ರಿಯಲ್ ಎಸ್ಟೇಟ್‌ನಿಂದ ಕಾನೂನು ದಾಖಲಾತಿಗಳವರೆಗೆ, ನಿಮ್ಮ ಅಗತ್ಯಗಳಿಗೆ ಅನುಗುಣವಾಗಿ ನಾವು ಸಂಪೂರ್ಣ ವ್ಯಾಪಾರ ಸೇವೆಗಳನ್ನು ಒದಗಿಸುತ್ತೇವೆ. ನಮ್ಮ ವೃತ್ತಿಪರ ಪರಿಹಾರಗಳ ವೈವಿಧ್ಯಮಯ ಶ್ರೇಣಿಯನ್ನು ಅನ್ವೇಷಿಸಿ.": "റിയൽ എസ്റ്റേറ്റ് മുതൽ നിയമ ഡോക്യുമെന്റേഷൻ വരെ, നിങ്ങളുടെ ആവശ്യങ്ങൾക്ക് അനുയോജ്യമായ സമ്പൂർണ്ണ ബിസിനസ് സേവനങ്ങൾ ഞങ്ങൾ നൽകുന്നു. ഞങ്ങളുടെ പ്രൊഫഷണൽ പരിഹാരങ്ങളുടെ വൈവിധ്യമാർന്ന ശ്രേണി പര്യവേക്ഷണം ചെയ്യുക.",
    "ಇಂದೇ ಪ್ರಾರಂಭಿಸಿ": "ഇന്ന് ആരംഭിക്കൂ",
    "ಪ್ರಯತ್ನಿಸಿ. ನಂಬಿಕೆ. ಪರಿವರ್ತನೆ.": "പരീക്ഷിക്കൂ. വിശ്വസിക്കൂ. പരിവർത്തനം.",
    "ವ್ಯಾಪಾರಗಳನ್ನು ಸಬಲೀಕರಣಗೊಳಿಸುವುದು, ಪರಿವರ್ತಿಸುವುದು": "ബിസിനസുകളെ ശാക്തീകരിക്കുന്നു, പരിവർത്തനം ചെയ്യുന്നു",
    "ಈಗ.": "ഇപ്പോൾ.",
    "ನಾಳೆ.": "നാളെ.",
    "ಭವಿಷ್ಯ.": "ഭാവി.",
    "ಉಜ್ವಲ ಭವಿಷ್ಯಕ್ಕಾಗಿ ಡಿಜಿಟಲ್ ಅನುಭವವನ್ನು ರಚಿಸುವುದು ಮತ್ತು ಡಿಜಿಟಲ್ ಪರಿಹಾರಗಳನ್ನು ತಿಳಿಸುವುದು.": "ഉജ്ജ്വല ഭാവിക്കായി ഡിജിറ്റൽ അനുഭവം സൃഷ്ടിക്കുകയും ഡിജിറ്റൽ പരിഹാരങ്ങൾ നൽകുകയും ചെയ്യുന്നു.",
}

# Read the Kannada file
with open('messages/kn.json', 'r', encoding='utf-8') as f:
    kn_data = json.load(f)

# Function to recursively replace Kannada text with Malayalam
def translate_dict(obj):
    if isinstance(obj, dict):
        return {k: translate_dict(v) for k, v in obj.items()}
    elif isinstance(obj, list):
        return [translate_dict(item) for item in obj]
    elif isinstance(obj, str):
        # Replace with Malayalam if mapping exists, otherwise keep original
        return ml_translations.get(obj, obj)
    else:
        return obj

# Translate the data
ml_data = translate_dict(kn_data)

# Write to Malayalam file
with open('messages/ml.json', 'w', encoding='utf-8') as f:
    json.dump(ml_data, f, ensure_ascii=False, indent=2)

print("Malayalam translation file created successfully!")
