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

export const fetchData = async <T>(
    fetchFunc: () => Promise<T>,
    setter: React.Dispatch<React.SetStateAction<T>>,
    errSetter: React.Dispatch<React.SetStateAction<string>>,
    logError: boolean = true
) => {
    try {
        const data = await fetchFunc();
        setter(data);
    } catch (error) {
        if (logError) {
            console.error(error);
        }
        errSetter(`Failed to load data: ${error instanceof Error ? error.message : error}`);
    }
};
