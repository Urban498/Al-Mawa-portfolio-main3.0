import json

# Read what we can from pa.json
try:
    with open('messages/pa.json', 'r', encoding='utf-8') as f:
        content = f.read()
    # Try to extract valid portions using regex
    import re
    # Find the careers section which should be valid
    careers_match = re.search(r'"careers":\s*\{.*?\}(?=\s*,\s*")', content, re.DOTALL)
    if careers_match:
        careers_str = careers_match.group(0)
        pa_data = json.loads('{' + careers_str + '}')
    else:
        pa_data = {}
except:
    pa_data = {}

# If pa_data is too small, read from pa_backup
if len(pa_data) < 5:
    try:
        with open('messages/pa_backup.json', 'r', encoding='utf-8') as f:
            pa_data = json.load(f)
    except:
        pa_data = {}

# Now update with proper Punjabi translations for the three new pages
pa_data['testimonialsPage'] = {
    "label": "ਸਾਖੀਆਂ ਅਤੇ ਕੇਸ ਅਧਿਐਨ",
    "title": "ਸਾਡੇ ਕਲਾਇੰਟ ਕੀ ਕਹਿੰਦੇ ਹਨ",
    "titleHighlight": "ਕਲਾਇੰਟ",
    "titleEnd": "ਕਹਿੰਦੇ ਹਨ",
    "description": "ਬ੍ਰਾਂਡਾਂ ਦੀ ਇੱਕ ਚੁਣੀ ਗਈ ਲਾਈਨ ਜੋ AL-MAWA International ਨੂੰ ਭਰੋਸਾ ਕਰਦੀ ਹੈ ਉਨ੍ਹਾਂ ਦੀ ਡਿਜੀਟਲ ਮੌਜੂਦਗੀ ਨੂੰ ਆਕਾਰ ਦੇਣ ਲਈ – ਉਚ੍ਚ-ਪ੍ਰਦਰਸ਼ਨ ਸੋਸ਼ਲ ਮੀਡੀਆ ਕੈਂਪੇਨਿਆਂ ਤੋਂ ਪ੍ਰੀਮੀਅਮ, ਰੂਪਾਂਤਰਨ-ਕੇਂਦ੍ਰਿਤ ਵੈਬਸਾਈਟਾਂ ਤਕ।",
    "badges": {
        "services": "ਸੋਸ਼ਲ ਮੀਡੀਆ • ਵਿਜ਼ਾ • ਵੈਬ",
        "approach": "ਰਣਨੀਤੀ • ਡਿਜ਼ਾਈਨ • ਵਿਕਾਸ"
    },
    "reviewsSection": {
        "title": "ਗਾਹਕ ਸਮੀਖਿਆਵਾਂ ਅਤੇ ਫੀਡਬੈਕ",
        "subtitle": "ਸਾਡੇ ਸੰਤੁਸ਼ਟ ਗਾਹਕਾਂ ਤੋਂ ਸਿਧਾ ਸੁਣੋ ਕਿ ਉਹਨਾਂ ਨਾਲ ਕੰਮ ਕਰਨ ਦੀ ਉਨ੍ਹਾਂ ਦੀ ਜਾਣਕਾਰੀ।"
    }
}

