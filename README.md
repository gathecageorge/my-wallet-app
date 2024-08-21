# Setup
1. Clone repo
2. Copy environment.sample.js to environment.js `cp environment.sample.js environment.js` and edit accordingly.
3. Copy app.sample.json to app.json `cp app.sample.json app.json` and edit accordingly.
4. `npx expo start --no-dev --minify` or `npx expo start`

# When running on devcontainer
You need to set the interface where to forward the expo port 8081
export REACT_NATIVE_PACKAGER_HOSTNAME=192.168.1.188

# Login to eas for building
eas login

# Build APK
eas build -p android --profile preview2

# Build development
eas build -p android --profile development

# Build bundle
eas build -p android

