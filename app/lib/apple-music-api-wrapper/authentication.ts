export async function authentication() {
  try {
    if ((window as any).MusicKit) {
      // Configure MusicKit
      const musicKitInstance = await (window as any).MusicKit.configure({
        developerToken: "YOUR_DEVELO",
        app: {
          name: "Your App Name",
          build: "Your App Version",
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
