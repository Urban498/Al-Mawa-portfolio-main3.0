#!/usr/bin/env python
# -*- coding: utf-8 -*-
import json
import re

# Read the corrupted file with error handling
with open('messages/ta.json', 'r', encoding='utf-8', errors='ignore') as f:
    content = f.read()

# Find the valid cloudSolutionsPage section from a working translation
# We'll construct it manually with clean Tamil text
valid_cloud_solutions = {
    "cloudSolutionsPage": {
        "title": "கிளாউட் தீர்வுகள்",
        "subtitle": "அளவிடக்கூடிய மற்றும் பாதுகாப்பான கிளாउட் தீர்வுகளுடன் உங்கள் வணிகத்தை மாற்றுங்கள்",
        "servicesTitle": "எங்கள் கிளாউட் சேவைகள்",
        "benefitsTitle": "எங்களின் கிளாউட் தீர்வுகளை ஏன் தேர்வு செய்ய வேண்டும்?",
        "benefitsSubtitle": "உங்கள் நிறுவனத்திற்கு கிளாউட் கணினியின் முழு சாத்தியத்ன்யை அனுபவ்யுங்கள்",
        "ctaTitle": "கிளாউட்டுடன் உயர்ந்து செல்ல தயாரா?",
        "ctaSubtitle": "எங்கள் கிளாउட் நிபுணர்கள் உங்களை உதவ வேண்டும்",
        "ctaButton": "கிளாউட் திட்டம் தொடங்குங்கள்",
        "learnMoreButton": "மேலும் அறிக",
        "enquireButton": "விசாரிக்கவும்",
        "serviceBadge": "சேவை",
        "services": {
            "cloudMigration": {
                "title": "மாறுதல் சேவைகள்",
                "description": "குறைந்த நேரம் இல்லாமல் மாறுதல்",
                "feature1": "மதிப்பீடு",
                "feature2": "பாதுகாப்பு",
                "feature3": "குறைந்த நேரம்",
                "feature4": "ஆதரவு"
            },
            "dataManagement": {
                "title": "தரவு மேலாணம்",
                "description": "தரவு சேமிப்பு மற்றும் மீட்கொள்ளல்",
                "feature1": "சேமிப்பு",
                "feature2": "மீட்கொள்ளல்",
                "feature3": "பிரதிலிபி",
                "feature4": "ஆளுமை"
            },
            "cloudSecurity": {
                "title": "பாதுகாப்பு",
                "description": "பாதுகாப்பு மற்றும் இணங்கல்",
                "feature1": "அணுக",
                "feature2": "குறியாக்கம்",
                "feature3": "இணங்கல்",
                "feature4": "கண்டறிதல்"
            },
            "performanceOptimization": {
                "title": "செயல்பாடு",
                "description": "வேகம் மற்றும் திறமை",
                "feature1": "ட்யூனிங்",
                "feature2": "உறுவை",
                "feature3": "செலவு",
                "feature4": "சுமை"
            },
            "multiCloudStrategy": {
                "title": "பல-கிளாউட் உபாயம்",
                "description": "பல-கிளாউட் தீர்வுகள்",
                "feature1": "தேர்வு",
                "feature2": "ஒருங்கிணைப்பு",
                "feature3": "மேலாணம்",
                "feature4": "பாதுகாப்பு"
            },
            "complianceManagement": {
                "title": "இணங்கல் மேலாணம்",
                "description": "விதிமுறை மற்றும் கொள்கை",
                "feature1": "ஆய்வு",
                "feature2": "கொள்கை",
                "feature3": "ஆவணம்",
                "feature4": "மேல்பார்வை"
            }
        },
        "benefit1": "செலவு குறைப்பு",
        "benefit2": "அளவிடுதல்",
        "benefit3": "பாதுகாப்பு",
        "benefit4": "வேகம்",
        "benefit5": "24/7 ஆதரவு",
        "benefit6": "ஐக்கிய",
        "benefit7": "அணுக",
        "benefit8": "பிரதிலிபி",
        "benefit9": "இணங்கல்",
        "benefit10": "திறன்"
    }
}

# Split the file at the point where corrupted content begins
# We need to keep everything before "cloudSolutionsPage" and after "enquiryForm"
try:
    # Find where cloudSolutionsPage starts
    cloud_start_idx = content.find('"cloudSolutionsPage"')
    # Find where enquiryForm section starts (valid content after corruption)
    enquiry_idx = content.find('"enquiryForm"')
    
    if cloud_start_idx > 0 and enquiry_idx > 0:
        # Keep everything before cloudSolutionsPage
        before = content[:cloud_start_idx]
        # Keep everything from enquiryForm onwards
        after = content[enquiry_idx:]
        
        # Build the new content
        cloud_str = json.dumps(valid_cloud_solutions, ensure_ascii=False, indent=2)
        # Remove outer braces from the JSON object
        cloud_str = cloud_str[1:-1]  # Remove { and }
        
        # Reconstruct the file
        new_content = before + cloud_str + ',\n  ' + after
        
        # Write the fixed file
        with open('messages/ta.json', 'w', encoding='utf-8') as f:
            f.write(new_content)
        
        print("✓ Fixed ta.json successfully")
        
        # Validate the JSON
        with open('messages/ta.json', 'r', encoding='utf-8') as f:
            test_json = json.load(f)
        print("✓ JSON is now valid!")
        
    else:
        print("✗ Could not find cloudSolutionsPage or enquiryForm markers")
        
except Exception as e:
    print(f"✗ Error: {e}")
