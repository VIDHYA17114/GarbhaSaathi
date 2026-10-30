import json

with open(r'C:\Users\ASUS\GarbhaSaathi\frontend\src\data\exerciseYogaData.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Let's find each m3 exercise by ID and extract its exact lines
m3_ids = [
    "m3_kegel_foundation",
    "m3_gentle_butterfly",
    "m3_wall_downward_dog",
    "m3_chair_catcow",
    "m3_bhramari_humming"
]

res = {}

for eid in m3_ids:
    pos = content.find(f"id: '{eid}'")
    if pos == -1:
        pos = content.find(f'id: "{eid}"')
    
    # walk backwards to {
    start = content.rfind('{', 0, pos)
    
    # walk forwards to matching }
    depth = 0
    end = start
    for i in range(start, len(content)):
        if content[i] == '{':
            depth += 1
        elif content[i] == '}':
            depth -= 1
            if depth == 0:
                end = i
                break
    res[eid] = content[start:end+1]

with open(r'C:\Users\ASUS\GarbhaSaathi\backend\m3_raw_exercises.json', 'w', encoding='utf-8') as out:
    json.dump(res, out, ensure_ascii=False, indent=2)

print("Saved raw exercise objects successfully.")
