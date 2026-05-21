import os

path = r"C:\Users\turha\Desktop\Dev_Ops_New\05_Mobile_&_Gaming\Apps\GT Launcher\app\build.gradle"
with open(path, 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("versionName '4.1.4'", "versionName '4.1.6'")
content = content.replace("versionCode 36", "versionCode 37")

with open(path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Version updated successfully to 4.1.6 (37)")
