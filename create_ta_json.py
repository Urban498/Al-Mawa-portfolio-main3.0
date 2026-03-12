import json

# Load the English JSON as a template
with open('messages/en.json', 'r', encoding='utf-8') as f:
    en_data = json.load(f)

# Create the Tamil version by copying the structure
ta_data = en_data.copy()

# Create a new ta.json with the same structure
with open('messages/ta.json', 'w', encoding='utf-8') as f:
    json.dump(ta_data, f, ensure_ascii=False, indent=2)

print("✓ Created ta.json successfully!")
print(f"✓ File size: {len(json.dumps(ta_data))} bytes")

# Validate
try:
    with open('messages/ta.json', 'r', encoding='utf-8') as f:
        test = json.load(f)
    print("✓ JSON validation passed!")
except Exception as e:
    print(f"✗ Error: {e}")
