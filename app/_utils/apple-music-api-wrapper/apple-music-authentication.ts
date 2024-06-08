declare global {
  interface Window {
    MusicKit: any;
  }
}

function loadMusicKit() {
  return new Promise((resolve, reject) => {
    if (window.MusicKit) {
      resolve(window.MusicKit);
    } else {
      const script = document.createElement("script");
      script.src = "https://js-cdn.music.apple.com/musickit/v3/musickit.js";
      script.async = true;
      script.onload = () => {
        if (window.MusicKit) {
          resolve(window.MusicKit);
        } else {
          reject(new Error("MusicKit failed to load"));
        }
      };
      script.onerror = reject;
      document.head.appendChild(script);
    }
  });
}

export async function AppleMusicAuthentication() {
  try {
    const MusicKit = await loadMusicKit();
    if (MusicKit) {
      // Configure MusicKit
      const musicKitInstance = await window.MusicKit.configure({
        developerToken: process.env.NEXT_PUBLIC_MUSIC_KIT_DEVELOPER_TOKEN,
        app: {
          name: process.env.NEXT_PUBLIC_APP_NAME,
          build: process.env.NEXT_PUBLIC_APP_BUILD,
        },
      });

      return musicKitInstance;
      // Further actions like musicKitInstance.authorize(), etc.
    }
  } catch (err) {
    console.error(err);
  }
}
