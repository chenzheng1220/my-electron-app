const { FusesPlugin } = require('@electron-forge/plugin-fuses');
const { FuseV1Options, FuseVersion } = require('@electron/fuses');

module.exports = {
  packagerConfig: {
      // 应用图标配置
      icon: "icons/icon", // 自动识别 .ico 或 .icns（无需扩展名）
      name: "electron", // 覆盖 package.json 中的 name（可选）
      executableName: "", // 生成的可执行文件名（默认取 name）
      asar: true, // 必须为 true 或对象
      out: "dist", // 输出目录
  },
  rebuildConfig: {},
  makers: [
      // Windows 安装包配置（生成 .exe）
    {
      name: '@electron-forge/maker-squirrel',
      config: {
        name: "electron",
        authors: "星愿",
        setupIcon: "icons/icon.ico", // 安装程序图标
        setupExe: "electron.exe", // 安装程序文件名
        noMsi: true, // 不生成 MSI 安装包（可选）
        certificateFile: "", // 签名证书路径（可选）
        certificatePassword: "",
      },
    },
     // macOS 安装包配置（生成 .dmg）
    //  {
    //   name: "@electron-forge/maker-dmg",
    //   config: {
    //     name: "electron",
    //     icon: "icons/icon.icns", // 应用图标
    //     background: "icons/dmg-background.png", // DMG 背景图（可选）
    //     format: "ULFO", // 压缩格式
    //   },
    // },
    {
      name: '@electron-forge/maker-zip',
      platforms: ['darwin'],
    },
    {
      name: '@electron-forge/maker-deb',
      config: {},
    },
    {
      name: '@electron-forge/maker-rpm',
      config: {},
    },
  ],
  plugins: [
    {
      name: '@electron-forge/plugin-auto-unpack-natives',
      config: {},
    },
    // Fuses are used to enable/disable various Electron functionality
    // at package time, before code signing the application
    new FusesPlugin({
      version: FuseVersion.V1,
      [FuseV1Options.RunAsNode]: false,
      [FuseV1Options.EnableCookieEncryption]: true,
      [FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
      [FuseV1Options.EnableNodeCliInspectArguments]: false,
      [FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
      [FuseV1Options.OnlyLoadAppFromAsar]: true,
    }),
  ],
};
