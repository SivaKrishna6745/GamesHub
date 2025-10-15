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
    setter: (item: T) => void,
    errSetter: (error: string) => void,
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

export const retry = async <T>(func: () => Promise<T>, attempts = 3): Promise<T> => {
    for (let i = 0; i < attempts; i++) {
        try {
            return await func();
        } catch (error) {
            if (i === attempts - 1) throw error;
        }
    }
    throw new Error('Failed after retries');
};
