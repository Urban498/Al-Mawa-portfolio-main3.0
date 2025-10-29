import json
import re

# Read the kn.json file
with open('messages/kn.json', 'r', encoding='utf-8') as f:
    content = f.read()

# Count Hindi characters (Devanagari script range: U+0900 to U+097F)
hindi_pattern = re.compile(r'[\u0900-\u097F]+')
hindi_matches = hindi_pattern.findall(content)

print(f"Total Hindi text instances found: {len(hindi_matches)}")
print(f"\nFirst 10 Hindi text samples:")
for i, match in enumerate(hindi_matches[:10], 1):
    print(f"{i}. {match}")

# Load JSON to check structure
with open('messages/kn.json', 'r', encoding='utf-8') as f:
    data = json.load(f)

def count_hindi_in_dict(d, path=""):
    """Recursively count Hindi text in dictionary"""
    hindi_keys = []
    if isinstance(d, dict):
        for key, value in d.items():
            current_path = f"{path}.{key}" if path else key
            if isinstance(value, str) and hindi_pattern.search(value):
                hindi_keys.append(current_path)
            elif isinstance(value, (dict, list)):
                hindi_keys.extend(count_hindi_in_dict(value, current_path))
    elif isinstance(d, list):
        for i, item in enumerate(d):
            current_path = f"{path}[{i}]"
            if isinstance(item, str) and hindi_pattern.search(item):
                hindi_keys.append(current_path)
            elif isinstance(item, (dict, list)):
                hindi_keys.extend(count_hindi_in_dict(item, current_path))
    return hindi_keys

hindi_paths = count_hindi_in_dict(data)
print(f"\n\nTotal keys with Hindi text: {len(hindi_paths)}")
print(f"\nKeys that need translation:")
for path in hindi_paths[:20]:  # Show first 20
    print(f"  - {path}")

if len(hindi_paths) > 20:
    print(f"\n... and {len(hindi_paths) - 20} more keys")
