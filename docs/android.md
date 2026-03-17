# Installing On Android With ADB

This project can be installed directly onto a physical Android phone with `adb`, which is useful when you want to target one specific device and reinstall quickly with `-r`.

## Prerequisites

- Android SDK platform tools installed
- `adb` available on your command line
- USB debugging enabled on the phone
- The phone authorized for the current computer
- Project dependencies installed with `npm install`

## 1. Confirm The Device ID

Connect the phone over USB, then run:

```sh
adb devices
```

You should see a device serial in the output, for example:

```text
List of devices attached
R5CW1234567    device
```

In the commands below, replace `DEVICE` with that serial.

## 2. Build A Debug APK

From the project root:

```sh
cd android
./gradlew assembleDebug
```

On Windows PowerShell:

```powershell
cd android
.\gradlew assembleDebug
```

This creates the APK at:

```text
android/app/build/outputs/apk/debug/app-debug.apk
```

## 3. Install Or Reinstall The APK

From the project root, install it with:

```sh
adb -s DEVICE install -r android/app/build/outputs/apk/debug/app-debug.apk
```

What the flags mean:

- `-s DEVICE`: Targets one specific phone when multiple devices are connected
- `install`: Pushes and installs the APK
- `-r`: Reinstalls the app while keeping its existing app data when possible

## 4. Run Metro For A Debug Build

If you installed the debug APK, start Metro in a separate terminal:

```sh
npm start
```

Then forward the React Native port to the phone:

```sh
adb -s DEVICE reverse tcp:8081 tcp:8081
```

That lets the installed debug app load the JavaScript bundle from your local machine.

## 5. Reinstall After Code Changes

When native Android changes require a rebuild, repeat:

```powershell
cd android
.\gradlew assembleDebug
cd ..
adb -s DEVICE install -r android/app/build/outputs/apk/debug/app-debug.apk
```

If your changes are JavaScript-only, you can usually keep Metro running and use Fast Refresh instead of reinstalling.

## Troubleshooting

`adb: device unauthorized`

- Unlock the phone and accept the USB debugging prompt
- Run `adb devices` again

`adb: device not found`

- Check the USB cable
- Confirm USB debugging is still enabled
- Verify the exact device serial from `adb devices`

App installs but does not load JavaScript

- Make sure `npm start` is running
- Run `adb -s DEVICE reverse tcp:8081 tcp:8081`
- Reopen the app on the phone

Install fails because versions conflict

- Try uninstalling first:

```sh
adb -s DEVICE uninstall com.airportdb
adb -s DEVICE install android/app/build/outputs/apk/debug/app-debug.apk
```

## Release APK Note

The current Android configuration signs release builds with the debug keystore for local convenience. That is fine for personal device installs, but it should be replaced with a proper release keystore before any store distribution.
