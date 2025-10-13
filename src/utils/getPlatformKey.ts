export const getPlatformKey = (slugOrName: string) => {
    const value = slugOrName.toLowerCase();

    if (value.includes('playstation') || value.startsWith('ps')) return 'playstation';
    if (value.includes('xbox')) return 'xbox';
    if (value.includes('nintendo')) return 'nintendo';
    if (value.includes('pc') || value.includes('windows')) return 'pc';
    if (value.includes('mac')) return 'mac';
    if (value.includes('linux')) return 'linux';
    if (value.includes('android')) return 'android';
    if (value.includes('ios')) return 'ios';

    return null;
};
