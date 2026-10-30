import requests

assets = [
    '/exercise_illustrations/m3/m3_kegel_foundation_main.png',
    '/exercise_illustrations/m3/m3_kegel_foundation_step1.png',
    '/exercise_illustrations/m3/m3_kegel_foundation_step2.png',
    '/exercise_illustrations/m3/m3_kegel_foundation_step3.png',
    '/exercise_illustrations/m3/m3_gentle_butterfly_main.png',
    '/exercise_illustrations/m3/m3_gentle_butterfly_step1.png',
    '/exercise_illustrations/m3/m3_wall_downward_dog_main.png',
    '/exercise_illustrations/m3/m3_wall_downward_dog_step1.png',
    '/exercise_illustrations/m3/m3_chair_catcow_main.png',
    '/exercise_illustrations/m3/m3_chair_catcow_step1.png',
    '/exercise_illustrations/m3/m3_bhramari_humming_main.png',
    '/exercise_illustrations/m3/m3_bhramari_humming_step1.png'
]

print("Testing Vite static asset availability on http://localhost:5174:")
all_ok = True
for a in assets:
    url = f"http://localhost:5174{a}"
    r = requests.get(url)
    status = r.status_code
    size = len(r.content)
    content_type = r.headers.get("content-type")
    ok = (status == 200 and size > 100000)
    res_str = "OK" if ok else "FAIL"
    print(f" {a} -> {status} ({size} bytes, {content_type}) - {res_str}")
    if not ok:
        all_ok = False

if all_ok:
    print("\nALL 12 GENERATED ASSETS ARE SERVED AT 200 OK VIA VITE!")
else:
    print("\nSOME ASSETS FAILED!")
