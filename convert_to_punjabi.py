# -*- coding: utf-8 -*-
import json

# Read the Kannada file
with open('messages/pa.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Basic Kannada to Punjabi replacements
replacements = [
    ("ಮುಖಪುಟ", "ਮੁੱਖ ਪੰਨਾ"),
    ("ನಮ್ಮ ಬಗ್ಗೆ", "ਸਾਡੇ ਬਾਰੇ"),
    ("ನಮ್ಮ ಸೇವೆಗಳು", "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ"),
    ("ವೃತ್ತಿ", "ਕੈਰੀਅਰ"),
    ("ನಮ್ಮನ್ನು ಸಂಪರ್ಕಿಸಿ", "ਸਾਡੇ ਨਾਲ ਸੰਪਰਕ ਕਰੋ"),
]

for kannada, punjabi in replacements:
    content = content.replace(kannada, punjabi)

# Write back
with open('messages/pa.json', 'w', encoding='utf-8') as f:
    f.write(content)

print("Basic translations completed. File still needs comprehensive Punjabi translations.")