pa_data['ourWorkPage'] = {
    "title": "ਸਾਡਾ",
    "titleHighlight": "ਕੰਮ",
    "description": "ਸਾਡੇ ਡਿਜੀਟਲ ਹੱਲ ਅਤੇ ਮਾਰਕੀਟਿੰਗ ਮੁਹਿੰਮਾਂ ਦੇ ਪੋਰਟਫੋਲੀਓ ਦੀ ਖੋਜ ਕਰੋ ਜੋ ਸਾਡੇ ਗ੍ਰਾਹਕਾਂ ਲਈ ਅਸਲ ਨਤੀਜੇ ਦਿੰਦੇ ਹਨ।",
    "badges": {
        "services": "ਸੋਸ਼ਲ ਮੀਡੀਆ • ਵਿਜ਼ਾ • ਵੈਬ",
        "approach": "ਰਣਨੀਤੀ • ਡਿਜ਼ਾਈਨ • ਵਿਕਾਸ"
    },
    "socialMediaSection": {
        "title": "ਸਾਡਾ ਸੋਸ਼ਲ ਮੀਡੀਆ ਕੰਮ",
        "description": "ਲੁਭਾਉਣਾ ਸੋਸ਼ਲ ਮੀਡੀਆ ਸਮੱਗਰੀ ਜੋ ਸਪਸ਼ਟਤਾ ਅਤੇ ਪ੍ਰਭਾਵ ਨਾਲ ਤੁਹਾਡੀ ਬ੍ਰਾਂਡ ਨੁਮਾਇੰਦਗੀ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੀ ਗਈ ਹੈ।"
    },
    "websiteSection": {
        "title": "ਸਾਡੀ ਵੈਬਸਾਈਟ ਵਿਕਾਸ",
        "description": "ਕਸਟਮ ਵੈਬਸਾਈਟ ਹੱਲ ਨਤੀਜੇ ਦੇਣ ਅਤੇ ਦੀਰਘਕਾਲੀਨ ਪ੍ਰਭਾਵ ਤਿਆਰ ਕਰਨ ਲਈ ਡਿਜ਼ਾਈਨ ਕੀਤੇ ਗਏ ਹਨ।"
    },
    "cardBadges": {
        "websiteDevelopment": "ਵੈਬਸਾਈਟ ਵਿਕਾਸ"
    },
    "liveStatus": "ਲਾਈਵ"
}

