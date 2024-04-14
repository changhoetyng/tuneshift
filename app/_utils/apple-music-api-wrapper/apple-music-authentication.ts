export async function AppleMusicAuthentication() {
  try {
    if ((window as any).MusicKit) {
      // Configure MusicKit
      const musicKitInstance = await (window as any).MusicKit.configure({
        developerToken: process.env.NEXT_PUBLIC_MUSIC_KIT_DEVELOPER_TOKEN,
        app: {
          name: process.env.NEXT_PUBLIC_APP_NAME,
          build: process.env.NEXT_PUBLIC_APP_BUILD,
        },
      });

      console.log("MusicKit instance", musicKitInstance);
      return musicKitInstance;
      // Further actions like musicKitInstance.authorize(), etc.
    }
  } catch (err) {
    console.log("HELLOOOO");
    console.error(err);
  }
}
