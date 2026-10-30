import sys, re
sys.stdout.reconfigure(encoding='utf-8')

with open(r'C:\Users\ASUS\GarbhaSaathi\frontend\src\data\exerciseYogaData.js', encoding='utf-8') as f:
    content = f.read()

# Find all exercises by month
month_blocks = re.split(r'(?=month:\s*\d+)', content)

exercises_by_month = {}
for block in month_blocks:
    m = re.search(r'month:\s*(\d+)', block)
    if not m:
        continue
    month = int(m.group(1))
    names = re.findall(r'name:\s*["\']([^"\']+)["\']', block)
    hindi = re.findall(r'hindiName:\s*["\']([^"\']+)["\']', block)
    if month not in exercises_by_month:
        exercises_by_month[month] = []
    for i, name in enumerate(names):
        h = hindi[i] if i < len(hindi) else ''
        exercises_by_month[month].append((name, h))

total = 0
for month in sorted(exercises_by_month.keys()):
    exs = exercises_by_month[month]
    print(f"\nMonth {month} ({len(exs)} exercises):")
    for idx, (n, h) in enumerate(exs, 1):
        print(f"  {idx}. {n} | {h}")
    total += len(exs)

print(f"\nTOTAL: {len(exercises_by_month)} months, {total} exercises")