pa_data['shareFeedbackPage'] = {
    "label": "ਆਪਣਾ ਅਨੁਭਵ ਸਾਂਝਾ ਕਰੋ",
    "title": "ਡਾਇਰੈਕਟਰ ਦਾ ਡੈਸਕ",
    "description": "ਤੁਹਾਡੀ ਪ੍ਰਤੀਕ੍ਰਿਆ ਮਾਇਨੇ ਰਖਦੀ ਹੈ। ਸਾਡੇ ਨਾਲ ਆਪਣਾ ਅਨੁਭਵ ਸਾਂਝਾ ਕਰੋ ਅਤੇ ਸਾਨੂੰ ਬਿਹਤਰ ਹੋਣ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰੋ। ਹਰ ਸੂਝ ਨੂੰ ਸਾਡੀ ਲੀਡਰਸ਼ਿਪ ਟੀਮ ਦੁਆਰਾ ਵਿਅਕਤਿਗਤ ਤੌਰ 'ਤੇ ਸਮੀਖਿਆ ਕੀਤੀ ਜਾਂਦੀ ਹੈ।",
    "benefits": {
        "title": "ਆਪਣੀ ਪ੍ਰਤੀਕ੍ਰਿਆ ਸਾਂਝੀ ਕਿਉਂ ਕਰੋ?",
        "intro": "AL-MAWA International ਵਿੱਚ, ਤੁਹਾਡੀ ਅਵਾਜ਼ ਸਾਡੀ ਵਿਕਾਸ ਨੂੰ ਚਲਾਉਂਦੀ ਹੈ। ਹਰ ਟਿੱਪਣੀ, ਸੁਝਾਅ ਅਤੇ ਸੂਝ ਸਾਨੂੰ ਬਿਹਤਰ ਸੇਵਾਵਾਂ ਅਤੇ ਅਨੁਭਵ ਪ੍ਰਦਾਨ ਕਰਨ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰਦੀ ਹੈ।",
        "items": [
            {
                "title": "ਸਿਧਾ ਸਮੀਖਿਆ ਕੀਤਾ",
                "description": "ਤੁਹਾਡੀ ਪ੍ਰਤੀਕ੍ਰਿਆ ਸਾਡੀ ਲੀਡਰਸ਼ਿਪ ਟੀਮ ਦੁਆਰਾ ਵਿਅਕਤਿਗਤ ਤੌਰ 'ਤੇ ਸਮੀਖਿਆ ਕੀਤੀ ਜਾਂਦੀ ਹੈ"
            },
            {
                "title": "ਗੁਪਤ ਅਤੇ ਸੁਰਖਿਅਤ",
                "description": "ਤੁਹਾਡੀ ਜਾਣਕਾਰੀ ਸੁਰਖਿਅਤ ਰੱਖੀ ਜਾਂਦੀ ਹੈ ਅਤੇ ਧਿਆਨ ਨਾਲ ਸੰਭਾਲੀ ਜਾਂਦੀ ਹੈ"
            },
            {
                "title": "ਸਾਡੀਆਂ ਸੇਵਾਵਾਂ ਨੂੰ ਪ੍ਰਭਾਵਿਤ ਕਰੋ",
                "description": "ਤੁਹਾਡੀ ਸੂਝ ਸਾਨੂੰ ਸਿਧਾ ਬਿਹਤਰ ਹੋਣ ਅਤੇ ਤੁਹਾਨੂੰ ਬਿਹਤਰ ਸੇਵਾ ਦੇਣ ਵਿੱਚ ਸਹਾਇਤਾ ਕਰਦੀ ਹੈ"
            }
        ]
    },
    "form": {
        "title": "ਆਪਣੀ ਪ੍ਰਤੀਕ੍ਰਿਆ ਸਾਂਝੀ ਕਰੋ",
        "feedback": {
            "label": "ਤੁਹਾਡੀ ਪ੍ਰਤੀਕ੍ਰਿਆ *",
            "placeholder": "ਸਾਡੇ ਨਾਲ ਆਪਣਾ ਅਨੁਭਵ ਸਾਂਝਾ ਕਰੋ..."
        },
        "name": {
            "label": "ਪੂਰਾ ਨਾਂ *",
            "placeholder": "ਆਪਣਾ ਪੂਰਾ ਨਾਂ ਦਰਜ ਕਰੋ"
        },
        "email": {
            "label": "ਈ-ਮੇਲ ਪਤਾ *",
            "placeholder": "your@email.com"
        },
        "designation": {
            "label": "ਤੁਹਾਡਾ ਨਾਂਵ / ਭੂਮਿਕਾ",
            "placeholder": "ਜਿਵੇਂ: ਮੈਨੇਜਰ, ਵਪਾਰ ਮਾਲਕ"
        },
        "rating": {
            "label": "ਆਪਣੇ ਅਨੁਭਵ ਨੂੰ ਦਰਜਾ ਦਿਓ *"
        },
        "image": {
            "label": "ਆਪਣੀ ਫੋਟੋ ਅੱਪਲੋਡ ਕਰੋ (ਵਿਕਲਪਿਕ)",
            "placeholder": "ਅੱਪਲੋਡ ਕਰਨ ਲਈ ਕਲਿਕ ਕਰੋ"
        },
        "submitButton": "ਪ੍ਰਤੀਕ੍ਰਿਆ ਭੇਜੋ",
        "submitting": "ਭੇਜ ਰਹੇ ਹਾਂ..."
    },
    "successMessage": "ਤੁਹਾਡੀ ਪ੍ਰਤੀਕ੍ਰਿਆ ਲਈ ਧਨਵਾਦ!",
    "errorMessage": "ਪ੍ਰਤੀਕ੍ਰਿਆ ਭੇਜਣ ਵਿਚ ਅਸਫਲ",
    "errorDescription": "ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੀ ਜਾਣਕਾਰੀ ਦੀ ਜਾਂਚ ਕਰੋ ਅਤੇ ਦੁਬਾਰਾ ਕੋਸ਼ਿਸ਼ ਕਰੋ।"
}

# Write back the fixed JSON
with open('messages/pa.json', 'w', encoding='utf-8') as f:
    json.dump(pa_data, f, ensure_ascii=False, indent=2)

print("✅ pa.json fixed and updated")
