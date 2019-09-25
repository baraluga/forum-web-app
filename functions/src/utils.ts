
export const today = () => (new Date()).toISOString();

export const allTruthy = (...elements: any[]) =>
    elements.every(element => !!element);
