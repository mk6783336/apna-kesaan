try {
    const nw = require("nativewind/metro");
    console.log("NativeWind Metro loaded successfully");
    console.log("Exports:", Object.keys(nw));
} catch (e) {
    console.error("Error loading nativewind/metro:", e);
}
