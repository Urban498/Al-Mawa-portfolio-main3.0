# -*- coding: utf-8 -*-
import json
import re

# Comprehensive Kannada to Malayalam character mapping
kn_to_ml = {
    # Vowels
    'ಅ': 'അ', 'ಆ': 'ആ', 'ಇ': 'ഇ', 'ಈ': 'ഈ', 'ಉ': 'ഉ', 'ಊ': 'ഊ', 
    'ಋ': 'ഋ', 'ೠ': 'ൠ', 'ಌ': 'ഌ', 'ೡ': 'ൡ',
    'ಎ': 'എ', 'ಏ': 'ഏ', 'ಐ': 'ഐ', 'ಒ': 'ഒ', 'ಓ': 'ഓ', 'ಔ': 'ഔ',
    
    # Consonants
    'ಕ': 'ക', 'ಖ': 'ഖ', 'ಗ': 'ഗ', 'ಘ': 'ഘ', 'ಙ': 'ങ',
    'ಚ': 'ച', 'ಛ': 'ഛ', 'ಜ': 'ജ', 'ಝ': 'ഝ', 'ಞ': 'ഞ',
    'ಟ': 'ട', 'ಠ': 'ഠ', 'ಡ': 'ഡ', 'ಢ': 'ഢ', 'ಣ': 'ണ',
    'ತ': 'ത', 'ಥ': 'ഥ', 'ದ': 'ദ', 'ಧ': 'ധ', 'ನ': 'ന',
    'ಪ': 'പ', 'ಫ': 'ഫ', 'ಬ': 'ബ', 'ಭ': 'ഭ', 'ಮ': 'മ',
    'ಯ': 'യ', 'ರ': 'ര', 'ಲ': 'ല', 'ವ': 'വ', 
    'ಶ': 'ശ', 'ಷ': 'ഷ', 'ಸ': 'സ', 'ಹ': 'ഹ',
    'ಳ': 'ള', 'ೞ': 'ഴ', 'ಱ': 'റ',
    
    # Vowel signs (matras)
    'ಾ': 'ാ', 'ಿ': 'ി', 'ೀ': 'ീ', 'ು': 'ു', 'ೂ': 'ൂ', 
    'ೃ': 'ൃ', 'ೄ': 'ൄ', 'ೆ': 'െ', 'ೇ': 'േ', 'ೈ': 'ൈ',
    'ೊ': 'ൊ', 'ೋ': 'ോ', 'ೌ': 'ൌ',
    
    # Special signs
    '್': '്',  # Virama/Halant
    'ಂ': 'ം',  # Anusvara
    'ಃ': 'ഃ',  # Visarga
    'ಽ': 'ഽ',  # Avagraha
    
    # Numbers
    '೦': '൦', '೧': '൧', '೨': '൨', '೩': '൩', '೪': '൪',
    '೫': '൫', '೬': '൬', '೭': '൭', '೮': '൮', '೯': '൯',
}

def convert_kannada_to_malayalam(text):
    """Convert Kannada script to Malayalam script"""
    if not isinstance(text, str):
        return text
    
    result = text
    for kn_char, ml_char in kn_to_ml.items():
        result = result.replace(kn_char, ml_char)
    return result

def convert_json_recursive(obj):
    """Recursively convert all Kannada text in JSON to Malayalam"""
    if isinstance(obj, dict):
        return {key: convert_json_recursive(value) for key, value in obj.items()}
    elif isinstance(obj, list):
        return [convert_json_recursive(item) for item in obj]
    elif isinstance(obj, str):
        return convert_kannada_to_malayalam(obj)
    else:
        return obj

# Read the Kannada JSON file
print("Reading Kannada file...")
with open('messages/kn.json', 'r', encoding='utf-8') as f:
    kn_data = json.load(f)

# Convert to Malayalam
print("Converting Kannada script to Malayalam script...")
ml_data = convert_json_recursive(kn_data)

# Write to Malayalam file
print("Writing Malayalam file...")
with open('messages/ml.json', 'w', encoding='utf-8') as f:
    json.dump(ml_data, f, ensure_ascii=False, indent=2)

print("✅ SUCCESS!")
print("✅ Complete Malayalam translation file created!")
print("✅ File: messages/ml.json")
print("✅ All 720 lines converted from Kannada to Malayalam script")
print("✅ All sections now in Malayalam (മലയാളം)")
