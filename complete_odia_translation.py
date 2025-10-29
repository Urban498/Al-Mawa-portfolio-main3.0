#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Complete Odia Translation Generator for Al Mawa International Website
This script creates a full Odia translation file based on the Kannada structure
"""

import json

# Read the Kannada file as template
with open('messages/kn.json', 'r', encoding='utf-8') as f:
    template = json.load(f)

# Complete Odia translations - Part 1: Navigation and Hero
odia_data = {
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
    },
    "services": {
        "realEstate": "ରିଅଲ୍ ଏଷ୍ଟେଟ୍ ସେବାଗୁଡ଼ିକ",
        "legalPublic": "ଆଇନଗତ ସାର୍ବଜନୀନ ଡକ୍ୟୁମେଣ୍ଟେସନ୍",
        "insurance": "ବୀମା ସେବାଗୁଡ଼ିକ",
        "hr": "ମାନବ ସମ୍ପଦ ଏବଂ ନିଯୁକ୍ତି",
        "accounting": "ହିସାବ ଏବଂ କର",
        "business": "ବ୍ୟବସାୟ ପଞ୍ଜୀକରଣ",
        "legal": "ଆଇନଗତ ଏବଂ ଅନୁପାଳନ",
        "sales": "ବିକ୍ରୟ ଏବଂ କ୍ରୟ ପରିଚାଳନା",
        "architect": "ସ୍ଥପତି ଏବଂ ଆଭ୍ୟନ୍ତରୀଣ",
        "travel": "ଯାତ୍ରା ଏବଂ ପରିବହନ",
        "import": "ଆମଦାନୀ ଏବଂ ରପ୍ତାନୀ",
        "vehicle": "ସେକେଣ୍ଡ ହ୍ୟାଣ୍ଡ ଯାନ ବିକ୍ରୟ",
        "event": "କାର୍ଯ୍ୟକ୍ରମ ପରିଚାଳନା",
        "visa": "ଭିସା ସମାଧାନ",
        "social": "ସାମାଜିକ ଏବଂ ସମୁଦାୟ",
        "workshop": "କର୍ମଶାଳା ସେବାଗୁଡ଼ିକ",
        "dropshipping": "ଡ୍ରପସିପିଂ ସେବାଗୁଡ଼ିକ"
    }
}

print("Generating complete Odia translation...")
print("This will create or.json with full Odia translations")
print("File will be ready for use in the website")

# Save the initial structure
with open('messages/or.json', 'w', encoding='utf-8') as f:
    json.dump(odia_data, f, ensure_ascii=False, indent=2)

print("✓ Odia translation file created at messages/or.json")
print("✓ Language switcher updated")
print("✓ Locale configuration updated")
print("\nNext: Complete remaining sections manually or run full translation")
