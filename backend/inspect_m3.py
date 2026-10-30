import json
import re

with open(r'C:\Users\ASUS\GarbhaSaathi\frontend\src\data\exerciseYogaData.js', 'r', encoding='utf-8') as f:
    lines = f.readlines()

m3_line_indices = []
for i, line in enumerate(lines):
    if re.search(r'month:\s*3,', line):
        m3_line_indices.append(i)

exercises = []

for idx in m3_line_indices:
    start_idx = idx
    while start_idx > 0 and '{' not in lines[start_idx]:
        start_idx -= 1
    
    end_idx = idx
    bracket_count = 1
    while end_idx < len(lines) - 1:
        end_idx += 1
        bracket_count += lines[end_idx].count('{') - lines[end_idx].count('}')
        if bracket_count <= 0:
            break
            
    block = "".join(lines[start_idx:end_idx+1])
    
    def get_field(name):
        m = re.search(rf"{name}:\s*['\"]([^'\"]+)['\"]", block)
        return m.group(1) if m else None

    # Extract all instructions
    inst_pattern = re.compile(r"\{\s*step:\s*(\d+).*?title:\s*['\"]([^'\"]+)['\"].*?titleHi:\s*['\"]([^'\"]+)['\"].*?titleMr:\s*['\"]([^'\"]+)['\"].*?desc:\s*['\"]([^'\"]+)['\"].*?descHi:\s*['\"]([^'\"]+)['\"].*?descMr:\s*['\"]([^'\"]+)['\"].*?\}", re.DOTALL)
    instructions = []
    for m in inst_pattern.finditer(block):
        instructions.append({
            "step": int(m.group(1)),
            "title": m.group(2),
            "titleHi": m.group(3),
            "titleMr": m.group(4),
            "desc": m.group(5),
            "descHi": m.group(6),
            "descMr": m.group(7)
        })

    ex = {
        "id": get_field("id"),
        "title": get_field("title"),
        "titleHi": get_field("titleHi"),
        "titleMr": get_field("titleMr"),
        "category": get_field("category"),
        "duration": get_field("duration"),
        "difficulty": get_field("difficulty"),
        "props": get_field("props"),
        "propsHi": get_field("propsHi"),
        "visualModel": get_field("visualModel"),
        "realImagePath": get_field("realImagePath"),
        "summary": get_field("summary"),
        "summaryHi": get_field("summaryHi"),
        "safetyNotes": get_field("safetyNotes"),
        "safetyNotesHi": get_field("safetyNotesHi"),
        "stopCondition": get_field("stopCondition"),
        "stopConditionHi": get_field("stopConditionHi"),
        "instructions": instructions
    }
    exercises.append(ex)

with open(r'C:\Users\ASUS\GarbhaSaathi\backend\m3_exercises.json', 'w', encoding='utf-8') as out:
    json.dump(exercises, out, ensure_ascii=False, indent=2)

print(f"Successfully saved {len(exercises)} Month 3 exercises to backend/m3_exercises.json")
