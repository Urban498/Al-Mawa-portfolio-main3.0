import json

# Read the current kn.json file
with open('messages/kn.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

# Digital Marketing Page translations
digital_marketing = {
    "title": "ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್",
    "subtitle": "ಶಕ್ತಿಶಾಲಿ ಇಮೇಲ್, ವಾಟ್ಸಾಪ್ ಮತ್ತು SMS ಮಾರ್ಕೆಟಿಂಗ್ ಅಭಿಯಾನಗಳ ಮೂಲಕ ನಿಮ್ಮ ಗ್ರಾಹಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ. ನಮ್ಮ ಸಂಯೋಜಿತ ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್ ಪರಿಹಾರಗಳೊಂದಿಗೆ ತೊಡಗಿಸಿಕೊಳ್ಳುವಿಕೆಯನ್ನು ಹೆಚ್ಚಿಸಿ ಮತ್ತು ಪರಿವರ್ತನೆಗಳನ್ನು ಹೆಚ್ಚಿಸಿ.",
    "statsTitle": "ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡುವ ಮಾರ್ಕೆಟಿಂಗ್",
    "servicesTitle": "ನಮ್ಮ ಡಿಜಿಟಲ್ ಮಾರ್ಕೆಟಿಂಗ್ ಸೇವೆಗಳು",
    "servicesSubtitle": "ಅನೇಕ ಚಾನೆಲ್‌ಗಳಲ್ಲಿ ಸಮಗ್ರ ಮಾರ್ಕೆಟಿಂಗ್ ಪರಿಹಾರಗಳು",
    "benefitsTitle": "ಇಮೇಲ್, ವಾಟ್ಸಾಪ್ ಮತ್ತು SMS ಮಾರ್ಕೆಟಿಂಗ್‌ನ ಪ್ರಯೋಜನಗಳು",
    "benefitsSubtitle": "ನಿಮ್ಮ ವ್ಯಾಪಾರ ಬೆಳವಣಿಗೆಗೆ ಬಹು-ಚಾನೆಲ್ ಮಾರ್ಕೆಟಿಂಗ್ ಏಕೆ ಅತ್ಯಗತ್ಯ",
    "ctaTitle": "ನಿಮ್ಮ ಮಾರ್ಕೆಟಿಂಗ್ ಫಲಿತಾಂಶಗಳನ್ನು ಹೆಚ್ಚಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    "ctaSubtitle": "ಶಕ್ತಿಶಾಲಿ ಇಮೇಲ್, ವಾಟ್ಸಾಪ್ ಮತ್ತು SMS ಅಭಿಯಾನಗಳ ಮೂಲಕ ನಿಮ್ಮ ಗ್ರಾಹಕರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಲು ಪ್ರಾರಂಭಿಸಿ. ನಿಜವಾದ ಫಲಿತಾಂಶಗಳನ್ನು ನೀಡುವ ಮಾರ್ಕೆಟಿಂಗ್ ಕಾರ್ಯತಂತ್ರವನ್ನು ರಚಿಸೋಣ.",
    "ctaButton": "ಮಾರ್ಕೆಟಿಂಗ್ ಅಭಿಯಾನ ಪ್ರಾರಂಭಿಸಿ",
    "learnMoreButton": "ನಮ್ಮ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    "enquireButton": "ವಿಚಾರಿಸಿ",
    "serviceBadge": "ಮಾರ್ಕೆಟಿಂಗ್"
}

# Graphic Design Page translations
graphic_design = {
    "title": "ಗ್ರಾಫಿಕ್ ವಿನ್ಯಾಸ",
    "subtitle": "ವೃತ್ತಿಪರ ಬ್ರ್ಯಾಂಡಿಂಗ್ ಮತ್ತು ಗ್ರಾಫಿಕ್ ವಿನ್ಯಾಸ ಸೇವೆಗಳೊಂದಿಗೆ ನಿಮ್ಮ ಬ್ರ್ಯಾಂಡ್ ಅನ್ನು ಜೀವಂತಗೊಳಿಸಿ. ಲೋಗೋಗಳಿಂದ ಸಂಪೂರ್ಣ ಬ್ರ್ಯಾಂಡ್ ಗುರುತುಗಳವರೆಗೆ, ನಾವು ಅದ್ಭುತ ದೃಶ್ಯಗಳನ್ನು ರಚಿಸುತ್ತೇವೆ.",
    "statsTitle": "ದೃಶ್ಯ ವಿನ್ಯಾಸದ ಶಕ್ತಿ",
    "servicesTitle": "ನಮ್ಮ ಗ್ರಾಫಿಕ್ ವಿನ್ಯಾಸ ಸೇವೆಗಳು",
    "servicesSubtitle": "ಸಮಗ್ರ ದೃಶ್ಯ ವಿನ್ಯಾಸ ಮತ್ತು ಬ್ರ್ಯಾಂಡಿಂಗ್ ಪರಿಹಾರಗಳು",
    "benefitsTitle": "ವೃತ್ತಿಪರ ಗ್ರಾಫಿಕ್ ವಿನ್ಯಾಸದ ಪ್ರಯೋಜನಗಳು",
    "benefitsSubtitle": "ಗುಣಮಟ್ಟದ ವಿನ್ಯಾಸ ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಹೇಗೆ ಪರಿವರ್ತಿಸುತ್ತದೆ",
    "ctaTitle": "ನಿಮ್ಮ ಬ್ರ್ಯಾಂಡ್ ಅನ್ನು ಎತ್ತರಕ್ಕೆ ಕೊಂಡೊಯ್ಯಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    "ctaSubtitle": "ನಿಮ್ಮ ಪ್ರೇಕ್ಷಕರೊಂದಿಗೆ ಪ್ರತಿಧ್ವನಿಸುವ ಅದ್ಭುತ ದೃಶ್ಯ ಗುರುತನ್ನು ರಚಿಸೋಣ. ಇಂದೇ ನಮ್ಮ ವಿನ್ಯಾಸ ತಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
    "ctaButton": "ವಿನ್ಯಾಸ ಯೋಜನೆ ಪ್ರಾರಂಭಿಸಿ",
    "learnMoreButton": "ನಮ್ಮ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    "enquireButton": "ವಿಚಾರಿಸಿ",
    "serviceBadge": "ವಿನ್ಯಾಸ"
}

# AI Services Page translations
ai_services = {
    "title": "AI ಸೇವೆಗಳು",
    "subtitle": "ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಶಕ್ತಿಯನ್ನು ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕಾಗಿ ಬಳಸಿಕೊಳ್ಳಿ. ಮೆಷಿನ್ ಲರ್ನಿಂಗ್‌ನಿಂದ ಜನರೇಟಿವ್ AI ವರೆಗೆ, ನಾವು ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಪರಿವರ್ತಿಸುವ ಬುದ್ಧಿವಂತ ಪರಿಹಾರಗಳನ್ನು ರಚಿಸುತ್ತೇವೆ.",
    "servicesTitle": "ನಮ್ಮ AI ಸೇವೆಗಳು",
    "benefitsTitle": "AI ಸೇವೆಗಳ ಪ್ರಯೋಜನಗಳು",
    "benefitsSubtitle": "AI ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಹೇಗೆ ಪರಿವರ್ತಿಸಬಹುದು",
    "ctaTitle": "AI ನೊಂದಿಗೆ ನಿಮ್ಮ ವ್ಯಾಪಾರವನ್ನು ಪರಿವರ್ತಿಸಲು ಸಿದ್ಧರಿದ್ದೀರಾ?",
    "ctaSubtitle": "ನಿಮ್ಮ ವ್ಯಾಪಾರಕ್ಕೆ ಕೃತಕ ಬುದ್ಧಿಮತ್ತೆಯ ಸಾಧ್ಯತೆಗಳನ್ನು ಅನ್ವೇಷಿಸೋಣ. ಇಂದೇ ನಮ್ಮ AI ತಜ್ಞರೊಂದಿಗೆ ಸಂಪರ್ಕ ಸಾಧಿಸಿ.",
    "ctaButton": "AI ಸಲಹೆ ಪಡೆಯಿರಿ",
    "learnMoreButton": "ನಮ್ಮ ಬಗ್ಗೆ ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ",
    "enquireButton": "ವಿಚಾರಿಸಿ",
    "serviceBadge": "AI"
}

# Enquiry Form translations
enquiry_form = {
    "title": "ವಿಚಾರಣೆ ಫಾರ್ಮ್",
    "subtitle": "ನಮ್ಮೊಂದಿಗೆ ಸಂಪರ್ಕದಲ್ಲಿರಿ",
    "name": "ಪೂರ್ಣ ಹೆಸರು",
    "email": "ಇಮೇಲ್ ವಿಳಾಸ",
    "phone": "ದೂರವಾಣಿ ಸಂಖ್ಯೆ",
    "company": "ಕಂಪನಿ ಹೆಸರು",
    "service": "ಸೇವೆ ಆಸಕ್ತಿ",
    "message": "ಸಂದೇಶ",
    "submit": "ವಿಚಾರಣೆ ಸಲ್ಲಿಸಿ",
    "sending": "ಕಳುಹಿಸಲಾಗುತ್ತಿದೆ...",
    "selectService": "ಸೇವೆಯನ್ನು ಆಯ್ಕೆಮಾಡಿ",
    "namePlaceholder": "ನಿಮ್ಮ ಪೂರ್ಣ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    "emailPlaceholder": "ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸವನ್ನು ನಮೂದಿಸಿ",
    "phonePlaceholder": "ನಿಮ್ಮ ದೂರವಾಣಿ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ",
    "companyPlaceholder": "ನಿಮ್ಮ ಕಂಪನಿ ಹೆಸರನ್ನು ನಮೂದಿಸಿ",
    "messagePlaceholder": "ನಿಮ್ಮ ಸಂದೇಶವನ್ನು ನಮೂದಿಸಿ",
    "successTitle": "ಯಶಸ್ವಿಯಾಗಿ ಕಳುಹಿಸಲಾಗಿದೆ!",
    "successMessage": "ನಿಮ್ಮ ವಿಚಾರಣೆಯನ್ನು ಸ್ವೀಕರಿಸಲಾಗಿದೆ. ನಾವು ಶೀಘ್ರದಲ್ಲೇ ನಿಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸುತ್ತೇವೆ.",
    "errorTitle": "ದೋಷ!",
    "errorMessage": "ಏನೋ ತಪ್ಪಾಗಿದೆ. ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ."
}

# Careers Page translations
careers = {
    "title": "ವೃತ್ತಿಜೀವನ",
    "subtitle": "ಅಲ್ ಮಾವಾ ಇಂಟರ್ನ್ಯಾಷನಲ್‌ನಲ್ಲಿ ನಮ್ಮ ತಂಡಕ್ಕೆ ಸೇರಿ",
    "openPositions": "ತೆರೆದ ಹುದ್ದೆಗಳು",
    "applyNow": "ಈಗ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
    "viewDetails": "ವಿವರಗಳನ್ನು ವೀಕ್ಷಿಸಿ",
    "location": "ಸ್ಥಳ",
    "type": "ಪ್ರಕಾರ",
    "experience": "ಅನುಭವ",
    "noOpenings": "ಪ್ರಸ್ತುತ ಯಾವುದೇ ತೆರೆದ ಹುದ್ದೆಗಳಿಲ್ಲ",
    "checkBack": "ದಯವಿಟ್ಟು ನಂತರ ಮತ್ತೆ ಪರಿಶೀಲಿಸಿ"
}

# Update the data
data['digitalMarketingPage'] = digital_marketing
data['graphicDesignPage'] = graphic_design
data['aiServicesPage'] = ai_services
data['enquiryForm'] = enquiry_form
data['careers'] = careers

# Write back to file
with open('messages/kn.json', 'w', encoding='utf-8') as f:
    json.dump(data, f, ensure_ascii=False, indent=2)

print("✅ Remaining sections translated to Kannada successfully!")
print("   - Digital Marketing Page")
print("   - Graphic Design Page")
print("   - AI Services Page")
print("   - Enquiry Form")
print("   - Careers Page")
