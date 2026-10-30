path = r'C:\Users\ASUS\GarbhaSaathi\frontend\src\data\exerciseYogaData.js'
with open(path, 'r', encoding='utf-8') as f:
    text = f.read()

norm = text.replace('\r\n', '\n')

replacements = [
    (
        "id: 'm3_kegel_foundation'",
        "realImagePath: '/exercise_poses/kegel.jpg',",
        "realImagePath: '/exercise_poses/kegel.jpg',\n    illustrations: {\n      main: '/exercise_illustrations/m3/m3_kegel_foundation_main.png',\n      steps: [\n        '/exercise_illustrations/m3/m3_kegel_foundation_step1.png',\n        '/exercise_illustrations/m3/m3_kegel_foundation_step2.png',\n        '/exercise_illustrations/m3/m3_kegel_foundation_step3.png'\n      ]\n    },"
    ),
    (
        "id: 'm3_gentle_butterfly'",
        "realImagePath: '/exercise_poses/butterfly.jpg',",
        "realImagePath: '/exercise_poses/butterfly.jpg',\n    illustrations: {\n      main: '/exercise_illustrations/m3/m3_gentle_butterfly_main.png',\n      steps: [\n        '/exercise_illustrations/m3/m3_gentle_butterfly_step1.png',\n        '/exercise_illustrations/m3/m3_gentle_butterfly_main.png',\n        '/exercise_illustrations/m3/m3_gentle_butterfly_main.png'\n      ]\n    },"
    ),
    (
        "id: 'm3_wall_downward_dog'",
        "realImagePath: '/exercise_poses/tadasana.jpg',",
        "realImagePath: '/exercise_poses/tadasana.jpg',\n    illustrations: {\n      main: '/exercise_illustrations/m3/m3_wall_downward_dog_main.png',\n      steps: [\n        '/exercise_illustrations/m3/m3_wall_downward_dog_step1.png',\n        '/exercise_illustrations/m3/m3_wall_downward_dog_main.png',\n        '/exercise_illustrations/m3/m3_wall_downward_dog_main.png'\n      ]\n    },"
    ),
    (
        "id: 'm3_chair_catcow'",
        "realImagePath: '/exercise_poses/cat_cow.jpg',",
        "realImagePath: '/exercise_poses/cat_cow.jpg',\n    illustrations: {\n      main: '/exercise_illustrations/m3/m3_chair_catcow_main.png',\n      steps: [\n        '/exercise_illustrations/m3/m3_chair_catcow_step1.png',\n        '/exercise_illustrations/m3/m3_chair_catcow_main.png',\n        '/exercise_illustrations/m3/m3_chair_catcow_main.png'\n      ]\n    },"
    ),
    (
        "id: 'm3_bhramari_humming'",
        "realImagePath: '/exercise_poses/butterfly.jpg',",
        "realImagePath: '/exercise_poses/butterfly.jpg',\n    illustrations: {\n      main: '/exercise_illustrations/m3/m3_bhramari_humming_main.png',\n      steps: [\n        '/exercise_illustrations/m3/m3_bhramari_humming_step1.png',\n        '/exercise_illustrations/m3/m3_bhramari_humming_main.png',\n        '/exercise_illustrations/m3/m3_bhramari_humming_main.png'\n      ]\n    },"
    )
]

for ex_id, target, repl in replacements:
    idx = norm.find(ex_id)
    if idx == -1:
        print(f'Error finding {ex_id}')
        continue
    target_idx = norm.find(target, idx)
    if target_idx == -1 or target_idx > idx + 2000:
        print(f'Error finding target for {ex_id}')
        continue
    norm = norm[:target_idx] + repl + norm[target_idx + len(target):]
    print(f'Updated {ex_id} successfully')

crlf_text = norm.replace('\n', '\r\n')
with open(path, 'w', encoding='utf-8', newline='') as f:
    f.write(crlf_text)
print('Saved updated exerciseYogaData.js successfully')
