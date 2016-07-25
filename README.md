### CodePush

#### iOS
- Staging
```
_vdDbGdWr9A_DDyj8HX9fTYFah_JE1mRlp0ug
```

- Production
```
5xMlQkkLfCQGCzncdvCTb5OeX5SjE1mRlp0ug
```

#### Android
- Staging
```
199uPnmSd58g1K9GEorO1Sj5JocBE1mRlp0ug
```

- Production
```
6ueD2LDvwXl_1Ddl2Qnc89nHbbxgE1mRlp0ug
```

### Bundle
#### iOS
```
react-native bundle --platform ios --dev false --entry-file ./index.ios.js --bundle-output ./ios/main.jsbundle --assets-dest ./ios/assets --reset-cache true

```
#### Android
```
react-native bundle --platform android --dev false --entry-file index.android.js --bundle-output android/app/src/main/assets/index.android.bundle --assets-dest android/app/src/main/res/
```

### Releasing updates

#### iOS
```
code-push release-react IOU-iOS ios -m --deploymentName Staging
code-push promote IOU-iOS Staging Production
```

#### Android
```
code-push release-react IOU-Android android -m --deploymentName Staging
code-push promote IOU-Android Staging Production
```