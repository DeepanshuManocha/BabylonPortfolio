export const getAssetPath = (asset) =>
    process.env.NODE_ENV === 'production' ? `assets/${asset}` : `public/assets/${asset}`;